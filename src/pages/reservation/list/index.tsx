import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Tabs } from 'antd';
import moment from 'moment';
import { selectSearchSchedule } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { searchReservation, searchScheduleAction } from 'actions';

import BreadcrumbList from 'components/BreadcrumbList';

import Calendar from './Calendar';
import ChannelManager from './ChannelManager';
import ReservationList from './ReservationList';

const { TabPane } = Tabs;

function Reservation() {
  const dates = [];

  for (let index = 0; index < 10; index++) {
    const bgColor = index === 2 || index === 1 ? '#FFF2E8' : '#FFFFFF';

    dates.push(
      <Col
        flex={1}
        style={{
          border: '1px solid #E8E8E8',
          borderRightStyle: 'none',
          textAlign: 'center',
          backgroundColor: bgColor,
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          Fri
        </p>
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          27
        </p>
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          NOV
        </p>
      </Col>,
    );
  }

  const dispatch = useDispatch();

  const searchScheduleRedux: any = useAppSelector(selectSearchSchedule);
  const breadcrumbData = ['Home', 'List', 'App'];

  const handeleActive = (activeKey: string) => {
    if (activeKey === '1') {
      dispatch(
        searchReservation({
          current_page: 1,
          per_page: 7,
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
          per_page: 7,
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
