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
import useColumns from 'pages/reservation/create/useColumns';
import CancelBookingModal from 'pages/reservation/modal/CancelBookingModal';
import { selectCreateReservation } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { createReservation, searchRoomReset } from 'actions';

import BreadcrumbList from 'components/BreadcrumbList';

import { RootState } from 'types';

import ReservationForm from './ReservationForm';
import SelectRoomModal from './SelectRoomModal';

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
      <ReservationForm
        isCreateForm
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        roomList={roomList}
        roomingListColumns={roomingListColumns}
        rowSelection={rowSelection}
        setIsCancelBookingModalVisible={setIsCancelBookingModalVisible}
        showModal={showModal}
      />
    </>
  );
}

export default Create;
