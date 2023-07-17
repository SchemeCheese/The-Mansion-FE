/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation List Filter
************************************ */

import React from 'react';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { t } from 'i18next';

interface Props {
  searchCondition: any;
  setSearchCondition: (data: any) => void;
}

const { Option } = Select;

function SelectRoomFilter({ searchCondition, setSearchCondition }: Props) {
  const arrayPersonValue: Array<number> = [1, 2, 3, 4, 5];

  const searchSelect = (value: string, key: string) => {
    let valueTemporary = value;

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...searchCondition,
      [key]: valueTemporary,
    };

    setSearchCondition(stateTemporary);
  };

  const searchIsSmokingRoom = (value: boolean) => {
    const stateTemporary = {
      ...searchCondition,
      is_smoking: value,
    };

    setSearchCondition(stateTemporary);
  };

  return (
    <Input.Group>
      <Row gutter={20}>
        <Col span={6}>
          <Select
            onChange={value => searchSelect(value, 'room_type')}
            placeholder={t('guestCheckin.Room Type')}
            style={{ width: '100%' }}
          >
            {arrayPersonValue.map((value: any) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            onChange={value => searchSelect(value, 'view')}
            placeholder={t('guestCheckin.View')}
            style={{ width: '100%' }}
          >
            {arrayPersonValue.map((value: any) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'concept')}
            placeholder={t('guestCheckin.Concept')}
            style={{ width: '100%' }}
          >
            {arrayPersonValue.map((value: any) => {
              return (
                <Option key={value} value={value}>
                  {value}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={6} style={{ paddingLeft: '5%' }}>
          <Checkbox onChange={e => searchIsSmokingRoom(e.target.checked)}>
            {t('guestCheckin.Smoking Room')}
          </Checkbox>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default SelectRoomFilter;
