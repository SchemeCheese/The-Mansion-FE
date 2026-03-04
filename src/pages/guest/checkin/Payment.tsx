import 'styles/guest_payment.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ExpandOutlined } from '@ant-design/icons';
import { Col, Radio, RadioChangeEvent, Row, Spin, Steps, Table } from 'antd';
import { formatNumber, randomKey } from 'helpers';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectCreatePayment, selectCreateQRCodeVNPayState, selectGuestCheckin } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import {
  addItemAction,
  createPaymentAction,
  createQRCodeVNPayAction,
  getReservationGuestCheckinAction,
} from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

const { Step } = Steps;

export default function Payment() {
  const { t } = useTranslation();

  const [isCash, setIsCash] = useState(false);
  const [isEWallet, setIsEisEWallet] = useState(false);

  const [isMomo, setIsMomo] = useState(false);
  const [isVNPay, setIsVNPay] = useState(false);

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const checkinReservationRedux: any = useAppSelector(selectGuestCheckin);
  const checkinReservationData = checkinReservationRedux.data;
  const createQRCodeVNPayData = useAppSelector(selectCreateQRCodeVNPayState);

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

    const saltKey = randomKey(5);

    dispatch(
      createQRCodeVNPayAction({
        payload: {
          reservation_info_id: checkinReservationData.reservation.id,
          reservation_detail_id: checkinReservationData.id,
          amount: amountInfo.unpaid,
          txn_id: `CHECKIN-${checkinReservationData.id}-${saltKey}`,
          bill_number: `CHECKIN-${checkinReservationData.id}-${saltKey}`,
          txn_desc: `PAYMENT CHECKIN ${checkinReservationData.id}`,
        },
      }),
    );
  };

  const paymentSummaryLabelStyle: React.CSSProperties = {
    lineHeight: '22px',
    color: '#1D39C4',
    fontSize: 14,
    fontWeight: 400,
  };

  const navigate = useNavigate();

  const handleNext = () => {
    if (isCash) {
      const transactionArray: any = Object.values(checkinReservationData.transactions)[0];

      const saleDetailIds = transactionArray.items.map((item: any) => item.sale_detail_id);

      dispatch(
        createPaymentAction({
          payload: {
            reservation_detail_id: checkinReservationData.id,
            sales_info_id: checkinReservationData.sales_info_id,
            sales_detail_id: saleDetailIds,
            payment_methods: [
              {
                currency_conversion_id: 2, // VND
                payment_amount: checkinReservationData.amount_info.unpaid,
                payment_method: '1', // Cash
                payment_exchange_rate: 1,
              },
            ],
            discount_amount: 0,
            paid: {},
          },
        }),
      );
    }
  };

  const handleCancel = () => {
    navigate('/guest');
  };

  const dispatch = useDispatch();
  const amountInfo = checkinReservationData.amount_info;

  const paymentData = useAppSelector(selectCreatePayment);
  const { changed } = useTreeChanges(paymentData);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      navigate('/guest/checkin/confirm');
    }
  }, [changed]);

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

  if (checkinReservationData.tax_info) {
    checkinReservationData.tax_info.forEach((item: any) => {
      columns.push({
        title: `${item.name} (${item.price}%)`,
        dataIndex: item.description_code,
        align: 'right',
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
  }

  const data: any = [];

  if (checkinReservationData.transactions) {
    Object.keys(checkinReservationData.transactions).forEach(key => {
      checkinReservationData.transactions[key].items.forEach((item: any) => {
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
        checkinReservationData.tax_info.forEach((taxInfo: any, index: number) => {
          itemTemporary[taxInfo.description_code] = formatNumber(item.tax[index]);
        });

        data.push(itemTemporary);
      });
    });
  }

  useEffect(() => {
    const bookingId = localStorage.getItem('checkin_booking');

    if (bookingId === null) {
      navigate('/guest');
    } else {
      const bookingInfo = JSON.parse(bookingId);

      dispatch(getReservationGuestCheckinAction(bookingInfo));
    }
  }, []);

  return (
    <>
      <Row
        className="content guest-payment-content"
        style={{
          background: 'white',
          width: '90%',
          textAlign: 'center',
          marginLeft: '5%',
          // maxHeight: '90vh',
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
              <Steps current={4}>
                <Step title={t('guestCheckin.Select your stay')} />
                <Step title={t('guestCheckin.Select your room')} />
                <Step title={t('guestCheckin.Upload your persional ID')} />
                <Step title={t('guestCheckin.Payment')} />
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
                        <Radio
                          checked={isCash}
                          disabled={isPaymentSuccess}
                          name="cash"
                          onChange={onChangeCash}
                        >
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
                        <Radio
                          checked={isEWallet}
                          disabled={isPaymentSuccess}
                          name="e_wallet"
                          onChange={onChangeEWallet}
                        >
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

              {checkinReservationData.tax_info.map((taxInfo: any, index: number) => {
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
            <Row>
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
                  <Radio checked={isMomo} disabled={isPaymentSuccess} onChange={onChangeMomo}>
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
                  <Radio checked={isVNPay} disabled={isPaymentSuccess} onChange={onChangeVNPay}>
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

          {isEWallet &&
            isVNPay &&
            (createQRCodeVNPayData.status === 'SUCCESS' ? (
              <Row
                style={{
                  paddingTop: 10,
                  justifyContent: 'center',
                }}
              >
                <Col span={24} style={{ backgroundColor: '#E6F7FF', border: '1px solid #9DD9FE' }}>
                  <div style={{ backgroundColor: 'white', margin: '20px 40px 5px 40px' }}>
                    <p
                      style={{
                        paddingTop: 5,
                        color: '#1D39C4',
                        fontWeight: 'bold',
                      }}
                    >
                      {' '}
                      Scan to payment
                    </p>
                    <QRCode value={createQRCodeVNPayData.result.data} />
                    <p
                      style={{
                        textAlign: 'center',
                        paddingLeft: '15%',
                        paddingRight: '15%',
                        fontSize: 14,
                        paddingTop: 5,
                      }}
                    >
                      {' '}
                      <ExpandOutlined /> Use <b>VNPay</b> app or Camera app with QR support to scan
                    </p>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Spin />
              </Row>
            ))}
        </Col>

        {!isPaymentSuccess ? (
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
        ) : (
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
                d="M10.4745 0C4.83126 0 0.0791016 4.57143 0.0791016 10C0.0791016 15.4286 4.83126 20 10.4745 20C16.1176 20 20.8698 15.4286 20.8698 10C20.8698 4.57143 16.1176 0 10.4745 0ZM5.48923 10.7938C5.20647 10.5043 5.20589 10.0356 5.48791 9.74529C5.77154 9.45334 6.23326 9.45251 6.51788 9.74343L8.74485 12.0196L14.4275 6.21801C14.711 5.92864 15.1697 5.92715 15.4549 6.21466C15.7432 6.50524 15.7447 6.98021 15.4583 7.27269L8.95837 13.9098C8.84046 14.0302 8.64938 14.0301 8.53164 13.9095L5.48923 10.7938Z"
                fill="#52C41A"
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
              Payment Success
            </p>
          </Col>
        )}

        <Col span={24} style={{ marginTop: 25, marginBottom: 25 }}>
          <MButton onClick={handleCancel}>{t('common.Cancel')}</MButton>
          <PattonButton
            disabled={!(isCash || isMomo || (isVNPay && isPaymentSuccess))}
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
