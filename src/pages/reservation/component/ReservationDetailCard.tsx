/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation Detail Card
************************************ */

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Col, Tabs } from 'ui/antd';
import GuestList from 'pages/reservation/component/ReservationDetailTab/GuestList';
import MonthlyInvoice from 'pages/reservation/component/ReservationDetailTab/MonthlyInvoice';
import Rate from 'pages/reservation/component/ReservationDetailTab/Rate';
import Schedule from 'pages/reservation/component/ReservationDetailTab/Schedule';
import Transaction from 'pages/reservation/component/ReservationDetailTab/Transaction';

import { getReservationDetail, searchAvailableScheduleAction } from 'actions';
import layoutStyles from 'components/layout.module.css';
import detailStyles from 'pages/reservation/detail/reservation-detail.module.css';

import { RootState } from 'types';

import GeneralInfo from './ReservationDetailTab/GeneralInfo';

interface Props {
  reservationDetail: any;
  reservationId: string;
  resetSelectedRows?: any;
  typeScreen?: string | undefined;
}

function ReservationDetailCard({
  reservationDetail,
  reservationId,
  resetSelectedRows,
  typeScreen,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );

  const handleChangeTab = (tab: string) => {
    if (tab === '3') {
      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetail.id,
        }),
      );

      dispatch(
        searchAvailableScheduleAction({
          direction: '',
          end_date: reservationDetailInfo.checkout,
          floor: '',
          reservation_detail_id: reservationDetail.id,
          room_type: '',
          start_date: reservationDetailInfo.checkin,
          view: '',
        }),
      );
    }
  };

  const isScreenInHouseToday = (type: string | undefined) => {
    return type === 'inhouse_today';
  };

  const params = useLocation();
  const searchParam = new URLSearchParams(params.search);
  const tabParam = searchParam.get('tab');
  const reservationDetailCardRef: any = useRef(null);
  const tabPaneClassName = isScreenInHouseToday(typeScreen)
    ? detailStyles.detailCardPaneInhouse
    : undefined;

  useEffect(() => {
    if (tabParam) {
      // Problem: scrollIntoView not working with behavior: "smooth"
      // So we will fix by https://stackoverflow.com/a/59783696
      // newRef.current?.scrollIntoView();
      const element = reservationDetailCardRef.current.getBoundingClientRect().top + window.scrollY;

      window.scroll({
        top: element,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <Col
      className={`${detailStyles.detailCardCol} ${isScreenInHouseToday(typeScreen) ? detailStyles.detailCardColInhouse : ''}`}
      span={24}
    >
      <div
        ref={reservationDetailCardRef}
        className={`${detailStyles.detailCardFrame} ${isScreenInHouseToday(typeScreen) ? detailStyles.detailCardFrameInhouse : ''}`}
      >
        <Tabs
          className={`${layoutStyles.tabsCart} ${detailStyles.detailTabs} ${isScreenInHouseToday(typeScreen) ? 'tabs-in-house-today' : ''}`}
          defaultActiveKey={tabParam ?? (isScreenInHouseToday(typeScreen) ? '5' : '1')}
          items={[
            ...(isScreenInHouseToday(typeScreen)
              ? [
                  {
                    key: '5',
                    label: t('reservation.Transactions'),
                    children: (
                      <Transaction
                        reservationDetailId={reservationDetail.id}
                        reservationId={reservationId}
                      />
                    ),
                  },
                ]
              : []),
            {
              key: '1',
              label: t('common.General Infos'),
              children: (
                <div className={tabPaneClassName}>
                  <GeneralInfo
                    reservationDetailId={reservationDetail.id}
                    reservationId={reservationId}
                  />
                </div>
              ),
            },
            {
              key: '2',
              label: t('reservation.Rates'),
              children: (
                <div className={tabPaneClassName}>
                  <Rate reservationDetailId={reservationDetail.id} reservationId={reservationId} />
                </div>
              ),
            },
            {
              key: '3',
              label: t('reservation.Schedule'),
              children: (
                <div className={tabPaneClassName}>
                  <Schedule
                    reservationDetailId={reservationDetail.id}
                    reservationId={reservationId}
                    resetSelectedRows={resetSelectedRows}
                  />
                </div>
              ),
            },
            {
              key: '4',
              label: t('reservation.Guest List'),
              children: (
                <div className={tabPaneClassName}>
                  <GuestList
                    guests={reservationDetail.guests}
                    reservationDetailId={reservationDetail.id}
                    reservationId={reservationId}
                  />
                </div>
              ),
            },
            ...(!isScreenInHouseToday(typeScreen)
              ? [
                  {
                    key: '5',
                    label: t('reservation.Transactions'),
                    children: (
                      <Transaction
                        reservationDetailId={reservationDetail.id}
                        reservationId={reservationId}
                      />
                    ),
                  },
                ]
              : []),
            {
              key: '6',
              label: t('reservation.Monthly Invoices'),
              children: (
                <MonthlyInvoice
                  reservationDetailId={reservationDetail.id}
                  reservationId={reservationId}
                />
              ),
            },
          ]}
          onChange={handleChangeTab}
        />
      </div>
    </Col>
  );
}

export default ReservationDetailCard;
