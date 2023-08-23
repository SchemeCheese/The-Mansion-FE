/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QrReader } from 'react-qr-reader';
import {
  Col,
  DatePicker,
  Form,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Steps,
  TimePicker,
} from 'antd';
import moment from 'moment';
import GuestFooter from 'pages/guest/GuestFooter';

import Icon from 'components/Icon';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import ConfirmReservationModal from './modal/ConfirmReservationModal';
import RoomDetailModal from './modal/RoomDetailModal';
import SelectRoomModal from './modal/SelectRoomModal';

import { useGuest } from '../useGuest';

const { Option } = Select;

function GuestCheckin() {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [form] = Form.useForm();
  const arrayPersonValue: Array<number> = [1, 2, 3, 4, 5];
  const [data, setData]: any = useState('No result');

  const [isNoReserved, setIsNoReserved] = useState(false);
  const [isScanQr, setIsScanQr] = useState(false);

  const [isByHour, setIsByHour] = useState(false);
  const [isByNight, setIsIsByNight] = useState(false);
  const [generalInfoState, setGeneralInfoState] = useState<any>('');

  const handleNext = () => {
    setVisibleSelectRoom(true);
  };

  const { handleCancel } = useGuest();

  const handleChangeSelect = (value: number, name: string) => {
    const dataGeneralInfoState = { ...generalInfoState, [name]: value };

    setGeneralInfoState(dataGeneralInfoState);
  };

  const onChangeNoReserved = (e: RadioChangeEvent) => {
    setIsNoReserved(e.target.checked);
    setIsScanQr(!e.target.checked);
  };

  const onChangeScanQr = (e: RadioChangeEvent) => {
    setIsNoReserved(!e.target.checked);
    setIsScanQr(e.target.checked);
  };

  const onChangeByHour = (e: RadioChangeEvent) => {
    setIsByHour(e.target.checked);
    setIsIsByNight(!e.target.checked);
  };

  const onChangeByNight = (e: RadioChangeEvent) => {
    setIsByHour(!e.target.checked);
    setIsIsByNight(e.target.checked);
  };

  useEffect(() => {
    form.setFieldsValue({
      is_no_reserved: isNoReserved,
      is_scan_qrcode: isScanQr,
      checkin_date: moment(),
      checkin_time: moment(),
      checkout_date: moment(),
      checkout_time: moment(),
      adults: '',
      child: '',
      is_by_hour: isByHour,
      is_by_night: isByNight,
    });
  });
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [visibleSelectRoom, setVisibleSelectRoom] = useState(false);
  const [visibleRoomDetail, setVisibleRoomDetail] = useState(false);

  return (
    <>
      <ConfirmReservationModal setVisiable={setVisibleConfirm} visible={visibleConfirm} />
      <SelectRoomModal
        setVisiable={setVisibleSelectRoom}
        showModalConfirm={setVisibleConfirm}
        showModalDetail={setVisibleRoomDetail}
        visible={visibleSelectRoom}
      />
      <RoomDetailModal setVisiable={setVisibleRoomDetail} visible={visibleRoomDetail} />
      <Row
        className="content guest-payment-content guest-checkout-content"
        style={{
          background: 'white',
          width: '90%',
          marginLeft: '5%',
          marginTop: '5vh',
          marginBottom: 10,
        }}
      >
        {/* <Col span={3}>
            <QrReader
            onResult={(result: any, error) => {
              if (!!result) {
                setData(result?.text);
              }

              if (!!error) {
                console.info(error);
              }
            }}
            constraints={{ facingMode: 'user' }}
          />
          <p>{data}</p>
        </Col> */}
        <Col span={24}>
          <Row
            style={{
              height: '100%',
            }}
          >
            <Col span={24} style={{ marginBottom: 30 }}>
              <Steps current={0}>
                <Step title={t('guestCheckin.Select your stay')} />
                <Step title={t('guestCheckin.Select your room')} />
                <Step title={t('guestCheckin.Upload your persional ID')} />
                <Step title={t('guestCheckin.Payment')} />
              </Steps>
            </Col>
            <Col className="guest-checkout-confirm" span={24}>
              <Col span={24}>
                <p className="">
                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: '20px',
                    }}
                  >
                    {t('guestCheckin.Do you have reservation ID already')}
                  </span>
                </p>
              </Col>
              <Form
                autoComplete="off"
                form={form}
                labelCol={{
                  span: 24,
                }}
                layout="vertical"
                name="basic"
                wrapperCol={{
                  span: 23,
                }}
              >
                <Row style={{ overflow: 'auto' }}>
                  <Col span={24}>
                    <Row>
                      <Col span={8}>
                        <Form.Item name="is_no_reserved">
                          <Col span={24} style={{ height: '100%' }}>
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
                                paddingBottom: '18%',
                                height: 200,
                              }}
                            >
                              <Radio checked={isNoReserved} onChange={onChangeNoReserved}>
                                <p
                                  style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 14,
                                    paddingTop: '10%',
                                  }}
                                >
                                  {t('guestCheckin.No reserved yet')}
                                </p>
                              </Radio>
                            </div>
                          </Col>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="is_scan_qrcode">
                          <Col span={24} style={{ height: '100%' }}>
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
                                height: 200,
                              }}
                            >
                              <Radio checked={isScanQr} onChange={onChangeScanQr}>
                                <p
                                  style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 14,
                                    paddingTop: '10%',
                                  }}
                                >
                                  <span>{t('guestCheckin.Scan QR code')}</span>
                                  <div
                                    style={{
                                      paddingTop: '15%',
                                    }}
                                  >
                                    {' '}
                                    <Icon name="camera" width={55} />
                                  </div>
                                </p>
                              </Radio>
                            </div>
                          </Col>
                        </Form.Item>
                      </Col>
                      <Col span={8} />

                      <Col span={24}>
                        <p className="">
                          <span
                            style={{
                              fontSize: 14,
                              lineHeight: '20px',
                            }}
                          >
                            {t('guestCheckin.Select stay type')}
                          </span>
                        </p>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="is_by_hour">
                          <Col span={24} style={{ height: '100%' }}>
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
                              <Radio checked={isByHour} onChange={onChangeByHour}>
                                <p
                                  style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 14,
                                    paddingTop: '10%',
                                  }}
                                >
                                  {t('guestCheckin.By hour')}
                                </p>
                              </Radio>
                            </div>
                          </Col>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item name="is_by_night">
                          <Col span={24} style={{ height: '100%' }}>
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
                              <Radio checked={isByNight} onChange={onChangeByNight}>
                                <p
                                  style={{
                                    color: 'rgba(0, 0, 0, 0.85)',
                                    fontSize: 14,
                                    paddingTop: '10%',
                                  }}
                                >
                                  {t('guestCheckin.By night')}
                                </p>
                              </Radio>
                            </div>
                          </Col>
                        </Form.Item>
                      </Col>
                      <Col span={8} />
                      <Col span={8}>
                        <Form.Item label={t('guestCheckin.Checkin Date.title')} name="checkin_date">
                          <DatePicker
                            placeholder={t('guestCheckin.Checkin Date.placeholder')}
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
                          label={t('guestCheckin.Checkout Date.title')}
                          name="checkout_date"
                        >
                          <DatePicker
                            placeholder={t('guestCheckin.Checkout Date.placeholder')}
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
                        <Form.Item label={t('guestCheckin.Adults.title')} name="adult">
                          <Select
                            onChange={value => handleChangeSelect(value, 'adults')}
                            style={{ width: '100%' }}
                          >
                            {arrayPersonValue.map((value: any) => {
                              return (
                                <Option key={value} value={value}>
                                  {value}
                                </Option>
                              );
                            })}
                          </Select>
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
                      <Col span={8}>
                        <Form.Item label={t('common.Checkout Time')} name="checkout_time">
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
                        <Form.Item label={t('guestCheckin.Child.title')} name="child">
                          <Select
                            onChange={value => handleChangeSelect(value, 'child')}
                            style={{ width: '100%' }}
                          >
                            {arrayPersonValue.map((value: any) => {
                              return (
                                <Option key={value} value={value}>
                                  {value}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton onClick={handleNext} style={{ marginLeft: 20 }}>
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestCheckin;
