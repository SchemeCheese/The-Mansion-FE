import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Checkbox, Form, Input, Modal, Space, Table, Tabs } from 'ui/antd';
import { getAPI, postAPI, putAPI } from 'helpers/apiService';
import { apiEndPoint, headerWithAuthorization } from 'helpers';

import { notify } from 'ui/notification';

import styles from './settings.module.css';

const { TextArea } = Input;

type MasterDataEntity = {
  group: MasterDataGroupKey;
  key: string;
  label: string;
};

type MasterDataField = {
  name: string;
  nullable?: boolean;
  read_only?: boolean;
  required?: boolean;
  type?: string;
};

type MasterDataGroupKey = 'financial' | 'branchFacility' | 'equipment' | 'facilityExtended';

type MasterDataSettingsProps = {
  base: string;
  canEdit: boolean;
  extractList: (payload: any) => any[];
  scopeParams: Record<string, any>;
};

const ENTITY_GROUPS: { key: MasterDataGroupKey; label: string }[] = [
  { key: 'financial', label: 'Financial' },
  { key: 'branchFacility', label: 'Branch & Facility' },
  { key: 'equipment', label: 'Equipment' },
  { key: 'facilityExtended', label: 'Facility Extended' },
];

const ENTITIES: MasterDataEntity[] = [
  { key: 'bank-infos', label: 'Bank Info', group: 'financial' },
  { key: 'bank-account-infos', label: 'Bank Account', group: 'financial' },

  { key: 'branch-infos', label: 'Branch Info', group: 'branchFacility' },
  { key: 'facility-infos', label: 'Facility Info', group: 'branchFacility' },
  { key: 'facility-categories', label: 'Facility Category', group: 'branchFacility' },
  { key: 'facility-map-infos', label: 'Facility Map', group: 'branchFacility' },

  { key: 'equipment-infos', label: 'Equipment Info', group: 'equipment' },
  { key: 'equipment-types', label: 'Equipment Type', group: 'equipment' },
  { key: 'equipment-states', label: 'Equipment State', group: 'equipment' },
  { key: 'equipment-type-channels', label: 'Equipment Type Channel', group: 'equipment' },
  { key: 'equipment-amenities', label: 'Equipment Amenity', group: 'equipment' },
  { key: 'equipment-areas', label: 'Equipment Area', group: 'equipment' },
  { key: 'equipment-area-categories', label: 'Equipment Area Category', group: 'equipment' },
  { key: 'equipment-area-details', label: 'Equipment Area Detail', group: 'equipment' },
  { key: 'equipment-cancellations', label: 'Equipment Cancellation', group: 'equipment' },
  { key: 'equipment-charges', label: 'Equipment Charge', group: 'equipment' },
  { key: 'equipment-charge-details', label: 'Equipment Charge Detail', group: 'equipment' },
  { key: 'equipment-image-infos', label: 'Equipment Image', group: 'equipment' },

  { key: 'facility-area-amenities', label: 'Facility Area Amenity', group: 'facilityExtended' },
  { key: 'facility-area-image-infos', label: 'Facility Area Image', group: 'facilityExtended' },
  { key: 'facility-building-infos', label: 'Facility Building', group: 'facilityExtended' },
];

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

