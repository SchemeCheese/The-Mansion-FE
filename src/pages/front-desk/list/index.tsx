/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 25/11/2022
Updated Date : 26/11/2022
Main functions : Front Desk List
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import { selectUser } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import {
  getReservationRoomCheckinTodayAction,
  getReservationRoomCheckoutTodayAction,
  getReservationRoomInhouseAction,
  searchReservation,
} from 'actions';

import ReservationList from './ReservationList';
import ReservationRoomList from './ReservationRoomList';
import WalkIn from './WalkIn';

const { TabPane } = Tabs;

function FrontDesk() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  const handeleActive = (activeKey: string) => {
    if (activeKey === '2') {
      dispatch(
        searchReservation({
          current_page: 1,
          per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
            ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
            : 10,
          booker_info: '',
          folio_number: '',
          agent_name: '',
          status: '',
          market: '',
          source: '',
          checkin_from: '',
          checkin_to: '',
          checkout_from: '',
          checkout_to: '',
          inhouse: '',
          type: 'checkin_today',
        }),
      );

      dispatch(
        getReservationRoomCheckinTodayAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
    }

    if (activeKey === '3') {
      dispatch(
        getReservationRoomInhouseAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
    }

    if (activeKey === '4') {
      dispatch(
        getReservationRoomCheckoutTodayAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
    }
  };

  return (
    <>
      <p className="title">{t('frontDesk.Front Desk')}</p>

      <Tabs
        className="reservation-tabs"
        defaultActiveKey="1"
        onChange={activeKey => handeleActive(activeKey)}
        style={{ minHeight: '100%' }}
      >
        {user.permission.frontDeskWalkin.view && (
          <TabPane key="1" className="content" tab={t('frontDesk.Walk In')}>
            <WalkIn />
          </TabPane>
        )}
        {user.permission.frontDeskCheckin.view && (
          <>
            <TabPane key="2" className="content" tab={t('frontDesk.CheckIn Today')}>
              <ReservationRoomList type="checkin_today" />
            </TabPane>
            <TabPane key="3" className="content" tab={t('frontDesk.In House')}>
              <ReservationRoomList type="inhouse_today" />
            </TabPane>
            <TabPane key="4" className="content" tab={t('frontDesk.Checkout Today')}>
              <ReservationRoomList type="checkout_today" />
            </TabPane>
          </>
        )}
      </Tabs>
    </>
  );
}

export default FrontDesk;
