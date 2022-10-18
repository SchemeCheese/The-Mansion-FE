/** ***********************************
Module Name : Reservation
Developer Name : HangNTT
Created Date : 24/08/2022
Updated Date : 15/09/2022
Main functions : Reservation List Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Pagination, Row, Spin, Table, Tag } from 'antd';

import { searchReservation } from 'actions';

import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

import ReservationListFilter from './ReservationListFilter';

interface Props {
  type: string;
}

function ReservationList({ type }: Props) {
  const [searchCondition, setSearchCondition] = useState({
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
    type,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearching = useSelector<RootState>(({ reservation }) => reservation.is_searching);
  const items = useSelector<RootState>(({ reservation }) => reservation.data);
  const total: any = useSelector<RootState>(({ reservation }) => reservation.total);
  const currentPage: any = useSelector<RootState>(({ reservation }) => reservation.current_page);

  useEffect(() => {
    dispatch(searchReservation(searchCondition));
  }, []);

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

  const convertData = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item.id,
          key: item.id,
          folio_id: item.reservationNumber,
          status: item.status,
          created_date: item.created_at,
          source_ta: item.source,
          checkin: item.checkin,
          checkout: item.checkout,
          booker_name: item.booker.name,
          email: item.booker.email,
          phone: item.booker.phone_number,
          total_room: item.room_total,
          isDropOff: item.isDropOff,
          isEarlyCheckin: item.isEarlyCheckin,
          isLateCheckout: item.isLateCheckout,
          isPickup: item.isPickup,
        };
      });
    }

    return [];
  };

  const statusMapping = (status: string) => {
    const svgStatus = {
      checkout: (
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
      ),
      reserved: (
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
      ),
      canceled: (
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
      ),
      inhouse: (
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
      ),
    };

    if (
      status === 'checkout' ||
      status === 'reserved' ||
      status === 'canceled' ||
      status === 'inhouse'
    ) {
      return svgStatus[status];
    }

    return (
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
    );
  };

  const columnsWaitlist = [
    {
      title: 'Folio ID',
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <div style={{ minWidth: 80 }}>
          {statusMapping(text)}
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
      ),
      hidden: type === 'waitlist',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: 'Source TA',
      dataIndex: 'source_ta',
      key: 'source_ta',
    },
    {
      title: 'Checkin',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Booker Name',
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Total Room',
      dataIndex: 'total_room',
      key: 'total_room',
      render: (text: string) => (
        <div style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.65)' }}>{text}</div>
      ),
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>Alert</div>;
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
    },
  ].filter(item => !item.hidden);

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <ReservationListFilter
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
        />
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <PattonButton onClick={() => navigate(`/reservation/create`)}>
          {' '}
          <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> New
        </PattonButton>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        {!isSearching ? (
          <>
            <Table
              className="reservation-list"
              columns={columnsWaitlist}
              dataSource={convertData(items)}
              onRow={(record: any) => {
                return {
                  onClick: () => navigate(`/reservation/${record.id}`),
                };
              }}
              pagination={false}
              size="small"
              style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
            />
            {total > 0 && (
              <Pagination
                defaultCurrent={currentPage}
                onChange={onChangeCurrentPage}
                pageSize={10}
                showSizeChanger={false}
                style={{ float: 'right', marginTop: 15 }}
                total={total}
              />
            )}
          </>
        ) : (
          <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
        )}
      </Col>
    </Row>
  );
}

export default ReservationList;
