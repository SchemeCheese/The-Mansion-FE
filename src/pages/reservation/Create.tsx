/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 24/08/2022
Updated Date : 30/08/2022
Main functions : Create Reservation Page
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Form, Input, Row, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { colors } from 'modules/theme';

import BreadcrumbList from 'components/BreadcrumbList';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

const data: object[] = [];

for (let index = 0; index < 5; index++) {
  data.push({
    status: 'Waitlist',
    name: 'Ming',
    room_type: 'Premium Alex',
    room_no: '-',
    ci: '28/07/2020',
    co: '28/07/2020',
    nights: 1,
    adl: 2,
    child: '-',
    baby: '-',
    rate: 'Premium Alex TA',
    subtotal: '4.320.000',
    deposit: '-',
  });
}

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

function Create() {
  const { t } = useTranslation();
  const breadcrumbData = [t('common.TMHA'), t('common.Reservation')];

  const columns = [
    {
      title: t('common.Status'),
      dataIndex: 'status',
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
    },
    {
      title: t('reservation.Room Type.title'),
      dataIndex: 'room_type',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
    },
    {
      title: t('reservation.C/I'),
      dataIndex: 'ci',
    },
    {
      title: t('reservation.C/O'),
      dataIndex: 'co',
    },
    {
      title: t('reservation.Nights'),
      dataIndex: 'nights',
    },
    {
      title: t('reservation.Adl'),
      dataIndex: 'adl',
    },
    {
      title: t('reservation.Child.title'),
      dataIndex: 'child',
    },
    {
      title: t('reservation.Baby.title'),
      dataIndex: 'baby',
    },
    {
      title: t('reservation.Rate'),
      dataIndex: 'rate',
    },
    {
      title: t('reservation.Subtotal'),
      dataIndex: 'subtotal',
    },
    {
      title: t('reservation.Deposit'),
      dataIndex: 'deposit',
    },
  ];

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          note: 'Hi, man!',
        });

        return;

      case 'female':
        form.setFieldsValue({
          note: 'Hi, lady!',
        });

        return;

      case 'other':
        form.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };

  return (
    <>
      <BreadcrumbList data={breadcrumbData} />
      <p className="title">{t('reservation.Create New Reservation')}</p>
      <p style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.45)', paddingLeft: 24 }}>
        {t('reservation.Create New Reservation Note')}
      </p>
      <Form
        autoComplete="off"
        initialValues={{
          remember: true,
        }}
        labelCol={{
          span: 8,
        }}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        wrapperCol={{
          span: 23,
        }}
      >
        <Row className="content">
          <Col span={24}>
            <Card bordered={false} size="small" title="General Informations">
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Folio ID')}
                    name="folio_id"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input defaultValue="2808" disabled value="2000" />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.OTA Booking ID.title')}
                    name="ota_booking_id"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder={t('reservation.OTA Booking ID.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Market.title')}
                    name="market"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder={t('reservation.Market.placeholder')}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Source.title')}
                    name="source"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder={t('reservation.Source.placeholder')}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Notes.title')}
                    name="note"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea placeholder={t('reservation.Notes.placeholder')} rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              bordered={false}
              size="small"
              style={{ marginTop: 20 }}
              title={t('common.Booker Informations')}
            >
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Type.title')}
                    name="type"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder={t('reservation.Type.placeholder')}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.First Name.title')}
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Steve" />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Last Name.title')}
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Nagaoka" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Email.title')}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder={t('reservation.Email.placeholder')} />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Mobile Phone.title')}
                    name="mobile_phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder={t('reservation.Mobile Phone.placeholder')} />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Rank.title')}
                    name="rank"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder={t('reservation.Rank.placeholder')}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Additional Email.title')}
                    name="email_2"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder={t('reservation.Additional Email.placeholder')} />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Notes.title')}
                    name="gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea placeholder={t('reservation.Notes.placeholder')} rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card
              bordered={false}
              size="small"
              style={{ marginTop: 20 }}
              title={t('reservation.Rooming List')}
            >
              <Row>
                <Col span={24}>
                  <PattonButton>
                    {' '}
                    <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> {t('common.New')}
                  </PattonButton>
                  <MButton style={{ marginLeft: 15 }}>{t('common.Delete Selected')}</MButton>
                </Col>
                <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowSelection={rowSelection}
                    size="small"
                  />
                </Col>
              </Row>
            </Card>

            <Card
              bordered={false}
              size="small"
              style={{ marginTop: 20 }}
              title={t('common.Payment Informations')}
            >
              <Row style={{ paddingTop: 10 }}>
                <Col span={8}>
                  <p style={{ marginBottom: 25 }}>
                    <span>{t('reservation.Total Amount')}</span>
                    <span style={{ float: 'right', paddingRight: '12.5%' }}>4,800,000</span>{' '}
                  </p>
                  <Form.Item
                    label={t('reservation.Payment Method.title')}
                    name="gender"
                    wrapperCol={{
                      span: 21,
                    }}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder={t('reservation.Payment Method.placeholder')}
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Paid')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Email reservation confirmation')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Hide room rates')}</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>{t('reservation.Confirm reservation without deposit')}</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{ textAlign: 'center', marginTop: 20, marginBottom: 140 }}>
            <MButton
              style={{
                color: colors.pattron,
                borderColor: colors.pattron,
                marginRight: 32,
                backgroundColor: '#e5e5e5',
              }}
            >
              {t('reservation.Save and add more details')}
            </MButton>
            <PattonButton>{t('common.Save')}</PattonButton>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Create;
