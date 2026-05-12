import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Space,
  Spin,
  Table,
  Typography,
} from 'ui/antd';
import { getAPI, postAPI, putAPI } from 'helpers/apiService';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import { notify } from 'ui/notification';

import styles from '../settings.module.css';

const { Text } = Typography;

type EquipmentEntityKey =
  | 'equipment-infos'
  | 'equipment-types'
  | 'facility-infos'
  | 'facility-building-infos'
  | 'facility-area-image-infos';

type EquipmentMasterDataProps = {
  base: string;
  canEdit: boolean;
  initialMode?: WorkspaceMode;
  scopeParams: Record<string, any>;
};

type EquipmentScreenProps = {
  base: string;
  canEdit: boolean;
  scopeParams: Record<string, any>;
};

type EquipmentSubTab = 'rooms' | 'room-types' | 'amenities';

type MasterDataField = {
  name: string;
  nullable?: boolean;
  read_only?: boolean;
  required?: boolean;
  type?: string;
};

type MasterDataMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};
type WorkspaceMode = 'facility' | 'equipment';

const SYSTEM_FIELDS = [
  'id',
  'created_at',
  'updated_at',
  'update_at',
  'created_date',
  'modified_date',
  'deleted_at',
  'deleted_date',
];

const FORM_EXCLUDED_FIELDS = ['operator_code', 'branch_code', 'facility_code'];

const ENTITY_CONFIG: Record<EquipmentEntityKey, { label: string; preferredColumns: string[] }> = {
  'equipment-infos': {
    label: 'Room List',
    preferredColumns: [
      'id',
      'equipment_code',
      'name',
      'abbreviation',
      'equipment_type_id',
      'regular_capacity',
      'extra_capacity',
      'sale_enable',
      'branch_code',
      'facility_code',
    ],
  },
  'equipment-types': {
    label: 'Room Type',
    preferredColumns: [
      'id',
      'name',
      'abbreviation',
      'operator_code',
      'branch_code',
      'facility_code',
    ],
  },
  'facility-infos': {
    label: 'Facility List',
    preferredColumns: [
      'id',
      'facility_code',
      'name',
      'abbreviation',
      'telephone_number',
      'email_address',
      'branch_code',
    ],
  },
  'facility-building-infos': {
    label: 'Building',
    preferredColumns: ['id', 'building_name', 'abbreviation', 'facility_info_id'],
  },
  'facility-area-image-infos': {
    label: 'Area',
    preferredColumns: ['id', 'facility_area_info_id', 'url_image'],
  },
};

const resolveEntityKey = (value?: string): EquipmentEntityKey | null => {
  if (!value) {
    return null;
  }

  return (Object.keys(ENTITY_CONFIG) as EquipmentEntityKey[]).find(item => item === value) ?? null;
};

const isBooleanField = (field: MasterDataField): boolean => {
  const type = (field.type || '').toLowerCase();

  return (
    type.includes('tinyint(1)') || field.name.startsWith('is_') || field.name.endsWith('_enabled')
  );
};

const isNumericField = (field: MasterDataField): boolean => {
  const type = (field.type || '').toLowerCase();

  return (
    type.includes('int') ||
    type.includes('decimal') ||
    type.includes('float') ||
    type.includes('double')
  );
};

const isLongTextField = (field: MasterDataField): boolean => {
  const type = (field.type || '').toLowerCase();

  return type.includes('text');
};

const extractList = (payload: any): any[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  return [];
};

const extractMeta = (payload: any): MasterDataMeta => {
  const meta = payload?.meta;

  if (meta && typeof meta === 'object') {
    return meta;
  }

  return {};
};

const valueAsText = (value: any): string => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
};

