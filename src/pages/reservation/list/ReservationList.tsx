/** ***********************************
Module Name : Reservation
Developer Name : HangNTT
Created Date : 24/08/2022
Updated Date : 15/09/2022
Main functions : Reservation List Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Alert, Col, Pagination, Row, Spin, Table, Tag } from 'antd';
import { selectReservationSearch, selectUser } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { readNotifcationsAction, searchReservation } from 'actions';

import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

import ReservationListFilter from './ReservationListFilter';

interface Props {
  type: string;
}

function ReservationList({ type }: Props) {
  const [searchCondition, setSearchCondition] = useState({
    current_page: 1,
    per_page: process.env.REACT_APP_RESERVATION_PER_PAGE
      ? parseInt(process.env.REACT_APP_RESERVATION_PER_PAGE, 10)
      : 10,
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
    inhouse_date: '',
    type,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearching = useSelector<RootState>(({ reservation }) => reservation.is_searching);
  const items: any = useSelector<RootState>(({ reservation }) => reservation.data);
  const total: any = useSelector<RootState>(({ reservation }) => reservation.total);
  const currentPage: any = useSelector<RootState>(({ reservation }) => reservation.current_page);
  const unreadMessage: any = useSelector<RootState>(({ reservation }) => reservation.unread_msg);
  const searchReservationData = useAppSelector(selectReservationSearch);
  const { changed: searchReservationChanged } = useTreeChanges(searchReservationData);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(searchReservation(searchCondition));
  }, []);

  useEffect(() => {
    if (searchReservationChanged('is_searching', false)) {
      if (searchCondition.folio_number && items.length > 0) {
        navigate(`/reservation/${items[0].id}`);
      }
    }
  }, [searchReservationChanged]);

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
          ...item,
          key: item.id,
          folio_id: item.reservationNumber,
          source_ta: item.source,
          booker_name: item.booker.name,
          booker_email: item.booker.email,
          phone: item.booker.phone_number,
          total_room: item.room_total,
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
      title: t('reservation.Folio ID'),
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: t('common.Status'),
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
      title: t('common.Created Date'),
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: t('common.Source TA'),
      dataIndex: 'source_ta',
      key: 'source_ta',
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
      title: t('common.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('common.Email.title'),
      dataIndex: 'booker_email',
      key: 'booker_email',
    },
    {
      title: t('common.Phone'),
      dataIndex: 'phone',
      key: 'phone',
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

        if (record.isUnreadMsg) {
          alert.push(<Tag color="red">U/M</Tag>);
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
      {unreadMessage > 0 && (
        <Col
          onClick={() => {
            dispatch(
              searchReservation({
                ...searchCondition,
                unread_msg: '1',
              }),
            );
          }}
          span={24}
          style={{
            paddingBottom: 20,
            cursor: 'pointer',
          }}
        >
          <Alert
            closable
            message={`You have ${unreadMessage} unread message(s) from customer!`}
            showIcon
            type="warning"
          />
        </Col>
      )}
      <Col span={24}>
        <ReservationListFilter
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
        />
      </Col>
      {user.permission.reservation.create && (
        <Col span={24} style={{ paddingTop: 16 }}>
          <PattonButton onClick={() => navigate(`/reservation/create`)}>
            {' '}
            <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> {t('common.New')}
          </PattonButton>
        </Col>
      )}
      <Col span={24} style={{ paddingTop: 16 }}>
        {!isSearching ? (
          <>
            <Table
              className="reservation-list"
              columns={columnsWaitlist}
              dataSource={convertData(items)}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    if (record.isNew) {
                      dispatch(
                        readNotifcationsAction({
                          id: record.newNotificationId,
                        }),
                      );
                    }

                    navigate(`/reservation/${record.id}`);
                  },
                };
              }}
              pagination={false}
              rowClassName={(record: any) => {
                if (record.isNew) {
                  return 'new-reservation';
                }

                return '';
              }}
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
