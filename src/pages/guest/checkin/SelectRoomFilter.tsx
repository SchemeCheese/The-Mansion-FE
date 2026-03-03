/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Reservation List Filter
************************************ */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, Input, Row, Select } from 'antd';
import { t } from 'i18next';
import { selectRoomTypes } from 'selectors';
import { keys } from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { getRoomType } from 'actions';

interface Props {
  searchCondition: any;
  setSearchCondition: (data: any) => void;
}

const { Option } = Select;

function SelectRoomFilter({ searchCondition, setSearchCondition }: Props) {
  const dispatch = useDispatch();

  const { data: roomTypesData } = useAppSelector(selectRoomTypes);

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

  useEffect(() => {
    if (!roomTypesData) {
      dispatch(getRoomType());
    }
  }, []);

  return (
    <Input.Group>
      <Row gutter={20}>
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'room_type')}
            placeholder={String(t('guestCheckin.Room Type'))}
            style={{ width: '100%' }}
          >
            {keys(roomTypesData).map((key: any) => {
              return (
                <Option key={key} value={key}>
                  {roomTypesData[key]}
                </Option>
              );
            })}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            allowClear
            onChange={value => searchSelect(value, 'view')}
            placeholder={String(t('guestCheckin.View'))}
            style={{ width: '100%' }}
          >
            <Option value="1">Ocean View</Option>
            <Option value="2">Mountain View</Option>
          </Select>
        </Col>
        <Col span={6} style={{ paddingLeft: '5%' }}>
          <Checkbox onChange={e => searchIsSmokingRoom(e.target.checked)}>
            {String(t('guestCheckin.Smoking Room'))}
          </Checkbox>
        </Col>
      </Row>
    </Input.Group>
  );
}

export default SelectRoomFilter;