function EquipmentDetailScreen({ base, canEdit, scopeParams }: EquipmentScreenProps) {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const entityKey = resolveEntityKey(params.entity);
  const entityConfig = entityKey ? ENTITY_CONFIG[entityKey] : null;

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<MasterDataField[]>([]);
  const [record, setRecord] = useState<Record<string, any> | null>(null);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (!entityKey) {
      navigate('/settings/equipment', { replace: true });
    }
  }, [entityKey, navigate]);

  const loadDetail = useCallback(async () => {
    if (!entityKey || !id) {
      return;
    }

    setLoading(true);

    try {
      const [schemaResponse, detailResponse] = await Promise.all([
        getAPI(`${base}/${entityKey}/schema`, 'pms', scopeParams),
        getAPI(`${base}/${entityKey}/${id}`, 'pms', scopeParams),
      ]);

      const schemaPayload = schemaResponse.data ?? {};
      const detailPayload = detailResponse.data ?? {};

      setFields(schemaPayload?.data?.fields ?? []);
      setRecord(detailPayload?.data ?? null);
      setWarning(schemaPayload?.warning?.message || detailPayload?.warning?.message || '');
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load detail data');
      navigate('/settings/equipment');
    } finally {
      setLoading(false);
    }
  }, [base, entityKey, id, navigate, scopeParams]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadDetail();
  }, [loadDetail, scopeParams]);

  const detailRows = useMemo(() => {
    if (!record) {
      return [];
    }

    const orderedFieldNames = fields
      .map(field => field.name)
      .filter(name => !['deleted_at', 'deleted_date'].includes(name));

    const remainingKeys = Object.keys(record).filter(key => !orderedFieldNames.includes(key));
    const allKeys = [...orderedFieldNames, ...remainingKeys];

    return allKeys.map(key => ({
      key,
      field: key,
      value: valueAsText(record[key]),
    }));
  }, [fields, record]);

  if (!entityConfig || !id) {
    return null;
  }

  return (
    <Card
      extra={
        <Space>
          <Button onClick={() => navigate('/settings/equipment')}>Back</Button>
          <Button
            disabled={!canEdit}
            onClick={() => navigate(`/settings/equipment/${entityKey}/${id}/edit`)}
          >
            Edit
          </Button>
        </Space>
      }
      title={`${entityConfig.label} #${id}`}
    >
      {warning ? (
        <Alert className={styles.schemaWarning} message={warning} showIcon type="warning" />
      ) : null}

      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={[
            { title: 'Field', dataIndex: 'field', key: 'field', width: '30%' },
            {
              title: 'Value',
              dataIndex: 'value',
              key: 'value',
              render: (value: string) => <span className={styles.equipmentValueText}>{value}</span>,
            },
          ]}
          dataSource={detailRows}
          pagination={false}
          rowKey="key"
        />
      )}
    </Card>
  );
}

function EquipmentFacilityWorkspace({
  base,
  canEdit,
  initialMode = 'facility',
  scopeParams,
}: EquipmentScreenProps & { initialMode?: WorkspaceMode }) {
  const params = useParams();

  if (params.entity || params.id) {
    return <Navigate replace to="/settings/equipment" />;
  }

  return (
    <div className={styles.workspaceShell}>
      <div className={styles.equipmentRouteContainer}>
        {initialMode === 'equipment' ? (
          <EquipmentWorkspace base={base} canEdit={canEdit} scopeParams={scopeParams} />
        ) : (
          <FacilityWorkspace base={base} canEdit={canEdit} scopeParams={scopeParams} />
        )}
      </div>
    </div>
  );
}

