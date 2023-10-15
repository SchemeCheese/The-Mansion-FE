/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Modal, Row } from 'antd';
import { apiEndPoint } from 'helpers';
import { getAPI } from 'helpers/apiService';
import { selectGuestCheckin } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import PattonButton from 'components/PattonButton';

import { RoomInfoType } from '../interface';
import SelectRoomCard from '../SelectRoomCard';

interface Props {
  roomNote: RoomInfoType;
  setRoomNote: (data: RoomInfoType) => void;
  setVisiable: (visible: boolean) => void;
  showModalConfirm: (visible: boolean) => void;
  showModalDetail: (visible: boolean) => void;
  visible: boolean;
}

function SelectRoomModal({
  roomNote,
  setRoomNote,
  setVisiable,
  showModalConfirm,
  showModalDetail,
  visible,
}: Props) {
  const { t } = useTranslation();

  const handleOkSelectRoom = () => {
    showModalConfirm(true);
  };

  const handleCancelModalSelectRoom = () => {
    setVisiable(false);
  };

  const [roomsList, setRoomsList] = useState([]);

  const checkinReservationState = useAppSelector(selectGuestCheckin);
  const checkinReservationData: any = checkinReservationState.data;
  const reservationInfo = checkinReservationData.reservation;

  const fetchRooms = async () => {
    const response = await getAPI(
      `api/v1/rooms?operator_code=${reservationInfo.operator_code}&branch_code=${reservationInfo.branch_code}&facility_code=${reservationInfo.facility_code}&room_type=${checkinReservationData.room_type}&room_state=1`,
    );

    setRoomsList(response.data.items);
  };

  useEffect(() => {
    if (checkinReservationData.id) {
      fetchRooms();
    }
  }, [checkinReservationData]);

  return (
    <Modal
      className="modal-room-detail"
      footer={[
        <PattonButton disabled={roomNote.roomId === ''} onClick={handleOkSelectRoom}>
          {t('common.OK')}
        </PattonButton>,
      ]}
      onCancel={handleCancelModalSelectRoom}
      onOk={handleOkSelectRoom}
      style={{ top: 60, borderRadius: 4, height: 500 }}
      title="Room Select"
      visible={visible}
      width={1200}
    >
      <Row
        gutter={30}
        style={{
          backgroundColor: 'rgba(240, 242, 245, 1)',
          padding: '24px',
          margin: 0,
          height: '100%',
        }}
      >
        <Col
          span={24}
          style={{
            paddingLeft: 0,
          }}
        >
          <Row>
            <span
              style={{
                fontSize: 14,
                paddingBottom: 10,
              }}
            >
              {t(
                'guestCheckin.Thank you for staying with us. Please select one of the available rooms below',
              )}
            </span>
          </Row>
        </Col>
        <Row className="select-room-card" gutter={30} style={{ paddingTop: 5, width: '100%' }}>
          {roomsList.length > 0 ? (
            roomsList.map(item => (
              <SelectRoomCard
                roomInfo={item}
                roomNote={roomNote}
                setRoomNote={setRoomNote}
                showModalDetail={showModalDetail}
              />
            ))
          ) : (
            <p style={{ paddingLeft: 20 }}>No avaiable rooms!</p>
          )}
        </Row>
      </Row>
    </Modal>
  );
}

export default SelectRoomModal;
