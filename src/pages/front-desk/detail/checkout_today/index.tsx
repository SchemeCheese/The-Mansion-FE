import { notify } from 'ui/notification';
/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 24/08/2022
Updated Date : 30/10/2022
Main functions : Reservation Detail Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RadioChangeEvent } from 'ui/antd';
import { Checkbox, Col, Modal, Radio, Row, Skeleton, Space } from 'ui/antd';
import { formatNumber, mappingStatus } from 'helpers';
import moment from 'moment';
import DownloadFile from 'pages/reservation/component/DownloadFile';
import ReservationForm from 'pages/reservation/component/ReservationForm';
import SelectRoomModal from 'pages/reservation/create/SelectRoomModal';
import useColumns from 'pages/reservation/create/useColumns';
import CancelBookingModal from 'pages/reservation/modal/CancelBookingModal';
import {
  selectGetReservationDetail,
  selectResendEmailReservation,
  selectUpdateReservation,
  selectUser,
} from 'selectors';
import styled from 'styled-components';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import {
  getReservation,
  getReservationDetail,
  resendEmailReservationAction,
  resetReservation,
  resetReservationDetail,
  searchRoomReset,
  updateReservation,
} from 'actions';
import layoutStyles from 'components/layout.module.css';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
`;

const BreadscrumData = styled.p`
  color: rgba(0 0 0 65%);
  font-size: 14px;
