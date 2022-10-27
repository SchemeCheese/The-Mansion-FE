import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Tabs } from 'antd';
import GuestList from 'pages/reservation/component/ReservationDetailTab/GuestList';
import Rate from 'pages/reservation/component/ReservationDetailTab/Rate';
import Schedule from 'pages/reservation/component/ReservationDetailTab/Schedule';
import Transaction from 'pages/reservation/component/ReservationDetailTab/Transaction';

import { getReservationDetail, searchAvailableScheduleAction } from 'actions';

import GeneralInfo from './ReservationDetailTab/GeneralInfo';

const { TabPane } = Tabs;

interface Props {
  reservationDetail: any;
  reservationId: string;
}

function ReservationDetailCard({ reservationDetail, reservationId }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
          end_date: '2022-10-08',
          floor: '',
          reservation_detail_id: reservationDetail.id,
          room_type: '',
          start_date: '2022-10-06',
          view: '',
        }),
      );
    }
  };

  return (
    <Col span={24} style={{ marginTop: 20 }}>
      <Tabs className="tabs-cart" defaultActiveKey="1" onChange={handleChangeTab}>
        <TabPane key="1" tab={t('common.General Infos')}>
          <GeneralInfo reservationDetailId={reservationDetail.id} reservationId={reservationId} />
        </TabPane>
        <TabPane key="2" tab={t('reservation.Rates')}>
          <Rate reservationDetailId={reservationDetail.id} reservationId={reservationId} />
        </TabPane>
        <TabPane key="3" tab={t('reservation.Schedule')}>
          <Schedule reservationDetailId={reservationDetail.id} reservationId={reservationId} />
        </TabPane>
        <TabPane key="4" tab={t('reservation.Guest List')}>
          <GuestList
            guests={reservationDetail.guests}
            reservationDetailId={reservationDetail.id}
            reservationId={reservationId}
          />
        </TabPane>
        <TabPane key="5" tab={t('reservation.Transactions')}>
          <Transaction reservationDetailId={reservationDetail.id} reservationId={reservationId} />
        </TabPane>
      </Tabs>
    </Col>
  );
}

export default ReservationDetailCard;
