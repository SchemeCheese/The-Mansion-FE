/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 30/04/2023
Updated Date: 30/04/2023
Main functions: Guest Checkout
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, DatePicker, Form, Input, Row, Steps, TimePicker } from 'antd';
import moment from 'moment';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectGetReservationCheckoutFromRoomNo } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import { useGuest } from './useGuest';

function GuestCustomerInfo() {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: reservationCheckoutData } = useAppSelector(selectGetReservationCheckoutFromRoomNo);
  const { handleCancel } = useGuest();

  if (reservationCheckoutData.client_info === undefined) {
    window.location.href = '/guest';
  }

  const clientInfo = reservationCheckoutData.client_info;
  const reservationDetailInfo = reservationCheckoutData.reservation_detail;

  const handleNext = () => {
    navigate('/guest-payment');
  };

  return (
    <>
      <Row
        className="content guest-payment-content guest-checkout-content"
        style={{
          background: 'white',
          width: '90%',
          marginLeft: '5%',
          marginTop: '5vh',
          marginBottom: '10vh',
        }}
      >
        <Col span={24}>
          <Row
            style={{
              height: '100%',
            }}
          >
            <Col span={10} style={{ marginBottom: 30 }}>
              <Steps current={0}>
                <Step title={t('guestCheckout.Confirm your information')} />
                <Step title={t('guestCheckout.Payment')} />
              </Steps>
            </Col>
            <Col className="guest-checkout-confirm" span={24}>
              {reservationCheckoutData.client_info && (
                <Form
                  autoComplete="off"
                  form={form}
                  initialValues={{
                    last_name: clientInfo.last_name,
                    folio_id: reservationDetailInfo.reservation.reservation_number,
                    email: clientInfo.email_address1,
                    ota_booking_id: reservationDetailInfo.reservation.external_reservation_number,
                    first_name: clientInfo.first_name,
                    phone_number: clientInfo.telephone_number1,
                    checkin_date: moment(reservationDetailInfo.check_in_date),
                    checkin_time: moment(reservationDetailInfo.check_in_date),
                    checkout_date: moment(),
                    checkout_time: moment(),
                  }}
                  labelCol={{
                    span: 24,
                  }}
                  layout="vertical"
                  name="basic"
                  wrapperCol={{
                    span: 23,
                  }}
                >
                  <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <Col span={24}>
                      <Row>
                        <Col span={8}>
                          <Form.Item label={t('guestCheckout.Folio ID.title')} name="folio_id">
                            <Input placeholder={t('guestCheckout.Folio ID.placeholder')} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={t('guestCheckout.Last Name.title')} name="last_name">
                            <Input
                              placeholder={t('guestCheckout.Last Name.placeholder')}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={t('guestCheckout.Email.title')} name="email">
                            <Input placeholder={t('guestCheckout.Email.placeholder')} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label={t('guestCheckout.OTA/TA Booking ID.title')}
                            name="ota_booking_id"
                          >
                            <Input placeholder={t('guestCheckout.Email.placeholder')} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={t('guestCheckout.First Name.title')} name="first_name">
                            <Input
                              placeholder={t('guestCheckout.First Name.placeholder')}
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={t('guestCheckout.Mobile.title')} name="phone_number">
                            <Input placeholder={t('guestCheckout.Mobile.placeholder')} readOnly />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label={t('guestCheckout.Checkin Date.title')}
                            name="checkin_date"
                          >
                            <DatePicker
                              disabled
                              placeholder={t('guestCheckout.Checkin Date.placeholder')}
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label={t('guestCheckout.Checkout Date.title')}
                            name="checkout_date"
                          >
                            <DatePicker
                              disabled
                              placeholder={t('guestCheckout.Checkout Date.placeholder')}
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8} />
                        <Col span={8}>
                          <Form.Item label={t('common.Checkin Time')} name="checkin_time">
                            <TimePicker
                              disabled
                              format="HH:mm"
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item label={t('common.Checkout Time')} name="checkout_time">
                            <TimePicker
                              disabled
                              format="HH:mm"
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8} />
                      </Row>
                    </Col>
                  </Row>
                </Form>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Cancel')}</MButton>
          <PattonButton onClick={handleNext} style={{ marginLeft: 20 }}>
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestCustomerInfo;
