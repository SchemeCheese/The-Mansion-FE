/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation Detail Card
************************************ */

import 'styles/reservation_detail_card.css';

import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Col, Tabs } from 'antd';
import GuestList from 'pages/reservation/component/ReservationDetailTab/GuestList';
import MonthlyInvoice from 'pages/reservation/component/ReservationDetailTab/MonthlyInvoice';
import Rate from 'pages/reservation/component/ReservationDetailTab/Rate';
import Schedule from 'pages/reservation/component/ReservationDetailTab/Schedule';
import Transaction from 'pages/reservation/component/ReservationDetailTab/Transaction';

import { getReservationDetail, searchAvailableScheduleAction } from 'actions';

import { RootState } from 'types';

import GeneralInfo from './ReservationDetailTab/GeneralInfo';

const { TabPane } = Tabs;

interface Props {
  reservationDetail: any;
  reservationId: string;
  typeScreen?: string | undefined;
}

function ReservationDetailCard({ reservationDetail, reservationId, typeScreen }: Props) {
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
      className="reservation-detail-card"
      span={24}
      style={{ marginTop: isScreenInHouseToday(typeScreen) ? 0 : 20 }}
    >
      <div
        ref={reservationDetailCardRef}
        style={{
          background: '#F0F2F5',
          border: !isScreenInHouseToday(typeScreen) ? '1px solid #E8E8E8' : 0,
          borderRadius: '2px',
        }}
      >
        <Tabs
          className={`tabs-cart ${isScreenInHouseToday(typeScreen) ? 'tabs-in-house-today' : ''}`}
          defaultActiveKey={tabParam ?? (isScreenInHouseToday(typeScreen) ? '5' : '1')}
          onChange={handleChangeTab}
        >
          {isScreenInHouseToday(typeScreen) && (
            <TabPane key="5" tab={t('reservation.Transactions')}>
              <Transaction
                reservationDetailId={reservationDetail.id}
                reservationId={reservationId}
              />
            </TabPane>
          )}
          <TabPane
            key="1"
            className={isScreenInHouseToday(typeScreen) ? 'tab-pane-in-house-today' : ''}
            tab={t('common.General Infos')}
          >
            <GeneralInfo reservationDetailId={reservationDetail.id} reservationId={reservationId} />
          </TabPane>
          <TabPane
            key="2"
            className={isScreenInHouseToday(typeScreen) ? 'tab-pane-in-house-today' : ''}
            tab={t('reservation.Rates')}
          >
            <Rate reservationDetailId={reservationDetail.id} reservationId={reservationId} />
          </TabPane>
          <TabPane
            key="3"
            className={isScreenInHouseToday(typeScreen) ? 'tab-pane-in-house-today' : ''}
            tab={t('reservation.Schedule')}
          >
            <Schedule reservationDetailId={reservationDetail.id} reservationId={reservationId} />
          </TabPane>
          <TabPane
            key="4"
            className={isScreenInHouseToday(typeScreen) ? 'tab-pane-in-house-today' : ''}
            tab={t('reservation.Guest List')}
          >
            <GuestList
              guests={reservationDetail.guests}
              reservationDetailId={reservationDetail.id}
              reservationId={reservationId}
            />
          </TabPane>
          {!isScreenInHouseToday(typeScreen) && (
            <TabPane key="5" tab={t('reservation.Transactions')}>
              <Transaction
                reservationDetailId={reservationDetail.id}
                reservationId={reservationId}
              />
            </TabPane>
          )}
          <TabPane key="6" tab={t('reservation.Monthly Invoices')}>
            <MonthlyInvoice
              reservationDetailId={reservationDetail.id}
              reservationId={reservationId}
            />
          </TabPane>
        </Tabs>
      </div>
    </Col>
  );
}

export default ReservationDetailCard;
