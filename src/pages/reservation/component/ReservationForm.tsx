/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation Form
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Form, Modal, Row, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatNumber } from 'helpers';
import ReservationDetailCard from 'pages/reservation/component/ReservationDetailCard';
import CheckinModal from 'pages/reservation/create/Checkin';
import _ from 'underscore';

import { colors } from 'modules/theme';

import { getAgentInfos, getReservationDetail } from 'actions';

import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

const { Option } = Select;

interface Props {
  deleteSelectedRoom?: any;
  formRef?: any;
  isCreateForm: boolean;
  onFinish: any;
  onFinishFailed: any;
  reservationId: string;
  reservationInfo?: any;
  reservationNumber: number;
  roomCondition: any;
  roomTotalForm: any;
  roomingListColumns: any;
  rowSelection: any;
  selectedRowKeys: any;
  setCancelCurrentItem?: any;
  setIsCancelBookingModalVisible?: any;
  setRedirectDetail?: any;
  setRoomCondition: any;
  showModal: any;
}

function ReservationForm({
  deleteSelectedRoom,
  formRef,
  isCreateForm,
  onFinish,
  onFinishFailed,
  reservationId,
  reservationInfo,
  reservationNumber,
  roomCondition,
  roomingListColumns,
  roomTotalForm,
  rowSelection,
  selectedRowKeys,
  setCancelCurrentItem,
  setIsCancelBookingModalVisible,
  setRedirectDetail,
  setRoomCondition,
  showModal,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );

  const reservationRedux: any = useSelector<RootState>(
    ({ getReservation: getReservationTemporary }) => getReservationTemporary.data,
  );

  const confirm = () => {
    Modal.confirm({
      title: t('common.Delete Confirm'),
      icon: <ExclamationCircleOutlined />,
      content: t('message.Do you Want to delete these items?'),
      okButtonProps: { style: { backgroundColor: '#1D39C4' } },
      onOk() {
        deleteSelectedRoom();
      },
    });
  };

  const [isSendConfirmationEmail, setIsSendConfirmationEmail] = useState(true);

  const handleSubmitAndMoreDetail = () => {
    setRedirectDetail(true);
  };

  const totalPriceReservation = _.reduce(
    roomTotalForm,
    function (memo, reservationDetailItem: any) {
      return memo + reservationDetailItem.actual_amount * reservationDetailItem.quantity;
    },
    0,
  );

  const agentInfos: any = useSelector<RootState>(
    ({ agentInfos: agentInfosData }) => agentInfosData.data,
  );

  useEffect(() => {
    dispatch(getAgentInfos());
  }, []);

  let sourceOptions = null;

  if (roomCondition.source_type?.toString() === '1') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 2;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  } else if (roomCondition.source_type?.toString() === '5') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 1;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  } else if (roomCondition.source_type?.toString() === '7') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 0;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  }

  const [isModalCheckinOpen, setIsModalCheckinOpen] = useState(false);

  const showModalCheckin = () => {
    setIsModalCheckinOpen(true);
  };

  return (
    <Form
      ref={formRef}
      autoComplete="off"
      initialValues={{
        reservation_number: reservationNumber,
        paid: false,
        send_mail: true,
        no_show: false,
        market_segment_id: reservationInfo?.market_segment_id?.toString(),
        agent_info_id: reservationInfo?.agent_info_id?.toString(),
        external_reservation_number: reservationInfo?.external_reservation_number,
        note: reservationInfo?.note,
        booker_type: reservationInfo?.booker?.client_kind?.toString(),
        booker_firstname: reservationInfo?.booker?.first_name,
        booker_lastname: reservationInfo?.booker?.last_name,
        booker_email: reservationInfo?.booker?.email_address1,
        booker_email_2: reservationInfo?.booker?.email_address2,
        booker_phone_number: reservationInfo?.booker?.telephone_number1,
        booker_rank: reservationInfo?.booker?.client_rank.toString(),
        booker_note: reservationInfo?.note_sale,
        email_language: '2',
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
                  <MInput disabled />
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
                  <Select
                    allowClear
                    onChange={value =>
                      setRoomCondition({
                        ...roomCondition,
                        source_type: value,
                      })
                    }
                    placeholder={t('reservation.Market.placeholder')}
                  >
                    <Option value="1">OTA</Option>
                    <Option value="2">CDT</Option>
                    <Option value="4">CORPORATE</Option>
                    <Option value="5">WHOLESALE</Option>
                    <Option value="7">FIT</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t('reservation.Source.title')}
                  name="agent_info_id"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a source',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    onChange={value =>
                      setRoomCondition({
                        ...roomCondition,
                        source_id: value,
                      })
                    }
                    placeholder={t('reservation.Source.placeholder')}
                  >
                    {sourceOptions}
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
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                >
                  <MInput placeholder={t('reservation.Email.placeholder')} />
                </Form.Item>
                <Form.Item label={t('reservation.Mobile Phone.title')} name="booker_phone_number">
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
                <Form.Item
                  label={t('reservation.Additional Email.title')}
                  name="booker_email_2"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}
                >
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
                {isCreateForm ? (
                  <MButton
                    disabled={selectedRowKeys.length === 0}
                    onClick={confirm}
                    style={{ marginLeft: 15 }}
                  >
                    {t('common.Cancel Selected')}
                  </MButton>
                ) : (
                  <MButton
                    disabled={selectedRowKeys.length === 0}
                    onClick={() => {
                      setCancelCurrentItem(null);
                      setIsCancelBookingModalVisible(true);
                    }}
                    style={{ marginLeft: 15 }}
                  >
                    {t('common.Cancel Selected')}
                  </MButton>
                )}
                {!isCreateForm && (
                  <MButton style={{ marginLeft: 15 }}>
                    {t('common.Print Registration Card')}
                  </MButton>
                )}
                <PattonButton onClick={showModalCheckin} style={{ marginLeft: 15 }} type="primary">
                  {t('common.Checkin')}
                </PattonButton>
                <CheckinModal
                  openModalCheckin={isModalCheckinOpen}
                  setIsModalCheckinOpen={setIsModalCheckinOpen}
                />
              </Col>
              <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
                <Table
                  className="rooming-table"
                  columns={roomingListColumns}
                  dataSource={roomTotalForm}
                  onRow={(record: any) => {
                    if (record.status?.toLowerCase() !== 'canceled') {
                      return {
                        onClick: () => {
                          if (record.reservation_detail_id) {
                            dispatch(
                              getReservationDetail({
                                reservation_id: reservationInfo.id,
                                reservation_detail_id: record.reservation_detail_id,
                              }),
                            );
                          }
                        },
                      };
                    }

                    return {};
                  }}
                  pagination={false}
                  rowClassName={(record: any) => {
                    let nameClassRow = '';

                    if (record.status?.toLowerCase() === 'canceled') {
                      nameClassRow = 'disabled-click';
                    }

                    if (
                      !_.isEmpty(reservationDetailInfo) &&
                      reservationDetailInfo.id === record.reservation_detail_id
                    ) {
                      nameClassRow += ' ant-table-row-selected';
                    }

                    return nameClassRow;
                  }}
                  rowSelection={rowSelection}
                  size="small"
                  summary={pageData => {
                    let nightTotal = 0;
                    let adlTotal = 0;
                    let childTotal = 0;
                    let babyTotal = 0;
                    let subTotal = 0;

                    pageData.forEach(
                      ({ actual_amount: actualAmount, adl, baby, child, nights, status }) => {
                        if (status?.toLowerCase() !== 'canceled') {
                          if (baby !== '-') {
                            babyTotal += parseInt(baby, 10);
                          }

                          if (child !== '-') {
                            childTotal += parseInt(child, 10);
                          }

                          nightTotal += nights;
                          subTotal += actualAmount;
                          adlTotal += adl;
                        }
                      },
                    );

                    return (
                      <Table.Summary.Row
                        style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}
                      >
                        <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'center' }}>{nightTotal}</div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'center' }}>{adlTotal}</div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'center' }}>{childTotal}</div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'center' }}>{babyTotal}</div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'right', paddingRight: 20 }}>
                            {formatNumber(subTotal)}
                          </div>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          <div style={{ textAlign: 'right', paddingRight: 20 }}>
                            {reservationRedux.price
                              ? formatNumber(reservationRedux.price.deposit)
                              : 0}
                          </div>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    );
                  }}
                />
              </Col>
              {!_.isEmpty(reservationDetailInfo) && !isCreateForm && (
                <ReservationDetailCard
                  reservationDetail={reservationDetailInfo}
                  reservationId={reservationId}
                />
              )}
            </Row>
          </Card>

          {isCreateForm && (
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
                      {formatNumber(totalPriceReservation)}
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
                      <Option value="1">Cash</Option>
                      <Option value="2">Credit Cash</Option>
                      <Option value="3">Coupon</Option>
                      <Option value="99">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="paid" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Paid')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="no_deposit" valuePropName="checked">
                    <Checkbox>{t('reservation.Confirm reservation without deposit')}</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="hide_room_rate"
                    style={{ marginBottom: 12 }}
                    valuePropName="checked"
                  >
                    <Checkbox>{t('reservation.Hide room rates')}</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="send_mail" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox onChange={e => setIsSendConfirmationEmail(e.target.checked)}>
                      {t('reservation.Email reservation confirmation')}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    label={t('reservation.Email Language')}
                    name="email_language"
                    wrapperCol={{
                      span: 21,
                    }}
                  >
                    <Select disabled={!isSendConfirmationEmail}>
                      <Option value="1">{t('common.Vietnamese')}</Option>
                      <Option value="2">{t('common.English')}</Option>
                      <Option value="3">{t('common.Japanese')}</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
        {isCreateForm && (
          <Col span={24} style={{ textAlign: 'center', marginTop: 20, marginBottom: 140 }}>
            <MButton
              htmlType="submit"
              onClick={handleSubmitAndMoreDetail}
              style={{
                color: colors.pattron,
                borderColor: colors.pattron,
                marginRight: 32,
                backgroundColor: '#e5e5e5',
              }}
            >
              {t('reservation.Save and add more details')}
            </MButton>
            <PattonButton disabled={roomTotalForm.length === 0} htmlType="submit">
              {t('common.Save')}
            </PattonButton>
          </Col>
        )}
      </Row>
    </Form>
  );
}

export default ReservationForm;
