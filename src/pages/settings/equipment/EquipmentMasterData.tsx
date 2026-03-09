import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Checkbox, Form, Input, Select, Space, Spin, Table } from 'ui/antd';
import { getAPI, postAPI, putAPI } from 'helpers/apiService';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import { notify } from 'ui/notification';

import styles from '../settings.module.css';

type EquipmentEntityKey =
  | 'amenity-categories'
  | 'amenity-details'
  | 'equipment-infos'
  | 'equipment-types'
  | 'equipment-states'
  | 'equipment-amenities'
  | 'equipment-areas'
  | 'equipment-area-categories'
  | 'equipment-area-details'
  | 'facility-area-amenities'
  | 'facility-area-image-infos'
  | 'facility-building-infos'
  | 'facility-categories'
  | 'facility-infos'
  | 'facility-map-infos';

type EquipmentMasterDataProps = {
  base: string;
  canEdit: boolean;
  scopeParams: Record<string, any>;
};

type EquipmentScreenProps = {
  base: string;
  canEdit: boolean;
  scopeParams: Record<string, any>;
};

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

const EQUIPMENT_ENTITIES: {
  key: EquipmentEntityKey;
  label: string;
  preferredColumns: string[];
}[] = [
  {
    key: 'amenity-categories',
    label: 'Amenity Category',
    preferredColumns: [
      'id',
      'name',
      'abbreviation',
      'upper_amenity_category_id',
      'display_order',
      'status',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'amenity-details',
    label: 'Amenity Detail',
    preferredColumns: [
      'id',
      'amenity_category_id',
      'name',
      'display_order',
      'status',
      'icon_url',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'equipment-infos',
    label: 'Equipment Info',
    preferredColumns: [
      'id',
      'equipment_code',
      'name',
      'equipment_type_id',
      'regular_capacity',
      'extra_capacity',
      'sale_enable',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'equipment-types',
    label: 'Equipment Type',
    preferredColumns: [
      'id',
      'name',
      'abbreviation',
      'operator_code',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'equipment-states',
    label: 'Equipment State',
    preferredColumns: [
      'id',
      'equipment_info_id',
      'sale_enable',
      'clean_state',
      'occupied_state',
      'operator_code',
    ],
  },
  {
    key: 'equipment-amenities',
    label: 'Equipment Amenity',
    preferredColumns: [
      'id',
      'equipment_info_id',
      'amenity_detail_id',
      'equipment_area_detail_id',
      'quantity',
      'operator_code',
    ],
  },
  {
    key: 'equipment-areas',
    label: 'Equipment Area',
    preferredColumns: [
      'id',
      'equipment_info_id',
      'equipment_area_detail_id',
      'quantity',
      'operator_code',
    ],
  },
  {
    key: 'equipment-area-categories',
    label: 'Equipment Area Category',
    preferredColumns: [
      'id',
      'equipment_area_type',
      'area_code',
      'area_name',
      'abbreviation',
      'operator_code',
    ],
  },
  {
    key: 'equipment-area-details',
    label: 'Equipment Area Detail',
    preferredColumns: [
      'id',
      'equipment_area_category_id',
      'name',
      'display_order',
      'status',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'facility-area-amenities',
    label: 'Facility Area Amenity',
    preferredColumns: [
      'id',
      'facility_area_info_id',
      'amenity_detail_id',
      'quantity',
      'operator_code',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'facility-area-image-infos',
    label: 'Facility Area Image',
    preferredColumns: [
      'id',
      'facility_area_info_id',
      'url_image',
      'is_base',
      'display_order',
      'branch_code',
      'facility_code',
    ],
  },
  {
    key: 'facility-building-infos',
    label: 'Facility Building',
    preferredColumns: [
      'id',
      'building_name',
      'abbreviation',
      'facility_info_id',
      'branch_info_id',
      'building_floor_number',
      'building_year_build',
      'building_size',
      'operator_code',
    ],
  },
  {
    key: 'facility-categories',
    label: 'Facility Category',
    preferredColumns: [
      'id',
      'name',
      'abbreviation',
      'upper_facility_category_id',
      'facility_kind',
      'display_order',
      'status',
      'branch_code',
    ],
  },
  {
    key: 'facility-infos',
    label: 'Facility Info',
    preferredColumns: [
      'id',
      'facility_code',
      'name',
      'abbreviation',
      'facility_category_id',
      'telephone_number',
      'email_address',
      'branch_code',
    ],
  },
  {
    key: 'facility-map-infos',
    label: 'Facility Map',
    preferredColumns: [
      'id',
      'facility_code',
      'lat',
      'lng',
      'place_id',
      'operator_code',
      'branch_code',
    ],
  },
];

const resolveEntityKey = (value?: string): EquipmentEntityKey | null => {
  if (!value) {
    return null;
  }

  const entity = EQUIPMENT_ENTITIES.find(item => item.key === value);

  return entity?.key ?? null;
};

const getEntityConfig = (value?: string) => {
  const entityKey = resolveEntityKey(value);

  if (!entityKey) {
    return null;
  }

  return EQUIPMENT_ENTITIES.find(entity => entity.key === entityKey) ?? null;
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

  const entityConfig = useMemo(() => getEntityConfig(params.entity), [params.entity]);

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState<MasterDataField[]>([]);
  const [record, setRecord] = useState<Record<string, any> | null>(null);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (!entityConfig) {
      navigate(`/settings/equipment/${EQUIPMENT_ENTITIES[0].key}`, { replace: true });
    }
  }, [entityConfig, navigate]);

  const loadDetail = useCallback(async () => {
    if (!entityConfig || !id) {
      return;
    }

    setLoading(true);

    try {
      const [schemaResponse, detailResponse] = await Promise.all([
        getAPI(`${base}/${entityConfig.key}/schema`, 'pms', scopeParams),
        getAPI(`${base}/${entityConfig.key}/${id}`, 'pms', scopeParams),
      ]);

      const schemaPayload = schemaResponse.data ?? {};
      const detailPayload = detailResponse.data ?? {};

      setFields(schemaPayload?.data?.fields ?? []);
      setRecord(detailPayload?.data ?? null);
      setWarning(schemaPayload?.warning?.message || detailPayload?.warning?.message || '');
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load detail data');

      if (entityConfig) {
        navigate(`/settings/equipment/${entityConfig.key}`);
      }
    } finally {
      setLoading(false);
    }
  }, [base, entityConfig, id, navigate, scopeParams]);

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
          <Button onClick={() => navigate(`/settings/equipment/${entityConfig.key}`)}>
            Back to list
          </Button>
          <Button
            disabled={!canEdit}
            onClick={() => navigate(`/settings/equipment/${entityConfig.key}/${id}/edit`)}
            type="primary"
          >
            Edit
          </Button>
        </Space>
      }
      title={`${entityConfig.label} Detail #${id}`}
    >
      {warning ? (
        <Alert className={styles.schemaWarning} message={warning} showIcon type="warning" />
      ) : null}

      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={[
            {
              title: 'Field',
              dataIndex: 'field',
              key: 'field',
              width: '30%',
            },
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

  const entityConfig = useMemo(() => getEntityConfig(params.entity), [params.entity]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fields, setFields] = useState<MasterDataField[]>([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (!entityConfig) {
      navigate(`/settings/equipment/${EQUIPMENT_ENTITIES[0].key}`, { replace: true });
    }
  }, [entityConfig, navigate]);

  const editableFields = useMemo(() => {
    return fields.filter(field => {
      const isSystemField = SYSTEM_FIELDS.includes(field.name);
      const isScopeField = FORM_EXCLUDED_FIELDS.includes(field.name);

      return !field.read_only && !isSystemField && !isScopeField;
    });
  }, [fields]);

  const loadFormData = useCallback(async () => {
    if (!entityConfig) {
      return;
    }

    setLoading(true);

    try {
      const schemaResponse = await getAPI(`${base}/${entityConfig.key}/schema`, 'pms', scopeParams);
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
        const detailResponse = await getAPI(
          `${base}/${entityConfig.key}/${id}`,
          'pms',
          scopeParams,
        );
        const detailPayload = detailResponse.data ?? {};
        const detailRecord = detailPayload?.data ?? {};

        const values: Record<string, any> = {
          ...defaultValues,
          ...detailRecord,
        };

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
      navigate(`/settings/equipment/${entityConfig.key}`);
    } finally {
      setLoading(false);
    }
  }, [base, entityConfig, form, id, mode, navigate, scopeParams]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadFormData();
  }, [loadFormData, scopeParams]);

  const submitForm = async () => {
    if (!canEdit || !entityConfig) {
      return;
    }

    const values = await form.validateFields();
    const payload: Record<string, any> = {
      ...scopeParams,
      ...values,
    };

    editableFields.forEach(field => {
      if (isBooleanField(field) && Object.prototype.hasOwnProperty.call(payload, field.name)) {
        payload[field.name] = payload[field.name] ? 1 : 0;
      }
    });

    setSaving(true);

    try {
      if (mode === 'edit' && id) {
        await putAPI(`${base}/${entityConfig.key}/${id}`, payload);
        notify.success('Updated successfully');
        navigate(`/settings/equipment/${entityConfig.key}/${id}`);
      } else {
        const response = await postAPI(`${base}/${entityConfig.key}`, payload);
        const createdId = response?.data?.data?.id;

        notify.success('Created successfully');

        if (createdId) {
          navigate(`/settings/equipment/${entityConfig.key}/${createdId}`);
        } else {
          navigate(`/settings/equipment/${entityConfig.key}`);
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
      extra={
        <Button onClick={() => navigate(`/settings/equipment/${entityConfig.key}`)}>
          Back to list
        </Button>
      }
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
            <Button onClick={() => navigate(`/settings/equipment/${entityConfig.key}`)}>
              Cancel
            </Button>
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

function EquipmentListScreen({ base, canEdit, scopeParams }: EquipmentScreenProps) {
  const navigate = useNavigate();
  const params = useParams();

  const entityConfig = useMemo(() => getEntityConfig(params.entity), [params.entity]);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [fields, setFields] = useState<MasterDataField[]>([]);
  const [warning, setWarning] = useState('');

  useEffect(() => {
    if (!entityConfig) {
      navigate(`/settings/equipment/${EQUIPMENT_ENTITIES[0].key}`, { replace: true });
    }
  }, [entityConfig, navigate]);

  useEffect(() => {
    setSearchInput('');
    setSearchKeyword('');
    setPage(1);
    setPerPage(20);
    setRows([]);
    setFields([]);
    setWarning('');
  }, [entityConfig?.key]);

  const loadData = useCallback(async () => {
    if (!entityConfig) {
      return;
    }

    setLoading(true);

    try {
      const [schemaResponse, listResponse] = await Promise.all([
        getAPI(`${base}/${entityConfig.key}/schema`, 'pms', scopeParams),
        getAPI(`${base}/${entityConfig.key}`, 'pms', {
          ...scopeParams,
          page,
          per_page: perPage,
          search: searchKeyword,
        }),
      ]);

      const schemaPayload = schemaResponse.data ?? {};
      const listPayload = listResponse.data ?? {};

      setFields(schemaPayload?.data?.fields ?? []);
      setRows(extractList(listPayload));
      const meta = extractMeta(listPayload);

      setTotal(Number(meta.total ?? 0));
      setPage(Number(meta.current_page ?? page));
      setPerPage(Number(meta.per_page ?? perPage));

      const warningMessage = schemaPayload?.warning?.message || listPayload?.warning?.message || '';

      setWarning(warningMessage);
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot load equipment data');
    } finally {
      setLoading(false);
    }
  }, [base, entityConfig, page, perPage, scopeParams, searchKeyword]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadData();
  }, [loadData, scopeParams]);

  const tableColumns = useMemo(() => {
    if (!entityConfig) {
      return [];
    }

    const fieldNames = fields
      .map(field => field.name)
      .filter(name => !['deleted_at', 'deleted_date'].includes(name));

    const namesFromRows = rows.length > 0 ? Object.keys(rows[0]) : [];
    const allNames = fieldNames.length > 0 ? fieldNames : namesFromRows;

    const sortedNames = [...allNames].sort((left, right) => {
      const leftPriority = entityConfig.preferredColumns.indexOf(left);
      const rightPriority = entityConfig.preferredColumns.indexOf(right);

      if (leftPriority === -1 && rightPriority === -1) {
        return left.localeCompare(right);
      }

      if (leftPriority === -1) {
        return 1;
      }

      if (rightPriority === -1) {
        return -1;
      }

      return leftPriority - rightPriority;
    });

    const visibleNames = sortedNames.slice(0, 10);

    const dataColumns = visibleNames.map(name => {
      const field = fields.find(item => item.name === name);

      return {
        title: name,
        dataIndex: name,
        key: name,
        render: (value: any) => {
          if (field && isBooleanField(field)) {
            return value ? 'Yes' : 'No';
          }

          return valueAsText(value);
        },
      };
    });

    return [
      ...dataColumns,
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any) => {
          return (
            <Space>
              <Button
                onClick={() => navigate(`/settings/equipment/${entityConfig.key}/${record.id}`)}
                size="small"
                type="link"
              >
                Detail
              </Button>
              <Button
                disabled={!canEdit}
                onClick={() =>
                  navigate(`/settings/equipment/${entityConfig.key}/${record.id}/edit`)
                }
                size="small"
                type="link"
              >
                Update
              </Button>
            </Space>
          );
        },
      },
    ];
  }, [canEdit, entityConfig, fields, navigate, rows]);

  if (!entityConfig) {
    return null;
  }

  return (
    <Card title={entityConfig.label}>
      {warning ? (
        <Alert className={styles.schemaWarning} message={warning} showIcon type="warning" />
      ) : null}

      <div className={styles.toolbar}>
        <Input
          allowClear
          className={styles.searchInput}
          onChange={event => setSearchInput(event.target.value || '')}
          onPressEnter={() => {
            setPage(1);
            setSearchKeyword(searchInput.trim());
          }}
          placeholder="Search"
          value={searchInput}
        />
        <Space>
          <Button
            onClick={() => {
              setPage(1);
              setSearchKeyword(searchInput.trim());
            }}
          >
            Search
          </Button>
          <Button
            disabled={!canEdit}
            onClick={() => navigate(`/settings/equipment/${entityConfig.key}/create`)}
            type="primary"
          >
            Create
          </Button>
        </Space>
      </div>

      <Table
        columns={tableColumns as any}
        dataSource={rows}
        loading={loading}
        onChange={pagination => {
          const nextPage = pagination.current || 1;
          const nextPerPage = pagination.pageSize || perPage;

          if (nextPage !== page) {
            setPage(nextPage);
          }

          if (nextPerPage !== perPage) {
            setPerPage(nextPerPage);
            setPage(1);
          }
        }}
        pagination={{
          current: page,
          pageSize: perPage,
          showSizeChanger: true,
          total,
        }}
        rowKey={record => String(record.id)}
        scroll={{ x: true }}
      />
    </Card>
  );
}

function EquipmentMasterData({ base, canEdit, scopeParams }: EquipmentMasterDataProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeEntityKey = useMemo(() => {
    const pathParts = location.pathname.split('/');
    const entityFromPath = pathParts.length >= 4 ? pathParts[3] : undefined;

    return resolveEntityKey(entityFromPath) ?? EQUIPMENT_ENTITIES[0].key;
  }, [location.pathname]);

  return (
    <>
      <Card>
        <div className={styles.toolbar}>
          <Select
            className={styles.equipmentEntitySelect}
            onChange={value => {
              navigate(`/settings/equipment/${value}`);
            }}
            options={EQUIPMENT_ENTITIES.map(entity => ({
              value: entity.key,
              label: entity.label,
            }))}
            value={activeEntityKey}
          />
        </div>
      </Card>

      <div className={styles.equipmentRouteContainer}>
        <Routes>
          <Route
            element={
              <EquipmentListScreen base={base} canEdit={canEdit} scopeParams={scopeParams} />
            }
            path="equipment/:entity"
          />
          <Route
            element={
              <EquipmentDetailScreen base={base} canEdit={canEdit} scopeParams={scopeParams} />
            }
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
          <Route
            element={<Navigate replace to={`equipment/${EQUIPMENT_ENTITIES[0].key}`} />}
            path="*"
          />
        </Routes>
      </div>
    </>
  );
}

export default EquipmentMasterData;
