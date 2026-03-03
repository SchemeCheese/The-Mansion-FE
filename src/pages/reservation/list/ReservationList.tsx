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
    sort: '',
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
  const searchReservationData: any = useAppSelector(selectReservationSearch);
  const { changed: searchReservationChanged } = useTreeChanges(searchReservationData);
  const user = useAppSelector(selectUser);

  const {
    current_page: currentPage,
    data: items,
    total,
    unread_msg: unreadMessage,
  } = searchReservationData[type];

  const [columnSort, setColumnSort] = useState('');
  const [orderSort, setOrderSort] = useState(undefined);

  useEffect(() => {
    const {
      agent_name,
      booker_info,
      checkin_from,
      checkin_to,
      checkout_from,
      checkout_to,
      inhouse_date,
      market,
      per_page,
      sort,
      source,
      status,
    } = searchReservationData[type];

    if (sort) {
      const sortInfo: any = sort.split(',');
      const orderSortString: any = `${sortInfo[1]}end` || '';

      setColumnSort(sortInfo[0]);
      setOrderSort(orderSortString);
    }

    setSearchCondition({
      ...searchCondition,
      sort: '',
      folio_number: '',
      booker_info: booker_info ?? '',
      agent_name: agent_name ?? '',
      source: source ?? '',
      market: market ?? '',
      status: status ?? '',
      checkin_from: checkin_from ?? '',
      checkin_to: checkin_to ?? '',
      checkout_from: checkout_from ?? '',
      checkout_to: checkout_to ?? '',
      inhouse_date: inhouse_date ?? '',
      per_page: per_page ?? 10,
    });
  }, [searchReservationData]);

  useEffect(() => {
    const {
      agent_name,
      booker_info,
      checkin_from,
      checkin_to,
      checkout_from,
      checkout_to,
      current_page,
      inhouse_date,
      market,
      per_page,
      sort,
      source,
      status,
    } = searchReservationData[type];

    dispatch(
      searchReservation({
        current_page,
        per_page: per_page ?? 10,
        booker_info,
        folio_number: '',
        agent_name,
        sort,
        status,
        market,
        source,
        checkin_from,
        checkin_to,
        checkout_from,
        checkout_to,
        inhouse_date,
        type,
      }),
    );
  }, []);

  useEffect(() => {
    if (searchReservationChanged('is_searching', false)) {
      if (searchCondition.folio_number && items.length > 0) {
        navigate(`/reservation/${items[0].id}`);
      }
    }
  }, [searchReservationChanged]);

  const onChangeCurrentPage = (page: number, pageSize: number) => {
    dispatchSearchReservation(page, pageSize);
  };

  const dispatchSearchReservation = (page: number, pageSize: number) => {
    if (type === 'reserved') {
      dispatch(
        searchReservation({
          ...searchCondition,
          type: 'reserved',
          current_page: page,
          per_page: pageSize,
        }),
      );
    } else {
      dispatch(
        searchReservation({
          ...searchCondition,
          type: 'waitlist',
          current_page: page,
          per_page: pageSize,
        }),
      );
    }
  };

  const convertData = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return {
          ...item,
          key: item.id,
          folio_id: item.reservation_number,
          source_ta: item.source,
          booker_name: item.booker.name,
          booker_email: item.booker.email,
          phone: item.booker.phone_number,
          total_room: item.room_total,
          room_no: item.assigned_rooms,
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

  const columnsWaitlist: any = [
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
      sorter: true,
      sortOrder: columnSort === 'created_at' ? orderSort : undefined,
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
      sorter: true,
      sortOrder: columnSort === 'checkin' ? orderSort : undefined,
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'checkout',
      key: 'checkout',
      sorter: true,
      sortOrder: columnSort === 'checkout' ? orderSort : undefined,
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
      render: (text: string, record: any) => {
        if (record.assigned_rooms === '') {
          return (
            <div
              style={{
                width: 70,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              -
            </div>
          );
        }

        return (
          <div
            style={{
              width: 70,
              textAlign: 'center',
              color: 'rgba(0, 0, 0, 0.65)',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {text}
          </div>
        );
      },
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
        const alert: any[] = [];

        if (record.is_early_checkin) {
          alert.push(<Tag color="#f50">E/L</Tag>);
        }

        if (record.is_late_checkout) {
          alert.push(<Tag color="#2db7f5">E/C</Tag>);
        }

        if (record.is_drop_off) {
          alert.push(<Tag color="#87d068">D/O</Tag>);
        }

        if (record.is_pickup) {
          alert.push(<Tag color="#108ee9">P/U</Tag>);
        }

        if (record.is_unread_msg) {
          alert.push(<Tag color="red">U/M</Tag>);
        }

        if (alert.length > 0) {
          return <div style={{ minWidth: 0 }}>{alert}</div>;
        }

        return <div style={{ textAlign: 'center' }}>{text ?? '-'}</div>;
      },
    },
  ].filter(item => !item.hidden);

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setColumnSort(sorter.field);
    setOrderSort(sorter.order);

    let order = '';

    if (sorter.order !== undefined) {
      order = sorter.order === 'descend' ? 'desc' : 'asc';
    }

    if (type === 'reserved') {
      dispatch(
        searchReservation({
          ...searchCondition,
          sort: order !== '' ? `${sorter.field},${order}` : '',
          type: 'reserved',
        }),
      );
    } else {
      dispatch(
        searchReservation({
          ...searchCondition,
          sort: order !== '' ? `${sorter.field},${order}` : '',
        }),
      );
    }
  };

  const handleResetCondition = () => {
    if (type === 'reserved') {
      dispatch(
        searchReservation({
          booker_info: '',
          agent_name: '',
          checkin_from: '',
          checkin_to: '',
          checkout_from: '',
          checkout_to: '',
          folio_number: '',
          inhouse_date: '',
          market: '',
          sort: '',
          source: '',
          status: '',
          type: 'reserved',
          current_page: 1,
          unread_msg: '0',
        }),
      );
    } else {
      dispatch(
        searchReservation({
          booker_info: '',
          agent_name: '',
          checkin_from: '',
          checkin_to: '',
          checkout_from: '',
          checkout_to: '',
          folio_number: '',
          inhouse_date: '',
          market: '',
          sort: '',
          source: '',
          status: '',
          type: 'waitlist',
          current_page: 1,
          unread_msg: '0',
        }),
      );
    }
  };

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      {unreadMessage > 0 && (
        <Col
          onClick={() => {
            dispatch(
              searchReservation({
                ...searchCondition,
                unread_msg: '1',
                type,
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
          handleResetCondition={handleResetCondition}
          searchCondition={searchCondition}
          setSearchCondition={setSearchCondition}
        />
      </Col>
      {user.permission.reservation.create && (
        <Col span={24} style={{ paddingTop: 16 }}>
          <PattonButton onClick={() => navigate(`/reservation/create`)}>
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
              onChange={handleChange}
              onRow={(record: any) => {
                return {
                  onClick: () => {
                    if (record.is_new) {
                      dispatch(
                        readNotifcationsAction({
                          id: record.new_notification_id,
                        }),
                      );
                    }

                    navigate(`/reservation/${record.id}`);
                  },
                };
              }}
              pagination={false}
              rowClassName={(record: any) => {
                if (record.is_new) {
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