`;

function ReservationCheckoutTodayDetail() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isHidenRoomRate, setIsHideRoomRate] = useState(false);
  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const { amount_info: amountInfo } = reservationDetailInfo.data;
  const user = useAppSelector(selectUser);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeysTable: any) => {
      setSelectedRowKeys(selectedRowKeysTable);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.status?.toLowerCase() === 'canceled',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCancelBookingModalVisible, setIsCancelBookingModalVisible] = useState(false);
  const [isSelectLanguageModalOpen, setIsSelectLanguageModalOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [cancelCurrentItem, setCancelCurrentItem] = useState(null);

  const onChange = (e: RadioChangeEvent) => {
    setLanguage(e.target.value);
  };

  const handleResendReservationConfirmationEmail = () => {
    setIsSelectLanguageModalOpen(false);

    dispatch(
      resendEmailReservationAction({
        reservation_id: id ?? '',
        language,
        is_hide_room_rate: isHidenRoomRate,
      }),
    );
  };

  const showModal = () => {
    dispatch(searchRoomReset());
    setRoomCondition({
      ...roomCondition,
      checkin: moment().format('YYYY-MM-DD'),
      checkout: moment().add(1, 'days').format('YYYY-MM-DD'),
      room_type: '',
    });
    setQuantity(1);
    setRoomSelected([]);
    setIsModalVisible(true);
  };

  const dispatch = useDispatch();
  const reservationRedux: any = useSelector<RootState>(
    ({ getReservation: getReservationTemporary }) => getReservationTemporary.data,
  );
  /** Response from API */
  const searchRoomsResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.charges,
  );

  const { id, reservationDetailId } = useParams();

  useEffect(() => {
    dispatch(resetReservationDetail());
    dispatch(resetReservation());

    dispatch(
      getReservation({
        reservation_id: id ?? '',
      }),
    );

    if (reservationDetailId && id) {
      dispatch(
        getReservationDetail({
          reservation_id: id,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }

    return function cleanup() {
      dispatch(resetReservationDetail());
      dispatch(resetReservation());
    };
  }, []);

  useEffect(() => {
    const temporary = [...searchRoomsResult];

    setSearchRoomResultState(
      temporary.map(item => {
        return {
          ...item,
          price: formatNumber(item.price),
          actual_amount: item.price,
        };
      }),
    );
  }, [searchRoomsResult]);

  useEffect(() => {
    if (!_.isEmpty(reservationRedux)) {
      const roomsTemporary: any = [];

      reservationRedux.rooms.forEach((item: any) => {
        const itemTemporary = {
          key: item.id,
          reservation_detail_id: item.id,
          status: mappingStatus(item.status),
          name: item.main_guest_name ? item.main_guest_name : '-',
          room_type: item.equipment_type_id,
          room_type_text: item.room_type_text,
          room_no: item.room_no ?? '-',
          ci: moment(item.arrival_date).format('DD/MM/YYYY'),
          co: moment(item.departure_date).format('DD/MM/YYYY'),
          nights: moment
            .duration(moment(item.departure_date).diff(moment(item.arrival_date)))
            .asDays(),
          adl: item.person_number ?? '-',
          child: item.children_number && item.children_number > 0 ? item.children_number : '-',
          baby: item.infant_number && item.infant_number > 0 ? item.infant_number : '-',
          rate: item.rate_name,
          subtotal: formatNumber(item.total_price),
          deposit: item.deposit_amount === 0 ? '-' : formatNumber(item.deposit_amount),
          actual_amount: item.total_price,
        };

        if (item.canceled) {
          roomsTemporary.push({
            ...itemTemporary,
            cancelInfo: {
              opinion_content: item.opinion_content,
              receptionist: item.receptionist,
              cancel_type: item.cancel_type,
            },
          });
        } else {
          roomsTemporary.push(itemTemporary);
        }
      });

      setRoomTotalForm(roomsTemporary);
    }
  }, [reservationRedux]);

  const { roomingListColumns } = useColumns({
    setIsCancelBookingModalVisible,
    setCancelCurrentItem,
  });

  /** State */
  /** Search room Table In Modal */
  const [roomSelected, setRoomSelected] = useState<any>([]);
  /** Data of payload to transfer from API */
  const [roomTotalForm, setRoomTotalForm] = useState([]);
  /** Room Search Condition In Modal */
  const [roomCondition, setRoomCondition] = useState({
    checkin: '',
    checkout: '',
    room_type: '',
    source_type: '',
    source_id: '',
    charge_kind: '1',
  });
  const [quantity, setQuantity] = useState(1);
  const [searchRoomResultState, setSearchRoomResultState] = useState<any>([]);
  const totalAmount = _.reduce(
    searchRoomResultState,
    function (memo, number_: any) {
      return parseInt(number_.actual_amount, 10) + memo;
    },
    0,
  );
  const formRef: any = React.createRef();

  const submitUpdateForm = (e: any) => {
    dispatch(
      updateReservation({
        payload: {
          reservation_id: id,
          booker_email: reservationRedux.booker?.email_address1,
          booker_email_2: reservationRedux.booker?.email_address2,
          booker_firstname: reservationRedux.booker?.first_name,
          booker_lastname: reservationRedux.booker?.last_name,
          booker_note: reservationRedux.note_sale,
          booker_phone_number: reservationRedux.booker?.telephone_number1,
          booker_rank: reservationRedux.booker?.client_rank?.toString(),
          booker_type: reservationRedux.booker?.client_kind?.toString(),
          market_segment_id: reservationRedux.market_segment_id?.toString(),
          agent_info_id: reservationRedux.agent_info_id?.toString(),
          // payment_method: '1',
          reservation_number: reservationRedux.reservation_number,
          rooms: [],
          note: reservationRedux.note,
          hide_room_rate: isHidenRoomRate,
        },
      }),
    );
  };

  const updateReservationData = useAppSelector(selectUpdateReservation);
  const resendEmailReservationData = useAppSelector(selectResendEmailReservation);
  // const downloadPDFReservationDetailData = useAppSelector(selectDownloadPDFReservationDetail);
  const { changed } = useTreeChanges(updateReservationData);
  const { changed: resendEmailChanged } = useTreeChanges(resendEmailReservationData);
  // const { changed: downloadPDFReservationDetailChanged } = useTreeChanges(
  //   downloadPDFReservationDetailData,
  // );

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      notify.success('Update reservation successfully!');

      dispatch(
        getReservation({
          reservation_id: id ?? '',
        }),
      );
    }
  }, [changed]);

  useEffect(() => {
    if (resendEmailChanged('status', 'SUCCESS')) {
      notify.success('Resend email successfully!');
    }
  }, [resendEmailChanged]);

  useEffect(() => {
    setRoomCondition({
      ...roomCondition,
      source_type: reservationRedux.market_segment_id,
      source_id: reservationRedux.agent_info_id,
    });
    setIsHideRoomRate(reservationRedux.hide_room_rate);
  }, [reservationRedux]);

  // useEffect(() => {
  //   if (downloadPDFReservationDetailChanged('status', 'SUCCESS')) {
  //     notify.success('Download file pdf successfully!');
  //   }
  // }, [downloadPDFReservationDetailChanged]);

  return (
    <>
      <SelectRoomModal
        isModalVisible={isModalVisible}
        quantity={quantity}
        reservation={reservationRedux}
        roomCondition={roomCondition}
        roomSelected={roomSelected}
        roomTotalForm={roomTotalForm}
        searchRoomResultState={searchRoomResultState}
        setIsModalVisible={setIsModalVisible}
        setQuantity={setQuantity}
        setRoomCondition={setRoomCondition}
        setRoomSelected={setRoomSelected}
        setRoomTotalForm={setRoomTotalForm}
        setSearchRoomResultState={setSearchRoomResultState}
        totalAmount={totalAmount}
      />
      <CancelBookingModal
        cancelCurrentItem={cancelCurrentItem}
        isModalVisible={isCancelBookingModalVisible}
        reservation={reservationRedux}
        selectedRowKeys={selectedRowKeys}
        setModalVisible={setIsCancelBookingModalVisible}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      <Modal
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        onCancel={() => setIsSelectLanguageModalOpen(false)}
        onOk={handleResendReservationConfirmationEmail}
        title="Select Email Language"
        visible={isSelectLanguageModalOpen}
      >
        <Radio.Group onChange={onChange} value={language}>
          <Space direction="vertical">
            <Radio value="vi">{t('common.Vietnamese')}</Radio>
            <Radio value="en">{t('common.English')}</Radio>
            <Radio value="jp">{t('common.Japanese')}</Radio>
          </Space>
        </Radio.Group>
      </Modal>
      <Row
        className={layoutStyles.customBgHeader}
        style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 35 }}
      >
        <Col span={8}>
          <svg
            fill="none"
            height="20"
            viewBox="0 0 18 20"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0148 3.43912L9.4037 14.9198L4.60435 4.75035C4.42343 4.18284 4.20583 3.66109 3.95156 3.18511C2.8269 1.11186 1.75603 0.0500579 0.736505 0.00200232C0.421112 -0.0140162 0.257303 0.0660764 0.247523 0.24228C0.242633 0.333815 0.381993 0.441368 0.663158 0.562651C1.08613 0.73199 1.41374 0.910482 1.64846 1.09584C2.26946 1.56953 2.57508 1.90821 2.5653 2.10958C2.56285 2.13704 2.4895 2.18052 2.34281 2.24002C2.19611 2.29952 2.11788 2.41165 2.1081 2.57183C2.09587 2.77321 2.28902 3.08443 2.68265 3.50777C3.25476 4.11419 3.65084 4.59246 3.87821 4.938L3.932 5.14166L3.82442 5.13709C3.72418 5.13251 3.60683 5.0959 3.4748 5.02953C3.34033 4.96317 3.25965 4.92885 3.23276 4.92656C2.91736 4.91054 2.74866 5.07759 2.7291 5.42771C2.71933 5.58789 2.9736 6.00895 3.49192 6.68631C3.72663 6.99295 3.90511 7.22865 4.03224 7.40028V7.92431C3.99312 7.89914 3.92466 7.83278 3.82442 7.72294C3.69484 7.58106 3.5457 7.50783 3.37212 7.49868C2.95648 7.47808 2.73644 7.68403 2.71199 8.11425C2.69977 8.32935 2.78045 8.58336 2.95159 8.87398C3.24498 9.29275 3.5457 9.70466 3.85621 10.1097C3.92466 10.2127 3.9809 10.3134 4.03224 10.4141V11.588C3.53592 10.6292 2.96626 10.128 2.32325 10.096C1.83427 10.0731 1.58 10.2493 1.56044 10.6246C1.54577 10.906 1.90517 11.6772 2.64353 12.9381C3.37945 14.199 3.73641 15.0503 3.71196 15.4942C3.70951 15.5354 3.6924 15.5812 3.66061 15.6338C3.5237 15.5194 3.38434 15.2768 3.24743 14.9061C3.07384 14.4004 2.92714 14.0434 2.80979 13.8352C2.65331 13.5583 2.42349 13.3111 2.12766 13.096C1.82938 12.8786 1.58733 12.7665 1.40152 12.7573C0.897869 12.7322 0.631374 13.0159 0.59959 13.6086C0.580031 13.945 0.822076 14.3935 1.32328 14.9564C1.93451 15.6315 2.32569 16.2105 2.50173 16.691L2.47483 16.81C2.38926 16.8054 2.31592 16.7963 2.25968 16.7803C1.89295 16.627 1.55066 16.4302 1.23527 16.1853C0.958991 15.9839 0.812297 15.8832 0.797627 15.8809C0.293976 15.8581 0.0274815 16.0938 0.000587477 16.5926C-0.0116371 16.8352 0.166841 17.0778 0.543357 17.3249C1.44553 17.9061 1.87828 18.5538 1.83916 19.2654C1.83427 19.373 1.8196 19.4737 1.80248 19.5675L1.81471 19.7506C1.91006 19.849 2.02986 19.9016 2.17411 19.9085C2.54818 19.9268 3.06406 19.0274 3.72418 17.2151C4.59701 14.842 5.086 12.8328 5.19602 11.1784L9.36214 20L14.0344 10.4049L15.5575 19.3226H18L15.0148 3.43912Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
          <span style={{ paddingLeft: 10, fontSize: 20 }}>
            {t('reservation.Folio')}：{reservationRedux.reservation_number}
          </span>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <DownloadFile />
            {user.permission.reservation.edit && (
              <>
                <MButton
                  disabled={!reservationRedux.booker?.email_address1}
                  onClick={() => setIsSelectLanguageModalOpen(true)}
                >
                  {t('common.Resend Email')}
                </MButton>
                <PattonButton disabled onClick={submitUpdateForm}>
                  {t('common.Update')}
                </PattonButton>
              </>
            )}
          </Space>
        </Col>
      </Row>
      <Row
        className={layoutStyles.customBgHeader}
        justify="space-between"
        style={{ paddingRight: 20, paddingLeft: 20 }}
      >
        <Col span={6}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('common.Branch Code')}:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <p style={{ color: '#1D39C4', fontSize: 14 }}>{reservationRedux.operator_code}</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('common.Status')}:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>{reservationRedux.status}</BreadscrumData>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('common.Created By')}:</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>{reservationRedux.created_user}</BreadscrumData>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <div>
            <Checkbox checked={isHidenRoomRate} onChange={e => setIsHideRoomRate(e.target.checked)}>
              {t('reservation.Hide room rates')}
            </Checkbox>
          </div>
          {reservationRedux.pay_at && reservationRedux.pay_at.includes('hotel') && (
            <div style={{ paddingTop: 10 }}>
              <Checkbox checked onChange={e => setIsHideRoomRate(e.target.checked)}>
                {t('reservation.Pay at hotel')}
              </Checkbox>
            </div>
          )}
          {reservationRedux.pay_at && reservationRedux.pay_at.includes('ota') && (
            <div style={{ paddingTop: 10 }}>
              <Checkbox checked onChange={e => setIsHideRoomRate(e.target.checked)}>
                {t('reservation.Pay at OTA')}
              </Checkbox>
            </div>
          )}
          {reservationRedux.pay_at && reservationRedux.vcc_approved_status && (
            <div style={{ paddingTop: 10 }}>
              <Checkbox checked onChange={e => setIsHideRoomRate(e.target.checked)}>
                {t('reservation.VCC Transaction Approved')}
              </Checkbox>
            </div>
          )}
        </Col>
        <Col span={8} style={{ paddingRight: 20 }}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('reservation.Total Amount')}</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              {reservationRedux.price ? (
                <p>{formatNumber(amountInfo?.grand_total)}</p>
              ) : (
                <Skeleton.Button />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('reservation.Deposit')}</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              {reservationRedux.price ? (
                <p>{formatNumber(amountInfo?.deposit)}</p>
              ) : (
                <Skeleton.Button />
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('reservation.Amount Due')}</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              {reservationRedux.price ? (
                <p>{formatNumber(amountInfo?.unpaid)}</p>
              ) : (
                <Skeleton.Button />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      {!_.isEmpty(reservationRedux) && id && (
        <ReservationForm
          formRef={formRef}
          isCreateForm={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          reservationId={id}
          reservationInfo={reservationRedux}
          reservationNumber={reservationRedux.reservation_number}
          roomCondition={roomCondition}
          roomTotalForm={roomTotalForm}
          roomingListColumns={roomingListColumns}
          rowSelection={rowSelection}
          selectedRowKeys={selectedRowKeys}
          setCancelCurrentItem={setCancelCurrentItem}
          setIsCancelBookingModalVisible={setIsCancelBookingModalVisible}
          setRoomCondition={setRoomCondition}
          showModal={showModal}
          type="checkout_today"
        />
      )}
    </>
  );
}

export default ReservationCheckoutTodayDetail;
