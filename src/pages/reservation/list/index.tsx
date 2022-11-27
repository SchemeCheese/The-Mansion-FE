/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation List
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import moment from 'moment';
import { selectSearchSchedule } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { fetchChannelsAction, searchReservation, searchScheduleAction } from 'actions';

// import BreadcrumbList from 'components/BreadcrumbList';
import Calendar from './Calendar';
import ChannelManager from './ChannelManager';
import ReservationList from './ReservationList';

const { TabPane } = Tabs;

function Reservation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const searchScheduleRedux: any = useAppSelector(selectSearchSchedule);
  const [fromDate, setFromDate] = useState<string>(moment().format('YYYY-MM-DD'));

  // const breadcrumbData = [t('common.TMHA'), t('common.Reservation')];

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
          type: 'waitlist',
        }),
      );
    }

    if (activeKey === '1') {
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
          type: 'reserved',
        }),
      );
    }

    if (activeKey === '3') {
      dispatch(
        searchScheduleAction({
          start_date: searchScheduleRedux.start_date ?? moment().format('YYYY-MM-DD'),
          end_date: searchScheduleRedux.end_date ?? moment().add(15, 'days').format('YYYY-MM-DD'),
          room_type: searchScheduleRedux.room_type ?? '',
          room_number: searchScheduleRedux.room_number ?? '',
        }),
      );
    }

    if (activeKey === '4') {
      dispatch(
        fetchChannelsAction({
          fromDate,
        }),
      );
    }
  };

  return (
    <>
      {/* <BreadcrumbList data={breadcrumbData} /> */}

      <p className="title">{t('reservation.Reservation List')}</p>

      <Tabs
        className="reservation-tabs"
        defaultActiveKey="1"
        onChange={activeKey => handeleActive(activeKey)}
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className="content" tab={t('reservation.Reserved')}>
          <ReservationList type="reserved" />
        </TabPane>
        <TabPane key="2" className="content" tab={t('reservation.Waitlist')}>
          <ReservationList type="waitlist" />
        </TabPane>
        <TabPane key="3" className="content" tab={t('reservation.Calendar')}>
          <Calendar />
        </TabPane>
        <TabPane key="4" className="content" tab={t('reservation.Channel Manager')}>
          <ChannelManager fromDate={fromDate} setFromDate={setFromDate} />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Reservation;
