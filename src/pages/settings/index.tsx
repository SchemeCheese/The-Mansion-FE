import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Button, Card, Checkbox, Form, Input, Modal, Select, Space, Table, Tabs } from 'ui/antd';
import { getAPI, postAPI, putAPI } from 'helpers/apiService';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { useTranslation } from 'react-i18next';
import { selectBranchInfo, selectUser } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { notify } from 'ui/notification';

import MasterDataSettings from './MasterDataSettings';
import styles from './settings.module.css';

const BASE = 'api/v1/settings';

type EntityType = 'agent' | 'credit' | 'currency' | 'conversion';

const AGENT_KIND_OPTIONS = [
  { value: 0, label: 'Individual' },
  { value: 1, label: 'Travel Agent' },
  { value: 2, label: 'OTA' },
];

const getAgentKindLabel = (value: unknown): string => {
  const normalizedValue = Number(value);
  const match = AGENT_KIND_OPTIONS.find(option => option.value === normalizedValue);

  if (match) {
    return match.label;
  }

  return value === null || value === undefined ? '' : String(value);
};

function SettingsPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('agent');

  const [agents, setAgents] = useState<any[]>([]);
  const [credits, setCredits] = useState<any[]>([]);
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [conversions, setConversions] = useState<any[]>([]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editingType, setEditingType] = useState<EntityType>('agent');

  const [integrationForm] = Form.useForm();
  const [entityForm] = Form.useForm();

  const branchInfo = useAppSelector(selectBranchInfo) as any;
  const user = useAppSelector(selectUser) as any;

  const canEdit = (user.permission?.settings?.edit ?? user.permission?.setup?.edit) === true;

  const scopeParams = useMemo(
    () => ({
      operator_code: branchInfo.operator_code,
      branch_code: branchInfo.branch_code,
      facility_code: branchInfo.facility_code,
    }),
    [branchInfo.facility_code, branchInfo.branch_code, branchInfo.operator_code],
  );

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

  const fetchAgents = useCallback(async () => {
    const response = await getAPI(`${BASE}/agent-infos`, 'pms', {
      ...scopeParams,
      per_page: 200,
      search,
    });

    setAgents(extractList(response.data));
  }, [scopeParams, search]);

  const fetchCredits = useCallback(async () => {
    const response = await getAPI(`${BASE}/creditcard-companies`, 'pms', {
      ...scopeParams,
      search,
    });

    setCredits(extractList(response.data));
  }, [scopeParams, search]);

  const fetchCurrencies = useCallback(async () => {
    const response = await getAPI(`${BASE}/currencies`, 'pms', {
      ...scopeParams,
      per_page: 200,
      search,
    });

    setCurrencies(extractList(response.data));
  }, [scopeParams, search]);

  const fetchConversions = useCallback(async () => {
    const response = await getAPI(`${BASE}/currency-conversions`, 'pms', {
      ...scopeParams,
      per_page: 200,
      search,
    });

    setConversions(extractList(response.data));
  }, [scopeParams, search]);

  const fetchIntegration = useCallback(async () => {
    const response = await getAPI(`${BASE}/integrations`, 'pms', scopeParams);
    const data = response.data?.data ?? {};

    integrationForm.setFieldsValue({
      hanet_sync_enabled: Boolean(data.hanet_sync_enabled),
      hanet_place_id: data.hanet_place_id,
      vnpay_qr_enabled: Boolean(data.vnpay_qr_enabled),
      vnpay_merchant_label: data.vnpay_merchant_label,
      vnpay_terminal_label: data.vnpay_terminal_label,
    });
  }, [integrationForm, scopeParams]);

  const fetchTabData = useCallback(async () => {
    setLoading(true);

    try {
      switch (activeTab) {
      case 'agent': {
        await fetchAgents();
      
      break;
      }
      case 'credit': {
        await fetchCredits();
      
      break;
      }
      case 'currency': {
        await fetchCurrencies();
      
      break;
      }
      case 'conversion': {
        await fetchConversions();
      
      break;
      }
      case 'integration': {
        await fetchIntegration();
      
      break;
      }
      // No default
      }
    } catch (error: any) {
      notify.error(error?.message || 'Cannot load settings data');
    } finally {
      setLoading(false);
    }
  }, [activeTab, fetchAgents, fetchConversions, fetchCredits, fetchCurrencies, fetchIntegration]);

  useEffect(() => {
    if (!scopeParams.operator_code || !scopeParams.branch_code || !scopeParams.facility_code) {
      return;
    }

    fetchTabData();
  }, [fetchTabData, scopeParams]);

  const openCreate = (type: EntityType) => {
    setEditingType(type);
    setEditingRecord(null);
    entityForm.resetFields();

    if (type === 'agent') {
      entityForm.setFieldsValue({ agent_kind: 1, is_active: true });
    }

    if (type === 'currency') {
      entityForm.setFieldsValue({ decimal_places: 2, is_active: true, is_base_currency: false });
    }

    if (type === 'conversion') {
      entityForm.setFieldsValue({ is_active: true });
    }

    setIsModalOpen(true);
  };

  const openEdit = (type: EntityType, record: any) => {
    setEditingType(type);
    setEditingRecord(record);

    entityForm.setFieldsValue({
      ...record,
      is_active: record.is_active === true || record.is_active === 1,
      is_base_currency: record.is_base_currency === true || record.is_base_currency === 1,
    });

    setIsModalOpen(true);
  };

  const deleteRecord = async (type: EntityType, record: any) => {
    if (!canEdit || !window.confirm('Delete this item?')) {
      return;
    }

    const paths: Record<EntityType, string> = {
      agent: `${BASE}/agent-infos/${record.id}`,
      credit: `${BASE}/creditcard-companies/${record.id}`,
      currency: `${BASE}/currencies/${record.id}`,
      conversion: `${BASE}/currency-conversions/${record.id}`,
    };

    try {
      await axios.delete(apiEndPoint(paths[type]), {
        headers: headerWithAuthorization(),
        params: scopeParams,
      });
      notify.success('Deleted successfully');
      fetchTabData();
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Delete failed');
    }
  };

  const submitEntity = async () => {
    const values = await entityForm.validateFields();

    const payload = {
      ...scopeParams,
      ...values,
      is_active: values.is_active ? 1 : 0,
      is_base_currency: values.is_base_currency ? 1 : 0,
    };

    try {
      switch (editingType) {
      case 'agent': {
        await (editingRecord ? putAPI(`${BASE}/agent-infos/${editingRecord.id}`, payload) : postAPI(`${BASE}/agent-infos`, payload));
      
      break;
      }
      case 'credit': {
        await (editingRecord ? putAPI(`${BASE}/creditcard-companies/${editingRecord.id}`, payload) : postAPI(`${BASE}/creditcard-companies`, payload));
      
      break;
      }
      case 'currency': {
        await (editingRecord ? putAPI(`${BASE}/currencies/${editingRecord.id}`, payload) : postAPI(`${BASE}/currencies`, payload));
      
      break;
      }

      default: await (editingRecord ? putAPI(`${BASE}/currency-conversions/${editingRecord.id}`, payload) : postAPI(`${BASE}/currency-conversions`, payload));
      }

      notify.success('Saved successfully');
      setIsModalOpen(false);
      fetchTabData();
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Save failed');
    }
  };

  const saveIntegrations = async () => {
    if (!canEdit) {
      return;
    }

    const values = await integrationForm.validateFields();

    try {
      await putAPI(`${BASE}/integrations`, {
        ...scopeParams,
        ...values,
        hanet_sync_enabled: Boolean(values.hanet_sync_enabled),
        vnpay_qr_enabled: Boolean(values.vnpay_qr_enabled),
      });

      notify.success('Settings saved successfully');
      fetchIntegration();
    } catch (error: any) {
      notify.error(error?.response?.data?.message || 'Cannot save integration settings');
    }
  };

  const commonColumns = (type: EntityType) => [
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button
            disabled={!canEdit}
            onClick={() => openEdit(type, record)}
            size="small"
            type="link"
          >
            Edit
          </Button>
          <Button
            danger
            disabled={!canEdit}
            onClick={() => deleteRecord(type, record)}
            size="small"
            type="link"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const agentColumns = [
    { title: 'Code', dataIndex: 'agent_code', key: 'agent_code' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Kind',
      dataIndex: 'agent_kind',
      key: 'agent_kind',
      render: (value: any) => getAgentKindLabel(value),
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: any) => (value ? 'Yes' : 'No'),
    },
    ...commonColumns('agent'),
  ];

  const creditColumns = [
    { title: 'Code', dataIndex: 'company_code', key: 'company_code' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Rate (%)', dataIndex: 'rate', key: 'rate' },
    ...commonColumns('credit'),
  ];

  const currencyColumns = [
    { title: 'Code', dataIndex: 'code', key: 'code' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Symbol', dataIndex: 'symbol', key: 'symbol' },
    { title: 'Exchange Rate', dataIndex: 'exchange_rate', key: 'exchange_rate' },
    {
      title: 'Base',
      dataIndex: 'is_base_currency',
      key: 'is_base_currency',
      render: (value: any) => (value ? 'Yes' : 'No'),
    },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: any) => (value ? 'Yes' : 'No'),
    },
    ...commonColumns('currency'),
  ];

  const conversionColumns = [
    { title: 'From', dataIndex: 'from_currency_code', key: 'from_currency_code' },
    { title: 'To', dataIndex: 'to_currency_code', key: 'to_currency_code' },
    { title: 'Rate', dataIndex: 'exchange_rate', key: 'exchange_rate' },
    { title: 'Effective Date', dataIndex: 'effective_date', key: 'effective_date' },
    {
      title: 'Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: any) => (value ? 'Yes' : 'No'),
    },
    ...commonColumns('conversion'),
  ];

  const renderEntityForm = () => {
    if (editingType === 'agent') {
      return (
        <div className={styles.formGrid}>
          <Form.Item label="Agent Code" name="agent_code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Kind" name="agent_kind" rules={[{ required: true }]}>
            <Select options={AGENT_KIND_OPTIONS} />
          </Form.Item>
          <Form.Item label="Active" name="is_active" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>
      );
    }

    if (editingType === 'credit') {
      return (
        <div className={styles.formGrid}>
          <Form.Item label="Company Code" name="company_code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Rate (%)" name="rate">
            <Input type="number" />
          </Form.Item>
        </div>
      );
    }

    if (editingType === 'currency') {
      return (
        <div className={styles.formGrid}>
          <Form.Item label="Code" name="code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Symbol" name="symbol" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Decimal Places" name="decimal_places">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Exchange Rate" name="exchange_rate">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Base Currency" name="is_base_currency" valuePropName="checked">
            <Checkbox />
          </Form.Item>
          <Form.Item label="Active" name="is_active" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>
      );
    }

    return (
      <div className={styles.formGrid}>
        <Form.Item label="From Currency" name="from_currency_code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="To Currency" name="to_currency_code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Exchange Rate" name="exchange_rate" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Effective Date"
          name="effective_date"
          rules={[{ required: true, message: 'Use YYYY-MM-DD format' }]}
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="Active" name="is_active" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </div>
    );
  };

  const tableContent = (type: EntityType, dataSource: any[], columns: any[]) => (
    <Card>
      <div className={styles.toolbar}>
        <Input
          allowClear
          className={styles.searchInput}
          onChange={event => setSearch(event.target.value || '')}
          onPressEnter={fetchTabData}
          placeholder={t('common.Search')}
          value={search}
        />
        <Button disabled={!canEdit} onClick={() => openCreate(type)} type="primary">
          Add
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </Card>
  );

  return (
    <div className={styles.page}>
      <Tabs
        activeKey={activeTab}
        items={[
          { key: 'agent', label: 'Agent', children: tableContent('agent', agents, agentColumns) },
          {
            key: 'credit',
            label: 'Credit Card',
            children: tableContent('credit', credits, creditColumns),
          },
          {
            key: 'currency',
            label: 'Currency',
            children: tableContent('currency', currencies, currencyColumns),
          },
          {
            key: 'conversion',
            label: 'Currency Conversion',
            children: tableContent('conversion', conversions, conversionColumns),
          },
          {
            key: 'integration',
            label: 'Integrations',
            children: (
              <Card className={styles.integrationCard} loading={loading}>
                <Form form={integrationForm} layout="vertical">
                  <Form.Item
                    className={styles.integrationRow}
                    name="hanet_sync_enabled"
                    valuePropName="checked"
                  >
                    <Checkbox>Enable Hanet Sync</Checkbox>
                  </Form.Item>
                  <Form.Item label="Hanet Place ID" name="hanet_place_id">
                    <Input disabled={!canEdit} />
                  </Form.Item>

                  <Form.Item
                    className={styles.integrationRow}
                    name="vnpay_qr_enabled"
                    valuePropName="checked"
                  >
                    <Checkbox>Enable VNPay QR</Checkbox>
                  </Form.Item>
                  <Form.Item label="VNPay Merchant Label" name="vnpay_merchant_label">
                    <Input disabled={!canEdit} />
                  </Form.Item>
                  <Form.Item label="VNPay Terminal Label" name="vnpay_terminal_label">
                    <Input disabled={!canEdit} />
                  </Form.Item>

                  <Button disabled={!canEdit} onClick={saveIntegrations} type="primary">
                    {t('common.Save')}
                  </Button>
                </Form>
              </Card>
            ),
          },
          {
            key: 'master-data',
            label: 'Master Data',
            children: (
              <MasterDataSettings
                base={BASE}
                canEdit={canEdit}
                extractList={extractList}
                scopeParams={scopeParams}
              />
            ),
          },
        ]}
        onChange={key => {
          setSearch('');
          setActiveTab(key);
        }}
      />

      <Modal
        okButtonProps={{ disabled: !canEdit }}
        okText={t('common.Save')}
        onCancel={() => setIsModalOpen(false)}
        onOk={submitEntity}
        open={isModalOpen}
        title={editingRecord ? 'Edit Item' : 'Create Item'}
      >
        <Form form={entityForm} layout="vertical">
          {renderEntityForm()}
        </Form>
      </Modal>
    </div>
  );
}

export default SettingsPage;
