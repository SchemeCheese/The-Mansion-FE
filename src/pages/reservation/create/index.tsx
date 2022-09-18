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
import { Card, Checkbox, Col, Form, Row, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import useColumns from 'pages/reservation/create/useColumns';
import CancelBookingModal from 'pages/reservation/modal/CancelBookingModal';
import { selectCreateReservation } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import { createReservation, searchRoomReset } from 'actions';

import BreadcrumbList from 'components/BreadcrumbList';
import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

import SelectRoomModal from './SelectRoomModal';

const { Option } = Select;

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

  /** State */
  /** Rooming List Table */
  const [roomList, setRoomList] = useState<any>([]);
  /** Search room Table In Modal */
  const [roomSelected, setRoomSelected] = useState<any>([]);
  /** Data of payload to transfer from API */
  const [roomTotalForm, setRoomTotalForm] = useState([]);
  /** Room Search Condition In Modal */
  const [roomCondition, setRoomCondition] = useState({
    checkin: '',
    checkout: '',
    room_type: '',
  });
  const [quantity, setQuantity] = useState(0);

  /** Response from API */
  const searchRoomsResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.charges,
  );
  const breadcrumbData = [t('common.TMHA'), t('common.Reservation')];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCancelBookingModalVisible, setIsCancelBookingModalVisible] = useState(false);

  const showModal = () => {
    dispatch(searchRoomReset());
    setRoomCondition({
      checkin: '',
      checkout: '',
      room_type: '',
    });
    setQuantity(0);
    setRoomSelected([]);
    setIsModalVisible(true);
  };

  const onFinish = (values: any) => {
    dispatch(
      createReservation({
        payload: {
          ...values,
          rooms: roomTotalForm,
        },
      }),
    );
  };

  const status = useSelector<RootState>(
    ({ createReservation: createReservationTemporary }) => createReservationTemporary.status,
  );
  const navigate = useNavigate();
  const createReservationData = useAppSelector(selectCreateReservation);

  const { changed } = useTreeChanges(createReservationData);
  const { roomingListColumns } = useColumns();

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

  const [searchRoomResultState, setSearchRoomResultState] = useState<any>([]);

  useEffect(() => {
    const temporary = [...searchRoomsResult];

    setSearchRoomResultState(
      temporary.map(item => {
        return {
          ...item,
          actual_amount: item.price,
        };
      }),
    );
  }, [searchRoomsResult]);

  const totalAmount = _.reduce(
    searchRoomResultState,
    function (memo, number_: any) {
      return parseInt(number_.actual_amount, 10) + memo;
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
      <SelectRoomModal
        isModalVisible={isModalVisible}
        quantity={quantity}
        roomCondition={roomCondition}
        roomList={roomList}
        roomSelected={roomSelected}
        roomTotalForm={roomTotalForm}
        searchRoomResultState={searchRoomResultState}
        setIsModalVisible={setIsModalVisible}
        setQuantity={setQuantity}
        setRoomCondition={setRoomCondition}
        setRoomList={setRoomList}
        setRoomSelected={setRoomSelected}
        setRoomTotalForm={setRoomTotalForm}
        setSearchRoomResultState={setSearchRoomResultState}
        totalAmount={totalAmount}
      />
      <CancelBookingModal
        isModalVisible={isCancelBookingModalVisible}
        setModalVisible={setIsCancelBookingModalVisible}
      />
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
                    columns={roomingListColumns}
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
