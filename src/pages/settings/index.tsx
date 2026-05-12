import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import {
  ApartmentOutlined,
  ArrowLeftOutlined,
  BankOutlined,
  BuildOutlined,
  CreditCardOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  DollarOutlined,
  SwapOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from 'ui/antd';
import { getAPI, postAPI, putAPI } from 'helpers/apiService';
import { apiEndPoint, headerWithAuthorization } from 'helpers';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectBranchInfo, selectUser } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { notify } from 'ui/notification';

import EquipmentMasterData from './equipment/EquipmentMasterData';
import MasterDataSettings from './MasterDataSettings';
import styles from './settings.module.css';

const BASE = 'api/v1/settings';
const EQUIPMENT_TAB_KEY = 'equipment-master-data';
const { Text } = Typography;

type EntityType = 'agent' | 'credit' | 'currency' | 'conversion';
type FinanceSettingsKey = 'credit' | 'currency' | 'conversion';
type PrimarySettingsKey = 'agent' | 'integration' | 'master-data' | 'equipment' | 'finance';
type SecondarySettingsKey =
  | 'agent'
  | 'integration'
  | 'master-data'
  | 'equipment'
  | 'facility'
  | 'credit'
  | 'currency'
  | 'conversion';

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

type PrimaryCardConfig = {
  description: string;
  key: PrimarySettingsKey;
  label: string;
  symbol: React.ReactNode;
};

type SecondaryCardConfig = {
  description: string;
  key: SecondarySettingsKey;
  label: string;
  symbol: React.ReactNode;
};

type SettingsScreen = 'group-selection' | 'sub-selection' | 'content-view';

function SettingsPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isEquipmentRoute = location.pathname.startsWith('/settings/equipment');
  const skipEquipmentRouteSyncRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(isEquipmentRoute ? EQUIPMENT_TAB_KEY : '');
  const [activePrimary, setActivePrimary] = useState<PrimarySettingsKey | null>(
    isEquipmentRoute ? 'equipment' : null,
  );
  const [activeSecondary, setActiveSecondary] = useState<SecondarySettingsKey | null>(
    isEquipmentRoute ? 'facility' : null,
  );

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
  const currentScreen: SettingsScreen = activeSecondary ? 'content-view' : 'group-selection';

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
    if (activeTab === EQUIPMENT_TAB_KEY) {
      return;
    }

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

  useEffect(() => {
    if (isEquipmentRoute && !skipEquipmentRouteSyncRef.current) {
      setActivePrimary('equipment');
      setActiveSecondary('facility');
      setActiveTab(EQUIPMENT_TAB_KEY);

      return;
    }

    if (!isEquipmentRoute) {
      skipEquipmentRouteSyncRef.current = false;
    }
  }, [isEquipmentRoute]);

  useEffect(() => {
    if (activeTab === 'credit' || activeTab === 'currency' || activeTab === 'conversion') {
      setActivePrimary('finance');

      return;
    }

    if (activeTab === 'agent') {
      setActivePrimary('agent');

      return;
    }

    if (activeTab === 'integration') {
      setActivePrimary('integration');

      return;
    }

    if (activeTab === 'master-data') {
      setActivePrimary('master-data');
      
    }
  }, [activeTab]);

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
          await (editingRecord
            ? putAPI(`${BASE}/agent-infos/${editingRecord.id}`, payload)
            : postAPI(`${BASE}/agent-infos`, payload));

          break;
        }
        case 'credit': {
          await (editingRecord
            ? putAPI(`${BASE}/creditcard-companies/${editingRecord.id}`, payload)
            : postAPI(`${BASE}/creditcard-companies`, payload));

          break;
        }
        case 'currency': {
          await (editingRecord
            ? putAPI(`${BASE}/currencies/${editingRecord.id}`, payload)
            : postAPI(`${BASE}/currencies`, payload));

          break;
        }

        default:
          await (editingRecord
            ? putAPI(`${BASE}/currency-conversions/${editingRecord.id}`, payload)
            : postAPI(`${BASE}/currency-conversions`, payload));
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
    {
      title: 'Agent',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className={styles.agentIdentity}>
          <span className={styles.agentName}>{record.name || '-'}</span>
          <span className={styles.agentCode}>{record.agent_code || 'No code'}</span>
        </div>
      ),
    },
    {
      title: 'Kind',
      dataIndex: 'agent_kind',
      key: 'agent_kind',
      render: (value: any) => <Tag className={styles.kindTag}>{getAgentKindLabel(value)}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: any) =>
        value ? (
          <Tag className={styles.statusTagActive}>Active</Tag>
        ) : (
          <Tag className={styles.statusTagInactive}>Inactive</Tag>
        ),
    },
    ...commonColumns('agent'),
  ];

  const creditColumns = [
    {
      title: 'Credit Card Company',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className={styles.agentIdentity}>
          <span className={styles.agentName}>{record.name || '-'}</span>
          <span className={styles.agentCode}>{record.company_code || 'No code'}</span>
        </div>
      ),
    },
    {
      title: 'Fee Rate',
      dataIndex: 'rate',
      key: 'rate',
      render: (value: any) => <Tag className={styles.rateTag}>{value || 0}%</Tag>,
    },
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
    {
      title: 'Currency Pair',
      key: 'currency_pair',
      render: (_: any, record: any) => (
        <div className={styles.conversionPair}>
          <span className={styles.conversionPairValue}>
            {record.from_currency_code || '-'} <span className={styles.conversionArrow}>→</span>{' '}
            {record.to_currency_code || '-'}
          </span>
          <span className={styles.agentCode}>1 {record.from_currency_code || '-'} base rule</span>
        </div>
      ),
    },
    {
      title: 'Exchange Rate',
      dataIndex: 'exchange_rate',
      key: 'exchange_rate',
      render: (value: any, record: any) => (
        <div className={styles.conversionRate}>
          <span className={styles.conversionRateValue}>{value || 0}</span>
          <span className={styles.conversionRateHint}>
            1 {record.from_currency_code || '-'} = {value || 0} {record.to_currency_code || '-'}
          </span>
        </div>
      ),
    },
    {
      title: 'Effective Date',
      dataIndex: 'effective_date',
      key: 'effective_date',
      render: (value: any) => <Tag className={styles.dateTag}>{value || 'No date'}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (value: any) =>
        value ? (
          <Tag className={styles.statusTagActive}>Active</Tag>
        ) : (
          <Tag className={styles.statusTagInactive}>Inactive</Tag>
        ),
    },
    ...commonColumns('conversion'),
  ];

  const renderEntityForm = () => {
    if (editingType === 'agent') {
      return (
        <div className={styles.agentFormLayout}>
          <div className={styles.formIntro}>
            <span className={styles.formEyebrow}>Agent Profile</span>
            <Text className={styles.formHelperText}>
              Keep agent records clean and consistent so reservation source selection stays easy to
              scan.
            </Text>
          </div>

          <div className={styles.formGrid}>
            <Form.Item
              extra="Use a short internal code that staff can recognize quickly."
              label="Agent Code"
              name="agent_code"
              rules={[{ required: true }]}
            >
              <Input placeholder="AGT-001" />
            </Form.Item>
            <Form.Item
              extra="Shown across reservation and source-related screens."
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Patton Travel" />
            </Form.Item>
            <Form.Item label="Kind" name="agent_kind" rules={[{ required: true }]}>
              <Select options={AGENT_KIND_OPTIONS} placeholder="Select agent type" />
            </Form.Item>
            <Form.Item className={styles.formToggleItem} label="Availability">
              <Form.Item name="is_active" noStyle valuePropName="checked">
                <Checkbox>Use this agent in active workflows</Checkbox>
              </Form.Item>
            </Form.Item>
          </div>
        </div>
      );
    }

    if (editingType === 'credit') {
      return (
        <div className={styles.agentFormLayout}>
          <div className={styles.formIntro}>
            <span className={styles.formEyebrow}>Credit Card Profile</span>
            <Text className={styles.formHelperText}>
              Keep card company names, codes, and fee rates consistent so payment settings are easy
              to review.
            </Text>
          </div>

          <div className={styles.formGrid}>
            <Form.Item
              extra="Use the short code staff already know from payment operations."
              label="Company Code"
              name="company_code"
              rules={[{ required: true }]}
            >
              <Input placeholder="VISA" />
            </Form.Item>
            <Form.Item
              extra="Displayed in payment-related configuration and selection flows."
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Visa" />
            </Form.Item>
            <Form.Item
              extra="Percentage fee applied for this credit card company."
              label="Rate (%)"
              name="rate"
            >
              <Input placeholder="2.5" type="number" />
            </Form.Item>
          </div>
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
      <div className={styles.agentFormLayout}>
        <div className={styles.formIntro}>
          <span className={styles.formEyebrow}>Conversion Rule</span>
          <Text className={styles.formHelperText}>
            Define when a currency pair becomes valid and what rate should be used in payment or
            reservation-related calculations.
          </Text>
        </div>

        <div className={styles.formGrid}>
          <Form.Item
            extra="Base currency for the conversion rule."
            label="From Currency"
            name="from_currency_code"
            rules={[{ required: true }]}
          >
            <Input placeholder="USD" />
          </Form.Item>
          <Form.Item
            extra="Target currency after conversion."
            label="To Currency"
            name="to_currency_code"
            rules={[{ required: true }]}
          >
            <Input placeholder="JPY" />
          </Form.Item>
          <Form.Item
            extra="Example: if 1 USD = 155 JPY, enter 155."
            label="Exchange Rate"
            name="exchange_rate"
            rules={[{ required: true }]}
          >
            <Input placeholder="155" type="number" />
          </Form.Item>
          <Form.Item
            extra="Use the start date when this rate should begin applying."
            label="Effective Date"
            name="effective_date"
            rules={[{ required: true, message: 'Use YYYY-MM-DD format' }]}
          >
            <Input placeholder="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item className={styles.formToggleItem} label="Availability">
            <Form.Item name="is_active" noStyle valuePropName="checked">
              <Checkbox>Use this conversion rule in active workflows</Checkbox>
            </Form.Item>
          </Form.Item>
        </div>
      </div>
    );
  };

  const tableContent = (type: EntityType, dataSource: any[], columns: any[]) => (
    <Card>
      {type === 'agent' ? (
        <div className={styles.agentPanel}>
          <div className={styles.agentPanelHeader}>
            <div>
              <h3 className={styles.panelTitle}>Agent Directory</h3>
              <Text className={styles.panelDescription}>
                Manage booking sources with a cleaner list, clearer status labels, and faster scan
                for staff.
              </Text>
            </div>
            <div className={styles.agentPanelMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total agents</span>
                <strong className={styles.metricValue}>{dataSource.length}</strong>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Active</span>
                <strong className={styles.metricValue}>
                  {dataSource.filter(item => item.is_active).length}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.agentToolbar}>
            <div className={styles.searchBlock}>
              <span className={styles.searchLabel}>Quick search</span>
              <Input
                allowClear
                className={styles.searchInput}
                onChange={event => setSearch(event.target.value || '')}
                onPressEnter={fetchTabData}
                placeholder="Search by agent name or code"
                value={search}
              />
            </div>
            <Button disabled={!canEdit} onClick={() => openCreate(type)} type="primary">
              Add Agent
            </Button>
          </div>
        </div>
      ) : type === 'credit' ? (
        <div className={styles.agentPanel}>
          <div className={styles.agentPanelHeader}>
            <div>
              <h3 className={styles.panelTitle}>Credit Card Companies</h3>
              <Text className={styles.panelDescription}>
                Organize payment providers with cleaner company labels and fee visibility for faster
                admin work.
              </Text>
            </div>
            <div className={styles.agentPanelMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total companies</span>
                <strong className={styles.metricValue}>{dataSource.length}</strong>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Avg. fee rate</span>
                <strong className={styles.metricValue}>
                  {dataSource.length
                    ? `${(
                        dataSource.reduce((sum, item) => sum + Number(item.rate || 0), 0) /
                        dataSource.length
                      ).toFixed(1)}%`
                    : '0%'}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.agentToolbar}>
            <div className={styles.searchBlock}>
              <span className={styles.searchLabel}>Quick search</span>
              <Input
                allowClear
                className={styles.searchInput}
                onChange={event => setSearch(event.target.value || '')}
                onPressEnter={fetchTabData}
                placeholder="Search by company name or code"
                value={search}
              />
            </div>
            <Button disabled={!canEdit} onClick={() => openCreate(type)} type="primary">
              Add Credit Card
            </Button>
          </div>
        </div>
      ) : type === 'conversion' ? (
        <div className={styles.agentPanel}>
          <div className={styles.agentPanelHeader}>
            <div>
              <h3 className={styles.panelTitle}>Currency Conversion Rules</h3>
              <Text className={styles.panelDescription}>
                Manage date-based exchange rules so teams can quickly understand which currency pair
                and rate should apply.
              </Text>
            </div>
            <div className={styles.agentPanelMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total rules</span>
                <strong className={styles.metricValue}>{dataSource.length}</strong>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Active rules</span>
                <strong className={styles.metricValue}>
                  {dataSource.filter(item => item.is_active).length}
                </strong>
              </div>
            </div>
          </div>

          <div className={styles.agentToolbar}>
            <div className={styles.searchBlock}>
              <span className={styles.searchLabel}>Quick search</span>
              <Input
                allowClear
                className={styles.searchInput}
                onChange={event => setSearch(event.target.value || '')}
                onPressEnter={fetchTabData}
                placeholder="Search by currency code or effective date"
                value={search}
              />
            </div>
            <Button disabled={!canEdit} onClick={() => openCreate(type)} type="primary">
              Add Conversion Rule
            </Button>
          </div>
        </div>
      ) : (
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
      )}

      <Table
        className={
          type === 'agent' || type === 'credit' || type === 'conversion'
            ? styles.agentTable
            : undefined
        }
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="id"
      />
    </Card>
  );

  const renderPrimaryCard = (
    key: PrimarySettingsKey,
    label: string,
    symbol: React.ReactNode,
    description: string,
  ) => (
    <button
      className={`${styles.settingsHeroCard} ${activePrimary === key ? styles.settingsHeroCardActive : ''}`}
      onClick={() => {
        setSearch('');

        if (key === 'equipment') {
          skipEquipmentRouteSyncRef.current = false;
          setActivePrimary('equipment');
          setActiveSecondary(null);
          setActiveTab(EQUIPMENT_TAB_KEY);

          if (isEquipmentRoute) {
            navigate('/settings/equipment', { replace: true });
          }

          return;
        }

        if (isEquipmentRoute) {
          skipEquipmentRouteSyncRef.current = true;
          navigate('/settings', { replace: true });
        }

        setActivePrimary(key);
        setActiveSecondary(null);
        setActiveTab('');
      }}
      type="button"
    >
      <span className={styles.settingsHeroIcon}>{symbol}</span>
      <span className={styles.settingsHeroLabel}>{label}</span>
      <span className={styles.settingsHeroDescription}>{description}</span>
    </button>
  );

  const renderSecondaryCard = (
    key: SecondarySettingsKey,
    label: string,
    symbol: React.ReactNode,
    description: string,
  ) => (
    <button
      className={`${styles.settingsSubCard} ${activeSecondary === key ? styles.settingsSubCardActive : ''}`}
      onClick={() => {
        if (isEquipmentRoute) {
          skipEquipmentRouteSyncRef.current = true;
          navigate('/settings', { replace: true });
        }

        setSearch('');
        setActiveSecondary(key);

        if (key === 'equipment') {
          setActivePrimary('equipment');
          setActiveSecondary('equipment');
          setActiveTab(EQUIPMENT_TAB_KEY);
          navigate('/settings/equipment', { replace: true });

          return;
        }

        if (key === 'facility') {
          setActivePrimary('equipment');
          setActiveSecondary('facility');
          setActiveTab(EQUIPMENT_TAB_KEY);
          navigate('/settings/equipment', { replace: true });

          return;
        }

        if (key === 'agent') {
          setActivePrimary('agent');
          setActiveSecondary('agent');
          setActiveTab('agent');

          return;
        }

        if (key === 'integration') {
          setActivePrimary('integration');
          setActiveSecondary('integration');
          setActiveTab('integration');

          return;
        }

        if (key === 'master-data') {
          setActivePrimary('master-data');
          setActiveSecondary('master-data');
          setActiveTab('master-data');

          return;
        }

        setActivePrimary('finance');
        setActiveSecondary(key);
        setActiveTab(key as FinanceSettingsKey);
      }}
      type="button"
    >
      <span className={styles.settingsSubIcon}>{symbol}</span>
      <span className={styles.settingsSubLabel}>{label}</span>
      <span className={styles.settingsSubDescription}>{description}</span>
    </button>
  );

  const primaryCards: PrimaryCardConfig[] = [
    {
      key: 'agent',
      label: 'Agent',
      symbol: <TeamOutlined />,
      description: 'Booking source and travel agent settings',
    },
    {
      key: 'finance',
      label: 'Finance',
      symbol: <BankOutlined />,
      description: 'Credit card, currency, and conversion settings',
    },
    {
      key: 'integration',
      label: 'Integrations',
      symbol: <DeploymentUnitOutlined />,
      description: 'Connected services and payment providers',
    },
    {
      key: 'master-data',
      label: 'Master Data',
      symbol: <DatabaseOutlined />,
      description: 'Shared system values and reusable lookup data',
    },
    {
      key: 'equipment',
      label: 'Equipment/Facility Master Data',
      symbol: <ApartmentOutlined />,
      description: 'Room, facility, and structure management',
    },
  ];

  const secondaryCardsByPrimary: Record<PrimarySettingsKey, SecondaryCardConfig[]> = {
    agent: [
      {
        key: 'agent',
        label: 'Agent',
        symbol: <TeamOutlined />,
        description: 'Open agent directory',
      },
    ],
    finance: [
      {
        key: 'credit',
        label: 'Credit Card',
        symbol: <CreditCardOutlined />,
        description: 'Card companies and fee rates',
      },
      {
        key: 'currency',
        label: 'Currency',
        symbol: <DollarOutlined />,
        description: 'Supported currencies and base settings',
      },
      {
        key: 'conversion',
        label: 'Currency Conversion',
        symbol: <SwapOutlined />,
        description: 'Exchange rules and effective dates',
      },
    ],
    integration: [
      {
        key: 'integration',
        label: 'Integrations',
        symbol: <DeploymentUnitOutlined />,
        description: 'Open connected services settings',
      },
    ],
    'master-data': [
      {
        key: 'master-data',
        label: 'Master Data',
        symbol: <DatabaseOutlined />,
        description: 'Open shared system values',
      },
    ],
    equipment: [
      {
        key: 'equipment',
        label: 'Equipment',
        symbol: <BuildOutlined />,
        description: 'Danh sach phong, loai phong va tien nghi',
      },
      {
        key: 'facility',
        label: 'Facility',
        symbol: <ApartmentOutlined />,
        description: 'Danh sach co so va cay cau truc co so',
      },
    ],
  };

  const renderActiveContent = () => {
    if (activeSecondary === 'agent') {
      return tableContent('agent', agents, agentColumns);
    }

    if (activeSecondary === 'integration') {
      return (
        <Card className={styles.integrationCard} loading={loading}>
          <Form form={integrationForm} layout="vertical">
            <div className={styles.integrationPanel}>
              <div className={styles.integrationPanelHeader}>
                <div>
                  <h3 className={styles.panelTitle}>Integration Settings</h3>
                  <Text className={styles.panelDescription}>
                    Configure external services connected to this branch, including guest
                    recognition and QR payment providers.
                  </Text>
                </div>
                <div className={styles.agentPanelMetrics}>
                  <div className={styles.metricCard}>
                    <span className={styles.metricLabel}>Providers</span>
                    <strong className={styles.metricValue}>2</strong>
                  </div>
                </div>
              </div>

              <div className={styles.integrationGrid}>
                <section className={styles.integrationSection}>
                  <div className={styles.integrationSectionHeader}>
                    <div>
                      <span className={styles.formEyebrow}>Hanet</span>
                      <h4 className={styles.integrationTitle}>Face Recognition Sync</h4>
                      <Text className={styles.formHelperText}>
                        Connect this branch to Hanet so guest face-recognition related flows can map
                        to the correct place.
                      </Text>
                    </div>
                    <Form.Item
                      className={styles.integrationToggle}
                      name="hanet_sync_enabled"
                      valuePropName="checked"
                    >
                      <Checkbox>Enabled</Checkbox>
                    </Form.Item>
                  </div>

                  <div className={styles.formGrid}>
                    <Form.Item
                      extra="Used to match Hanet webhook/API traffic to the current branch."
                      label="Hanet Place ID"
                      name="hanet_place_id"
                    >
                      <Input disabled={!canEdit} placeholder="HN001" />
                    </Form.Item>
                  </div>
                </section>

                <section className={styles.integrationSection}>
                  <div className={styles.integrationSectionHeader}>
                    <div>
                      <span className={styles.formEyebrow}>VNPay</span>
                      <h4 className={styles.integrationTitle}>QR Payment</h4>
                      <Text className={styles.formHelperText}>
                        Configure the labels used when generating VNPay QR payments for reservation
                        and guest payment flows.
                      </Text>
                    </div>
                    <Form.Item
                      className={styles.integrationToggle}
                      name="vnpay_qr_enabled"
                      valuePropName="checked"
                    >
                      <Checkbox>Enabled</Checkbox>
                    </Form.Item>
                  </div>

                  <div className={styles.formGrid}>
                    <Form.Item
                      extra="Merchant label shown in VNPay QR related payment requests."
                      label="VNPay Merchant Label"
                      name="vnpay_merchant_label"
                    >
                      <Input disabled={!canEdit} placeholder="MINOVA PMS" />
                    </Form.Item>
                    <Form.Item
                      extra="Terminal label used together with the merchant identity."
                      label="VNPay Terminal Label"
                      name="vnpay_terminal_label"
                    >
                      <Input disabled={!canEdit} placeholder="FRONTDESK-01" />
                    </Form.Item>
                  </div>
                </section>
              </div>

              <div className={styles.integrationFooter}>
                <Text className={styles.integrationFooterText}>
                  These settings are scoped to the current operator, branch, and facility context.
                </Text>
                <Button disabled={!canEdit} onClick={saveIntegrations} type="primary">
                  {t('common.Save')}
                </Button>
              </div>
            </div>
          </Form>
        </Card>
      );
    }

    if (activeSecondary === 'master-data') {
      return (
        <MasterDataSettings
          base={BASE}
          canEdit={canEdit}
          extractList={extractList}
          scopeParams={scopeParams}
        />
      );
    }

    if (activeSecondary === 'equipment' || activeSecondary === 'facility') {
      return (
        <EquipmentMasterData
          base={BASE}
          canEdit={canEdit}
          initialMode={activeSecondary}
          scopeParams={scopeParams}
        />
      );
    }

    if (activeSecondary === 'credit') {
      return tableContent('credit', credits, creditColumns);
    }

    if (activeSecondary === 'currency') {
      return tableContent('currency', currencies, currencyColumns);
    }

    if (activeSecondary === 'conversion') {
      return tableContent('conversion', conversions, conversionColumns);
    }

    return null;
  };

  const handleBackToSelection = () => {
    setActiveSecondary(null);
    setSearch('');

    if (isEquipmentRoute) {
      skipEquipmentRouteSyncRef.current = true;
      navigate('/settings', { replace: true });
    }
  };

  return (
    <div className={styles.page}>
      {currentScreen !== 'content-view' ? (
        <div
          className={`${styles.settingsHeroStage} ${activePrimary ? styles.settingsHeroStageCompact : ''}`}
        >
            <div className={styles.settingsHeroStageHeader}>
              <div>
                <h2 className={styles.settingsStageTitle}>Settings</h2>
                <Text className={styles.settingsStageDescription}>
                  Choose a section first, then open the smaller tool inside it.
                </Text>
              </div>
            </div>

            <div className={styles.settingsHeroGrid}>
              {primaryCards.map(card => (
                <div key={card.key} className={styles.settingsGroupCard}>
                  <div className={styles.settingsGroupCardHeader}>
                    <div className={styles.settingsGroupCardBadge}>{card.symbol}</div>
                    <div className={styles.settingsGroupCardText}>
                      <span className={styles.settingsGroupCardLabel}>{card.label}</span>
                      <span className={styles.settingsGroupCardDescription}>
                        {card.description}
                      </span>
                    </div>
                  </div>
                  <div className={styles.settingsGroupCardSubgrid}>
                    {secondaryCardsByPrimary[card.key].map(item =>
                      renderSecondaryCard(item.key, item.label, item.symbol, item.description),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
      ) : null}

      {currentScreen === 'content-view' ? (
        <div className={styles.settingsContentView}>
          <div className={styles.settingsContentBackbar}>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBackToSelection}>
              {t('common.Back')}
            </Button>
          </div>
          <div className={styles.settingsContentPanel}>{renderActiveContent()}</div>
        </div>
      ) : null}

      <Modal
        okButtonProps={{ disabled: !canEdit }}
        okText={t('common.Save')}
        onCancel={() => setIsModalOpen(false)}
        onOk={submitEntity}
        open={isModalOpen}
        title={
          editingType === 'agent'
            ? editingRecord
              ? 'Edit Agent'
              : 'Create Agent'
            : editingType === 'credit'
              ? editingRecord
                ? 'Edit Credit Card Company'
                : 'Create Credit Card Company'
              : editingType === 'conversion'
                ? editingRecord
                  ? 'Edit Conversion Rule'
                  : 'Create Conversion Rule'
                : editingRecord
                  ? 'Edit Item'
                  : 'Create Item'
        }
        width={
          editingType === 'agent' || editingType === 'credit' || editingType === 'conversion'
            ? 720
            : 520
        }
      >
        <Form form={entityForm} layout="vertical">
          {renderEntityForm()}
        </Form>
      </Modal>
    </div>
  );
}

export default SettingsPage;
