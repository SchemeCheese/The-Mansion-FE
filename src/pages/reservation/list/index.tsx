import React from 'react';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import moment from 'moment';
import { selectSearchSchedule } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { fetchChannelsAction, searchReservation, searchScheduleAction } from 'actions';

import BreadcrumbList from 'components/BreadcrumbList';

import Calendar from './Calendar';
import ChannelManager from './ChannelManager';
import ReservationList from './ReservationList';

const { TabPane } = Tabs;

function Reservation() {
  const dispatch = useDispatch();

  const searchScheduleRedux: any = useAppSelector(selectSearchSchedule);
  const breadcrumbData = ['Home', 'List', 'App'];

  const handeleActive = (activeKey: string) => {
    if (activeKey === '1') {
      dispatch(
        searchReservation({
          current_page: 1,
          per_page: 10,
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

    if (activeKey === '2') {
      dispatch(
        searchReservation({
          current_page: 1,
          per_page: 10,
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
          start_date: '',
          rate_type: '',
        }),
      );
    }
  };

  return (
    <>
      <BreadcrumbList data={breadcrumbData} />

      <p className="title">Reservation List</p>

      <Tabs
        className="reservation-tabs"
        defaultActiveKey="1"
        onChange={activeKey => handeleActive(activeKey)}
        style={{ minHeight: '90%' }}
      >
        <TabPane key="1" className="content" tab="Waitlist">
          <ReservationList type="waitlist" />
        </TabPane>
        <TabPane key="2" className="content" tab="Reserved">
          <ReservationList type="reserved" />
        </TabPane>
        <TabPane key="3" className="content" tab="Calendar">
          <Calendar />
        </TabPane>
        <TabPane key="4" className="content" tab="Channel Manager">
          <ChannelManager />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Reservation;