function MasterDataSettings({ base, canEdit, extractList, scopeParams }: MasterDataSettingsProps) {
  const groupedEntities = useMemo(
    () =>
      ENTITY_GROUPS.reduce(
        (acc, group) => ({
          ...acc,
          [group.key]: ENTITIES.filter(entity => entity.group === group.key),
        }),
        {} as Record<MasterDataGroupKey, MasterDataEntity[]>,
      ),
    [],
  );

  const [activeGroup, setActiveGroup] = useState<MasterDataGroupKey>('financial');
  const [activeEntity, setActiveEntity] = useState(ENTITIES[0].key);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const [rowsByEntity, setRowsByEntity] = useState<Record<string, any[]>>({});
  const [fieldsByEntity, setFieldsByEntity] = useState<Record<string, MasterDataField[]>>({});
  const [warningsByEntity, setWarningsByEntity] = useState<Record<string, string>>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);

  const [form] = Form.useForm();

  const getEntityLabel = useCallback((entityKey: string): string => {
    return ENTITIES.find(entity => entity.key === entityKey)?.label || entityKey;
  }, []);

  const loadSchema = useCallback(
    async (entityKey: string) => {
      const response = await getAPI(`${base}/${entityKey}/schema`, 'pms', scopeParams);
      const payload = response.data ?? {};
      const fields = payload?.data?.fields || payload?.fields || [];
      const warning = payload?.warning?.message;

      setFieldsByEntity(previous => ({
        ...previous,
        [entityKey]: Array.isArray(fields) ? fields : [],
      }));

      if (warning) {
        setWarningsByEntity(previous => ({ ...previous, [entityKey]: warning }));
      } else {
        setWarningsByEntity(previous => ({ ...previous, [entityKey]: '' }));
      }
    },
    [base, scopeParams],
  );

  const loadRows = useCallback(
    async (entityKey: string) => {
      const response = await getAPI(`${base}/${entityKey}`, 'pms', {
        ...scopeParams,
        per_page: 200,
        search,
      });

      const payload = response.data ?? {};
      const warning = payload?.warning?.message;

      setRowsByEntity(previous => ({ ...previous, [entityKey]: extractList(payload) }));

      if (warning) {
        setWarningsByEntity(previous => ({ ...previous, [entityKey]: warning }));
      } else if (!warningsByEntity[entityKey]) {
        setWarningsByEntity(previous => ({ ...previous, [entityKey]: '' }));
      }
    },
    [base, extractList, scopeParams, search, warningsByEntity],
  );

  const loadEntityData = useCallback(
    async (entityKey: string) => {
      setLoading(true);

      try {
        if (!fieldsByEntity[entityKey]) {
          await loadSchema(entityKey);
        }

        await loadRows(entityKey);
      } catch (error: any) {
        notify.error(
          error?.response?.data?.message ||
            error?.message ||
            `Cannot load ${getEntityLabel(entityKey)} data`,
        );
      } finally {
        setLoading(false);
      }
    },
    [fieldsByEntity, getEntityLabel, loadRows, loadSchema],
  );

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    loadEntityData(activeEntity);
  }, [activeEntity, loadEntityData, scopeParams]);

  const editableFields = useMemo(() => {
    const fields = fieldsByEntity[activeEntity] || [];

    return fields.filter(field => !field.read_only && !SYSTEM_FIELDS.includes(field.name));
  }, [activeEntity, fieldsByEntity]);

  const visibleColumns = useMemo(() => {
    const currentFields = fieldsByEntity[activeEntity] || [];
    const currentRows = rowsByEntity[activeEntity] || [];

    let columnNames = currentFields
      .map(field => field.name)
      .filter(name => !['deleted_at', 'deleted_date'].includes(name));

    if (columnNames.length === 0 && currentRows.length > 0) {
      columnNames = Object.keys(currentRows[0]);
    }

    if (columnNames.length === 0) {
      return [];
    }

    const preferredOrder = [
      'id',
      'name',
      'code',
      'abbreviation',
      'operator_code',
      'branch_code',
      'facility_code',
    ];
    const sortedColumnNames = [...columnNames].sort((left, right) => {
      const leftPriority = preferredOrder.indexOf(left);
      const rightPriority = preferredOrder.indexOf(right);

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

    return sortedColumnNames.slice(0, 10).map(columnName => {
      const field = currentFields.find(currentField => currentField.name === columnName);

      return {
        title: columnName,
        dataIndex: columnName,
        key: columnName,
        render: (value: any) => {
          if (field && isBooleanField(field)) {
            return value ? 'Yes' : 'No';
          }

          return value === null || value === undefined ? '' : String(value);
        },
      };
    });
  }, [activeEntity, fieldsByEntity, rowsByEntity]);

  const openCreate = async () => {
    setEditingRecord(null);
    form.resetFields();

    if (!fieldsByEntity[activeEntity]) {
      await loadSchema(activeEntity);
    }

    const defaultValues: Record<string, any> = {};

    editableFields.forEach(field => {
      if (isBooleanField(field)) {
        defaultValues[field.name] = false;
      }
    });

    form.setFieldsValue(defaultValues);
    setIsModalOpen(true);
  };

  const openEdit = async (record: any) => {
    setEditingRecord(record);

    if (!fieldsByEntity[activeEntity]) {
      await loadSchema(activeEntity);
    }

    const values: Record<string, any> = { ...record };

    editableFields.forEach(field => {
      if (isBooleanField(field)) {
        values[field.name] =
          record[field.name] === true || record[field.name] === 1 || record[field.name] === '1';
      }
    });

    form.setFieldsValue(values);
    setIsModalOpen(true);
  };

  const submitEntity = async () => {
    if (!canEdit) {
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

    try {
      await (editingRecord ? putAPI(`${base}/${activeEntity}/${editingRecord.id}`, payload) : postAPI(`${base}/${activeEntity}`, payload));

      notify.success('Saved successfully');
      setIsModalOpen(false);
      loadEntityData(activeEntity);
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Save failed');
    }
  };

  const deleteEntity = async (record: any) => {
    if (!canEdit || !window.confirm('Delete this item?')) {
      return;
    }

    try {
      await axios.delete(apiEndPoint(`${base}/${activeEntity}/${record.id}`), {
        headers: headerWithAuthorization(),
        params: scopeParams,
      });
      notify.success('Deleted successfully');
      loadEntityData(activeEntity);
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const tableColumns = useMemo(() => {
    return [
      ...visibleColumns,
      {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any) => (
          <Space>
            <Button disabled={!canEdit} onClick={() => openEdit(record)} size="small" type="link">
              Edit
            </Button>
            <Button
              danger
              disabled={!canEdit}
              onClick={() => deleteEntity(record)}
              size="small"
              type="link"
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ];
  }, [canEdit, visibleColumns]);

  const renderFieldInput = (field: MasterDataField) => {
    if (isBooleanField(field)) {
      return <Checkbox />;
    }

    if (isNumericField(field)) {
      return <Input type="number" />;
    }

    if (isLongTextField(field)) {
      return <TextArea rows={3} />;
    }

    return <Input />;
  };

  const renderEntityTab = (entityKey: string) => {
    const rows = rowsByEntity[entityKey] || [];
    const warning = warningsByEntity[entityKey];

    return (
      <Card>
        {warning ? (
          <Alert className={styles.schemaWarning} message={warning} showIcon type="warning" />
        ) : null}

        <div className={styles.toolbar}>
          <Input
            allowClear
            className={styles.searchInput}
            onChange={event => setSearch(event.target.value || '')}
            onPressEnter={() => loadEntityData(entityKey)}
            placeholder="Search"
            value={search}
          />
          <Button disabled={!canEdit} onClick={openCreate} type="primary">
            Add
          </Button>
        </div>

        <Table
          columns={tableColumns}
          dataSource={rows}
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowKey="id"
          scroll={{ x: true }}
        />
      </Card>
    );
  };

  const groupItems = ENTITY_GROUPS.map(group => ({
    key: group.key,
    label: group.label,
    children: (
      <Tabs
        activeKey={activeEntity}
        items={groupedEntities[group.key].map(entity => ({
          key: entity.key,
          label: entity.label,
          children: renderEntityTab(entity.key),
        }))}
        onChange={key => {
          setSearch('');
          setActiveEntity(key);
        }}
      />
    ),
  }));

  return (
    <>
      <Tabs
        activeKey={activeGroup}
        items={groupItems}
        onChange={key => {
          const nextGroup = key as MasterDataGroupKey;
          const nextEntity = groupedEntities[nextGroup]?.[0]?.key;

          setActiveGroup(nextGroup);
          setSearch('');

          if (nextEntity) {
            setActiveEntity(nextEntity);
          }
        }}
      />

      <Modal
        okButtonProps={{ disabled: !canEdit }}
        okText="Save"
        onCancel={() => setIsModalOpen(false)}
        onOk={submitEntity}
        open={isModalOpen}
        title={
          editingRecord
            ? `Edit ${getEntityLabel(activeEntity)}`
            : `Create ${getEntityLabel(activeEntity)}`
        }
      >
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
        </Form>
      </Modal>
    </>
  );
}

export default MasterDataSettings;
