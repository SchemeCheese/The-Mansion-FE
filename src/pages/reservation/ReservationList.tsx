/** ***********************************
Module Name : Reservation
Developer Name : HangNTT
Created Date : 24/08/2022
Updated Date : 15/09/2022
Main functions : Reservation List Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, PlusOutlined, UpOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Input,
  message,
  Pagination,
  Row,
  Select,
  Spin,
  Table,
  Tag,
} from 'antd';
import moment from 'moment';

import { searchReservation } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { ReservationSearch, RootState } from 'types';

const { Option } = Select;

interface Props {
  type: string;
}

function ReservationList({ type }: Props) {
  const [showMore, setShowMore] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    current_page: 1,
    per_page: 7,
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

  function handleChange() {
    setShowMore(!showMore);
  }

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
          {text}
        </div>
      ),
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
          return <div style={{ minWidth: 0, lineHeight: '27px' }}>{alert}</div>;
        }

        return <div style={{ textAlign: 'center' }}>{text ?? '-'}</div>;
      },
    },
  ];

  const navigate = useNavigate();

  const localtion: any = useLocation();

  const handleClickRow = (id: number) => {
    navigate(`/reservation/${id}`);
  };

  const redirectNewPage = () => {
    navigate(`/reservation/create`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchReservation(searchCondition));
  }, []);

  useEffect(() => {
    if (localtion.state?.message) {
      message.success(localtion.state?.message);

      // Remove state: https://stackoverflow.com/a/66359848
      window.history.replaceState({}, document.title);
    }
  }, [localtion.state]);

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

  const isSearching = useSelector<RootState>(({ reservation }) => reservation.is_searching);
  const items = useSelector<RootState>(({ reservation }) => reservation.data);
  const total: any = useSelector<RootState>(({ reservation }) => reservation.total);
  const currentPage: any = useSelector<RootState>(({ reservation }) => reservation.current_page);

  const convertData = (data: any) => {
    if (data) {
      return data.map((item: any) => {
        return {
          id: item.index,
          key: item.id,
          folio_id: item.reservationNumber,
          status: 'Waitlist',
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

  const searchInput = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      fetchSearchReservation({
        ...searchCondition,
        current_page: 1,
      });
    }
  };

  const searchSelect = (value: string, key: string) => {
    let valueTemporary = value;

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...searchCondition,
      [key]: valueTemporary,
      current_page: 1,
    };

    setSearchCondition(stateTemporary);
    fetchSearchReservation(stateTemporary);
  };

  const searchDate = (date: any, key: string) => {
    const stateTemporary = {
      ...searchCondition,
      [key]: date?.format('YYYY-MM-DD') ?? '',
      current_page: 1,
    };

    setSearchCondition(stateTemporary);
    dispatch(searchReservation(stateTemporary));
  };

  const fetchSearchReservation = (data: ReservationSearch) => {
    dispatch(searchReservation(data));
  };

  console.log('Renderr Waitlist');

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={5}>
              <MInput
                onChange={e =>
                  setSearchCondition({
                    ...searchCondition,
                    booker_info: e.target.value,
                  })
                }
                onKeyUp={event => searchInput(event)}
                placeholder="Email/Phone/Name"
                style={{ height: 32, fontSize: 12 }}
              />
            </Col>
            <Col span={3}>
              <MInput
                onChange={e =>
                  setSearchCondition({
                    ...searchCondition,
                    folio_number: e.target.value,
                  })
                }
                onKeyUp={event => searchInput(event)}
                placeholder="Folio ID"
                style={{ height: 32, fontSize: 12 }}
              />
            </Col>
            <Col span={4}>
              <MInput
                onChange={e =>
                  setSearchCondition({
                    ...searchCondition,
                    agent_name: e.target.value,
                  })
                }
                onKeyUp={event => searchInput(event)}
                placeholder="Travel Agent"
                style={{ height: 32, fontSize: 12 }}
              />
            </Col>
            <Col span={3}>
              <Select
                allowClear
                onChange={value => searchSelect(value, 'status')}
                placeholder="Status"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="0">Before Checkin</Option>
                <Option value="1">Inhouse</Option>
                <Option value="2">After Checkout</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Select
                allowClear
                onChange={value => searchSelect(value, 'market')}
                placeholder="Market"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="1">OTA</Option>
                <Option value="2">CDT</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Select
                allowClear
                onChange={value => searchSelect(value, 'source')}
                placeholder="Source"
                style={{ width: '100%', fontSize: 12 }}
              >
                <Option value="1">Agent</Option>
                <Option value="2">Website</Option>
                <Option value="4">Telephone</Option>
                <Option value="8">Fax</Option>
                <Option value="16">Email</Option>
                <Option value="32">Walkin</Option>
                <Option value="28">Direct</Option>
              </Select>
            </Col>
            <Col span={3} style={{ textAlign: 'center' }}>
              <Button onClick={() => handleChange()} style={{ color: '#1D39C4' }} type="text">
                <span style={{ paddingRight: 6 }}>Show more</span>
                {showMore ? <UpOutlined /> : <DownOutlined />}
              </Button>
            </Col>
          </Row>
          {showMore ? (
            <Row gutter={8} style={{ paddingTop: 16 }}>
              <Col span={8}>
                <span style={{ paddingRight: 11 }}>C/I</span>
                <DatePicker
                  onChange={date => searchDate(date, 'checkin_from')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '40%',
                  }}
                  value={searchCondition.checkin_from ? moment(searchCondition.checkin_from) : null}
                />
                <DatePicker
                  onChange={date => searchDate(date, 'checkin_to')}
                  style={{ height: 32, borderRadius: 4, width: '40%' }}
                  value={searchCondition.checkin_to ? moment(searchCondition.checkin_to) : null}
                />
              </Col>
              <Col span={8}>
                <span style={{ paddingRight: 11 }}>C/O</span>
                <DatePicker
                  onChange={date => searchDate(date, 'checkout_from')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '40%',
                  }}
                  value={
                    searchCondition.checkout_from ? moment(searchCondition.checkout_from) : null
                  }
                />
                <DatePicker
                  onChange={date => searchDate(date, 'checkout_to')}
                  style={{ height: 32, borderRadius: 4, width: '40%' }}
                  value={searchCondition.checkout_to ? moment(searchCondition.checkout_to) : null}
                />
              </Col>
              <Col span={8}>
                <span style={{ paddingRight: 11 }}>I/H</span>
                <DatePicker
                  onChange={date => searchDate(date, 'inhouse')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    width: '40%',
                  }}
                />
              </Col>
            </Row>
          ) : null}
        </Input.Group>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <PattonButton onClick={() => redirectNewPage()}>
          {' '}
          <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> New
        </PattonButton>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        {!isSearching ? (
          <>
            <Table
              columns={columnsWaitlist}
              dataSource={convertData(items)}
              onRow={(record: any) => {
                return {
                  onClick: () => handleClickRow(record.id),
                };
              }}
              pagination={false}
              style={{ overflowX: 'hidden', overflowY: 'auto', minHeight: 450 }}
            />
            {total > 0 && (
              <Pagination
                defaultCurrent={currentPage}
                onChange={onChangeCurrentPage}
                pageSize={7}
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
