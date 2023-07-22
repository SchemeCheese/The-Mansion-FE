/** ***********************************
Module Name : IOT
Developer Name : DungNT
Created Date : 20/02/2023
Updated Date : 22/07/2023
Main functions : Device Manager Create
************************************ */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Select, Space } from 'antd';
import { getAPI, postAPI } from 'helpers/apiService';
import { selectGetRooms } from 'selectors';
import styled from 'styled-components';

import { useAppSelector } from 'modules/hooks';

import MInput from 'components/MInput';

const { Option } = Select;
const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
`;

function DeviceManagerCreate() {
  const navigate = useNavigate();
  const [deviceTypes, setDeviceTypes] = useState([]);

  const [form] = Form.useForm();
  const getRoomsData = useAppSelector(selectGetRooms);

  const onFinish = async (values: any) => {
    const response = await postAPI(
      'api/devices/create',
      {
        ...values,
        operator_code: 'the_mansion',
        branch_code: 'the_mansion',
        facility_code: 'hotel',
      },
      'iridium',
    );

    if (response.status === 200 && response.data.success) {
      message.success('Create device successfully!');
    }

    navigate(`/power/device`);
  };

  useEffect(() => {
    async function getDeviceTypes() {
      const data = await getAPI('api/device-types', 'iridium');

      setDeviceTypes(data?.data.device_type);
    }

    getDeviceTypes();
  }, []);

  console.log('ssssss', deviceTypes);

  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={{
        branch: 'the_mansion',
        // area_type: 'all',
        // area: 'all',
        // counter_type: '1',
        device_topics: [
          {
            topic_kind: '1',
            topic_address: '',
            topic_function_name: '',
          },
          {
            topic_kind: '2',
            topic_address: '',
            topic_function_name: '',
          },
        ],
      }}
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
      <Row justify="space-between" style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <BreadscrumTitle
                style={{
                  color: 'rgba(0, 0, 0, 0.85)',
                  fontWeight: '600',
                  fontSize: '20px',
                  lineHeight: '32px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                Create New Device:
              </BreadscrumTitle>
            </Col>
            <Col span={24}>
              <p style={{ color: '#8C8C8C', fontSize: 14, lineHeight: '22px' }}>
                Create new device for your branch.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="content">
        <Col span={24}>
          <Card bordered={false} size="small" title="Business Unit Informations">
            <Row>
              <Col span={8}>
                <Form.Item label="Branch" name="branch">
                  <Select allowClear disabled>
                    <Option value="all">Select branch</Option>
                    <Option value="hotel">Hotel</Option>
                    <Option value="spa">Spa</Option>
                    <Option value="restaurant">Restaurant</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="golf_course">Golf course</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Area" name="area">
                  <Select allowClear disabled>
                    <Option value="all">Select branch</Option>
                    <Option value="hotel">Hotel</Option>
                    <Option value="spa">Spa</Option>
                    <Option value="restaurant">Restaurant</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="golf_course">Golf course</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Select Area Type" name="area_type">
                  <Select allowClear disabled value="all">
                    <Option value="all">Select branch</Option>
                    <Option value="hotel">Hotel</Option>
                    <Option value="spa">Spa</Option>
                    <Option value="restaurant">Restaurant</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="golf_course">Golf course</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select equipment type"
                  name="equipment_info_id"
                  rules={[{ required: true, message: 'Select equipment type' }]}
                >
                  <Select allowClear placeholder="Select equipment type">
                    {getRoomsData.items?.map((item: any) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Branch" name="branch_name">
                  <MInput disabled placeholder="Basic usage" />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            bordered={false}
            size="small"
            style={{
              marginTop: '24px',
              marginBottom: '24px',
            }}
            title="Device Informations"
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label="Device Type"
                  name="device_type_id"
                  rules={[{ required: true, message: 'Select device type' }]}
                >
                  <Select allowClear placeholder="Select device type">
                    {deviceTypes.map((item: any) => (
                      <Option value={item.id}>{item.name}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Device Code"
                  name="device_code"
                  rules={[{ required: true, message: 'Input device code' }]}
                >
                  <MInput placeholder="2509" />
                </Form.Item>
                <Form.Item
                  label="Device Name"
                  name="device_name"
                  rules={[{ required: true, message: 'Input device name' }]}
                >
                  <MInput placeholder="Input device name" />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.List name="device_topics">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(field => (
                        <Row key={field.key}>
                          <Col span={6}>
                            <Form.Item
                              noStyle
                              shouldUpdate={(previousValues, currentValues) =>
                                previousValues.area !== currentValues.area ||
                                previousValues.sights !== currentValues.sights
                              }
                            >
                              {() => (
                                <Form.Item
                                  {...field}
                                  label="Topic Address"
                                  name={[field.name, 'topic_address']}
                                  rules={[{ required: true, message: 'Input topic address' }]}
                                >
                                  <Input placeholder="hotel/room/504" />
                                </Form.Item>
                              )}
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              {...field}
                              label="Topic Type"
                              name={[field.name, 'topic_kind']}
                              rules={[{ required: true, message: 'Input topic type' }]}
                            >
                              <Select placeholder="Select topic type">
                                <Option value="1">cmd</Option>
                                <Option value="2">stt</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              {...field}
                              label="Function Name"
                              name={[field.name, 'topic_function_name']}
                              rules={[{ required: true, message: 'Input function name' }]}
                            >
                              <Input placeholder="Input function name" />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              {...field}
                              label="Parameter"
                              name={[field.name, 'topic_parameter']}
                              rules={[{ required: true, message: 'Input parameter' }]}
                            >
                              <Select
                                options={[
                                  {
                                    label: 'Common',
                                    options: [
                                      { label: 'boolean', value: 'boolean' },
                                      { label: 'integer_100', value: 'integer_100' },
                                    ],
                                  },
                                  {
                                    label: 'Light',
                                    options: [
                                      { label: 'integer_red', value: 'integer_red' },
                                      { label: 'integer_green', value: 'integer_green' },
                                      { label: 'integer_blue', value: 'integer_blue' },
                                    ],
                                  },
                                  {
                                    label: 'Media',
                                    options: [
                                      { label: 'media_play_stop', value: 'media_play_stop' },
                                      { label: 'media_skip', value: 'media_skip' },
                                      { label: 'media_volume', value: 'media_volume' },
                                      { label: 'media_pair', value: 'media_pair' },
                                    ],
                                  },
                                  {
                                    label: 'Curtain',
                                    options: [
                                      { label: 'curtain_close', value: 'curtain_close' },
                                      { label: 'curtain_open', value: 'curtain_open' },
                                      { label: 'curtain_stop', value: 'curtain_stop' },
                                    ],
                                  },
                                  {
                                    label: 'Air',
                                    options: [
                                      { label: 'air_fan', value: 'air_fan' },
                                      { label: 'air_condition_mode', value: 'air_condition_mode' },
                                      { label: 'air_temproom', value: 'air_temproom' },
                                    ],
                                  },
                                ]}
                                placeholder="Select type"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={1}>
                            <MinusCircleOutlined
                              onClick={() => remove(field.name)}
                              style={{ position: 'relative', top: 34 }}
                            />
                          </Col>
                        </Row>
                      ))}

                      <Form.Item>
                        <Button block icon={<PlusOutlined />} onClick={() => add()} type="dashed">
                          Add function
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
              {/* <Col span={8}>
                <Form.Item label="Device Name" name="device_name">
                  <MInput placeholder="input device name" />
                </Form.Item>
                <Form.Item label="Topic address stt" name="topic_address_stt">
                  <MInput placeholder="input topic address stt" />
                </Form.Item>
                <Form.Item label="Topic address stt" name="topic_address_stt_1">
                  <MInput placeholder="input topic address stt" />
                </Form.Item>
              </Col> */}
              <Col
                span={24}
                style={{
                  textAlign: 'center',
                }}
              >
                <Form.Item>
                  <Space>
                    <Button htmlType="button">Reset</Button>
                    <Button htmlType="submit" type="primary">
                      Submit
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}

export default DeviceManagerCreate;
