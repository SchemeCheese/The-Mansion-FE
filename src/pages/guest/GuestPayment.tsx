/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 14/04/2023
Updated Date: 14/04/2023
Main functions: Guest Payment
************************************ */

import 'styles/guest_payment.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Card,
  Col,
  Form,
  Pagination,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Steps,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatNumber } from 'helpers';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectGetReservationCheckoutFromRoomNo, selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import {
  getReservation,
  getReservationDetail,
  paymentMomoPayReservationDetail,
  paymentVNPayReservationDetail,
  resendEmailReservationAction,
  resetReservation,
  resetReservationDetail,
  searchRoomReset,
  updateReservation,
} from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function GuestPayment() {
  const { t } = useTranslation();
  const [isCash, setIsCash] = useState(false);
  const [isEWallet, setIsEisEWallet] = useState(false);

  const [isMomo, setIsMomo] = useState(false);
  const [isVNPay, setIsVNPay] = useState(false);

  const { data: reservationCheckoutData } = useAppSelector(selectGetReservationCheckoutFromRoomNo);

  const amountInfo = reservationCheckoutData.amount_info;

  const paymentSummaryLabelStyle: React.CSSProperties = {
    lineHeight: '22px',
    color: '#1D39C4',
    fontSize: 14,
    fontWeight: 400,
  };

  const columns: any[] = [
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
      render: (value: any, record: any) => {
        if (record.price_type === 'percent') {
          return '';
        }

        return value;
      },
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      render: (value: any, record: any) => {
        if (record.price_type === 'percent') {
          return `${record.unit_price}%`;
        }

        return value;
      },
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      align: 'right',
      render: (value: any, record: any) => {
        if (record.description.toLowerCase() === 'discount') {
          return formatNumber(record.discount_amount);
        }

        return value;
      },
    },
    {
      title: t('common.Before Tax and Fee'),
      dataIndex: 'price_before_tax',
      align: 'right',
      render: (value: any, record: any) => {
        if (record.description.toLowerCase() !== 'discount') {
          return value;
        }

        return '';
      },
    },
  ];

  reservationCheckoutData.tax_info.forEach((item: any) => {
    columns.push({
      title: `${item.name} (${item.price}%)`,
      dataIndex: item.description_code,
      render: (value: any, record: any) => {
        if (
          record.price_type === 'percent' ||
          record.description.toLowerCase() === 'discount' ||
          record.description.toLowerCase() === 'deposit'
        ) {
          return '';
        }

        return value;
      },
    });
  });

  const data: any = [];

  Object.keys(reservationCheckoutData.transactions).forEach(key => {
    reservationCheckoutData.transactions[key].items.forEach((item: any) => {
      const itemTemporary: any = {
        ...item,
        key: item.sale_detail_id,
        date: item.payment_date,
        description: item.description,
        unit_price: formatNumber(item.sales_price),
        amount: item.quantity,
        total: formatNumber(item.total_amount),
        price_before_tax: formatNumber(item.price_before_tax),
        total_amount: item.total_amount,
        sale_detail_id: item.sale_detail_id,
        storage_id: item.storage_id,
        payment_method: item.payment_method,
        price_type: item.price_type,
      };

      // Add tax info
      reservationCheckoutData.tax_info.forEach((taxInfo: any, index: number) => {
        itemTemporary[taxInfo.description_code] = formatNumber(item.tax[index]);
      });

      data.push(itemTemporary);
    });
  });

  const { Step } = Steps;

  const onChangeCash = (e: RadioChangeEvent) => {
    setIsCash(e.target.checked);
    setIsEisEWallet(!e.target.checked);
  };

  const onChangeEWallet = (e: RadioChangeEvent) => {
    setIsCash(!e.target.checked);
    setIsEisEWallet(e.target.checked);
  };

  const onChangeMomo = (e: RadioChangeEvent) => {
    setIsMomo(e.target.checked);
    setIsVNPay(!e.target.checked);
  };

  const onChangeVNPay = (e: RadioChangeEvent) => {
    setIsMomo(!e.target.checked);
    setIsVNPay(e.target.checked);
  };

  const dispatch = useDispatch();

  const handleNext = () => {
    if (isEWallet) {
      if (isMomo) {
        dispatch(
          paymentMomoPayReservationDetail({
            payload: {
              reservation_id: 1,
              reservation_detail_id: 1,
              amount: amountInfo.unpaid,
              request_type: 'payWithATM', // Bank
              // request_type: '',
            },
          }),
        );
      } else {
        dispatch(
          paymentVNPayReservationDetail({
            payload: {
              reservation_id: 1,
              reservation_detail_id: 1,
              amount: amountInfo.unpaid,
              bank_code: 'VNBANK', // Bank
              // bank_code: '',
            },
          }),
        );
      }
    }
  };

  return (
    <>
      <Row
        className="content guest-payment-content"
        style={{
          background: 'white',
          width: '90%',
          textAlign: 'center',
          marginLeft: '5%',
          maxHeight: '90vh',
          marginTop: '5vh',
        }}
      >
        <Col span={24}>
          <Row
            style={{
              height: '100%',
            }}
          >
            <Col span={24} style={{ marginBottom: 30 }}>
              <Steps current={1}>
                <Step title={t('guestCheckout.Confirm your information')} />
                <Step title={t('guestCheckout.Payment')} />
              </Steps>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={16}>
                  <Table columns={columns} dataSource={data} pagination={false} size="small" />
                </Col>
                <Col
                  span={8}
                  style={{
                    paddingLeft: 30,
                  }}
                >
                  <Row
                    style={{
                      height: '100%',
                    }}
                  >
                    <Col span={12} style={{ height: '100%' }}>
                      <div
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          paddingTop: 30,
                          width: '98%',
                          height: '100%',
                        }}
                      >
                        <Radio checked={isCash} name="cash" onChange={onChangeCash}>
                          <p
                            style={{
                              color: 'rgba(0, 0, 0, 0.85)',
                              fontSize: 14,
                            }}
                          >
                            {t('guest.Cash Credit Card')}
                          </p>
                        </Radio>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div
                        style={{
                          border: '1px solid rgba(0, 0, 0, 0.15)',
                          borderRadius: 2,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          paddingTop: 30,
                          width: '98%',
                          height: '100%',
                          float: 'right',
                        }}
                      >
                        <Radio checked={isEWallet} name="e_wallet" onChange={onChangeEWallet}>
                          <p
                            style={{
                              color: 'rgba(0, 0, 0, 0.85)',
                              fontSize: 14,
                            }}
                          >
                            {t('guest.E-Wallet')}
                          </p>
                        </Radio>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={16} style={{ paddingTop: 15, textAlign: 'left' }}>
          <Row
            style={{
              border: '1px solid #9DD9FE',
              height: '100%',
            }}
          >
            <Col
              span={24}
              style={{
                background: '#E6F7FF',
                borderRadius: 2,
                paddingRight: 20,
                paddingLeft: 20,
              }}
            >
              <Row style={{ paddingTop: 12 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Sub Total')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatNumber(amountInfo.sub_total)}
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingTop: 5 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Deposit')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatNumber(amountInfo.deposit)}
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingTop: 5 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Discount')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatNumber(amountInfo.discount)}
                  </span>
                </Col>
              </Row>

              {reservationCheckoutData.tax_info.map((taxInfo: any, index: number) => {
                return (
                  <Row style={{ paddingTop: 5 }}>
                    <Col span={16}>
                      {' '}
                      <span style={paymentSummaryLabelStyle}>{taxInfo.name}</span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 14,
                          float: 'right',
                          color: '#1D39C4',
                          fontWeight: 100,
                          fontStyle: 'italic',
                        }}
                      >
                        {formatNumber(amountInfo?.total_tax[index])}
                      </span>
                    </Col>
                  </Row>
                );
              })}

              <Row style={{ paddingTop: 5 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Exchange currency')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    USD
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingTop: 5 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Exchange rate')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    23.000
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Amount')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatNumber(parseInt(amountInfo?.grand_total, 10) / 23000)}
                  </span>
                </Col>
              </Row>
            </Col>
            <Col
              span={24}
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                paddingTop: 10,
              }}
            >
              <Row>
                <Col span={16}>
                  {' '}
                  <span style={paymentSummaryLabelStyle}>{t('common.Grand Total')}</span>
                </Col>
                <Col span={8} style={{ marginBottom: 10 }}>
                  <span
                    style={{
                      fontSize: 14,
                      float: 'right',
                      color: '#1D39C4',
                      fontWeight: 100,
                      fontStyle: 'italic',
                    }}
                  >
                    {formatNumber(amountInfo.unpaid)}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ paddingTop: 15, paddingLeft: isEWallet ? 30 : 0 }}>
          {isCash && (
            <div
              style={{
                background: '#E6F7FF',
                border: '1px solid #9DD9FE',
                borderRadius: 2,
                marginLeft: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)' }}>
                {t('guest.Please contact the Reception for instructions.')}
              </p>
            </div>
          )}
          {isEWallet && (
            <Row
              style={{
                height: '100%',
              }}
            >
              <Col className="radio-payment-momo-vnpay" span={12} style={{ height: '100%' }}>
                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '98%',
                    height: '66px',
                  }}
                >
                  <Radio checked={isMomo} onChange={onChangeMomo}>
                    <p
                      style={{
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontSize: 14,
                      }}
                    >
                      {t('guest.MOMO Pay')}
                    </p>
                  </Radio>
                </div>
              </Col>
              <Col className="radio-payment-momo-vnpay" span={12}>
                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.15)',
                    borderRadius: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '98%',
                    height: '66px',
                    float: 'right',
                  }}
                >
                  <Radio checked={isVNPay} onChange={onChangeVNPay}>
                    <p
                      style={{
                        color: 'rgba(0, 0, 0, 0.85)',
                        fontSize: 14,
                      }}
                    >
                      {t('guest.VNPay')}
                    </p>
                  </Radio>
                </div>
              </Col>
            </Row>
          )}
        </Col>
        <Col
          span={24}
          style={{
            background: '#F7F9FA',
            border: '1px solid #DCE2EA',
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 15,
            paddingTop: 25,
            paddingBottom: 10,
          }}
        >
          <svg
            fill="none"
            height="20"
            viewBox="0 0 21 20"
            width="21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M0.0791016 10C0.0791016 4.57143 4.83126 0 10.4745 0C16.2156 0 20.8698 4.47715 20.8698 10C20.8698 15.4286 16.1176 20 10.4745 20C4.83126 20 0.0791016 15.4286 0.0791016 10ZM10.4745 3C6.45562 3 3.19771 6.13401 3.19771 10C3.19771 13.866 6.45562 17 10.4745 17C14.4933 17 17.7512 13.866 17.7512 10H10.4745V3Z"
              fill="#FAAD14"
              fillOpacity="0.85"
              fillRule="evenodd"
            />
          </svg>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(0, 0, 0, 0.65)',
              paddingTop: 5,
            }}
          >
            {t('guest.Waiting for payment')}
          </p>
        </Col>

        <Col span={24} style={{ marginTop: 25, marginBottom: 25 }}>
          <MButton>{t('common.Cancel')}</MButton>
          <PattonButton
            disabled={!(isCash || isMomo || isVNPay)}
            onClick={handleNext}
            style={{ marginLeft: 20 }}
          >
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestPayment;
