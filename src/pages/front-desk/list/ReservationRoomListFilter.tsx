/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 10/12/2022
Updated Date : 20/04/2023
Main functions : Reservation Room List Filter
************************************ */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Row, Select } from 'ui/antd';
import { t } from 'i18next';

import {
  getAgentInfos,
  getReservationRoomCheckinTodayAction,
  getReservationRoomCheckoutTodayAction,
  getReservationRoomInhouseAction,
} from 'actions';

import MInput from 'components/MInput';

import { RootState } from 'types';

interface Props {
  searchCondition: any;
  setSearchCondition: (data: any) => void;
  type: string;
}

const { Option } = Select;

function ReservationRoomListFilter({ searchCondition, setSearchCondition, type }: Props) {
  const dispatch = useDispatch();

  const fetchSearchReservationRooms = (filters: any) => {
    if (type === 'checkin_today') {
      dispatch(
        getReservationRoomCheckinTodayAction({
          filter: filters,
        }),
      );
    }

    if (type === 'inhouse_today') {
      dispatch(
        getReservationRoomInhouseAction({
          filter: filters,
        }),
      );
    }

    if (type === 'checkout_today') {
      dispatch(
        getReservationRoomCheckoutTodayAction({
          filter: filters,
        }),
      );
    }
  };

  const searchInput = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      fetchSearchReservationRooms({
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
    fetchSearchReservationRooms(stateTemporary);
  };

  const agentInfos: any = useSelector<RootState>(
    ({ agentInfos: agentInfosData }) => agentInfosData.data,
  );

  const sourceOptions = agentInfos.map((agent: any) => (
    <Option key={agent.id} value={agent.id.toString()}>
      {agent.name}
    </Option>
  ));

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
                room_no: e.target.value,
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
            <Option value="inhouse">Inhouse</Option>
            <Option value="no_show">No Show</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        </Col>
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'source_id')}
            placeholder={String(t('common.Source'))}
            style={{ width: '100%', fontSize: 12 }}
          >
            {sourceOptions}
          </Select>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default ReservationRoomListFilter;
