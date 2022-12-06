import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, Pagination, Row, Select } from 'antd';
import { selectGetWalkinRooms } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getWalkinRoomsAction } from 'actions';

import MInput from 'components/MInput';

import RoomInfo from './RoomInfo';

import WalkinCheckinModal from '../modal/WalkinCheckinModal';

const { Option } = Select;

function WalkIn() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const roomsList: any = useAppSelector(selectGetWalkinRooms);

  const [roomFilter, setRoomFilter] = useState({
    room_number: '',
    room_type: '',
    is_smocking: '',
  });

  const [isCheckinModalVisible, setIsCheckinModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getWalkinRoomsAction(roomFilter));
  }, []);

  return (
    <>
      <WalkinCheckinModal
        isModalVisible={isCheckinModalVisible}
        reservationDetailId="2"
        reservationId="1"
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
            <Option value="1">Premium Alex</Option>
            <Option value="2">Superior Double</Option>
            <Option value="3">Deluxe with Balcony</Option>
            <Option value="4">Studio Twin</Option>
            <Option value="5">Studio Double</Option>
            <Option value="6">Royal Family</Option>
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
            {t('common.Smocking Room')}
          </Checkbox>
        </Col>
        {roomsList.items.map((item: any) => {
          return (
            <RoomInfo
              isModalVisible={isCheckinModalVisible}
              item={item}
              setIsModalVisible={setIsCheckinModalVisible}
            />
          );
        })}
        <Col span={24} style={{ paddingTop: 20 }}>
          <Pagination defaultCurrent={1} style={{ float: 'right', paddingRight: 8 }} total={50} />
        </Col>
      </Row>
    </>
  );
}

export default WalkIn;
