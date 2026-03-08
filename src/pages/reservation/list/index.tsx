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
import { Tabs } from 'ui/antd';
import moment from 'moment';
import { selectBranchInfo, selectUser } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { fetchChannelsAction } from 'actions';
import layoutStyles from 'components/layout.module.css';
import reservationListStyles from 'pages/reservation/list/reservation-list.module.css';

import Calendar from './Calendar';
import ChannelManager from './ChannelManager';
import ReservationList from './ReservationList';

function Reservation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [fromDate, setFromDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const user = useAppSelector(selectUser);
  const branchInfoSelected: any = useAppSelector(selectBranchInfo);

  const handeleActive = (activeKey: string) => {
    if (activeKey === '4') {
      dispatch(
        fetchChannelsAction({
          fromDate,
        }),
      );
    }
  };

  const tabItems = [
    user.permission.reservation.view
      ? {
          key: '1',
          label: t('reservation.Reserved'),
          children: (
            <div className={reservationListStyles.panelContent}>
              <ReservationList type="reserved" />
            </div>
          ),
        }
      : null,
    user.permission.reservation.view
      ? {
          key: '2',
          label: t('reservation.Waitlist'),
          children: (
            <div className={reservationListStyles.panelContent}>
              <ReservationList type="waitlist" />
            </div>
          ),
        }
      : null,
    user.permission.reservation.view || user.permission.calendar.view
      ? {
          key: '3',
          label: t('reservation.Calendar'),
          children: (
            <div className={reservationListStyles.panelContent}>
              <Calendar />
            </div>
          ),
        }
      : null,
    user.permission.reservation.view && branchInfoSelected.channel_manager
      ? {
          key: '4',
          label: t('reservation.Channel Manager'),
          children: (
            <div className={reservationListStyles.panelContent}>
              <ChannelManager fromDate={fromDate} setFromDate={setFromDate} />
            </div>
          ),
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      <p className={layoutStyles.title}>{t('reservation.Reservation List')}</p>

      <Tabs
        className={`${reservationListStyles.tabsShell} ${reservationListStyles.reservationTabs}`}
        defaultActiveKey="1"
        items={tabItems as any}
        onChange={activeKey => handeleActive(activeKey)}
      />
    </>
  );
}

export default Reservation;
