/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 20/12/2022
Main functions : Reservation Form
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Checkbox,
  Col,
  Form,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatNumber } from 'helpers';
import moment from 'moment';
import ReservationDetailCard from 'pages/reservation/component/ReservationDetailCard';
import Message from 'pages/reservation/component/ReservationDetailTab/Message';
import CheckinModal from 'pages/reservation/create/Checkin';
import { selectAddItem, selectDeleteItem, selectUser } from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import {
  getAgentInfos,
  getReservation,
  getReservationDetail,
  printRegistrationCardPDFReservationDetail,
} from 'actions';

import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

import Transaction from './ReservationDetailTab/Transaction';

const { TabPane } = Tabs;

const { Option } = Select;
const financialDetailDataSample = [
  {
    date: '22/07/2023',
    description: 'Phong Junior Deluxe Double Traveloka',
    gross_revenue: '1,012,500',
    ta_comp: '151,875',
    payment_method: 'VCC',
    amount: '860,625',
    system_fee: '26,417',
  },
  {
    date: '22/07/2023',
    description: 'Phong Junior Deluxe Double Traveloka',
    gross_revenue: '1,012,500',
    ta_comp: '151,875',
    payment_method: 'VCC',
    amount: '860,625',
    system_fee: '26,417',
  },
  {
    date: '22/07/2023',
    description: 'Thue xe',
    gross_revenue: '500,000',
    ta_comp: '0',
    payment_method: 'VNPAY',
    amount: '500,000',
    system_fee: '16,500',
  },
];

interface Props {
  deleteSelectedRoom?: any;
  financialDetailColumns?: any;
  formRef?: any;
  isCreateForm: boolean;
  onFinish: any;
  onFinishFailed: any;
  reservationId: string;
  reservationInfo?: any;
  reservationNumber: number;
  resetSelectedRows?: () => void;
  roomCondition: any;
  roomTotalForm: any;
  roomingListColumns: any;
  rowSelection: any;
  selectedRowKeys: any;
  selectedRows?: any;
  setCancelCurrentItem?: any;
  setIsCancelBookingModalVisible?: any;
  setRedirectDetail?: any;
  setRoomCondition: any;
  showModal: any;
  type?: string;
}

