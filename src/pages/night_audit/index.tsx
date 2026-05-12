import { notify } from 'ui/notification';
/** ***********************************
Module Name : Night Audit
Developer Name : MinhNV
Created Date : 01/01/2023
Updated Date : 03/05/2023
Main functions : Night Audit Index
************************************ */

import 'styles/night_audit.css';

import React, { useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Alert, Card, Col, Pagination, Row, Table } from 'ui/antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';
import {
  selectBranchInfo,
  selectNightAuditState,
  selectNoShowState,
  selectReservationRoomCheckinTodayState,
  selectReservationRoomCheckoutTodayState,
  selectReservationRoomInhouseState,
} from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import {
  getFacilityAction,
  getReservationRoomCheckinTodayAction,
  getReservationRoomCheckoutTodayAction,
  getReservationRoomInhouseAction,
  handleNightAuditAction,
  handleNoShowReservationDetailAction,
} from 'actions';
import layoutStyles from 'components/layout.module.css';
import reservationStyles from 'styles/reservation.module.css';

import PattonButton from 'components/PattonButton';

import { BranchInfoState, ReservationRoomInhouseState } from 'types';

interface DataType {
  address: string;
  age: number;
  key: React.Key;
  name: string;
}

function NightAudit() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reservationRoomInhouseData: ReservationRoomInhouseState = useAppSelector(
    selectReservationRoomInhouseState,
  );
  const reservationRoomCheckoutTodayData: ReservationRoomInhouseState = useAppSelector(
    selectReservationRoomCheckoutTodayState,
  );
  const reservationRoomCheckinTodayData: ReservationRoomInhouseState = useAppSelector(
    selectReservationRoomCheckinTodayState,
  );
  const branchInfoSelected: BranchInfoState = useAppSelector(selectBranchInfo);

  const selectNightAuditData = useAppSelector(selectNightAuditState);
  const { changed: selectNightAuditDateChanged } = useTreeChanges(selectNightAuditData);

  const selectNoShowData = useAppSelector(selectNoShowState);
  const { changed: selectNoShowChanged } = useTreeChanges(selectNoShowData);

  const statusMapping = (status: string) => {
    const svgStatus = {
      checkout: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="#9254DE" r="3" />
          </svg>
          Checkout
        </>
      ),
      reserved: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="#1D39C4" r="3" />
          </svg>
          Reserved
        </>
      ),
      canceled: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="#F5222D" r="3" />
          </svg>
          Canceled
        </>
      ),
      in_house: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="#52C41A" r="3" />
          </svg>
          In House
        </>
      ),
      no_show: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="#52C41A" r="3" />
          </svg>
          No Show
        </>
      ),
      waitlist: (
        <>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 6, position: 'relative', top: -2 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="black" fillOpacity="0.25" r="3" />
          </svg>
          Waitlist
        </>
      ),
    };

    if (
      status === 'checkout' ||
      status === 'reserved' ||
      status === 'canceled' ||
      status === 'in_house' ||
      status === 'waitlist' ||
      status === 'no_show'
    ) {
      return svgStatus[status];
    }

    return '';
  };

  const checkinTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Folio ID'),
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('common.Booker Via'),
      dataIndex: 'booker_via',
      key: 'booker_via',
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
    },
    {
      title: t('common.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => statusMapping(text),
    },
    {
      title: '',
      dataIndex: '',
      render: (text: string, record: any) => {
        return (
          record.is_can_noshow && (
            <PattonButton
              onClick={(event: MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                dispatch(
                  handleNoShowReservationDetailAction({
                    reservation_detail_id: record.reservation_detail_id,
                  }),
                );
              }}
            >
              {t('nightAudit.No Show')}
            </PattonButton>
          )
        );
      },
    },
  ];

  const checkoutTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('common.Booking Number'),
      dataIndex: 'booking_number',
      key: 'booking_number',
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
    },
    {
      title: t('common.Remain'),
      dataIndex: 'remain',
      key: 'remain',
    },
    {
      title: t('common.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => statusMapping(text),
    },
  ];

  const inhouseTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('common.Booking Number'),
      dataIndex: 'booking_number',
      key: 'booking_number',
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
    },
    {
      title: t('common.Rate'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  useEffect(() => {
    dispatch(getFacilityAction({ facility_id: window.localStorage.getItem('facility_id') ?? '1' }));

    dispatch(
      getReservationRoomCheckinTodayAction({
        filter: {
          booker_info: '',
          current_page: 1,
          per_page: 10,
          room_no: '',
          source_id: '',
          status: '',
        },
      }),
    );
    dispatch(
      getReservationRoomInhouseAction({
        filter: {
          booker_info: '',
          current_page: 1,
          per_page: 10,
          room_no: '',
          source_id: '',
          status: '',
        },
      }),
    );

    dispatch(
      getReservationRoomCheckoutTodayAction({
        filter: {
          booker_info: '',
          current_page: 1,
          per_page: 10,
          room_no: '',
          source_id: '',
          status: '',
        },
      }),
    );
  }, []);

  useEffect(() => {
    if (selectNightAuditDateChanged('is_finish', true)) {
      notify.success(t('message.Handle night audit successfully!'));

      dispatch(
        getFacilityAction({ facility_id: window.localStorage.getItem('facility_id') ?? '1' }),
      );

      dispatch(
        getReservationRoomCheckinTodayAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
      dispatch(
        getReservationRoomInhouseAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );

      dispatch(
        getReservationRoomCheckoutTodayAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
    }
  }, [selectNightAuditDateChanged]);

  useEffect(() => {
    if (selectNoShowChanged('is_finish', true)) {
      notify.success(t('message.Handle no show successfully!'));

      dispatch(
        getReservationRoomCheckinTodayAction({
          filter: {
            booker_info: '',
            current_page: 1,
            per_page: 10,
            room_no: '',
            source_id: '',
            status: '',
          },
        }),
      );
    }
  }, [selectNoShowChanged]);

  const checkinTodayDataTable = reservationRoomCheckinTodayData?.data.items?.map((item: any) => {
    return {
      ...item,
      folio_id: item.folio_id,
      room_no: item.room_no || '-',
      booker_name: item.booker_name,
      booker_via: item.source,
      checkin: item.checkin,
      checkout: item.checkout,
      total_guest: item.total_guest,
      status: item.status,
    };
  });

  const inhouseDataTable = reservationRoomInhouseData?.data.items?.map((item: any) => {
    return {
      ...item,
      room_no: item.room_no,
      booker_name: item.booker_name,
      booking_number: item.folio_id,
      checkin: item.checkin,
      checkout: item.checkout,
      total_guest: item.total_guest,
      rate_name: item.rate_name,
      amount: formatNumber(item.total_amount),
    };
  });

  const checkoutTodayDataTable = reservationRoomCheckoutTodayData?.data.items?.map((item: any) => {
    return {
      ...item,
      room_no: item.room_no,
      booker_name: item.booker_name,
      booking_number: item.folio_id,
      checkin: item.checkin,
      checkout: item.checkout,
      total_guest: item.total_guest,
      remain: formatNumber(item.total_remain),
      status: item.status,
    };
  });

  const onChangeCurrentPageCheckinToday = (page: number, pageSize: number) => {
    dispatch(
      getReservationRoomCheckinTodayAction({
        filter: {
          ...reservationRoomCheckinTodayData.filter,
          current_page: page,
          per_page: pageSize,
        },
      }),
    );
  };

  const onChangeCurrentPageInhouseToday = (page: number, pageSize: number) => {
    dispatch(
      getReservationRoomInhouseAction({
        filter: {
          ...reservationRoomInhouseData.filter,
          current_page: page,
          per_page: pageSize,
        },
      }),
    );
  };

  const onChangeCurrentPageCheckoutToday = (page: number, pageSize: number) => {
    dispatch(
      getReservationRoomCheckoutTodayAction({
        filter: {
          ...reservationRoomCheckoutTodayData.filter,
          current_page: page,
          per_page: pageSize,
        },
      }),
    );
  };

  return (
    <>
      {/* <Button onClick={showModal}>Payment Method</Button> */}
      <Row className={layoutStyles.customBgHeader}>
        <Col span={12}>
          <p className={layoutStyles.title}>
            {' '}
            <span style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.45)' }}>
              {t('nightAudit.Current Date')}:{' '}
            </span>
            <span style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.85)' }}>
              {moment(branchInfoSelected.business_date).format('DD/MM/YYYY')}
            </span>
          </p>
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 20, paddingTop: 10 }}>
          <PattonButton
            disabled={!branchInfoSelected.can_night_audit}
            onClick={() => {
              dispatch(
                handleNightAuditAction({
                  facility_id: localStorage.getItem('facility_id')?.toString() || '',
                }),
              );
            }}
            style={{
              position: 'relative',
              top: -15,
            }}
          >
            {t('nightAudit.Process Night Audit')}
          </PattonButton>
        </Col>
      </Row>
      {branchInfoSelected.warning_na_msg && (
        <Row>
          <Col span={24}>
            <Alert banner message={branchInfoSelected.warning_na_msg} />
          </Col>
        </Row>
      )}
      <Row className={layoutStyles.content}>
        <Card bordered={false} style={{ width: '100%' }} title={t('nightAudit.I. Checkin Today')}>
          <Table
            className={reservationStyles.roomingTable}
            columns={checkinTodayColumns}
            dataSource={checkinTodayDataTable}
            onRow={(record: any) => {
              return {
                onClick: () => {
                  window.open(
                    `/front-desk/checkin-today/${record.reservation_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                },
              };
            }}
            pagination={false}
            rowClassName={(record: any) => {
              if (record.room_no === '-') {
                return reservationStyles.newReservation;
              }

              return '';
            }}
            size="small"
          />
          {reservationRoomCheckinTodayData.total >
            reservationRoomCheckinTodayData.filter.per_page && (
            <Pagination
              current={reservationRoomCheckinTodayData.filter.current_page}
              onChange={onChangeCurrentPageCheckinToday}
              pageSize={reservationRoomCheckinTodayData.filter.per_page}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15 }}
              total={reservationRoomCheckinTodayData.total}
            />
          )}
        </Card>
        <Card
          bordered={false}
          style={{ width: '100%', marginTop: 20 }}
          title={t('nightAudit.II. Checkout Today')}
        >
          <Table
            className={reservationStyles.roomingTable}
            columns={checkoutTodayColumns}
            dataSource={checkoutTodayDataTable}
            onRow={(record: any) => {
              return {
                onClick: () => {
                  window.open(
                    `/front-desk/checkout-today/${record.reservation_id}/detail/${record.reservation_detail_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                },
              };
            }}
            pagination={false}
            size="small"
          />
          {reservationRoomCheckoutTodayData.total >
            reservationRoomCheckoutTodayData.filter.per_page && (
            <Pagination
              current={reservationRoomCheckoutTodayData.filter.current_page}
              onChange={onChangeCurrentPageCheckoutToday}
              pageSize={reservationRoomCheckoutTodayData.filter.per_page}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15 }}
              total={reservationRoomCheckoutTodayData.total}
            />
          )}
        </Card>
        <Card
          bordered={false}
          style={{ width: '100%', marginTop: 20 }}
          title={t('nightAudit.III. Inhouse')}
        >
          <Table
            className={reservationStyles.roomingTable}
            columns={inhouseTodayColumns}
            dataSource={inhouseDataTable}
            onRow={(record: any) => {
              return {
                onClick: () => {
                  window.open(
                    `/front-desk/inhouse-today/${record.reservation_id}/detail/${record.reservation_detail_id}`,
                    '_blank',
                    'noopener,noreferrer',
                  );
                },
              };
            }}
            pagination={false}
            size="small"
          />
          {reservationRoomInhouseData.total > reservationRoomInhouseData.filter.per_page && (
            <Pagination
              current={reservationRoomInhouseData.filter.current_page}
              onChange={onChangeCurrentPageInhouseToday}
              pageSize={reservationRoomInhouseData.filter.per_page}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15 }}
              total={reservationRoomInhouseData.total}
            />
          )}
        </Card>
      </Row>
    </>
  );
}

export default NightAudit;
