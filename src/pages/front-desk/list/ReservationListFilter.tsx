/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 01/12/2022
Updated Date : 02/12/2022
Main functions : Reservation List Filter
************************************ */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Row, Select } from 'antd';
import { t } from 'i18next';

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