function ReservationForm({
  deleteSelectedRoom,
  financialDetailColumns,
  formRef,
  isCreateForm,
  onFinish,
  onFinishFailed,
  reservationId,
  reservationInfo,
  reservationNumber,
  resetSelectedRows,
  roomCondition,
  roomingListColumns,
  roomTotalForm,
  rowSelection,
  selectedRowKeys,
  selectedRows,
  setCancelCurrentItem,
  setIsCancelBookingModalVisible,
  setRedirectDetail,
  setRoomCondition,
  showModal,
  type,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );
  const reservationRedux: any = useSelector<RootState>(
    ({ getReservation: getReservationTemporary }) => getReservationTemporary.data,
  );
  const user = useAppSelector(selectUser);

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
  const [isModalPrintRegistrationCardOpen, setIsPrintRegistrationCardOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const showModalCheckin = () => {
    setIsModalCheckinOpen(true);
  };

  const onChangeLanguage = (e: RadioChangeEvent) => {
    setLanguage(e.target.value);
  };

  const handlePrintRegistrationCard = () => {
    const formattedDateNow = moment(new Date()).format('DD_MM_YYYY');

    dispatch(
      printRegistrationCardPDFReservationDetail({
        payload: {
          language,
          reservation_info_id: reservationId ?? '',
          reservation_detail_id: reservationDetailInfo.id ?? selectedRowKeys[0],
          file_name: `the_mansion_${formattedDateNow}_detail_${reservationId ?? ''}.'pdf'`,
        },
      }),
    );
  };

  const addItemData = useAppSelector(selectAddItem);
  const deleteItemData = useAppSelector(selectDeleteItem);

  const { changed: addItemChanged } = useTreeChanges(addItemData);
  const { changed: deleteItemChanged } = useTreeChanges(deleteItemData);

  useEffect(() => {
    if (addItemChanged('status', 'SUCCESS')) {
      message.success(t('message.Add item successfully!'));

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailInfo.id,
        }),
      );

      if (resetSelectedRows) {
        resetSelectedRows();
      }
    }
  }, [addItemChanged]);

  useEffect(() => {
    if (deleteItemChanged('status', 'SUCCESS')) {
      message.success(t('message.Delete item successfully!'));

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailInfo.id,
        }),
      );
    }
  }, [deleteItemChanged]);

  const canCheckin = selectedRows?.every((item: any) => {
    return item.can_checkin === true;
  });

  return (
    <>
      {type === 'checkin_today' && (
        <CheckinModal
          openModalCheckin={isModalCheckinOpen}
          reservationId={reservationId}
          resetSelectedRows={resetSelectedRows}
          selectedRowKeys={selectedRowKeys}
          selectedRows={selectedRows}
          setIsModalCheckinOpen={setIsModalCheckinOpen}
        />
      )}
      <Modal
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        onCancel={() => setIsPrintRegistrationCardOpen(false)}
        onOk={handlePrintRegistrationCard}
        title={t('common.Select language')}
        visible={isModalPrintRegistrationCardOpen}
      >
        <Radio.Group onChange={onChangeLanguage} value={language}>
          <Space direction="vertical">
            <Radio value="vi">{t('common.Vietnamese')}</Radio>
            <Radio value="en">{t('common.English')}</Radio>
            <Radio value="jp">{t('common.Japanese')}</Radio>
          </Space>
        </Radio.Group>
      </Modal>
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
          booker_rank: reservationInfo?.booker?.client_rank?.toString(),
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
        {type !== 'inhouse_today' ? (
          <Row className="content" style={{ padding: 0 }}>
            <Col span={24}>
              <Tabs className="tabs-cart" defaultActiveKey="1">
                <TabPane key="1" style={{ padding: 20 }} tab={t('common.General Infos')}>
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
                        <Form.Item
                          label={t('reservation.Mobile Phone.title')}
                          name="booker_phone_number"
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
                </TabPane>
                <TabPane
                  key="2"
                  style={{ padding: 20, minHeight: '100%' }}
                  tab={t('reservation.Rooming List')}
                >
                  {type !== 'inhouse_today' && type !== 'checkout_today' && (
                    <>
                      <Card bordered={false} size="small" style={{ border: '1px solid #D9D9D9' }}>
                        <Row>
                          <Col span={24}>
                            {user.permission.reservation.edit && (
                              <>
                                <PattonButton onClick={showModal} type="primary">
                                  {' '}
                                  <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} />{' '}
                                  {t('common.New')}
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
                              </>
                            )}
                            {!isCreateForm && (
                              <MButton
                                disabled={selectedRowKeys.length !== 1}
                                onClick={() => {
                                  setIsPrintRegistrationCardOpen(true);
                                }}
                                style={{ marginLeft: 15 }}
                              >
                                {t('common.Print Registration Card')}
                              </MButton>
                            )}
                            {type === 'checkin_today' && user.permission.frontDeskCheckin.edit && (
                              <PattonButton
                                disabled={selectedRowKeys.length === 0 || !canCheckin}
                                onClick={showModalCheckin}
                                style={{ marginLeft: 15 }}
                                type="primary"
                              >
                                {t('common.Checkin')}
                              </PattonButton>
                            )}
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
                                  ({
                                    actual_amount: actualAmount,
                                    adl,
                                    baby,
                                    child,
                                    nights,
                                    status,
                                  }) => {
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
                        </Row>
                      </Card>
                      {!_.isEmpty(reservationDetailInfo) && !isCreateForm && (
                        <ReservationDetailCard
                          reservationDetail={reservationDetailInfo}
                          reservationId={reservationId}
                        />
                      )}
                    </>
                  )}
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
                            <Select
                              allowClear
                              placeholder={t('reservation.Payment Method.placeholder')}
                            >
                              <Option value="1">Cash</Option>
                              <Option value="2">Credit Card</Option>
                              <Option value="3">Coupon</Option>
                              <Option value="4">VNPay</Option>
                              <Option value="5">Momo</Option>
                              <Option value="99">Other</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8} style={{ marginTop: -6 }}>
                          <Form.Item
                            name="paid"
                            style={{ marginBottom: 12 }}
                            valuePropName="checked"
                          >
                            <Checkbox>{t('reservation.Paid')}</Checkbox>
                          </Form.Item>
                          <Form.Item name="no_deposit" valuePropName="checked">
                            <Checkbox>
                              {t('reservation.Confirm reservation without deposit')}
                            </Checkbox>
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
                          <Form.Item
                            name="send_mail"
                            style={{ marginBottom: 12 }}
                            valuePropName="checked"
                          >
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
                  {type === 'checkout_today' && (
                    <Card
                      bordered={false}
                      size="small"
                      style={{ marginTop: 20 }}
                      title={t('common.Detail Informations')}
                    >
                      <Transaction
                        noPadding
                        reservationDetailId={reservationDetailInfo.id}
                        reservationId={reservationId}
                        type={type}
                      />
                    </Card>
                  )}
                </TabPane>
                <TabPane
                  key="3"
                  style={{ padding: 20, minHeight: '61rem' }}
                  tab={t('reservation.Message')}
                >
                  <Message />
                </TabPane>
                {financialDetailColumns && (
                  <TabPane
                    key="4"
                    style={{ padding: 20, minHeight: '61rem' }}
                    tab={t('reservation.Financial Detail')}
                  >
                    <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
                      <Table
                        columns={financialDetailColumns}
                        dataSource={financialDetailDataSample}
                        pagination={false}
                        size="small"
                        summary={() => {
                          return (
                            <>
                              <Table.Summary.Row
                                style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}
                              >
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  <div style={{ paddingLeft: 40 }}>Total Revenue</div>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>
                                    2,525,000
                                  </div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                              <Table.Summary.Row
                                style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}
                              >
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  {' '}
                                  <div style={{ paddingLeft: 40 }}> Total TA Comp. </div>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={1}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>
                                    303,750
                                  </div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                              <Table.Summary.Row
                                style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}
                              >
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  <div style={{ paddingLeft: 40 }}>Total Payment System Fee</div>
                                </Table.Summary.Cell>

                                <Table.Summary.Cell index={1}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>57,234</div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                              <Table.Summary.Row style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  <div style={{ paddingLeft: 40 }}>Payment System Fee (VCC)</div>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>52,834</div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                              <Table.Summary.Row style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  <div style={{ paddingLeft: 40 }}>Payment System Fee (VNPAY)</div>
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>4,400</div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                              <Table.Summary.Row
                                style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}
                              >
                                <Table.Summary.Cell colSpan={6} index={0}>
                                  <div style={{ paddingLeft: 40 }}>Net Revenue</div>{' '}
                                </Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>
                                  <div style={{ textAlign: 'right', paddingRight: 80 }}>
                                    1,664,016
                                  </div>
                                </Table.Summary.Cell>
                              </Table.Summary.Row>
                            </>
                          );
                        }}
                      />
                    </Col>
                  </TabPane>
                )}
              </Tabs>
            </Col>
            <Col span={24} />
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
        ) : null}

        {type === 'inhouse_today' && (
          <Row className="content" style={{ marginTop: 0, padding: 0 }}>
            <ReservationDetailCard
              reservationDetail={reservationDetailInfo}
              reservationId={reservationId}
              typeScreen="inhouse_today"
            />
          </Row>
        )}
      </Form>
    </>
  );
}

export default ReservationForm;
