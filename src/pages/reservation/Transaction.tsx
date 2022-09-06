import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import MButton from 'components/MButton';

interface DataTypePaySelected {
  amount: number;
  date: string;
  description: string;
  total: string;
  unit_price: string;
}

function Transaction() {
  const { t } = useTranslation();
  const { Option } = Select;

  const [isModalOpenPaySelected, setIsModalOpenPaySelected] = useState(false);
  const [isModalOpenChangeDisk, setIsModalOpenChangeDisk] = useState(false);
  const [isModalOpenAditRoomCharge, setIsModalOpenAditRoomCharge] = useState(false);

  const columnsPaySelected: ColumnsType<DataTypePaySelected> = [
    {
      title: t('paySelected.Date'),
      dataIndex: 'date',
    },
    {
      title: t('paySelected.Description'),
      dataIndex: 'description',
    },
    {
      title: t('paySelected.Unit price'),
      dataIndex: 'unit_price',
      align: 'right',
    },
    {
      title: t('paySelected.Amount'),
      dataIndex: 'amount',
    },
    {
      title: t('paySelected.Total'),
      dataIndex: 'total',
      align: 'right',
    },
  ];

  const dataPaySelected = [
    {
      date: '28/07/2020',
      description: 'PEPSI',
      unit_price: '20.000',
      amount: 2,
      total: '40.000',
    },
    {
      date: '28/07/2020',
      description: 'Coca Cola',
      unit_price: '20.000',
      amount: 2,
      total: '40.000',
    },
  ];

  const rowSelectionPaySelected = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const columnsAuditRoomCharge = [
    {
      title: t('auditRoomCharge.Date'),
      dataIndex: 'date',
    },
    {
      title: t('auditRoomCharge.Room Type'),
      dataIndex: 'room_type',
    },
    {
      title: t('auditRoomCharge.Rate Name'),
      dataIndex: 'rate_name',
    },

    {
      title: t('auditRoomCharge.Rate Detail'),
      dataIndex: 'rate_detail',
    },

    {
      title: t('auditRoomCharge.Unit price'),
      dataIndex: 'unit_price',
    },

    {
      title: t('auditRoomCharge.Updated price'),
      dataIndex: 'updated_price',
      render: () => <Input placeholder="0" />,
    },
  ];

  const dataAuditRoomCharge = [
    {
      date: '2017-08-08',
      room_type: 'Deluxe with balcony',
      rate_name: '',
      rate_detail: '',
      unit_price: '',
      updated_price: '',
    },
    {
      date: '2017-08-08',
      room_type: 'Deluxe with balcony',
      rate_name: '',
      rate_detail: '',
      unit_price: '',
      updated_price: '',
    },
    {
      date: '2017-08-08',
      room_type: 'Grand Suite',
      rate_name: '',
      rate_detail: '',
      unit_price: '',
      updated_price: '',
    },
    {
      date: '2017-08-08',
      room_type: 'Grand Suite',
      rate_name: '',
      rate_detail: '',
      unit_price: '',
      updated_price: '',
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelectionAuditRoomCharge = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  const handleChangePaySelected = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeDisk = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <MButton onClick={() => setIsModalOpenPaySelected(true)}>
        {t('paySelected.Pay Selected')}
      </MButton>
      <Modal
        bodyStyle={{ backgroundColor: '#F0F2F5' }}
        cancelButtonProps={{ style: { borderRadius: 4 } }}
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        okText={t('paySelected.Select Payment Method')}
        onCancel={() => setIsModalOpenPaySelected(false)}
        onOk={() => setIsModalOpenPaySelected(false)}
        title={<b>{t('paySelected.Pay Selected')}</b>}
        visible={isModalOpenPaySelected}
        width={850}
      >
        <Form colon={false} layout="horizontal">
          <Table
            columns={columnsPaySelected}
            dataSource={dataPaySelected}
            pagination={false}
            rowSelection={{
              ...rowSelectionPaySelected,
            }}
            size="small"
          />
          <Row style={{ paddingTop: 30 }}>
            <Col span={16} />
            <Col span={6}>
              <Form.Item label={t('paySelected.Discount')}>
                <Input placeholder="20.000" style={{ width: 120, height: 32, borderRadius: 2 }} />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Select defaultValue="VND" onChange={handleChangePaySelected}>
                <Option value="VND">VND</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={16} />
            <Col span={8} style={{ marginBottom: 17 }}>
              <span>{t('paySelected.Total Amount')}</span>
              <span style={{ fontSize: 16, float: 'right' }}>4.800.000</span>
            </Col>
          </Row>
          <Row>
            <Col span={16} />
            <Col span={8}>
              <span>{t('paySelected.Sub Total')}</span>
              <span style={{ fontSize: 16, float: 'right' }}>4.800.000</span>
            </Col>
          </Row>
        </Form>
      </Modal>

      <MButton onClick={() => setIsModalOpenChangeDisk(true)}>
        {t('paySelected.Change Disk')}
      </MButton>
      <Modal
        bodyStyle={{ backgroundColor: '#F0F2F5' }}
        cancelButtonProps={{ style: { borderRadius: 4 } }}
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        onCancel={() => setIsModalOpenChangeDisk(false)}
        onOk={() => setIsModalOpenChangeDisk(false)}
        title={<b>{t('paySelected.Change Disk')}</b>}
        visible={isModalOpenChangeDisk}
      >
        <Form layout="vertical">
          <Form.Item label={t('paySelected.Select Disk')}>
            <Select defaultValue="A" onChange={handleChangeDisk}>
              <Option value="A">A</Option>
              <Option value="B">B</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <MButton onClick={() => setIsModalOpenAditRoomCharge(true)}>
        {t('auditRoomCharge.Add Pre Audit Room Charge')}
      </MButton>
      <Modal
        bodyStyle={{ backgroundColor: '#F0F2F5' }}
        cancelButtonProps={{ style: { borderRadius: 4 } }}
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        okText={t('common.Save')}
        onCancel={() => setIsModalOpenAditRoomCharge(false)}
        onOk={() => setIsModalOpenAditRoomCharge(false)}
        title={<b>{t('auditRoomCharge.Add Pre Audit Room Charge')}</b>}
        visible={isModalOpenAditRoomCharge}
        width={1000}
      >
        <Form>
          <Table
            columns={columnsAuditRoomCharge}
            dataSource={dataAuditRoomCharge}
            pagination={false}
            rowSelection={{
              ...rowSelectionAuditRoomCharge,
            }}
            size="small"
          />
          <Row style={{ paddingTop: 30 }}>
            <Col span={16} />
            <Col span={8}>
              <span>{t('auditRoomCharge.Total Amount')}</span>
              <span style={{ fontSize: 16, float: 'right' }}>4.800.000</span>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default Transaction;
