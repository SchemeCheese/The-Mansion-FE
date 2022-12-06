/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 07/12/2022
Updated Date : 07/12/2022
Main functions : Walk In Check In Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, DatePicker, Form, Input, Modal, Row, Select, Table, TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  reservationDetailId: string;
  reservationId: string;
  setIsModalVisible: (value: boolean) => void;
}

function WalkinCheckinModal({
  isModalVisible,
  reservationDetailId,
  reservationId,
  setIsModalVisible,
}: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const roomColumns = [
    {
      title: t('common.Date'),
      dataIndex: 'use_date',
      key: 'use_date',
    },
    {
      title: t('common.Rate'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Total Guest'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Content'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Unit Price'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Updated Price'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Task'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
  ];

  const handleOk = () => {
    form.submit();
  };

  const disabledPastDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current <= moment().endOf('day');
  };

  const disabledFutureDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current >= moment().endOf('day');
  };

  const onFinish = (values: any) => {
    setIsModalVisible(false);
  };

  const resetForm = () => {
    form.resetFields();
    // form.setFieldsValue({
    //   client_kind: '1',
    // });
  };

  useEffect(() => {
    resetForm();
  }, [reservationDetailId]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal
      bodyStyle={{
        backgroundColor: '#F0F2F5',
      }}
      className="new-guest-modal"
      okText="Save"
      onCancel={handleCancel}
      onOk={handleOk}
      style={{
        top: 40,
      }}
      title="Walk In Check In"
      visible={isModalVisible}
      width={1000}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        wrapperCol={{
          span: 23,
        }}
      >
        <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <Col span={24}>
            <Card bordered={false} size="small" title={t('common.Booker Information')}>
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={t('guest.First Name.title')}
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input firstname!',
                      },
                    ]}
                  >
                    <Input placeholder={t('guest.First Name.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('guest.Last Name.title')}
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input lastname!',
                      },
                    ]}
                  >
                    <Input placeholder={t('guest.Last Name.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('guest.Rank.title')} name="client_rank">
                    <Select allowClear placeholder={t('guest.Rank.placeholder')}>
                      <Option value="1">VIP</Option>
                      <Option value="2">Dominant</Option>
                      <Option value="4">General</Option>
                      <Option value="9">Undesirable Guest</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Email.title')} name="email_address1">
                    <Input placeholder={t('common.Email.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Mobile Phone.title')} name="telephone_number1">
                    <Input placeholder={t('common.Mobile Phone.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('guest.Identity / Passport No.title')} name="passport_number">
                    <Input placeholder={t('guest.Identity / Passport No.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('guest.Date Of Issue')} name="date_of_issue_of_passport">
                    <DatePicker
                      disabledDate={disabledFutureDate}
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
                  <Form.Item label={t('guest.Place Of Issue')} name="place_of_id">
                    <Input placeholder={t('guest.Place Of Issue')} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={t('common.Adult')} name="adult">
                    <Select allowClear defaultValue="2">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={t('common.Child')} name="child">
                    <Select allowClear defaultValue="1">
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card bordered={false} size="small" title="Booking Information">
              <Row>
                <Col span={16}>
                  <Row>
                    <Col span={12}>
                      <Form.Item label={t('common.Checkin Date')} name="date_of_birth">
                        <DatePicker
                          disabledDate={disabledFutureDate}
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={t('common.Checkin Time')} name="nationality">
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
                    <Col span={12}>
                      <Form.Item label={t('common.Checkout Date')} name="expiration_date_of_visa">
                        <DatePicker
                          disabledDate={disabledPastDate}
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t('common.Checkout Time')}
                        name="expiration_date_of_passport"
                      >
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
                  </Row>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Notes')} name="gender">
                    <TextArea rows={5} style={{ borderRadius: 4 }} />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label={t('common.Room Type')} name="married">
                    <Select placeholder="Select status">
                      <Option value="1">Not Married</Option>
                      <Option value="2">Married</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={16}>
                  <Row>
                    <Col span={12}>
                      <Form.Item label={t('common.Room Number')} name="is_smoker">
                        <Select placeholder="Select smoking">
                          <Option value="1">{t('common.Smoking')}</Option>
                          <Option value="2">{t('common.No Smoking')}</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table columns={roomColumns} dataSource={[]} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default WalkinCheckinModal;
