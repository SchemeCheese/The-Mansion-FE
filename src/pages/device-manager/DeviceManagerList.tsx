/** ***********************************
Module Name : IOT
Developer Name : DungNT
Created Date : 20/02/2023
Updated Date : 20/02/2023
Main functions : Device Manager List
************************************ */

import 'styles/device-manager.css';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  Tag,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { getAPI } from 'helpers/apiService';
import { t } from 'i18next';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;
const FilterBranch = 'branch';
const FilterArea = 'area';
const FilterEqType = 'eq_type';

interface DataType {
  action: string;
  area: string;
  branch: string;
  connection: string;
  device_id: string;
  device_name: string;
  eq_no: number;
  eq_type: string;
  last_seen: string;
  type: string;
}

const columnsModal = [
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
];

function DeviceManagerList() {
  const navigate = useNavigate();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [items, setDevices] = useState([]);
  const [total, setTotal] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
      ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
      : 10,
    branch: '',
    area: '',
    eq_type: '',
  });

  useEffect(() => {
    async function getDeviceTypes() {
      const data = await getAPI('api/device-types', 'iridium', {});

      setDeviceTypes(data?.data.device_type);
    }

    getDevices();
    getDeviceTypes();
  }, []);

  async function getDevices(params?: any) {
    const data = await getAPI('api/devices', 'iridium', params);

    setDevices(data?.data.data);
    setTotal(data?.data.meta.total);
  }

  const filterData = (value: any, type: string) => {
    setSearchCondition({
      ...searchCondition,
      [type]: value.toLowerCase(),
    });

    getDevices({
      ...searchCondition,
      [type]: value.toLowerCase(),
    });
  };

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      page,
      per_page: pageSize,
    });

    getDevices({
      ...searchCondition,
      page,
      per_page: pageSize,
    });
  };

  const columnsDevice: ColumnsType<DataType> = [
    {
      title: 'Device ID',
      dataIndex: 'id',
      key: 'device_id',
      render: (text: any) => {
        return (
          <button onClick={showModal} type="button">
            {text}
          </button>
        );
      },
    },
    {
      title: 'Device Name',
      dataIndex: 'device_name',
      key: 'device_name',
    },
    {
      title: 'Type',
      dataIndex: 'device_type',
      key: 'type',
      render: (type: any) => {
        const nameClass = `btn-${type.toLowerCase()}`;

        return (
          <Tag key={type} className={nameClass}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: 'Eq Type',
      key: 'eq_type',
      dataIndex: 'eq_type',
    },
    {
      title: 'Eq No',
      key: 'eq_no',
      dataIndex: 'eq_no',
    },
    {
      title: 'Connection',
      key: 'connection',
      dataIndex: 'connection',
    },
    {
      title: 'Last Seen',
      key: 'last_seen',
      dataIndex: 'last_seen',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (action: any) => {
        return <span className="device_list-action"> {action ? 'On' : 'Off'} </span>;
      },
    },
  ];

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = (event: any) => {
    setModalVisible(false);
  };

  const handleCancel = (event: any) => {
    setModalVisible(false);
  };

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <div className="device-manager-list">
          <div className="filter-style">
            <div>
              <span className="label-filter">Branch</span>
              <Select
                className="input-style"
                onChange={event => filterData(event, FilterBranch)}
                placeholder="Select branch"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="">All branch</Option>
                <Option value="br_hn">Hanoi Branch</Option>
                <Option value="br_pq">Phu Quoc Branch</Option>
                <Option value="br_vt">Vung Tau Branch</Option>
                <Option value="br_qn">Quang Ninh Branch</Option>
                <Option value="br_cm">Ca Mau Branch</Option>
                <Option value="br_hcm">Ho Chi Minh Branch</Option>
                <Option value="br_dn">Da Nang Branch</Option>
              </Select>
            </div>
            <div>
              <span className="label-filter">Area</span>{' '}
              <Select
                className="input-style"
                onChange={event => filterData(event, FilterArea)}
                placeholder="Select Area"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="">All Area</Option>
                <Option value="hotel">Hotel</Option>
                <Option value="spa">Spa</Option>
                <Option value="restaurant">Restaurant</Option>
                <Option value="pool">Pool</Option>
                <Option value="golf_course">Golf course</Option>
                <Option value="other">Other</Option>
              </Select>
            </div>
            <div>
              <span className="label-filter">Eq Type</span>
              <Select
                className="input-style"
                onChange={event => filterData(event, FilterEqType)}
                placeholder="Select equipment type"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="">All</Option>
                <Option value="Locker">Locker</Option>
                <Option value="Room">Room</Option>
              </Select>
            </div>
          </div>
          <Col span={24} style={{ paddingTop: 16 }}>
            <Divider dashed />
            <Row align="middle" justify="space-between">
              <Col xs={2}>
                <PattonButton onClick={() => navigate(`/power/device/create`)}>
                  {' '}
                  <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> {t('common.New')}
                </PattonButton>
              </Col>
              <Col
                style={{
                  textAlign: 'right',
                }}
                xs={22}
              >
                <div className="scroll-Type">
                  {deviceTypes &&
                    deviceTypes.map((item: any) => {
                      return (
                        <Button
                          key={item.id}
                          className={`btn-${item.name.toLowerCase()}`}
                          size="small"
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                </div>
              </Col>
            </Row>
          </Col>
        </div>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        {items ? (
          <>
            <Table
              className="table-device-manager-list"
              columns={columnsDevice}
              dataSource={items}
              pagination={false}
              size="small"
              style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
            />
            {total > 0 && (
              <Pagination
                defaultCurrent={searchCondition.page}
                onChange={onChangeCurrentPage}
                pageSize={searchCondition.per_page}
                showSizeChanger={false}
                style={{ float: 'right', marginTop: 15 }}
                total={total}
              />
            )}
          </>
        ) : (
          <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
        )}
      </Col>
      <Modal
        className="modal-update-device"
        onCancel={handleCancel}
        onOk={handleOk}
        title="Device Detail"
        visible={modalVisible}
        width={1024}
      >
        <Card className="mb3" title="Counter Info">
          <Form autoComplete="off" layout="vertical">
            <Row justify="space-around">
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item label="Device ID" name="device_id">
                        <MInput value="2509" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item label="Branch">
                        <Input id="branch" value="SUNPREMIER" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item label="Device Name">
                        <Input id="device-name" placeholder="Input device name" value="" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item label="Area">
                        <Input id="area" value="Hotel" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item initialValue="" label="Topic address">
                        <Input id="topic-address" placeholder="Input topic address" value="" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={18}>
                    <div className="form-item">
                      <Form.Item initialValue="" label="Equipment No">
                        <Input id="equipment-no" value="101" />
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="Counter Info">
          <Table columns={columnsModal} dataSource={undefined} pagination={false} />
        </Card>
      </Modal>
    </Row>
  );
}

export default DeviceManagerList;
