import 'styles/transaction.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row, Table } from 'antd';
import { formatNumber } from 'helpers';
import AddInvoiceModal from 'pages/reservation/modal/TransactionModal/AddInvoiceModal';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function MonthlyInvoice({ reservationDetailId, reservationId }: Props) {
  const { t } = useTranslation();

  console.log('reservationDetailId', reservationDetailId, reservationId);
  const tabList: any = [
    {
      key: 'electricity',
      tab: t('monthlyInvoice.Electricity'),
    },
    {
      key: 'water',
      tab: t('monthlyInvoice.Water'),
    },
    {
      key: 'internet',
      tab: t('monthlyInvoice.Internet'),
    },
    {
      key: 'television',
      tab: t('monthlyInvoice.Television'),
    },
    {
      key: 'laundry',
      tab: t('monthlyInvoice.Laundry'),
    },
    {
      key: 'extra_services',
      tab: t('monthlyInvoice.Extra Services'),
    },
    {
      key: 'history',
      tab: t('monthlyInvoice.History'),
    },
  ];
  // const contentList: any = {
  //   electricity: <p>electricity</p>,
  //   water: <p>water</p>,
  //   internet: <p>internet</p>,
  //   television: <p>television</p>,
  //   laundry: <p>laundry</p>,
  //   extra_services: <p>extra_services</p>,
  //   history: <p>history</p>,
  // };
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>('electricity');
  const [isOpenAddInvoiceModalVisible, setIsOpenAddInvoiceModalVisible] = useState(false);
  const columns = [
    {
      title: t('common.Month'),
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      key: 'total',
      render: (value: any, record: any) => {
        return `${formatNumber(record.total)}VND`;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (value: any, record: any) => {
        return (
          <svg
            fill="none"
            height="14"
            onClick={() => console.log('delete ', record)}
            viewBox="0 0 12 14"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M8.05136 2.00016H10.3078C10.8742 2.00016 11.3334 2.46655 11.3334 3.04183V3.87516C11.3334 4.10529 11.1497 4.29183 10.9232 4.29183H1.077C0.850422 4.29183 0.666748 4.10529 0.666748 3.87516V3.04183C0.666748 2.46655 1.12596 2.00016 1.69239 2.00016H3.9488V1.5835C3.9488 0.893127 4.49982 0.333496 5.17957 0.333496H6.82059C7.50034 0.333496 8.05136 0.893127 8.05136 1.5835V2.00016ZM5.17957 1.16683C4.95341 1.16683 4.76931 1.3538 4.76931 1.5835V2.00016H7.23085V1.5835C7.23085 1.3538 7.04676 1.16683 6.82059 1.16683H5.17957Z"
              fill="#F5222D"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M1.31689 5.26158C1.3134 5.1873 1.37174 5.12516 1.44495 5.12516H10.5545C10.6277 5.12516 10.686 5.1873 10.6825 5.26158L10.3441 12.4762C10.3128 13.1439 9.7728 13.6668 9.11484 13.6668H2.8846C2.22664 13.6668 1.68664 13.1439 1.65535 12.4762L1.31689 5.26158ZM8.051 5.75016C7.82434 5.75016 7.64075 5.93663 7.64075 6.16683V11.5835C7.64075 11.8137 7.82434 12.0002 8.051 12.0002C8.27767 12.0002 8.46126 11.8137 8.46126 11.5835V6.16683C8.46126 5.93663 8.27767 5.75016 8.051 5.75016ZM5.99972 5.75016C5.77306 5.75016 5.58946 5.93663 5.58946 6.16683V11.5835C5.58946 11.8137 5.77306 12.0002 5.99972 12.0002C6.22638 12.0002 6.40998 11.8137 6.40998 11.5835V6.16683C6.40998 5.93663 6.22638 5.75016 5.99972 5.75016ZM3.94844 5.75016C3.72178 5.75016 3.53818 5.93663 3.53818 6.16683V11.5835C3.53818 11.8137 3.72178 12.0002 3.94844 12.0002C4.1751 12.0002 4.3587 11.8137 4.3587 11.5835V6.16683C4.3587 5.93663 4.1751 5.75016 3.94844 5.75016Z"
              fill="#F5222D"
              fillRule="evenodd"
            />
          </svg>
        );
      },
    },
  ];

  const data: any = [
    {
      key: 1,
      id: 1,
      month: '07/2020',
      description: 'Hóa đơn tiền điện tháng 7/2020',
      total: '40000',
    },
    {
      key: 2,
      id: 2,
      month: '06/2020',
      description: 'Hóa đơn tiền điện tháng 6/2020',
      total: '40000',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeysTable: any) => {
      setSelectedRowKeys(selectedRowKeysTable);
    },
    getCheckboxProps: (record: any) => ({
      name: record.name,
    }),
  };

  const handleAddNewInvoice = () => {
    setIsOpenAddInvoiceModalVisible(true);
  };

  return (
    <Row
      style={{
        paddingTop: 16,
        background: '#F0F2F5',
        paddingBottom: 25,
        paddingRight: 15,
        paddingLeft: 15,
      }}
    >
      <Col span={24}>
        <Card
          activeTabKey={activeTabKey}
          className="transaction-tabs"
          onTabChange={key => {
            setActiveTabKey(key);
          }}
          style={{ width: '100%' }}
          tabList={tabList}
        >
          <Col style={{ textAlign: 'right', marginBottom: 16 }}>
            <PattonButton
              onClick={() => handleAddNewInvoice()}
              style={{ marginLeft: 25, padding: '0 18px 0 24px' }}
            >
              {t('common.Add')}
            </PattonButton>
            <MButton style={{ marginLeft: 25, padding: '0 18px 0 18px' }}>
              {t('monthlyInvoice.Mark as paid')}
            </MButton>
          </Col>
          {/* {contentList[activeTabKey]} */}
          <Table
            className="rooming-table"
            columns={columns}
            dataSource={data}
            pagination={false}
            rowSelection={rowSelection}
            size="small"
          />
        </Card>
      </Col>
      <AddInvoiceModal
        isModalOpen={isOpenAddInvoiceModalVisible}
        setModalVisible={setIsOpenAddInvoiceModalVisible}
      />
    </Row>
  );
}

export default MonthlyInvoice;
