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
import _ from 'underscore';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;
const FilterBranch = 'branch_code';
const FilterArea = 'facility_code';
const FilterEqType = 'eq_no';

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
  const [facilities, setFacilities] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    page: 1,
    per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
      ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
      : 10,
    branch_code: undefined,
    facility_code: undefined,
    eq_no: undefined,
  });

  useEffect(() => {
    async function getDeviceTypes() {
      const data = await getAPI('api/device-types', 'iridium');

      setDeviceTypes(data?.data.device_type);
    }

    getDevices();
    getDeviceTypes();
  }, []);

  useEffect(() => {
    const branchId = window.localStorage.getItem('branch_id') ?? '1';
    const facilityId = window.localStorage.getItem('facility_id') ?? '1';

    async function fetchBranchInfo() {
      const response = await getAPI(`api/v1/branchs`);
      const branchInfoSelected: any = _.find(response.data, (item: any) => {
        return item.id.toString() === branchId;
      });

      setBranchs(response.data);
      setSearchCondition({
        ...searchCondition,
        branch_code: branchInfoSelected.branch_code,
      });
    }

    async function fetchFacilityInfo() {
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
      setFacilities(response.data.facilities);
      setSearchCondition({
        ...searchCondition,
        facility_code: facilityInfoSelected.facility_code,
      });
    }

    fetchBranchInfo();
    fetchFacilityInfo();
  }, []);

  async function getDevices(params?: any) {
    const data = await getAPI('api/devices', 'iridium', params);

    setDevices(data?.data.data);
    setTotal(data?.data.meta.total);
  }

  const filterData = async (value: any, type: string) => {
    if (type === FilterBranch) {
      const branchInfoSelected: any = _.find(branchs, (item: any) => {
        return item.id.toString() === value;
      });

      const response = await getAPI(`api/v1/branchs/${branchInfoSelected.id}`);

      setFacilities(response.data.facilities);
      setSearchCondition({
        ...searchCondition,
        branch_code: branchInfoSelected.branch_code,
        facility_code: undefined,
      });
    } else if (type === FilterArea) {
      const facilityInfoSelected: any = _.find(facilities, (item: any) => {
        return item.id.toString() === value;
      });

      getDevices({
        ...searchCondition,
        facility_code: facilityInfoSelected.facility_code,
      });
      changeFacility(value);
      setSearchCondition({
        ...searchCondition,
        facility_code: facilityInfoSelected.facility_code,
      });
    } else {
      getDevices({
        ...searchCondition,
        [type]: value,
      });

      setSearchCondition({
        ...searchCondition,
        page: 1,
        [type]: value === undefined ? '' : value,
      });
    }
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
        const nameClass = `btn-${convertToSlug(type)}`;

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

  const convertToSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <div className="device-manager-list">
          <div className="filter-style">
            <div>
              <Select
                allowClear
                className="input-style"
                defaultValue={window.localStorage.getItem('branch_id') ?? '1'}
                onChange={event => filterData(event, FilterBranch)}
                placeholder="Select branch"
                style={{ width: '100%', fontSize: 12 }}
              >
                {branchs.length > 0 &&
                  branchs.map((branch: any) => <Option key={branch.id}>{branch.name}</Option>)}
              </Select>
            </div>
            <div>
              <Select
                allowClear
                className="input-style"
                defaultValue={window.localStorage.getItem('facility_code') ?? '1'}
                onChange={event => filterData(event, FilterArea)}
                placeholder="Select Area"
                style={{ width: '100%', fontSize: 12 }}
              >
                {facilities.length > 0 &&
                  facilities.map((facility: any) => (
                    <Option key={facility.id} value={facility.id.toString()}>
                      {facility.name}
                    </Option>
                  ))}
              </Select>
            </div>
            <div>
              <Select
                allowClear
                className="input-style"
                onChange={event => filterData(event, FilterEqType)}
                placeholder="Select equipment type"
                style={{ width: '100%', fontSize: 12 }}
              >
                {rooms.map((item: any) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </div>
          </div>
          <Col span={24} style={{ marginTop: -10 }}>
            <Divider dashed style={{ marginBottom: 15 }} />
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
                          className={`btn-${convertToSlug(item.name)} device-type`}
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
