/** ***********************************
Module Name : IOT
Developer Name : DungNT
Created Date : 20/02/2023
Updated Date : 20/02/2023
Main functions : Device Manager List
************************************ */

import 'styles/device-manager.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { t } from 'i18next';

import { getDeviceManagerAction } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

const { Option } = Select;
const FilterBranch = 'FilterBranch';
const FilterArea = 'FilterArea';
const FilterEqType = 'FilterEqType';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resultFilter, setResultFilter]: any[] = useState([]);
  const [checkFilter, setCheckFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const items: any = useSelector<RootState>(({ getDeviceManager }) => getDeviceManager.data);

  useEffect(() => {
    dispatch(getDeviceManagerAction());
  }, []);

  const total = items?.length;
  const currentPage = 1;

  const filterData = (value: any, type: string) => {
    setResultFilter([]);
    let dataCurrent: any[] = [];

    switch (type) {
      case FilterBranch:
        dataCurrent = items.filter((device: DataType) => {
          return (
            device.branch.toLowerCase() === value.toLowerCase() ||
            (value.toLowerCase() === 'all' && true)
          );
        });
        break;
      case FilterArea:
        dataCurrent = items.filter((device: DataType) => {
          return (
            device.area.toLocaleLowerCase() === value.toLowerCase() ||
            (value.toLowerCase() === 'all' && true)
          );
        });
        break;
      case FilterEqType:
        dataCurrent = items.filter((device: DataType) => {
          return (
            device.eq_type.toLowerCase() === value.toLowerCase() ||
            (value.toLowerCase() === 'all' && true)
          );
        });
        break;
      default:
        break;
    }

    setResultFilter(dataCurrent);
    setCheckFilter(true);
  };

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    console.log('onChangeCurrentPage', page, pageSize);
  };

  const columnsDevice: ColumnsType<DataType> = [
    {
      title: 'Device ID',
      dataIndex: 'device_id',
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
      dataIndex: 'type',
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
                <Option value="all">All branch</Option>
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
                <Option value="all">All Area</Option>
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
                <Option value="all">All</Option>
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
                  <Button className="btn-music" size="small">
                    Music
                  </Button>
                  <Button className="btn-aircon" size="small">
                    Aircon
                  </Button>
                  <Button className="btn-counter" size="small">
                    Counter
                  </Button>
                  <Button className="btn-lightning" size="small">
                    Lightning
                  </Button>
                  <Button className="btn-door" size="small">
                    Door
                  </Button>
                  <Button className="btn-headpump" size="small">
                    Headpump
                  </Button>
                  <Button className="btn-curtain" size="small">
                    Curtain
                  </Button>
                  <Button className="btn-other" size="small">
                    Other
                  </Button>
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
              dataSource={checkFilter ? resultFilter : items}
              pagination={false}
              size="small"
              style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
            />
            {total > 0 && (
              <Pagination
                defaultCurrent={currentPage}
                onChange={onChangeCurrentPage}
                pageSize={20}
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