function EquipmentFormScreen({
  base,
  canEdit,
  mode,
  scopeParams,
}: EquipmentScreenProps & { mode: 'create' | 'edit' }) {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [form] = Form.useForm();

  const entityKey = resolveEntityKey(params.entity);
  const entityConfig = entityKey ? ENTITY_CONFIG[entityKey] : null;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState<MasterDataField[]>([]);
  const [warning, setWarning] = useState('');

  const editableFields = useMemo(() => {
    return fields.filter(field => {
      const isSystemField = SYSTEM_FIELDS.includes(field.name);
      const isScopeField = FORM_EXCLUDED_FIELDS.includes(field.name);

      return !field.read_only && !isSystemField && !isScopeField;
    });
  }, [fields]);

  const loadFormData = useCallback(async () => {
    if (!entityKey) {
      return;
    }

    setLoading(true);

    try {
      const schemaResponse = await getAPI(`${base}/${entityKey}/schema`, 'pms', scopeParams);
      const schemaPayload = schemaResponse.data ?? {};
      const schemaFields = schemaPayload?.data?.fields ?? [];

      setFields(schemaFields);
      setWarning(schemaPayload?.warning?.message || '');

      const defaultValues: Record<string, any> = {};

      schemaFields.forEach((field: MasterDataField) => {
        if (isBooleanField(field)) {
          defaultValues[field.name] = false;
        }
      });

      form.setFieldsValue(defaultValues);

      if (mode === 'edit' && id) {
        const detailResponse = await getAPI(`${base}/${entityKey}/${id}`, 'pms', scopeParams);
        const detailPayload = detailResponse.data ?? {};
        const detailRecord = detailPayload?.data ?? {};
        const values: Record<string, any> = { ...defaultValues, ...detailRecord };

        schemaFields.forEach((field: MasterDataField) => {
          if (isBooleanField(field)) {
            values[field.name] =
              detailRecord[field.name] === true ||
              detailRecord[field.name] === 1 ||
              detailRecord[field.name] === '1';
          }
        });

        form.setFieldsValue(values);
        setWarning(schemaPayload?.warning?.message || detailPayload?.warning?.message || '');
      }
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load form data');
      navigate('/settings/equipment');
    } finally {
      setLoading(false);
    }
  }, [base, entityKey, form, id, mode, navigate, scopeParams]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadFormData();
  }, [loadFormData, scopeParams]);

  const submitForm = async () => {
    if (!canEdit || !entityKey) {
      return;
    }

    const values = await form.validateFields();
    const payload: Record<string, any> = { ...scopeParams, ...values };

    editableFields.forEach(field => {
      if (isBooleanField(field) && Object.prototype.hasOwnProperty.call(payload, field.name)) {
        payload[field.name] = payload[field.name] ? 1 : 0;
      }
    });

    setSaving(true);

    try {
      if (mode === 'edit' && id) {
        await putAPI(`${base}/${entityKey}/${id}`, payload);
        notify.success('Updated successfully');
        navigate(`/settings/equipment/${entityKey}/${id}`);
      } else {
        const response = await postAPI(`${base}/${entityKey}`, payload);
        const createdId = response?.data?.data?.id;

        notify.success('Created successfully');

        if (createdId) {
          navigate(`/settings/equipment/${entityKey}/${createdId}`);
        } else {
          navigate('/settings/equipment');
        }
      }
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const renderFieldInput = (field: MasterDataField) => {
    if (isBooleanField(field)) {
      return <Checkbox />;
    }

    if (isNumericField(field)) {
      return <Input type="number" />;
    }

    if (isLongTextField(field)) {
      return <Input.TextArea rows={3} />;
    }

    return <Input />;
  };

  if (!entityConfig || (mode === 'edit' && !id)) {
    return null;
  }

  return (
    <Card
      className={styles.equipmentFormCard}
      extra={<Button onClick={() => navigate('/settings/equipment')}>Back</Button>}
      title={mode === 'edit' ? `Update ${entityConfig.label}` : `Create ${entityConfig.label}`}
    >
      {warning ? (
        <Alert className={styles.schemaWarning} message={warning} showIcon type="warning" />
      ) : null}

      {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical">
          <div className={styles.formGrid}>
            {editableFields.map(field => {
              const isBoolean = isBooleanField(field);

              return (
                <Form.Item
                  key={field.name}
                  label={field.name}
                  name={field.name}
                  rules={
                    field.required
                      ? [{ required: true, message: 'This field is required' }]
                      : undefined
                  }
                  valuePropName={isBoolean ? 'checked' : 'value'}
                >
                  {renderFieldInput(field)}
                </Form.Item>
              );
            })}
          </div>

          <Space>
            <Button onClick={() => navigate('/settings/equipment')}>Cancel</Button>
            <Button
              disabled={!canEdit || saving || editableFields.length === 0}
              loading={saving}
              onClick={submitForm}
              type="primary"
            >
              {mode === 'edit' ? 'Update' : 'Create'}
            </Button>
          </Space>
        </Form>
      )}
    </Card>
  );
}

