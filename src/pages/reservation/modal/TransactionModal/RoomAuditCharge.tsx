import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Modal, Row, Table } from 'antd';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function RoomAuditCharge({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('common.Date'),
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
      title: t('common.Unit price'),
      dataIndex: 'unit_price',
    },

    {
      title: t('common.Updated price'),
      dataIndex: 'updated_price',
      render: () => <Input placeholder="0" />,
    },
  ];

  const data = [
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
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      title={<b>{t('auditRoomCharge.Add Pre Audit Room Charge')}</b>}
      visible={visible}
      width={1000}
    >
      <Form>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={{
            ...rowSelection,
          }}
          size="small"
        />
        <Row style={{ paddingTop: 30 }}>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Total Amount')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>4.800.000</span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default RoomAuditCharge;
