/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 24/08/2022
Updated Date : 30/08/2022
Main functions : Create Reservation Page
************************************ */

import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Form, Input, Row, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import { colors } from 'modules/theme';

import BreadcrumbList from 'components/BreadcrumbList';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

const columns = [
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Room Type',
    dataIndex: 'room_type',
  },
  {
    title: 'Room No',
    dataIndex: 'room_no',
  },
  {
    title: 'C/I',
    dataIndex: 'ci',
  },
  {
    title: 'C/O',
    dataIndex: 'co',
  },
  {
    title: 'Nights',
    dataIndex: 'nights',
  },
  {
    title: 'Adl',
    dataIndex: 'adl',
  },
  {
    title: 'Child',
    dataIndex: 'child',
  },
  {
    title: 'Baby',
    dataIndex: 'baby',
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
  },
  {
    title: 'Subtotal(VND)',
    dataIndex: 'subtotal',
  },
  {
    title: 'Deposit(VND)',
    dataIndex: 'deposit',
  },
];

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
  const breadcrumbData = ['TMHA', 'Reservation'];

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
      <p className="title">Create New Reservation</p>
      <p style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.45)', paddingLeft: 24 }}>
        Create new reservation for your branch. Please note that pricing is depends on selected
        market and booking source.
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
                    label="Folio ID"
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
                    label="OTA Booking ID"
                    name="ota_booking_id"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Input Booking ID" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Market"
                    name="market"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select allowClear onChange={onGenderChange} placeholder="Select market">
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Source"
                    name="source"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select allowClear onChange={onGenderChange} placeholder="Select source">
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Notes"
                    name="note"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea placeholder="Input notes" rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <Card
              bordered={false}
              size="small"
              style={{ marginTop: 20 }}
              title="Booker Informations"
            >
              <Row>
                <Col span={8}>
                  <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select allowClear onChange={onGenderChange} placeholder="Select type">
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="First Name"
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
                    label="Last Name"
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
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Input email" />
                  </Form.Item>
                  <Form.Item
                    label="Mobile Phone"
                    name="mobile_phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Input phone number" />
                  </Form.Item>
                  <Form.Item
                    label="Rank"
                    name="rank"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select allowClear onChange={onGenderChange} placeholder="Select rank">
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Additional Email"
                    name="email_2"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input placeholder="Input email" />
                  </Form.Item>
                  <Form.Item
                    label="Note"
                    name="gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <TextArea placeholder="Input notes" rows={5} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>

            <Card bordered={false} size="small" style={{ marginTop: 20 }} title="Rooming List">
              <Row>
                <Col span={24}>
                  <PattonButton>
                    {' '}
                    <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> New
                  </PattonButton>
                  <MButton style={{ marginLeft: 15 }}>Delete Selected</MButton>
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
              title="Payment Informations"
            >
              <Row style={{ paddingTop: 10 }}>
                <Col span={8}>
                  <p style={{ marginBottom: 25 }}>
                    <span>Total Amount (VND) </span>
                    <span style={{ float: 'right', paddingRight: '12.5%' }}>4,800,000</span>{' '}
                  </p>
                  <Form.Item
                    label="Payment Method"
                    name="gender"
                    wrapperCol={{
                      span: 21,
                    }}
                  >
                    <Select
                      allowClear
                      onChange={onGenderChange}
                      placeholder="Select payment method"
                    >
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>Paid</Checkbox>
                  </Form.Item>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>Email reservation confirmation</Checkbox>
                  </Form.Item>
                  <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>Hide room rates</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Confirm reservation without deposit</Checkbox>
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
              Save and add more details
            </MButton>
            <PattonButton>Save</PattonButton>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Create;
