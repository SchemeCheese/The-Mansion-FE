import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, Pagination, Row, Select } from 'antd';
import { selectGetWalkinRooms, selectRoomTypes } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import {
  getRoomType,
  getWalkinRoomsAction,
  resetReservationRoomCheckinFilter,
  resetReservationRoomCheckoutFilter,
  resetReservationRoomInhouseFilter,
} from 'actions';

import MInput from 'components/MInput';

import RoomInfo from './RoomInfo';

import WalkinCheckinModal from '../modal/WalkinCheckinModal';

const { Option } = Select;

function WalkIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const roomsList: any = useAppSelector(selectGetWalkinRooms);
  const { data: roomTypesData } = useAppSelector(selectRoomTypes);

  const [roomFilter, setRoomFilter] = useState({
    room_number: '',
    room_type: '',
    is_smocking: '',
    current_page: 1,
  });

  const [isCheckinModalVisible, setIsCheckinModalVisible] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  const onChangeCurrentPage = (page: number) => {
    const newState = {
      ...roomFilter,
      current_page: page,
    };

    setRoomFilter(newState);
    dispatch(getWalkinRoomsAction(newState));
  };

  useEffect(() => {
    dispatch(getRoomType());
    dispatch(getWalkinRoomsAction(roomFilter));
    dispatch(resetReservationRoomCheckinFilter());
    dispatch(resetReservationRoomCheckoutFilter());
    dispatch(resetReservationRoomInhouseFilter());
  }, []);

  return (
    <>
      <WalkinCheckinModal
        isModalVisible={isCheckinModalVisible}
        room={currentRoom}
        setIsModalVisible={setIsCheckinModalVisible}
      />
      <Row style={{ background: 'white', padding: 8, paddingBottom: 20 }}>
        <Col span={24} style={{ paddingLeft: 8, paddingTop: 10 }}>
          <MInput
            onChange={event => {
              setRoomFilter({
                ...roomFilter,
                room_number: event.target.value,
              });
            }}
            onKeyUp={event => {
              if (event.code === 'Enter') {
                dispatch(getWalkinRoomsAction(roomFilter));
              }
            }}
            placeholder={t('common.Room Number')}
            style={{
              width: 200,
            }}
          />
          <Select
            allowClear
            onChange={value => {
              const newState = {
                ...roomFilter,
                room_type: value === undefined ? '' : value,
              };

              setRoomFilter(newState);
              dispatch(getWalkinRoomsAction(newState));
            }}
            placeholder={t('common.Room Type')}
            style={{
              width: 200,
              marginLeft: 15,
            }}
          >
            {_.keys(roomTypesData).map((key: any) => {
              return (
                <Option key={key} value={key}>
                  {roomTypesData[key]}
                </Option>
              );
            })}
          </Select>
          <Checkbox
            onChange={event => {
              const newState = {
                ...roomFilter,
                is_smocking: event.target.checked === true ? '1' : '',
              };

              setRoomFilter(newState);
              dispatch(getWalkinRoomsAction(newState));
            }}
            style={{
              marginLeft: 35,
            }}
          >
            {t('common.Smoking Room')}
          </Checkbox>
        </Col>
        {roomsList.items.map((item: any) => {
          return (
            <RoomInfo
              item={item}
              setCurrentRoom={setCurrentRoom}
              setIsModalVisible={setIsCheckinModalVisible}
            />
          );
        })}
        <Col span={24} style={{ paddingTop: 20 }}>
          <Pagination
            current={roomFilter.current_page}
            onChange={onChangeCurrentPage}
            pageSize={9}
            style={{ float: 'right', paddingRight: 8 }}
            total={roomsList.total}
          />
        </Col>
      </Row>
    </>
  );
}

export default WalkIn;
