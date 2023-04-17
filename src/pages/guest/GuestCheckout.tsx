import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, DatePicker, Form, Input, Row, Steps, TimePicker } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectGetReservationCheckoutFromRoomNo } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function GuestCheckout() {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: reservationCheckoutData } = useAppSelector(selectGetReservationCheckoutFromRoomNo);

  if (reservationCheckoutData.client_info === undefined) {
    return null;
  }

  const clientInfo = reservationCheckoutData.client_info;

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
              <Steps current={currentStep}>
                <Step title={t('guestCheckout.Confirm your information')} />
                <Step title={t('guestCheckout.Payment')} />
              </Steps>
            </Col>
            <Col
              className="guest-checkout-confirm"
              span={24}
              style={{
                display: currentStep === 0 ? 'block' : 'none',
              }}
            >
              <Form
                autoComplete="off"
                form={form}
                initialValues={{
                  last_name: clientInfo.last_name,
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
                          <Input placeholder={t('guestCheckout.Folio ID.placeholder')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label={t('guestCheckout.Last Name.title')} name="last_name">
                          <Input placeholder={t('guestCheckout.Last Name.placeholder')} readOnly />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label={t('guestCheckout.Email.title')} name="lastname">
                          <Input placeholder={t('guestCheckout.Email.placeholder')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label={t('guestCheckout.OTA/TA Booking ID.title')}
                          name="booking_time"
                        >
                          <TimePicker
                            format="HH:mm"
                            placeholder={t('guestCheckout.OTA/TA Booking ID.placeholder')}
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
                        <Form.Item label={t('guestCheckout.First Name.title')} name="first_name">
                          <Input placeholder={t('guestCheckout.First Name.placeholder')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label={t('guestCheckout.Mobile.title')} name="mobile">
                          <Input placeholder={t('guestCheckout.Mobile.placeholder')} />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label={t('guestCheckout.Checkin Date.title')}
                          name="checkin_date"
                        >
                          <DatePicker
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
                        <Form.Item label={t('common.Checkin Time')} name="checkin_time">
                          <TimePicker
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
            </Col>
            <Col
              className="guest-checkout-payment"
              span={24}
              style={{
                display: currentStep === 1 ? 'block' : 'none',
              }}
            >
              guest-checkout-payment
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton>{t('common.Cancel')}</MButton>
          <PattonButton onClick={handleNext} style={{ marginLeft: 20 }}>
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestCheckout;
