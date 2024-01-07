/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 04/06/2023
Main functions : Payment Detail Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectGetReservationDetail, selectUpdatePaymentDetail } from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import { FileEndpoint } from 'config';

import { downloadPDFInvoiceTransaction, getReservationDetail, updatePaymentDetail } from 'actions';

import MButton from 'components/MButton';

const { Dragger } = Upload;

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
  const [vccImages, setVccImages] = useState<UploadFile[]>([]);
  const { Option } = Select;
  const [vccStatus, setVccStatus] = useState(1);
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
      id: item.id,
      date: moment(item.date).format('DD/MM/YYYY'),
      payment_method: item.payment_method,
      amount: formatNumber(item.amount),
      currency: item.currency,
      exchange_rate: formatNumber(item.exchange_rate),
      amount_in_vnd: formatNumber(item.amount_in_vn),
    };
  });
  const updatePaymentDetailData = useAppSelector(selectUpdatePaymentDetail);
  const { changed } = useTreeChanges(updatePaymentDetailData);

  useEffect(() => {
    if (payment?.payment_details.length > 0) {
      const fileListTemporary = payment?.payment_details[0].vcc_images.map((file: any) => {
        return {
          uid: file.id,
          name: file.name,
          status: 'done',
          url: file.url,
          file_id: file.id,
        };
      });

      setVccImages(fileListTemporary);
      setVccStatus(payment?.payment_details[0].vcc_status);
    } else {
      setVccImages([]);
    }
  }, [payment]);

  const handleChangePaySelected = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleClickPayBalance = () => {
    console.log(`handleClickPayBalance`);
  };

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success('Update payment detail successfully!');

      dispatch(
        getReservationDetail({
          reservation_id: reservationDetailData.reservation_id ?? '',
          reservation_detail_id: reservationDetailData.reservation_detail_id ?? '',
        }),
      );
    }
  }, [changed]);

  const onUpdate = (id: any) => {
    const fileContents = vccImages.map((item: any) => {
      return {
        file_id: item.file_id,
        data: item.xhr ? JSON.parse(item.xhr.responseText).fileName : null,
      };
    });

    dispatch(
      updatePaymentDetail({
        payload: {
          files: fileContents,
          vcc_status: vccStatus,
          payment_detail_id: id,
        },
      }),
    );

    setIsModalOpen(false);
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

  const onChangeVccStatus = (e: RadioChangeEvent) => {
    setVccStatus(e.target.value);
  };

  const handleFilesChange = ({ file: currentFile, fileList: newFileList }: any) =>
    setVccImages(newFileList);

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
        className="fit-modal"
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
          <MButton
            onClick={() => onUpdate(payment.payment_details[0].id)}
            style={{ backgroundColor: '#1D39C4', borderRadius: 4, width: '109px', float: 'left' }}
            type="primary"
          >
            {t('common.Update')}
          </MButton>,
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
        style={{
          top: 40,
        }}
        title={<b>{t('payDetail.Payment Detail')}</b>}
        visible={visible}
        width={1000}
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
          {payment.payment_method.includes('VCC') && (
            <>
              <Row>
                <Col span={24} style={{ marginBottom: 5, marginTop: 20 }}>
                  <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {t('payDetail.Upload VCC Confirmation')}
                  </span>
                </Col>
                <Col span={24} style={{ marginTop: 5 }}>
                  <Row>
                    <Col className="payment-detail" span={24}>
                      <Dragger
                        action={`${process.env.REACT_APP_API_HOST}/${FileEndpoint.UPLOAD}`}
                        fileList={vccImages}
                        headers={{
                          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        }}
                        onChange={handleFilesChange}
                        style={{
                          background: '#FFFFFF',
                          border: '1px dashed rgba(0, 0, 0, 0.15)',
                          borderRadius: '2px',
                        }}
                      >
                        <p className="ant-upload-hint">Upload file here</p>
                      </Dragger>
                    </Col>
                    <Col span={8} />
                    <Col span={8} />
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginBottom: 5, marginTop: 20 }}>
                  <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                    {t('payDetail.VCC Status')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Radio.Group name="radiogroup" onChange={onChangeVccStatus} value={vccStatus}>
                    <Radio style={{ paddingRight: 30 }} value={1}>
                      {t('payDetail.Waiting for process')}
                    </Radio>
                    <Radio value={2}>{t('payDetail.Transaction Approved')}</Radio>
                  </Radio.Group>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default PayDetailModal;
