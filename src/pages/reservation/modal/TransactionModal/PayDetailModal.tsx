/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 04/06/2023
Main functions : Payment Detail Modal
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { downloadPDFInvoiceTransaction } from 'actions';

import MButton from 'components/MButton';

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

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const { amount_info: amountInfo } = reservationDetailInfo.data;

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
      date: item.date,
      description: item.description,
      unit_price: formatNumber(item.sales_price),
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

  const [isSelectDownloadInvoiceModalOpen, setIsSelectDownloadInvoiceModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [language, setLanguage] = useState('en');
  const reservationDetailData = useAppSelector(selectGetReservationDetail);

  const handleInvoiceDownloadPdf = () => {
    dispatch(
      downloadPDFInvoiceTransaction({
        payload: {
          reservation_detail_id: reservationDetailData.reservation_detail_id ?? '',
          reservation_info_id: reservationDetailData.reservation_id ?? '',
          file_name: `the_mansion_hotel_${reservationDetailData.reservation_id}_${reservationDetailData.reservation_detail_id}.pdf`,
          language,
          payment_id: payment.id,
        },
      }),
    );
    setIsSelectDownloadInvoiceModalOpen(false);
  };

  const onChangeLanguage = (e: RadioChangeEvent) => {
    setLanguage(e.target.value);
  };

  if (!payment) {
    return null;
  }

  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        onCancel={() => setIsSelectDownloadInvoiceModalOpen(false)}
        onOk={handleInvoiceDownloadPdf}
        title={t('common.Download File')}
        visible={isSelectDownloadInvoiceModalOpen}
      >
        <Row>
          <Col span={12}>
            <Radio.Group onChange={onChangeLanguage} value={language}>
              <Space direction="vertical">
                <Radio value="vi">{t('common.Vietnamese')}</Radio>
                <Radio value="en">{t('common.English')}</Radio>
                <Radio value="jp">{t('common.Japanese')}</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Modal>

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
              display: amountInfo?.unpaid === 0 ? 'none' : '',
            }}
            type="primary"
          >
            {t('payDetail.Pay Balance')}
          </Button>,
          <MButton onClick={() => setIsSelectDownloadInvoiceModalOpen(true)}>
            {t('common.Print Invoice')}
          </MButton>,
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
              <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                {t('payDetail.Descriptions')}
              </span>
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
              <span>{t('common.Total Amount (VND)')}</span>
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
          <Table
            columns={paymentColumns}
            dataSource={dataPayments}
            pagination={false}
            size="small"
          />
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
    </>
  );
}

export default PayDetailModal;
