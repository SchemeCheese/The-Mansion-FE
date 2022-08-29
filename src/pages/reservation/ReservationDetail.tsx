import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tabs,
  TimePicker,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import styled from 'styled-components';

import BreadcrumbList from 'components/BreadcrumbList';
import MButton from 'components/MButton';
import MInfoButton from 'components/MInfoButton';
import PattonButton from 'components/PattonButton';

const { Option } = Select;
const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

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

const format = 'HH:mm';

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

const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
`;

const BreadscrumData = styled.p`
  color: rgba(0 0 0 65%);
  font-size: 14px;
`;

function ReservationDetail() {
  const breadcrumbData = ['TMHA', 'Reservation', 'Reservation Detail'];

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
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
      <Row style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 35 }}>
        <Col span={8}>
          <svg
            fill="none"
            height="20"
            viewBox="0 0 18 20"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0148 3.43912L9.4037 14.9198L4.60435 4.75035C4.42343 4.18284 4.20583 3.66109 3.95156 3.18511C2.8269 1.11186 1.75603 0.0500579 0.736505 0.00200232C0.421112 -0.0140162 0.257303 0.0660764 0.247523 0.24228C0.242633 0.333815 0.381993 0.441368 0.663158 0.562651C1.08613 0.73199 1.41374 0.910482 1.64846 1.09584C2.26946 1.56953 2.57508 1.90821 2.5653 2.10958C2.56285 2.13704 2.4895 2.18052 2.34281 2.24002C2.19611 2.29952 2.11788 2.41165 2.1081 2.57183C2.09587 2.77321 2.28902 3.08443 2.68265 3.50777C3.25476 4.11419 3.65084 4.59246 3.87821 4.938L3.932 5.14166L3.82442 5.13709C3.72418 5.13251 3.60683 5.0959 3.4748 5.02953C3.34033 4.96317 3.25965 4.92885 3.23276 4.92656C2.91736 4.91054 2.74866 5.07759 2.7291 5.42771C2.71933 5.58789 2.9736 6.00895 3.49192 6.68631C3.72663 6.99295 3.90511 7.22865 4.03224 7.40028V7.92431C3.99312 7.89914 3.92466 7.83278 3.82442 7.72294C3.69484 7.58106 3.5457 7.50783 3.37212 7.49868C2.95648 7.47808 2.73644 7.68403 2.71199 8.11425C2.69977 8.32935 2.78045 8.58336 2.95159 8.87398C3.24498 9.29275 3.5457 9.70466 3.85621 10.1097C3.92466 10.2127 3.9809 10.3134 4.03224 10.4141V11.588C3.53592 10.6292 2.96626 10.128 2.32325 10.096C1.83427 10.0731 1.58 10.2493 1.56044 10.6246C1.54577 10.906 1.90517 11.6772 2.64353 12.9381C3.37945 14.199 3.73641 15.0503 3.71196 15.4942C3.70951 15.5354 3.6924 15.5812 3.66061 15.6338C3.5237 15.5194 3.38434 15.2768 3.24743 14.9061C3.07384 14.4004 2.92714 14.0434 2.80979 13.8352C2.65331 13.5583 2.42349 13.3111 2.12766 13.096C1.82938 12.8786 1.58733 12.7665 1.40152 12.7573C0.897869 12.7322 0.631374 13.0159 0.59959 13.6086C0.580031 13.945 0.822076 14.3935 1.32328 14.9564C1.93451 15.6315 2.32569 16.2105 2.50173 16.691L2.47483 16.81C2.38926 16.8054 2.31592 16.7963 2.25968 16.7803C1.89295 16.627 1.55066 16.4302 1.23527 16.1853C0.958991 15.9839 0.812297 15.8832 0.797627 15.8809C0.293976 15.8581 0.0274815 16.0938 0.000587477 16.5926C-0.0116371 16.8352 0.166841 17.0778 0.543357 17.3249C1.44553 17.9061 1.87828 18.5538 1.83916 19.2654C1.83427 19.373 1.8196 19.4737 1.80248 19.5675L1.81471 19.7506C1.91006 19.849 2.02986 19.9016 2.17411 19.9085C2.54818 19.9268 3.06406 19.0274 3.72418 17.2151C4.59701 14.842 5.086 12.8328 5.19602 11.1784L9.36214 20L14.0344 10.4049L15.5575 19.3226H18L15.0148 3.43912Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
          <span style={{ paddingLeft: 10, fontSize: 20 }}>Folio：234231029431</span>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <MInfoButton>Copy to new reservation</MInfoButton>
            <Select
              className="download-select"
              onChange={handleChange}
              placeholder="Download"
              style={{
                width: 120,
                textAlign: 'left',
              }}
            >
              <Option value="pdf">PDF</Option>
              <Option value="docx">Docx</Option>
            </Select>
            <MButton>Resend Email</MButton>
            <PattonButton>Update</PattonButton>
          </Space>
        </Col>
      </Row>
      <Row justify="space-between" style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Col span={6}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Branch Code:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <p style={{ color: '#1D39C4', fontSize: 14 }}>TMHA</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Status:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>Reserved</BreadscrumData>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Created by:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>TrangVo</BreadscrumData>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Checkbox>Hide room rates in confirmation</Checkbox>
        </Col>
        <Col span={8} style={{ paddingRight: 20 }}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Total Amount (VND)</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <p>4.800.000</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Deposit (VND)</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <p>4.800.000</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>Amount Due (VND)</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <p>4.800.000</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form
        autoComplete="off"
        initialValues={{
          remember: true,
        }}
        labelCol={{
          span: 24,
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
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Tabs className="tabs-cart" defaultActiveKey="1" onChange={onChange}>
              <TabPane key="1" tab="General Infos">
                <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
                  <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
                    <span style={{ paddingRight: 15 }}>Created Date: </span>
                    <span>2017-08-08</span>
                    <PattonButton style={{ float: 'right' }}>Update</PattonButton>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Room Type"
                      name="room_type"
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
                      label="Adults"
                      name="room_type"
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
                      label="Child"
                      name="room_type"
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
                      label="Baby"
                      name="room_type"
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
                  <Col span={8}>
                    <Form.Item
                      label="Checkin"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Checkin Time"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TimePicker
                        defaultValue={moment('2017-08-08')}
                        format={format}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Early Checkin</Checkbox>
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Honeymoon Setup</Checkbox>
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Pickup Request</Checkbox>
                    </Form.Item>
                    <Form.Item
                      label="Pickup Time"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      style={{ marginTop: 55 }}
                    >
                      <TimePicker
                        defaultValue={moment('2017-08-08')}
                        format={format}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Pickup Transport Code"
                      name="room_type"
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
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Checkout"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Checkout Time"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TimePicker
                        defaultValue={moment('2017-08-08')}
                        format={format}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Late Checkout</Checkbox>
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Birthday Setup</Checkbox>
                    </Form.Item>
                    <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
                      <Checkbox>Dropoff Request</Checkbox>
                    </Form.Item>
                    <Form.Item
                      label="Dropoff Time"
                      name="market"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      style={{ marginTop: 55 }}
                    >
                      <TimePicker
                        defaultValue={moment('2017-08-08')}
                        format={format}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Dropoff Transport Code"
                      name="room_type"
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
                  </Col>
                </Row>
              </TabPane>
              <TabPane key="2" tab="Rates">
                Content of Tab Pane 2
              </TabPane>
              <TabPane key="3" tab="Schedule">
                Content of Tab Pane 3
              </TabPane>
              <TabPane key="4" tab="Guest List">
                Content of Tab Pane 3
              </TabPane>
              <TabPane key="5" tab="Transactions">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default ReservationDetail;
