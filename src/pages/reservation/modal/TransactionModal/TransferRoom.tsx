import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function TransferRoom({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const onChangeSelectDisk = (value: string) => {
    console.log(`selected ${value}`);
  };

  const disks = ['A', 'B'];

  const columns = [
    {
      title: t('common.Status'),
      dataIndex: 'status',
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
    },
    {
      title: t('reservation.Room Type.title'),
      dataIndex: 'room_type',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
    },
    {
      title: t('reservation.C/I'),
      dataIndex: 'ci',
    },
    {
      title: t('reservation.C/O'),
      dataIndex: 'co',
    },
    {
      title: t('reservation.Nights'),
      dataIndex: 'nights',
    },
    {
      title: t('reservation.Adl'),
      dataIndex: 'adl',
    },
    {
      title: t('reservation.Rate'),
      dataIndex: 'rate',
    },
    {
      title: t('reservation.Subtotal'),
      dataIndex: 'subtotal',
    },
    {
      title: t('common.Deposit'),
      dataIndex: 'deposit',
    },
  ];

  const data = [
    {
      status: '',
      name: '',
      room_type: '',
      room_no: '',
      ci: '',
      co: '',
      nights: '',
      adl: '',
      rate: '',
      subtotal: '',
      deposit: '',
    },
    {
      status: '',
      name: '',
      room_type: '',
      room_no: '',
      ci: '',
      co: '',
      nights: '',
      adl: '',
      rate: '',
      subtotal: '',
      deposit: '',
    },
  ];

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
      title={<b>{t('transaction.Transfer to Folio ID')}</b>}
      visible={visible}
      width={969}
    >
      <Form layout="vertical" wrapperCol={{ span: 23 }}>
        <Row>
          <Col span={6}>
            <Form.Item
              label={t('transaction.Target Folio ID')}
              name=""
              rules={[
                { required: true, message: 'FolioID do not exist. Please input another ID!' },
              ]}
            >
              <Input placeholder="Input Folio ID" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('transaction.Select Disk Target')} name="">
              <Select
                defaultValue={disks[0]}
                onChange={onChangeSelectDisk}
                style={{ borderRadius: 2, width: '100%', height: 32 }}
              >
                {disks.map(disk => (
                  <Option key={disk}>{disk}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 15 }}>
            <Form.Item label={t('transaction.Total Amount')} name="">
              <Input.Group>
                <Row gutter={12}>
                  <Col span={8}>
                    <Input defaultValue="40.000" />
                  </Col>
                  <Col span={4}>
                    <Input defaultValue="VND" />
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowSelection={{
          ...rowSelection,
        }}
        size="small"
      />
    </Modal>
  );
}

export default TransferRoom;
