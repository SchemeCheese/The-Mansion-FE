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
import { useLocation, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import ReservationForm from 'pages/reservation/component/ReservationForm';
import SelectRoomModal from 'pages/reservation/create/SelectRoomModal';
import useColumns from 'pages/reservation/create/useColumns';
import { selectBranchInfo, selectCreateReservation } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import {
  createReservation,
  getReservationNumber,
  resetCreateReservation,
  resetReservation,
  searchRoomReset,
} from 'actions';

import { RootState } from 'types';

function Create() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const branchInfo = useAppSelector(selectBranchInfo);

  /** State */
  /** Search room Table In Modal */
  const [roomSelected, setRoomSelected] = useState<any>([]);
  /** Data of payload to transfer from API */
  const [roomTotalForm, setRoomTotalForm] = useState([]);
  /** Room Search Condition In Modal */
  const [roomCondition, setRoomCondition] = useState({
    checkin: moment().format('YYYY-MM-DD'),
    checkout: moment().add(1, 'days').format('YYYY-MM-DD'),
    room_type: '',
    source_type: '',
    source_id: '',
    charge_kind: '1',
    checkin_time: moment(),
    checkout_time: moment().add(1, 'hours'),
    months: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [redirectDetail, setRedirectDetail] = useState(false);

  const rowSelection = {
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const deleteSelectedRoom = () => {
    const remainRoomFormTotal = _.reject(roomTotalForm, (item: any) => {
      return selectedRowKeys.includes(item.key as never);
    });

    setRoomTotalForm(remainRoomFormTotal);
  };

  /** Response from API */
  const searchRoomsResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.charges,
  );
  const reservationNumberResult: any = useSelector<RootState>(
    ({ getReservationNumber: getReservationNumberTemporary }) =>
      getReservationNumberTemporary.reservation_number,
  );
  // const breadcrumbData = [t('common.TMHA'), t('common.Reservation')];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    if (roomCondition.source_id && roomCondition.source_type) {
      dispatch(searchRoomReset());
      setRoomCondition({
        ...roomCondition,
        checkin: moment().format('YYYY-MM-DD'),
        checkout: moment().add(1, 'days').format('YYYY-MM-DD'),
        checkin_time: moment(),
        checkout_time: moment().add(1, 'hours'),
        room_type: '',
        charge_kind: '1',
        months: '',
      });
      setQuantity(1);
      setRoomSelected([]);
      setIsModalVisible(true);
    } else {
      message.warning(t('message.Please select market and source!'));
    }
  };

  const onFinish = (values: any) => {
    dispatch(
      createReservation({
        payload: {
          ...values,
          rooms: roomTotalForm,
          reservation_number: reservationNumberResult,
        },
      }),
    );
  };

  const navigate = useNavigate();
  const createReservationData = useAppSelector(selectCreateReservation);

  const { changed } = useTreeChanges(createReservationData);
  const { roomingListColumns } = useColumns();

  const params: any = useLocation();

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Create reservation successfully!'));

      if (redirectDetail === true) {
        navigate(`/reservation/${createReservationData.reservation_created?.id}`);
      } else {
        navigate('/reservation');
      }
    }
  }, [changed]);

  useEffect(() => {
    dispatch(getReservationNumber(branchInfo));
    dispatch(resetReservation());
    dispatch(resetCreateReservation());
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [searchRoomResultState, setSearchRoomResultState] = useState<any>([]);

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

  const totalAmount = _.reduce(
    searchRoomResultState,
    function (total, item: any) {
      return parseInt(item.actual_amount, 10) + total;
    },
    0,
  );

  let reservationInfo: any = null;

  if (params.state && params.state?.reservationInfo) {
    const reservationInfoState = params.state?.reservationInfo;

    reservationInfo = {
      booker: {
        client_kind: reservationInfoState?.booker?.client_kind?.toString(),
        first_name: reservationInfoState?.booker?.first_name,
        last_name: reservationInfoState?.booker?.last_name,
        email_address1: reservationInfoState?.booker?.email_address1,
        email_address2: reservationInfoState?.booker?.email_address2,
        telephone_number1: reservationInfoState?.booker?.telephone_number1,
        client_rank: reservationInfoState?.booker?.client_rank.toString(),
      },
    };
  }

  return (
    <>
      <p className="title">{t('reservation.Create New Reservation')}</p>
      <p
        className="custom-bg-header"
        style={{
          fontSize: 13,
          color: 'rgba(0, 0, 0, 0.45)',
          paddingLeft: 24,
          paddingBottom: '1em',
          marginBottom: 0,
        }}
      >
        {t('reservation.Create New Reservation Note')}
      </p>
      <SelectRoomModal
        isModalVisible={isModalVisible}
        quantity={quantity}
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
      {reservationNumberResult && (
        <ReservationForm
          deleteSelectedRoom={deleteSelectedRoom}
          isCreateForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          reservationId=""
          reservationInfo={reservationInfo}
          reservationNumber={reservationNumberResult}
          roomCondition={roomCondition}
          roomTotalForm={roomTotalForm}
          roomingListColumns={roomingListColumns}
          rowSelection={rowSelection}
          selectedRowKeys={selectedRowKeys}
          setRedirectDetail={setRedirectDetail}
          setRoomCondition={setRoomCondition}
          showModal={showModal}
        />
      )}
    </>
  );
}

export default Create;
