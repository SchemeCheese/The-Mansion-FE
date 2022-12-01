/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 01/12/2022
Updated Date : 02/12/2022
Main functions : Reservation List Filter
************************************ */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { t } from 'i18next';
import moment from 'moment';

import { getAgentInfos, searchReservation } from 'actions';

import MInput from 'components/MInput';

import { ReservationSearch, RootState } from 'types';

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

  return (
    <Input.Group>
      <Row gutter={8}>
        <Col span={6}>
          <MInput
            onChange={e =>
              setSearchCondition({
                ...searchCondition,
                folio_number: e.target.value,
              })
            }
            onKeyUp={event => searchInput(event)}
            placeholder="Room No"
            style={{ height: 32, fontSize: 12 }}
          />
        </Col>
        <Col span={6}>
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
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'status')}
            placeholder="Status"
            style={{ width: '100%', fontSize: 12 }}
          >
            <Option value="reserved">Reserved</Option>
            <Option value="inhouse">Inhouse</Option>
            <Option value="no_show">No Show</Option>
            <Option value="canceled">Canceled</Option>
            <Option value="checked_out">Checked Out</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'source')}
            placeholder={t('common.Source')}
            style={{ width: '100%', fontSize: 12 }}
          >
            {sourceOptions}
          </Select>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default ReservationListFilter;
