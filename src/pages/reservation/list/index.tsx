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

import { fetchChannelsAction } from 'actions';

import Calendar from './Calendar';
import ChannelManager from './ChannelManager';
import ReservationList from './ReservationList';

const { TabPane } = Tabs;

function Reservation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [fromDate, setFromDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const handeleActive = (activeKey: string) => {
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
      <p className="title">{t('reservation.Reservation List')}</p>

      <Tabs
        className="reservation-tabs custom-bg-header"
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
