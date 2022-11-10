import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';

interface Props {
  discountAmount: any;
  paySelectedRowKeys: any;
  selectedRows: any;
  setDiscountAmount: (value: any) => void;
  setIsModalOpen: (visible: boolean) => void;
  setIsModalOpenSelectedPaymentMethod: (visible: boolean) => void;
  setPaySelectedRowKeys: (valye: any) => void;
  setPaySelectedRows: (value: any) => void;
  totalAmount: number;
  visible: boolean;
}

interface DataTypePaySelected {
  amount: number;
  date: string;
  description: string;
  total: string;
  unit_price: string;
}

function PaySelectedModal({
  discountAmount,
  paySelectedRowKeys,
  selectedRows,
  setDiscountAmount,
  setIsModalOpen,
  setIsModalOpenSelectedPaymentMethod,
  setPaySelectedRowKeys,
  setPaySelectedRows,
  totalAmount,
  visible,
}: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const columns: ColumnsType<DataTypePaySelected> = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
    },
    {
      title: t('common.Unit price'),
      dataIndex: 'unit_price',
      align: 'right',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      align: 'right',
    },
  ];

  const rowSelection = {
    selectedRowKeys: paySelectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: any) => {
      setPaySelectedRowKeys(newSelectedRowKeys);
      setPaySelectedRows(newSelectedRows);
    },
  };

  const handleChangePaySelected = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleSelectPaymentMethod = () => {
    setIsModalOpenSelectedPaymentMethod(true);
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('paySelected.Select Payment Method')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleSelectPaymentMethod}
      title={<b>{t('paySelected.Pay Selected')}</b>}
      visible={visible}
      width={850}
    >
      <Form colon={false} layout="horizontal">
        <Table
          columns={columns}
          dataSource={selectedRows}
          pagination={false}
          rowSelection={{
            ...rowSelection,
          }}
          size="small"
        />
        <Row style={{ paddingTop: 30 }}>
          <Col span={16} />
          <Col span={6}>
            <Form.Item label={t('common.Discount')}>
              <Input
                onChange={event => setDiscountAmount(event.target.value)}
                placeholder="0"
                style={{ width: 120, height: 32, borderRadius: 2 }}
                value={discountAmount}
              />
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
            <span>{t('common.Total Amount')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>{formatNumber(totalAmount)}</span>
          </Col>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Sub Total')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>
              {discountAmount
                ? formatNumber(totalAmount - parseInt(discountAmount, 10))
                : formatNumber(totalAmount)}
            </span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default PaySelectedModal;