function EquipmentMasterData({
  base,
  canEdit,
  initialMode = 'facility',
  scopeParams,
}: EquipmentMasterDataProps) {
  return (
    <Routes>
      <Route
        element={
          <EquipmentFacilityWorkspace
            base={base}
            canEdit={canEdit}
            initialMode={initialMode}
            scopeParams={scopeParams}
          />
        }
        path="equipment"
      />
      <Route
        element={<EquipmentDetailScreen base={base} canEdit={canEdit} scopeParams={scopeParams} />}
        path="equipment/:entity/:id"
      />
      <Route
        element={
          <EquipmentFormScreen
            base={base}
            canEdit={canEdit}
            mode="create"
            scopeParams={scopeParams}
          />
        }
        path="equipment/:entity/create"
      />
      <Route
        element={
          <EquipmentFormScreen
            base={base}
            canEdit={canEdit}
            mode="edit"
            scopeParams={scopeParams}
          />
        }
        path="equipment/:entity/:id/edit"
      />
      <Route element={<Navigate replace to="/settings/equipment" />} path="*" />
    </Routes>
  );
}

function EquipmentWorkspace({ base, canEdit, scopeParams }: EquipmentScreenProps) {
  const navigate = useNavigate();
  const [subTab, setSubTab] = useState<EquipmentSubTab>('rooms');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const loadRooms = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAPI(`${base}/equipment-infos`, 'pms', {
        ...scopeParams,
        per_page: 200,
        search: searchKeyword,
      });

      setRooms(extractList(response.data));
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load room list');
    } finally {
      setLoading(false);
    }
  }, [base, scopeParams, searchKeyword]);

  const loadRoomTypes = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAPI(`${base}/equipment-types`, 'pms', {
        ...scopeParams,
        per_page: 200,
        search: searchKeyword,
      });

      setRoomTypes(extractList(response.data));
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load room types');
    } finally {
      setLoading(false);
    }
  }, [base, scopeParams, searchKeyword]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    if (subTab === 'rooms') {
      loadRooms();

      return;
    }

    if (subTab === 'room-types') {
      loadRoomTypes();
    }
  }, [loadRoomTypes, loadRooms, scopeParams, subTab]);

  const roomColumns = [
    { title: 'Mã phòng', dataIndex: 'equipment_code', key: 'equipment_code' },
    { title: 'Tên phòng', dataIndex: 'name', key: 'name' },
    { title: 'Viết tắt', dataIndex: 'abbreviation', key: 'abbreviation' },
    { title: 'Loại phòng', dataIndex: 'equipment_type_id', key: 'equipment_type_id' },
    { title: 'Sức chứa', dataIndex: 'regular_capacity', key: 'regular_capacity' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button
            onClick={() => navigate(`/settings/equipment/equipment-infos/${record.id}`)}
            size="small"
            type="link"
          >
            View
          </Button>
          <Button
            disabled={!canEdit}
            onClick={() => navigate(`/settings/equipment/equipment-infos/${record.id}/edit`)}
            size="small"
            type="link"
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const roomTypeColumns = [
    { title: 'Tên loại phòng', dataIndex: 'name', key: 'name' },
    { title: 'Viết tắt', dataIndex: 'abbreviation', key: 'abbreviation' },
    { title: 'Mã operator', dataIndex: 'operator_code', key: 'operator_code' },
  ];

  const notReady = () => {
    notify.info('Tiện nghi chưa phát triển');
  };

  return (
    <div className={styles.workspaceSection}>
      <div className={styles.workspaceHeader}>
        <div>
          <h3 className={styles.masterDataTitle}>Equipment</h3>
          <Text className={styles.masterDataDescription}>
            Quản lý danh sách phòng, loại phòng và các phần liên quan đến phòng theo cách trực quan
            hơn.
          </Text>
        </div>
      </div>

      <Card className={styles.workspaceMainCard}>
        <div className={styles.workspaceEntryTabs}>
          <WorkspaceEntryButton
            active={subTab === 'rooms'}
            description="Danh sách phòng hiện có"
            label="Danh sách phòng"
            onClick={() => setSubTab('rooms')}
          />
          <WorkspaceEntryButton
            active={subTab === 'room-types'}
            description="Quản lý loại phòng"
            label="Loại phòng"
            onClick={() => setSubTab('room-types')}
          />
          <WorkspaceEntryButton
            active={subTab === 'amenities'}
            description="Chưa phát triển"
            label="Tiện nghi"
            onClick={() => {
              setSubTab('amenities');
              notReady();
            }}
          />
        </div>

        <div className={styles.toolbar}>
          <div className={styles.searchBlock}>
            <span className={styles.searchLabel}>
              {subTab === 'rooms' ? 'Tìm kiếm phòng' : 'Tìm kiếm loại phòng'}
            </span>
            <Input
              allowClear
              className={styles.searchInput}
              onChange={event => setSearch(event.target.value || '')}
              onPressEnter={() => {
                setSearchKeyword(search.trim());
              }}
              placeholder={
                subTab === 'rooms' ? 'Tìm theo mã phòng hoặc tên phòng' : 'Tìm theo tên loại phòng'
              }
              value={search}
            />
          </div>

          <Space>
            {subTab === 'rooms' ? (
              <div className={styles.viewSwitch}>
                <button
                  className={`${styles.viewSwitchButton} ${viewMode === 'table' ? styles.viewSwitchButtonActive : ''}`}
                  onClick={() => setViewMode('table')}
                  type="button"
                >
                  Bảng
                </button>
                <button
                  className={`${styles.viewSwitchButton} ${viewMode === 'grid' ? styles.viewSwitchButtonActive : ''}`}
                  onClick={() => setViewMode('grid')}
                  type="button"
                >
                  Lưới
                </button>
              </div>
            ) : null}

            {subTab === 'rooms' ? (
              <Button
                disabled={!canEdit}
                onClick={() => navigate('/settings/equipment/equipment-infos/create')}
                type="primary"
              >
                Thêm phòng
              </Button>
            ) : null}
          </Space>
        </div>

        {subTab === 'rooms' && viewMode === 'grid' ? (
          <div className={styles.roomGrid}>
            {rooms.map(room => (
              <div key={room.id} className={styles.roomGridCard}>
                <span className={styles.roomGridCode}>{room.equipment_code || 'No code'}</span>
                <strong className={styles.roomGridName}>{room.name || 'Unnamed room'}</strong>
                <span className={styles.roomGridMeta}>Sức chứa: {room.regular_capacity || 0}</span>
                <div className={styles.roomGridActions}>
                  <Button
                    onClick={() => navigate(`/settings/equipment/equipment-infos/${room.id}`)}
                    size="small"
                  >
                    View
                  </Button>
                  <Button
                    disabled={!canEdit}
                    onClick={() => navigate(`/settings/equipment/equipment-infos/${room.id}/edit`)}
                    size="small"
                    type="primary"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : subTab === 'rooms' ? (
          <Table
            className={styles.masterDataTable}
            columns={roomColumns as any}
            dataSource={rooms}
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowKey={record => String(record.id)}
          />
        ) : subTab === 'room-types' ? (
          <Table
            className={styles.masterDataTable}
            columns={roomTypeColumns as any}
            dataSource={roomTypes}
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowKey={record => String(record.id)}
          />
        ) : (
          <div className={styles.notReadyPanel}>
            <strong>Tính năng chưa phát triển</strong>
            <Text className={styles.masterDataTopbarText}>
              Mục tiện nghi hiện mới để placeholder theo yêu cầu.
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}

function FacilityWorkspace({ base, canEdit, scopeParams }: EquipmentScreenProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [facilities, setFacilities] = useState<any[]>([]);

  const loadFacilities = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getAPI(`${base}/facility-infos`, 'pms', {
        ...scopeParams,
        per_page: 200,
        search: searchKeyword,
      });

      setFacilities(extractList(response.data));
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load facility data');
    } finally {
      setLoading(false);
    }
  }, [base, scopeParams, searchKeyword]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadFacilities();
  }, [loadFacilities, scopeParams]);

  const facilityColumns = [
    { title: 'Mã cơ sở', dataIndex: 'facility_code', key: 'facility_code' },
    { title: 'Tên cơ sở', dataIndex: 'name', key: 'name' },
    { title: 'Viết tắt', dataIndex: 'abbreviation', key: 'abbreviation' },
    { title: 'Điện thoại', dataIndex: 'telephone_number', key: 'telephone_number' },
    { title: 'Email', dataIndex: 'email_address', key: 'email_address' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space className={styles.iconActionGroup}>
          <button
            className={styles.iconActionButton}
            onClick={() => navigate(`/settings/equipment/facility-infos/${record.id}`)}
            title="Xem"
            type="button"
          >
            <span aria-hidden="true">◉</span>
          </button>
          <button
            className={styles.iconActionButton}
            disabled={!canEdit}
            onClick={() => navigate(`/settings/equipment/facility-infos/${record.id}/edit`)}
            title="Sửa"
            type="button"
          >
            <span aria-hidden="true">✎</span>
          </button>
        </Space>
      ),
    },
  ];

  const notReady = (label: string) => {
    notify.info(`${label} chưa phát triển`);
  };

  return (
    <div className={styles.workspaceSection}>
      <div className={styles.workspaceHeader}>
        <div>
          <h3 className={styles.masterDataTitle}>Facility</h3>
          <Text className={styles.masterDataDescription}>
            Quản lý cơ sở hiện có và xem cấu trúc cơ sở, tòa nhà, khu vực theo một cách dễ nhìn hơn.
          </Text>
        </div>
      </div>

      <div className={styles.facilityWorkspaceLayout}>
        <Card className={styles.workspaceMainCard}>
          <div className={styles.toolbar}>
            <div className={styles.searchBlock}>
              <span className={styles.searchLabel}>Tìm kiếm cơ sở</span>
              <Input
                allowClear
                className={styles.searchInput}
                onChange={event => setSearch(event.target.value || '')}
                onPressEnter={() => setSearchKeyword(search.trim())}
                placeholder="Tìm theo mã cơ sở hoặc tên cơ sở"
                value={search}
              />
            </div>
            <Button
              disabled={!canEdit}
              onClick={() => navigate('/settings/equipment/facility-infos/create')}
              type="primary"
            >
              Thêm cơ sở
            </Button>
          </div>

          <Table
            className={styles.masterDataTable}
            columns={facilityColumns as any}
            dataSource={facilities}
            loading={loading}
            pagination={{ pageSize: 10 }}
            rowKey={record => String(record.id)}
          />
        </Card>

        <Card className={styles.workspaceSideCard} title="Cây cơ sở">
          <div className={styles.treePanel}>
            <button
              className={styles.treePanelNode}
              onClick={() => navigate('/settings/equipment/facility-infos')}
              type="button"
            >
              <span className={styles.treePanelNodeTitle}>Các cơ sở khác của khách sạn</span>
              <span className={styles.treePanelNodeMeta}>Hiển thị danh sách cơ sở hiện có</span>
            </button>

            <button
              className={`${styles.treePanelNode} ${styles.treePanelNodeMuted}`}
              onClick={() => notReady('Tòa nhà')}
              type="button"
            >
              <span className={styles.treePanelNodeTitle}>Tòa nhà</span>
              <span className={styles.treePanelNodeMeta}>Chưa phát triển</span>
            </button>

            <button
              className={`${styles.treePanelNode} ${styles.treePanelNodeMuted}`}
              onClick={() => notReady('Khu vực')}
              type="button"
            >
              <span className={styles.treePanelNodeTitle}>Khu vực</span>
              <span className={styles.treePanelNodeMeta}>Chưa phát triển</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function WorkspaceEntryButton({
  active,
  description,
  label,
  onClick,
}: {
  active: boolean;
  description: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`${styles.workspaceEntryButton} ${active ? styles.workspaceEntryButtonActive : ''}`}
      onClick={onClick}
      type="button"
    >
      <span className={styles.workspaceEntryLabel}>{label}</span>
      <span className={styles.workspaceEntryDescription}>{description}</span>
    </button>
  );
}

export default EquipmentMasterData;
