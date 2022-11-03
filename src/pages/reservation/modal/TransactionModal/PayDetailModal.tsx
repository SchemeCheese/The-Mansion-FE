import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';

interface Props {
  payment: any;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

interface DataTypeDescription {
  amount: number;
  date: string;
  description: string;
  total: string;
  unit_price: string;
}

interface DataTypePayment {
  amount: string;
  amount_in_vnd: string;
  currency: string;
  date: string;
  exchange_rate: number;
  payment_method: string;
}

function PayDetailModal({ payment, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const descriptionColumns: ColumnsType<DataTypeDescription> = [
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

  const paymentColumns: ColumnsType<DataTypePayment> = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
    },
    {
      title: t('common.Payment Method'),
      dataIndex: 'payment_method',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
    },
    {
      title: t('common.Currency'),
      dataIndex: 'currency',
    },
    {
      title: t('common.Exchange Rate'),
      dataIndex: 'exchange_rate',
    },
    {
      title: t('common.Amount in VND'),
      dataIndex: 'amount_in_vnd',
    },
  ];

  const dataDescriptions = payment?.sale_detail.map((item: any) => {
    return {
      date: moment(item.date).format('DD/MM/YYYY'),
      description: item.description,
      unit_price: formatNumber(item.unit_price),
      amount: item.quantity,
      total: formatNumber(item.total),
    };
  });

  const dataPayments = payment?.payment_details.map((item: any) => {
    return {
      date: moment(item.date).format('DD/MM/YYYY'),
      payment_method: item.payment_method,
      amount: formatNumber(item.amount),
      currency: item.currency,
      exchange_rate: formatNumber(item.exchange_rate),
      amount_in_vnd: formatNumber(item.amount_in_vn),
    };
  });

  const handleChangePaySelected = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleClickPayBalance = () => {
    console.log(`handleClickPayBalance`);
  };

  if (!payment) {
    return null;
  }

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      footer={[
        <Button
          onClick={handleClickPayBalance}
          style={{
            backgroundColor: '#ff4d4f',
            borderColor: '#ff4d4f',
            borderRadius: 4,
            width: '109px',
          }}
          type="primary"
        >
          {t('payDetail.Pay Balance')}
        </Button>,
        <Button onClick={() => setIsModalOpen(false)} style={{ borderRadius: 4, width: '109px' }}>
          {t('common.Cancel')}
        </Button>,
        <Button
          onClick={() => setIsModalOpen(false)}
          style={{ backgroundColor: '#1D39C4', borderRadius: 4, width: '109px' }}
          type="primary"
        >
          {t('common.OK')}
        </Button>,
      ]}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      title={<b>{t('payDetail.Payment Detail')}</b>}
      visible={visible}
      width={850}
    >
      <Form colon={false} layout="horizontal">
        <Row>
          <Col span={12} style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 14, fontWeight: 'bold' }}>{t('payDetail.Descriptions')}</span>
          </Col>
        </Row>
        <Table
          columns={descriptionColumns}
          dataSource={dataDescriptions}
          pagination={false}
          size="small"
        />
        <Row style={{ paddingTop: 30 }}>
          <Col span={16} />
          <Col span={6}>
            <Form.Item label={t('common.Discount')}>
              <Input
                readOnly
                style={{ width: 120, height: 32, borderRadius: 2 }}
                value={formatNumber(payment?.discount)}
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
            <span style={{ fontSize: 16, float: 'right' }}>{payment.total}</span>
          </Col>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Sub Total')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>
              {formatNumber(payment.total_amount - payment.discount)}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ marginBottom: 5 }}>
            <span style={{ fontSize: 14, fontWeight: 'bold' }}>{t('payDetail.Payments')}</span>
          </Col>
        </Row>
        <Table columns={paymentColumns} dataSource={dataPayments} pagination={false} size="small" />
        <Row>
          <Col span={16} />
          <Col span={8} style={{ marginBottom: 10, marginTop: 15 }}>
            <span style={{ lineHeight: '31px' }}>{t('common.Total')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>{payment.paid}</span>
          </Col>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <span style={{ lineHeight: '31px' }}>{t('common.Balance')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>{payment.balance}</span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default PayDetailModal;
