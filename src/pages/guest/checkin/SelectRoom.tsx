/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import 'styles/guest_checkin_select_room.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Steps } from 'ui/antd';
import { getAPI } from 'helpers/apiService';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectBranchInfo } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import layoutStyles from 'components/layout.module.css';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import { RoomInfoType } from './interface';
import SelectRoomCard from './SelectRoomCard';
import SelectRoomFilter from './SelectRoomFilter';

import { useGuest } from '../useGuest';

function GuestCheckinSelectRoom() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Step } = Steps;
  const [searchCondition, setSearchCondition] = useState({
    room_type: '',
    view: '',
    is_smoking: '',
  });

  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [modalSelectRoomVisible, setModalSelectRoomVisible] = useState(false);
  const [roomNote, setRoomNote] = useState<RoomInfoType>({
    roomId: '',
    roomNo: '',
    roomTypeId: '',
    specialNote: '',
  });

  const { handleCancel } = useGuest();

  const handleNext = () => {
    const bookingInfo = JSON.parse(localStorage.getItem('guest_checkin_booking') || '');

    localStorage.setItem(
      'guest_checkin_booking',
      JSON.stringify({
        ...bookingInfo,
        room_id: roomNote.roomId,
        room_no: roomNote.roomNo,
        room_type_id: roomNote.roomTypeId,
      }),
    );

    navigate('/guest/checkin/booker-info');
  };

  const showModalDetail = () => {
    setModalDetailVisible(true);
    setModalSelectRoomVisible(false);
  };

  const [roomsList, setRoomsList] = useState([]);
  const branchInfoSelected: any = useAppSelector(selectBranchInfo);

  const fetchRooms = async () => {
    const searchQuery = new URLSearchParams({
      ...searchCondition,
      is_smoking: searchCondition.is_smoking ? '1' : '',
    });

    const response = await getAPI(
      `api/v1/rooms?operator_code=${branchInfoSelected.operator_code}&branch_code=${branchInfoSelected.branch_code}&facility_code=${branchInfoSelected.facility_code}&room_state=1&${searchQuery}`,
    );

    setRoomsList(response.data.items);
  };

  useEffect(() => {
    fetchRooms();
  }, [searchCondition]);

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <>
      <Row
        className={`${layoutStyles.content} guest-payment-content guest-checkout-content`}
        style={{
          background: 'white',
          width: '90%',
          marginLeft: '5%',
          marginTop: '5vh',
          marginBottom: 10,
        }}
      >
        <Col span={24}>
          <Row
            style={{
              height: '100%',
              marginLeft: '5%',
              marginRight: '5%',
            }}
          >
            <Col span={24} style={{ marginBottom: 30 }}>
              <Steps current={1}>
                <Step title={t('guestCheckin.Select your stay')} />
                <Step title={t('guestCheckin.Select your room')} />
                <Step title={t('guestCheckin.Upload your persional ID')} />
                <Step title={t('guestCheckin.Payment')} />
              </Steps>
            </Col>
            <Col className="guest-checkout-confirm" span={24}>
              <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
                <Col span={24}>
                  <SelectRoomFilter
                    searchCondition={searchCondition}
                    setSearchCondition={setSearchCondition}
                  />
                </Col>
              </Row>
            </Col>
            <Row
              className="select-room-card room-list"
              gutter={30}
              style={{ paddingTop: 30, width: '100%' }}
            >
              {roomsList.length > 0 &&
                roomsList.map(item => (
                  <SelectRoomCard
                    roomInfo={item}
                    roomNote={roomNote}
                    setRoomNote={setRoomNote}
                    showModalDetail={showModalDetail}
                  />
                ))}
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton
            disabled={roomNote.roomId === ''}
            onClick={handleNext}
            style={{ marginLeft: 20 }}
          >
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestCheckinSelectRoom;
