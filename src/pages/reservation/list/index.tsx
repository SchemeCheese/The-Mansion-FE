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
import { Alert, Tabs } from 'ui/antd';
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
  const canViewReservation = user.permission?.reservation?.view === true;
  const canViewReservationCreate = user.permission?.reservation?.create === true;
  const canViewCalendar = user.permission?.calendar?.view === true;
  const canUseChannelManager = canViewReservation && branchInfoSelected?.channel_manager === true;

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
    canViewReservation
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
    canViewReservation
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
    canViewReservation || canViewCalendar
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
    canUseChannelManager
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
  const defaultActiveKey = (tabItems[0] as { key: string } | undefined)?.key;

  return (
    <>
      <p className={layoutStyles.title}>{t('reservation.Reservation List')}</p>

      {defaultActiveKey ? (
        <Tabs
          className={`${reservationListStyles.tabsShell} ${reservationListStyles.reservationTabs}`}
          defaultActiveKey={defaultActiveKey}
          items={tabItems as any}
          onChange={activeKey => handeleActive(activeKey)}
        />
      ) : (
        <Alert
          message={t('common.You do not have permission to access this page')}
          showIcon
          type="warning"
        />
      )}
    </>
  );
}

export default Reservation;
