/** ***********************************
Module Name: House Keeping
Developer Name: HanhTV
Created Date: 16/04/2023
Updated Date: 16/04/2023
Main functions: Room Info Component
************************************ */

import 'styles/room.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Radio, RadioChangeEvent, Row } from 'antd';
import { selectHouseKeepingState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { updateHouseKeepingAction } from 'actions';

import { HouseKeepingType } from 'types';

function Room() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items } = useAppSelector(selectHouseKeepingState);
  const [roomResultState, setRoomResultState] = useState<any>([]);
  const OCCUPIED_STATE_NAME = 'occupied_state';
  const CLEAN_STATE_NAME = 'clean_state';

  useEffect(() => {
    console.log('useEffect');
    setRoomResultState(items);
  }, [items]);

  const onChange = (event: RadioChangeEvent, index: number, name: string) => {
    const stateTemporary = [...roomResultState];
    const oldItem = stateTemporary[index];

    if (OCCUPIED_STATE_NAME === name) {
      const newItem = {
        clean_state: oldItem.clean_state.toString(),
        occupied_state: event.target.value.toString(),
      };

      setRoomResultState(
        roomResultState.map((item: any) => {
          return {
            ...item,
            ...newItem,
          };
        }),
      );
      dispatch(
        updateHouseKeepingAction({
          ...newItem,
          room_id: oldItem.id,
        }),
      );
    } else {
      const newItem = {
        clean_state: event.target.value.toString(),
        occupied_state: oldItem.occupied_state.toString(),
      };

      setRoomResultState(
        roomResultState.map((item: any) => {
          return {
            ...item,
            ...newItem,
          };
        }),
      );
      dispatch(
        updateHouseKeepingAction({
          ...newItem,
          room_id: oldItem.id,
        }),
      );
    }
  };

  return (
    <Row className="house-keeping-room">
      {roomResultState?.map((item: any, index: number) => (
        <Col key={item.id} span={8}>
          <Card title={`${item.name} - ${item.type}`}>
            <Row>
              <Col span={10} style={{ textAlign: 'left' }}>
                <p>{t('houseKeeping.Room Status')}</p>
                <Radio.Group
                  defaultValue={item.occupied_state}
                  name={`${OCCUPIED_STATE_NAME}-${item.id}`}
                  onChange={event => onChange(event, index, OCCUPIED_STATE_NAME)}
                >
                  <Col>
                    <Radio value={1}>{t('houseKeeping.Room Status Empty')}</Radio>
                  </Col>
                  <Col>
                    <Radio value={2}>{t('houseKeeping.Room Status Busy')}</Radio>
                  </Col>
                  <Col>
                    <Radio value={3}>{t('houseKeeping.Room Status Inspect')}</Radio>
                  </Col>
                </Radio.Group>
              </Col>
              <Col span={4} />
              <Col span={10} style={{ textAlign: 'left' }}>
                <p>{t('houseKeeping.Cleaning Status')}</p>
                <Radio.Group
                  defaultValue={item.clean_state}
                  name={`${CLEAN_STATE_NAME}-${item.id}`}
                  onChange={event => onChange(event, index, CLEAN_STATE_NAME)}
                >
                  <Col>
                    <Radio value={1}>{t('houseKeeping.Cleaning Status Ready')}</Radio>
                  </Col>
                  <Col>
                    <Radio value={2}>{t('houseKeeping.Cleaning Status Cleaning')}</Radio>
                  </Col>
                  <Col>
                    <Radio value={3}>{t('houseKeeping.Cleaning Status Dirty')}</Radio>
                  </Col>
                </Radio.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Room;
