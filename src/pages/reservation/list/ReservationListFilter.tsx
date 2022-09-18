import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import moment from 'moment';

import { searchReservation } from 'actions';

import MInput from 'components/MInput';

import { ReservationSearch } from 'types';

interface Props {
  searchCondition: any;
  setSearchCondition: (data: any) => void;
}

const { Option } = Select;

function ReservationListFilter({ searchCondition, setSearchCondition }: Props) {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);

  const handleChange = () => {
    setShowMore(!showMore);
  };

  const fetchSearchReservation = (data: ReservationSearch) => {
    dispatch(searchReservation(data));
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

  return (
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
              value={searchCondition.checkout_from ? moment(searchCondition.checkout_from) : null}
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
  );
}

export default ReservationListFilter;
