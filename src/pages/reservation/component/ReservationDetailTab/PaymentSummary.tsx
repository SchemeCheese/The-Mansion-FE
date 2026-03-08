/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 29/03/2023
Main functions : Payment Detail Modal
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Modal, Row, Select, Table } from 'ui/antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

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

interface Props {
  closeModal: () => void;
  payment: any;
  setIsModalOpen: () => void;
  visible: boolean;
}

function PaymentSummary({ closeModal, payment, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const { amount_info: amountInfo, paid, transactions } = reservationDetailInfo.data;

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
      dataIndex: 'sales_price',
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

  const dataDescriptions: any = [];

  if (transactions) {
    Object.keys(transactions).forEach((key: any) => {
      transactions[key].items.forEach((item: any) => {
        dataDescriptions.push({
          date: moment(item.date).format('DD/MM/YYYY'),
          description: item.description,
          unit_price: formatNumber(item.sales_price),
          amount: item.quantity,
          total: formatNumber(item.total_amount),
        });
      });
    });
  }

  const dataPayments: any = [];

  if (paid?.length) {
    paid.forEach((p: any) => {
      p.payment_details.forEach((item: any) => {
        dataPayments.push({
          date: item.date,
          payment_method: item.payment_method,
          amount: formatNumber(item.amount),
          currency: item.currency,
          exchange_rate: formatNumber(item.exchange_rate),
          amount_in_vnd: formatNumber(item.amount_in_vn),
        });
      });
    });
  }

  if (!payment) {
    return null;
  }

  return (
    <Modal
      footer={[
        <Button onClick={closeModal} style={{ borderRadius: 4, width: '109px' }}>
          {t('common.Cancel')}
        </Button>,
        <Button
          onClick={() => setIsModalOpen()}
          style={{ backgroundColor: '#1D39C4', borderRadius: 4 }}
          type="primary"
        >
          {t('reservation.Continue to checkout')}
        </Button>,
      ]}
      onCancel={closeModal}
      onOk={() => setIsModalOpen()}
      open={visible}
      styles={{ body: { backgroundColor: '#F0F2F5' } }}
      title={<b>{t('payDetail.Payment Detail')}</b>}
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
        <Row>
          <Col span={16} />
          <Col span={8} style={{ marginBottom: 15, marginTop: 7 }}>
            <span>{t('common.Sub Total')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>
              {formatNumber(
                parseInt(amountInfo?.sub_total, 10) - parseInt(amountInfo?.discount, 10),
              )}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Total Amount (VND)')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>
              {formatNumber(amountInfo?.grand_total)}
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
          <Col span={8} style={{ marginBottom: 10, marginTop: 7 }}>
            <span style={{ lineHeight: '31px' }}>{t('common.Total')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>{formatNumber(amountInfo?.paid)}</span>
          </Col>
        </Row>
        <Row>
          <Col span={16} />
          <Col span={8}>
            <span style={{ lineHeight: '31px' }}>{t('common.Balance')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>{formatNumber(amountInfo?.unpaid)}</span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default PaymentSummary;
