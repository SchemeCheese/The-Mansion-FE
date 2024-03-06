/** ***********************************
Module Name : IOT
Developer Name : DungNT
Created Date : 20/02/2023
Updated Date : 22/07/2023
Main functions : Device Manager Create
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message, Row, Select, Space } from 'antd';
import { getAPI, postAPI } from 'helpers/apiService';
import styled from 'styled-components';
import _ from 'underscore';

import MInput from 'components/MInput';

const { Option } = Select;
const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
`;

function DeviceManagerCreate() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const facilityInfoSelected: any = _.find(facilities, (item: any) => {
      return item.id.toString() === values.facility_id;
    });

    const response = await postAPI(
      'api/devices/create',
      {
        ...values,
        operator_code: facilityInfoSelected.operator_code,
        branch_code: facilityInfoSelected.branch_code,
        facility_code: facilityInfoSelected.facility_code,
      },
      'iridium',
    );

    if (response.status === 200 && response.data.success) {
      message.success('Create device successfully!');
    }

    navigate(`/power/device`);
  };

  const changeBranch = async (value: string) => {
    const response = await getAPI(`api/v1/branchs/${value}`);

    setFacilities(response.data.facilities);
    form.setFieldsValue({
      facility_id: undefined,
    });
  };

  const changeFacility = async (value: string) => {
    if (value) {
      try {
        const facilityInfoSelected: any = _.find(facilities, (item: any) => {
          return item.id.toString() === value;
        });
        const response = await getAPI(
          `api/v1/rooms?operator_code=${facilityInfoSelected.operator_code}&branch_code=${facilityInfoSelected.branch_code}&facility_code=${facilityInfoSelected.facility_code}`,
        );

        setRooms(response.data.items);
      } catch (error) {
        console.log('error', error);

        setRooms([]);
      }
    }
  };

  const changeDeviceType = (value: string) => {
    const deviceTypeSelected: any = _.find(deviceTypes, (item: any) => {
      return item.id.toString() === value.toString();
    });

    const functions = [];

    for (let index = 0; index < deviceTypeSelected.no_of_funcs; index++) {
      functions.push({
        topic_kind: undefined,
        topic_address: '',
        topic_function_name: '',
      });
    }

    form.setFieldsValue({
      device_topics: functions,
    });
  };

  useEffect(() => {
    async function getDeviceTypes() {
      const branchId = window.localStorage.getItem('branch_id') ?? '1';

      const facilityId = window.localStorage.getItem('facility_id') ?? '1';
      const response = await getAPI(`api/v1/branchs/${branchId}`);

      const facilityInfoSelected: any = _.find(response.data.facilities, (item: any) => {
        return item.id.toString() === facilityId;
      });
      const data = await getAPI(
        `api/device-types?operator_code=${facilityInfoSelected.operator_code}&branch_code=${facilityInfoSelected.branch_code}&facility_code=${facilityInfoSelected.facility_code}`,
        'iridium',
      );

      setDeviceTypes(data?.data.device_type);
    }

    getDeviceTypes();
  }, []);

  useEffect(() => {
    const branchId = window.localStorage.getItem('branch_id') ?? '1';

    async function fetchBranchInfo() {
      const response = await getAPI(`api/v1/branchs`);

      setBranchs(response.data);
    }

    async function fetchFacilityInfo() {
      const facilityId = window.localStorage.getItem('facility_id') ?? '1';
      const response = await getAPI(`api/v1/branchs/${branchId}`);

      const facilityInfoSelected: any = _.find(response.data.facilities, (item: any) => {
        return item.id.toString() === facilityId;
      });

      try {
        const responseRoom = await getAPI(
          `api/v1/rooms?operator_code=${facilityInfoSelected.operator_code}&branch_code=${facilityInfoSelected.branch_code}&facility_code=${facilityInfoSelected.facility_code}`,
        );

        setRooms(responseRoom.data.items);
      } catch (error) {
        console.log('error', error);

        setRooms([]);
      }

      setFacilities(response.data.facilities);
    }

    fetchBranchInfo();
    fetchFacilityInfo();
  }, []);

  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={{
        branch_id: window.localStorage.getItem('branch_id') ?? '1',
        facility_id: window.localStorage.getItem('facility_id') ?? '1',
        device_topics: [
          {
            topic_kind: undefined,
            topic_address: '',
            topic_function_name: '',
          },
          {
            topic_kind: undefined,
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
                <Form.Item
                  label={t('report.Branch.title')}
                  name="branch_id"
                  rules={[{ required: true, message: 'Please select branch' }]}
                >
                  <Select
                    allowClear
                    onChange={changeBranch}
                    placeholder={t('report.Branch.placeholder')}
                  >
                    {branchs.length > 0 &&
                      branchs.map((branch: any) => <Option key={branch.id}>{branch.name}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={t('report.Facility.title')}
                  name="facility_id"
                  rules={[{ required: true, message: 'Please select facility' }]}
                >
                  <Select
                    allowClear
                    onChange={changeFacility}
                    placeholder={t('report.Facility.placeholder')}
                  >
                    {facilities.length > 0 &&
                      facilities.map((facility: any) => (
                        <Option key={facility.facility_id} value={facility.id.toString()}>
                          {facility.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select equipment info"
                  name="equipment_info_id"
                  rules={[{ required: true, message: 'Select equipment info' }]}
                >
                  <Select allowClear placeholder="Select equipment info">
                    {rooms.map((item: any) => {
                      return <Option value={item.id}>{item.name}</Option>;
                    })}
                  </Select>
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
                  <Select allowClear onChange={changeDeviceType} placeholder="Select device type">
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
                                <Option value="2">cmd</Option>
                                <Option value="1">stt</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={6}>
                            <Form.Item
                              {...field}
                              label="Function Name"
                              name={[field.name, 'topic_function_name']}
                            >
                              <Input placeholder="Input function name" />
                            </Form.Item>
                          </Col>
                          <Col span={5}>
                            <Form.Item
                              {...field}
                              label="Parameter"
                              name={[field.name, 'topic_parameter']}
                            >
                              <Select
                                options={[
                                  {
                                    label: 'Common',
                                    options: [
                                      { label: 'boolean', value: 'boolean' },
                                      // { label: '1', value: '1' },
                                      // { label: '2', value: '2' },
                                      // { label: '3', value: '3' },
                                      // { label: '4', value: '4' },
                                      // { label: '5', value: '5' },
                                    ],
                                  },
                                  {
                                    label: 'Custom',
                                    options: [{ label: 'Empty', value: '' }],
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
