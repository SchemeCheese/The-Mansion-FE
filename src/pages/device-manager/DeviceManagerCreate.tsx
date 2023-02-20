/** ***********************************
Module Name : IOT
Developer Name : DungNT
Created Date : 20/02/2023
Updated Date : 20/02/2023
Main functions : Device Manager Create
************************************ */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, Form, Row, Select, Space } from 'antd';
import styled from 'styled-components';

import MInput from 'components/MInput';

const { Option } = Select;
const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
`;

function DeviceManagerCreate() {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate(`/power/device`);
  };

  return (
    <Form
      autoComplete="off"
      initialValues={{
        branch: 'all',
        area_type: 'all',
        area: 'all',
        equipment_type: 'all',
        device_type: 'all',
        counter_type: 'all',
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
                  <Select allowClear>
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
                  <Select allowClear>
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
                  <Select allowClear value="all">
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
                <Form.Item label="Select equipment type" name="equipment_type">
                  <Select allowClear value="all">
                    <Option value="all">Select branch</Option>
                    <Option value="hotel">Hotel</Option>
                    <Option value="spa">Spa</Option>
                    <Option value="restaurant">Restaurant</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="golf_course">Golf course</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Branch" name="branch_name">
                  <MInput placeholder="Basic usage" />
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
                <Form.Item label="Device Type" name="device_type">
                  <Select allowClear>
                    <Option value="all">Select branch</Option>
                    <Option value="hotel">Hotel</Option>
                    <Option value="spa">Spa</Option>
                    <Option value="restaurant">Restaurant</Option>
                    <Option value="pool">Pool</Option>
                    <Option value="golf_course">Golf course</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Function 1" name="function_1">
                  <MInput placeholder="Off" />
                </Form.Item>
                <Form.Item label="Function 2" name="function_2">
                  <MInput placeholder="Off" />
                </Form.Item>
                <Form.Item label="Counter type" name="counter_type">
                  <Select allowClear>
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
                <Form.Item label="Device ID" name="device_id">
                  <MInput placeholder="2509" />
                </Form.Item>
                <Form.Item label="Topic address cmd" name="topic_address_cmd">
                  <MInput placeholder="input topic address" />
                </Form.Item>
                <Form.Item label="Topic address cmd" name="topic_address_cmd_1">
                  <MInput placeholder="input topic address" />
                </Form.Item>
                <Form.Item label="Meter" name="meter">
                  <MInput placeholder="meter" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Device Name" name="device_name">
                  <MInput placeholder="input device name" />
                </Form.Item>
                <Form.Item label="Topic address stt" name="topic_address_stt">
                  <MInput placeholder="input topic address stt" />
                </Form.Item>
                <Form.Item label="Topic address stt" name="topic_address_stt_1">
                  <MInput placeholder="input topic address stt" />
                </Form.Item>
              </Col>
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
