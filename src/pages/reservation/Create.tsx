/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 24/08/2022
Updated Date : 30/08/2022
Main functions : Create Reservation Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { selectCreateReservation } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import { createReservation, searchRoom, searchRoomReset } from 'actions';

import BreadcrumbList from 'components/BreadcrumbList';
import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';
import TableSummary from 'components/TableSummary';

import { RootState } from 'types';

import CancelBookingModal from './CancelBookingModal';

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
  const dispatch = useDispatch();
  const [roomList, setRoomList] = useState<any>([]);

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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCancelBookingModalVisible, setIsCancelBookingModalVisible] = useState(false);

  const showModal = () => {
    dispatch(searchRoomReset());
    setRoomSelected([]);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const data1 = [...roomList];

    roomSelected.forEach((item: any) => {
      data1.push({
        status: 'Waitlist',
        name: '-',
        room_type: item.room_type,
        room_no: '-',
        ci: item.checkin,
        co: item.checkout,
        nights: 1,
        adl: 2,
        child: '-',
        baby: '-',
        rate: item.rate_name,
        subtotal: item.subtotal,
        deposit: '-',
      });
    });

    setRoomList(data1);

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    dispatch(
      createReservation({
        payload: values,
      }),
    );
  };

  const status = useSelector<RootState>(
    ({ createReservation: createReservationTemporary }) => createReservationTemporary.status,
  );
  const navigate = useNavigate();
  const createReservationData = useAppSelector(selectCreateReservation);

  const { changed } = useTreeChanges(createReservationData);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      navigate('/reservation', {
        state: {
          message: 'Create reservation successfully!',
        },
      });
    }
  }, [changed, status]);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columnsSearchRoom = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Rate Name',
      dataIndex: 'rate_name',
      key: 'rate_name',
      // render: (text: any) => {
      //   const option123: any[] = text?.map((item: any) => {
      //     return <Option value="rate name 1">{item.rate_name}</Option>;
      //   });

      //   return (
      //     <Select placeholder="Select rate" showSearch style={{ width: '100%' }}>
      //       {option123}
      //     </Select>
      //   );
      // },
    },
    {
      title: 'Adl',
      dataIndex: 'adult',
      key: 'adult',
    },
    {
      title: 'Child',
      dataIndex: 'child',
      key: 'child',
    },
    {
      title: 'Rate detail',
      dataIndex: 'rate_detail',
      key: 'rate_detail',
    },
    {
      title: 'Unit price',
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: 'Updated price',
      dataIndex: 'updated_price',
      key: 'updated_price',
      render: (text: string, record: any, index: number) => {
        console.log('searchRoomResultState', record, index, text);

        return (
          <Input
            name="updated_price"
            onChange={event => {
              const stateTemporary = [...searchRoomResultState];
              const xxx = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...xxx,
                updated_price: event.target.value,
              };

              setSearchRoomResultState(stateTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4 }}
            value={searchRoomResultState[index]?.updated_price}
          />
        );
      },
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: () => (
        <Button style={{ color: '#1D39C4', paddingLeft: 0 }} type="link">
          Duplicate
        </Button>
      ),
    },
  ];

  // const dataSearchRoom = [];

  // for (let index = 0; index < 3; index++) {
  //   dataSearchRoom.push({
  //     created_date: '',
  //     rate_name: '',
  //     adult: '',
  //     child: '',
  //     rate_detail: '',
  //     unit_price: '',
  //     updated_price: '',
  //     task: '',
  //   });
  // }

  const convertDataSearchRoom = (charges: any) => {
    const result: any[] = [];

    charges.forEach((item: any) => {
      result.push({
        date: item.date,
        rate_name: item.rate_name,
        adult: '',
        child: '',
        rate_detail: item.rate_detail,
        unit_price: item.price,
        updated_price: item.price,
        task: '',
      });
    });

    return result;
  };

  const columnsSelectedRoomsResult = [
    {
      title: 'Checkin',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Room Type',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Rate Name',
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: () => (
        <Button style={{ color: '#F5222D', paddingLeft: 0 }} type="link">
          {t('common.Delete')}
        </Button>
      ),
    },
  ];

  const dataSelectedRoomsResult: any = [];

  for (let index = 0; index < 3; index++) {
    dataSelectedRoomsResult.push({
      checkin: '',
      checkout: '',
      room_type: '',
      rate_name: '',
      quantity: '',
      subtotal: '',
      task: '',
    });
  }

  const [roomSelected, setRoomSelected] = useState<any>([]);
  const [roomTotalForm, setRoomTotalForm] = useState([]);

  const [roomCondition, setRoomCondition] = useState({
    checkin: '',
    checkout: '',
    room_type: '',
  });

  const [quantity, setQuantity] = useState(0);

  const searchRoomsResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.charges,
  );

  const searchRoomDate = (date: any, key: string) => {
    const stateTemporary = {
      ...roomCondition,
      [key]: date?.format('YYYY-MM-DD') ?? '',
    };

    setRoomCondition(stateTemporary);
    // dispatch(searchRoom(stateTemporary));
  };

  const searchRoomSelect = (value: string, key: string) => {
    let valueTemporary = value;

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...roomCondition,
      [key]: valueTemporary,
      current_page: 1,
    };

    setRoomCondition(stateTemporary);
    dispatch(searchRoom(stateTemporary));
  };

  const [searchRoomResultState, setSearchRoomResultState] = useState<any>([]);

  useEffect(() => {
    const temporary = [...searchRoomsResult];

    setSearchRoomResultState(
      temporary.map(item => {
        return {
          ...item,
          updated_price: item.price,
        };
      }),
    );
  }, [searchRoomsResult]);

  const totalAmount = _.reduce(
    searchRoomResultState,
    function (memo, number_: any) {
      return parseInt(number_.updated_price, 10) + memo;
    },
    0,
  );

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
          paid: true,
          send_mail: true,
          no_show: true,
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
                  <Form.Item label={t('reservation.Folio ID')} name="reservation_number">
                    <MInput disabled value="2808" />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.OTA Booking ID.title')}
                    name="external_reservation_number"
                  >
                    <MInput placeholder={t('reservation.OTA Booking ID.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Market.title')}
                    name="market_segment_id"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a market',
                      },
                    ]}
                  >
                    <Select allowClear placeholder={t('reservation.Market.placeholder')}>
                      <Option value="1">OTA</Option>
                      <Option value="2">CDT</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Source.title')}
                    name="path_of_reservation"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a source',
                      },
                    ]}
                  >
                    <Select allowClear placeholder={t('reservation.Source.placeholder')}>
                      <Option value="1">Agent</Option>
                      <Option value="2">Website</Option>
                      <Option value="4">Telephone</Option>
                      <Option value="8">Fax</Option>
                      <Option value="16">Email</Option>
                      <Option value="32">Walkin</Option>
                      <Option value="28">Direct</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('reservation.Notes.title')} name="note">
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
                    name="booker_type"
                    rules={[
                      {
                        required: true,
                        message: 'Please input type',
                      },
                    ]}
                  >
                    <Select allowClear placeholder={t('reservation.Type.placeholder')}>
                      <Option value="1">Personal</Option>
                      <Option value="2">Group</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.First Name.title')}
                    name="booker_firstname"
                    rules={[
                      {
                        required: true,
                        message: "Please input booker's first name",
                      },
                    ]}
                  >
                    <MInput placeholder="Steve" />
                  </Form.Item>
                  <Form.Item label={t('reservation.Last Name.title')} name="booker_lastname">
                    <MInput placeholder="Nagaoka" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label={t('reservation.Email.title')}
                    name="booker_email"
                    rules={[
                      {
                        required: true,
                        message: "Please input booker's email",
                      },
                    ]}
                  >
                    <MInput placeholder={t('reservation.Email.placeholder')} />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Mobile Phone.title')}
                    name="booker_phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Please input booker's phone number",
                      },
                    ]}
                  >
                    <MInput placeholder={t('reservation.Mobile Phone.placeholder')} />
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Rank.title')}
                    name="booker_rank"
                    rules={[
                      {
                        required: true,
                        message: "Please input booker's rank",
                      },
                    ]}
                  >
                    <Select allowClear placeholder={t('reservation.Rank.placeholder')}>
                      <Option value="1">VIP</Option>
                      <Option value="2">Dominant Person</Option>
                      <Option value="3">General Person</Option>
                      <Option value="9">Undesirable Guest</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('reservation.Additional Email.title')} name="booker_email_2">
                    <MInput placeholder={t('reservation.Additional Email.placeholder')} />
                  </Form.Item>
                  <Form.Item label={t('reservation.Notes.title')} name="booker_note">
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
                  <PattonButton onClick={showModal} type="primary">
                    {' '}
                    <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> {t('common.New')}
                  </PattonButton>
                  <CancelBookingModal
                    isModalVisible={isCancelBookingModalVisible}
                    setModalVisible={setIsCancelBookingModalVisible}
                  />
                  <Modal
                    bodyStyle={{ backgroundColor: '#F0F2F5' }}
                    okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
                    okText="Save"
                    onCancel={handleCancel}
                    onOk={handleOk}
                    style={{ top: 80, borderRadius: 4 }}
                    title={<b>Select room and rate</b>}
                    visible={isModalVisible}
                    width={1000}
                  >
                    <Card bordered={false} size="small" title="Search room">
                      <Row>
                        <Col span={6}>
                          <Form.Item label="Checkin" name="checkin">
                            <DatePicker
                              onChange={date => searchRoomDate(date, 'checkin')}
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Checkout" name="checkout">
                            <DatePicker
                              onChange={date => searchRoomDate(date, 'checkout')}
                              style={{
                                height: 32,
                                borderRadius: 4,
                                marginRight: 11,
                                width: '100%',
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Room type" name="room_type">
                            <Select
                              allowClear
                              onChange={value => searchRoomSelect(value, 'room_type')}
                              placeholder="Select room type"
                            >
                              <Option value="1">Room 1</Option>
                              <Option value="2">Room 2</Option>
                              <Option value="3">Room 3</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item label="Quantity" name="quantity">
                            <Select
                              allowClear
                              onChange={value => setQuantity(value)}
                              placeholder="Select quantity"
                            >
                              <Option value="1">1</Option>
                              <Option value="2">2</Option>
                              <Option value="3">3</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} style={{ paddingTop: 16 }}>
                          <Table
                            columns={columnsSearchRoom}
                            dataSource={convertDataSearchRoom(searchRoomResultState)}
                            pagination={false}
                            size="small"
                            style={{ border: 0 }}
                            summary={() => {
                              return (
                                <TableSummary
                                  quantity={quantity}
                                  roomTotalForm={roomTotalForm}
                                  searchRoomResultState={searchRoomResultState}
                                  setRoomSelected={setRoomSelected}
                                  setRoomTotalForm={setRoomTotalForm}
                                  totalAmount={totalAmount}
                                />
                              );
                            }}
                          />
                        </Col>
                      </Row>
                    </Card>
                    <Card
                      bordered={false}
                      size="small"
                      style={{ marginTop: 16 }}
                      title="Selected Rooms Result"
                    >
                      <Row>
                        <Col span={24}>
                          <Table
                            columns={columnsSelectedRoomsResult}
                            dataSource={roomSelected}
                            pagination={false}
                            size="small"
                            style={{ border: 0 }}
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Modal>
                  <MButton
                    onClick={() => setIsCancelBookingModalVisible(true)}
                    style={{ marginLeft: 15 }}
                  >
                    {t('common.Delete Selected')}
                  </MButton>
                  <MButton style={{ marginLeft: 15 }}>
                    {t('common.Print Registration Card')}
                  </MButton>
                </Col>
                <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
                  <Table
                    columns={columns}
                    dataSource={roomList}
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
                    <span style={{ float: 'right', paddingRight: '12.5%', fontSize: 16 }}>
                      4,800,000
                    </span>
                  </p>
                  <Form.Item
                    label={t('reservation.Payment Method.title')}
                    name="payment_method"
                    wrapperCol={{
                      span: 21,
                    }}
                  >
                    <Select allowClear placeholder={t('reservation.Payment Method.placeholder')}>
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="paid" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Paid')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="send_mail" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Email reservation confirmation')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="no_show" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Hide room rates')}</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="no_deposit" valuePropName="checked">
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
            <PattonButton htmlType="submit">{t('common.Save')}</PattonButton>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Create;
