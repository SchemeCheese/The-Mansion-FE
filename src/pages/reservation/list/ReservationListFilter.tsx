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
import { Button, Col, DatePicker, Row, Select, Space, Tag, Tooltip } from 'ui/antd';
import { t } from 'i18next';
import moment from 'moment';

import { getAgentInfos, searchReservation } from 'actions';
import reservationListStyles from 'pages/reservation/list/reservation-list.module.css';

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
    <Space.Compact block className={reservationListStyles.filterGroup} orientation="vertical">
      <Row className={reservationListStyles.filterRow} gutter={8}>
        <Col span={5}>
          <MInput
            aria-label="Search by email phone or name"
            className={reservationListStyles.filterInput}
            name="booker_info"
            onChange={e =>
              setSearchCondition({
                ...searchCondition,
                booker_info: e.target.value,
              })
            }
            onKeyUp={event => searchInput(event)}
            placeholder="Email/Phone/Name"
            value={searchCondition.booker_info}
          />
        </Col>
        <Col span={3}>
          <MInput
            aria-label="Search by folio id"
            className={reservationListStyles.filterInput}
            name="folio_number"
            onChange={e =>
              setSearchCondition({
                ...searchCondition,
                folio_number: e.target.value,
              })
            }
            onKeyUp={event => searchInput(event)}
            placeholder="Folio ID"
          />
        </Col>
        <Col span={4}>
          <MInput
            aria-label={String(t('common.Travel Agent'))}
            className={reservationListStyles.filterInput}
            name="agent_name"
            onChange={e =>
              setSearchCondition({
                ...searchCondition,
                agent_name: e.target.value,
              })
            }
            onKeyUp={event => searchInput(event)}
            placeholder={t('common.Travel Agent')}
            value={searchCondition.agent_name}
          />
        </Col>
        <Col span={3}>
          <Select
            allowClear
            aria-label="Filter by status"
            className={reservationListStyles.filterSelect}
            id="reservation-filter-status"
            onChange={value => {
              setSearchCondition({
                ...searchCondition,
                status: value,
              });
              searchSelect(value, 'status');
            }}
            placeholder="Status"
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
            aria-label={String(t('common.Market'))}
            className={reservationListStyles.filterSelect}
            id="reservation-filter-market"
            onChange={value => searchSelect(value, 'market')}
            placeholder={String(t('common.Market'))}
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
            aria-label={String(t('common.Source'))}
            className={reservationListStyles.filterSelect}
            id="reservation-filter-source"
            onChange={value => searchSelect(value, 'source')}
            placeholder={String(t('common.Source'))}
            value={searchCondition.source === '' ? undefined : searchCondition.source}
          >
            {sourceOptions}
          </Select>
        </Col>
        <Col className={reservationListStyles.filterAction} span={3}>
          <Tooltip placement="top" title="Reset search">
            <ReloadOutlined
              className={reservationListStyles.resetIcon}
              onClick={handleResetCondition}
            />
          </Tooltip>
          <Button
            className={reservationListStyles.showMoreButton}
            onClick={() => handleChange()}
            type="text"
          >
            <span style={{ paddingRight: 6 }}>{String(t('common.Show more'))}</span>
            {showMore ? <UpOutlined /> : <DownOutlined />}
          </Button>
        </Col>
      </Row>
      {showMore ? (
        <Row className={reservationListStyles.extraFilterRow} gutter={8}>
          <Col span={8}>
            <div className={reservationListStyles.dateField}>
              <span className={reservationListStyles.dateLabel}>C/I</span>
              <DatePicker
                className={reservationListStyles.datePicker}
                onChange={date => searchDate(date, 'checkin_from')}
                value={searchCondition.checkin_from ? moment(searchCondition.checkin_from) : null}
              />
              <DatePicker
                className={reservationListStyles.datePicker}
                onChange={date => searchDate(date, 'checkin_to')}
                value={searchCondition.checkin_to ? moment(searchCondition.checkin_to) : null}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className={reservationListStyles.dateField}>
              <span className={reservationListStyles.dateLabel}>C/O</span>
              <DatePicker
                className={reservationListStyles.datePicker}
                onChange={date => searchDate(date, 'checkout_from')}
                value={searchCondition.checkout_from ? moment(searchCondition.checkout_from) : null}
              />
              <DatePicker
                className={reservationListStyles.datePicker}
                onChange={date => searchDate(date, 'checkout_to')}
                value={searchCondition.checkout_to ? moment(searchCondition.checkout_to) : null}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className={reservationListStyles.dateField}>
              <span className={reservationListStyles.dateLabel}>I/H</span>
              <DatePicker
                className={reservationListStyles.datePicker}
                onChange={date => searchDate(date, 'inhouse_date')}
                value={searchCondition.inhouse_date ? moment(searchCondition.inhouse_date) : null}
              />
            </div>
            <Tag
              className={reservationListStyles.unreadTag}
              color="red"
              onClick={() => {
                dispatch(
                  searchReservation({
                    ...searchCondition,
                    unread_msg: '1',
                  }),
                );
              }}
            >
              Unread Message
            </Tag>
          </Col>
        </Row>
      ) : null}
    </Space.Compact>
  );
}

export default ReservationListFilter;
