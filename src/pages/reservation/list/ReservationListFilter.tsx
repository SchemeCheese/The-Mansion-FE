/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation List Filter
************************************ */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined, ReloadOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select, Tag, Tooltip } from 'antd';
import { t } from 'i18next';
import moment from 'moment';

import { getAgentInfos, searchReservation } from 'actions';

import MInput from 'components/MInput';

import { ReservationSearch, RootState } from 'types';

interface Props {
  handleResetCondition: () => void;
  searchCondition: any;
  setSearchCondition: (data: any) => void;
}

const { Option } = Select;

function ReservationListFilter({
  handleResetCondition,
  searchCondition,
  setSearchCondition,
}: Props) {
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

  const agentInfos: any = useSelector<RootState>(
    ({ agentInfos: agentInfosData }) => agentInfosData.data,
  );

  let sourceOptions = null;

  if (searchCondition.market?.toString() === '1') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 2;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  } else if (searchCondition.market?.toString() === '5') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 1;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  } else if (searchCondition.market?.toString() === '7') {
    sourceOptions = agentInfos
      ?.filter((item: any) => {
        return item.agent_kind === 0;
      })
      .map((agent: any) => (
        <Option key={agent.id} value={agent.id.toString()}>
          {agent.name}
        </Option>
      ));
  }

  useEffect(() => {
    dispatch(getAgentInfos());
  }, []);

  useEffect(() => {
    if (
      searchCondition.checkin_from ||
      searchCondition.checkin_to ||
      searchCondition.checkout_from ||
      searchCondition.checkout_to ||
      searchCondition.inhouse_date
    ) {
      setShowMore(true);
    }
  }, [searchCondition]);

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
            value={searchCondition.booker_info}
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
            placeholder={t('common.Travel Agent')}
            style={{ height: 32, fontSize: 12 }}
            value={searchCondition.agent_name}
          />
        </Col>
        <Col span={3}>
          <Select
            allowClear
            onChange={value => {
              setSearchCondition({
                ...searchCondition,
                status: value,
              });
              searchSelect(value, 'status');
            }}
            placeholder="Status"
            style={{ width: '100%', fontSize: 12 }}
            value={searchCondition.status === '' ? undefined : searchCondition.status}
          >
            <Option value="reserved">Reserved</Option>
            <Option value="inhouse">Inhouse</Option>
            <Option value="no_show">No Show</Option>
            <Option value="canceled">Canceled</Option>
            <Option value="checked_out">Checked Out</Option>
          </Select>
        </Col>
        <Col span={3}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'market')}
            placeholder={String(t('common.Market'))}
            style={{ width: '100%', fontSize: 12 }}
            value={searchCondition.market === '' ? undefined : searchCondition.market}
          >
            <Option value="1">OTA</Option>
            <Option value="2">CDT</Option>
            <Option value="4">CORPORATE</Option>
            <Option value="5">WHOLESALE</Option>
            <Option value="7">FIT</Option>
          </Select>
        </Col>
        <Col span={3}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'source')}
            placeholder={String(t('common.Source'))}
            style={{ width: '100%', fontSize: 12 }}
            value={searchCondition.source === '' ? undefined : searchCondition.source}
          >
            {sourceOptions}
          </Select>
        </Col>
        <Col span={3} style={{ textAlign: 'center', cursor: 'pointer' }}>
          <Tooltip placement="top" title="Reset search">
            <ReloadOutlined onClick={handleResetCondition} />
          </Tooltip>
          <Button onClick={() => handleChange()} style={{ color: '#1D39C4' }} type="text">
            <span style={{ paddingRight: 6 }}>{String(t('common.Show more'))}</span>
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
              onChange={date => searchDate(date, 'inhouse_date')}
              style={{
                height: 32,
                borderRadius: 4,
                width: '40%',
              }}
              value={searchCondition.inhouse_date ? moment(searchCondition.inhouse_date) : null}
            />
            <Tag
              color="red"
              onClick={() => {
                dispatch(
                  searchReservation({
                    ...searchCondition,
                    unread_msg: '1',
                  }),
                );
              }}
              style={{
                marginLeft: 20,
                cursor: 'pointer',
              }}
            >
              Unread Message
            </Tag>
          </Col>
        </Row>
      ) : null}
    </Input.Group>
  );
}

export default ReservationListFilter;
