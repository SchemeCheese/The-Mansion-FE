/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 10/12/2022
Updated Date : 11/12/2022
Main functions : Reservation Room List Page
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Pagination, Row, Table, Tag } from 'antd';
import { formatNumber, mappingStatus } from 'helpers';
import {
  selectReservationRoomCheckinTodayState,
  selectReservationRoomCheckoutTodayState,
  selectReservationRoomInhouseState,
} from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { searchReservation } from 'actions';

import ReservationRoomListFilter from './ReservationRoomListFilter';

interface Props {
  type: string;
}

function ReservationRoomList({ type }: Props) {
  const [searchCondition, setSearchCondition] = useState({
    current_page: 1,
    per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
      ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
      : 10,
    booker_info: '',
    room_no: '',
    source_id: '',
    status: '',
    type,
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reservationRoomInhouseData: any = useAppSelector(selectReservationRoomInhouseState);
  const reservationRoomCheckoutTodayData: any = useAppSelector(
    selectReservationRoomCheckoutTodayState,
  );
  const reservationRoomCheckinTodayData: any = useAppSelector(
    selectReservationRoomCheckinTodayState,
  );

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    setSearchCondition({
      ...searchCondition,
      current_page: page,
      per_page: pageSize,
    });

    dispatch(
      searchReservation({
        ...searchCondition,
        current_page: page,
        per_page: pageSize,
      }),
    );
  };

  const tableColumns = [
    {
      title: t('common.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
      hidden: type !== 'inhouse_today' && type !== 'checkout_today',
    },
    {
      title: t('reservation.Folio ID'),
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: t('common.Status'),
      dataIndex: 'status',
      key: 'status',
      hidden: type !== 'checkin_today',
    },
    {
      title: t('common.Created Date'),
      dataIndex: 'created_date',
      key: 'created_date',
      hidden: type !== 'checkin_today',
    },
    {
      title: t('common.Source TA'),
      dataIndex: 'source',
      key: 'source',
      hidden: type !== 'checkin_today',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('common.Phone'),
      dataIndex: 'booker_phone',
      key: 'booker_phone',
    },
    {
      title: t('reservation.Email.title'),
      dataIndex: 'booker_email',
      key: 'booker_email',
      hidden: type !== 'checkin_today',
    },
    {
      title: t('reservation.Checkin'),
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('common.Total Guest')}</div>;
      },
      dataIndex: 'total_guest',
      key: 'total_guest',
      render: (text: string) => (
        <div style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.65)' }}>{text}</div>
      ),
      hidden: type !== 'checkin_today',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('common.Total Room')}</div>;
      },
      dataIndex: 'total_room',
      key: 'total_room',
      render: (text: string) => (
        <div style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.65)' }}>{text}</div>
      ),
      hidden: type !== 'checkin_today',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('common.Guest')}</div>;
      },
      dataIndex: 'total_guest',
      key: 'total_guest',
      render: (text: string) => (
        <div style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.65)' }}>{text}</div>
      ),
      hidden: type === 'checkin_today',
    },
    {
      title: t('common.Total Amount'),
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (text: number) => (
        <div style={{ textAlign: 'right', paddingRight: 20, color: 'rgba(0, 0, 0, 0.65)' }}>
          {formatNumber(text)}
        </div>
      ),
      hidden: type !== 'inhouse_today' && type !== 'checkout_today',
    },
    {
      title: t('common.Paid'),
      dataIndex: 'paid',
      key: 'paid',
      render: (text: number) => (
        <div style={{ textAlign: 'right', paddingRight: 20, color: 'rgba(0, 0, 0, 0.65)' }}>
          {formatNumber(text)}
        </div>
      ),
      hidden: type !== 'inhouse_today' && type !== 'checkout_today',
    },
    {
      title: t('common.Remain'),
      dataIndex: 'remain',
      key: 'remain',
      render: (text: number) => (
        <div style={{ textAlign: 'right', paddingRight: 20, color: 'rgba(0, 0, 0, 0.65)' }}>
          {formatNumber(text)}
        </div>
      ),
      hidden: type !== 'inhouse_today' && type !== 'checkout_today',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('common.Notes')}</div>;
      },
      dataIndex: 'notes',
      key: 'notes',
      hidden: type === 'checkin_today',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('common.Alert')}</div>;
      },
      dataIndex: 'alert',
      key: 'alert',
      render: (text: string, record: any) => {
        const alert = [];

        if (record.isEarlyCheckin) {
          alert.push(<Tag color="#f50">E/L</Tag>);
        }

        if (record.isLateCheckout) {
          alert.push(<Tag color="#2db7f5">E/C</Tag>);
        }

        if (record.isDropOff) {
          alert.push(<Tag color="#87d068">D/O</Tag>);
        }

        if (record.isPickup) {
          alert.push(<Tag color="#108ee9">P/U</Tag>);
        }

        if (alert.length > 0) {
          return <div style={{ minWidth: 0 }}>{alert}</div>;
        }

        return <div style={{ textAlign: 'center' }}>{text ?? '-'}</div>;
      },
      hidden: type !== 'checkin_today',
    },
  ].filter(item => !item.hidden);

  const convertReservationRoomsData = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return {
          ...item,
          key: item.id,
          phone: item.booker_phone,
          paid: item.total_paid,
          remain: item.total_remain,
          notes: item.note,
          status: mappingStatus(item.status),
        };
      });
    }

    return [];
  };

  let tableData = [];
  let currentPage = 1;
  let total = 0;

  if (type === 'inhouse_today') {
    tableData = convertReservationRoomsData(reservationRoomInhouseData.data?.items);
    currentPage = reservationRoomInhouseData.filter.current_page;
    total = reservationRoomInhouseData.total;
  }

  if (type === 'checkout_today') {
    tableData = convertReservationRoomsData(reservationRoomCheckoutTodayData.data?.items);
    currentPage = reservationRoomCheckoutTodayData.filter.current_page;
    total = reservationRoomCheckoutTodayData.total;
  }

  if (type === 'checkin_today') {
    tableData = convertReservationRoomsData(reservationRoomCheckinTodayData.data?.items);
    currentPage = reservationRoomCheckinTodayData.filter.current_page;
    total = reservationRoomCheckinTodayData.total;
  }

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <ReservationRoomListFilter
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
          type={type}
        />
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <Table
          className="reservation-list"
          columns={tableColumns}
          dataSource={tableData}
          onRow={(record: any) => {
            return {
              onClick: () => {
                if (type === 'inhouse_today') {
                  window.open(
                    `/front-desk/inhouse-today/${record.reservation_id}/detail/${record.reservation_detail_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                } else if (type === 'checkin_today') {
                  window.open(
                    `/front-desk/checkin-today/${record.reservation_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                } else {
                  window.open(
                    `/front-desk/checkout-today/${record.reservation_id}/detail/${record.reservation_detail_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                }
              },
            };
          }}
          pagination={false}
          size="small"
          style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
        />
        {total > 0 && (
          <Pagination
            current={currentPage}
            onChange={onChangeCurrentPage}
            pageSize={10}
            showSizeChanger={false}
            style={{ float: 'right', marginTop: 15 }}
            total={total}
          />
        )}
      </Col>
    </Row>
  );
}

export default ReservationRoomList;
