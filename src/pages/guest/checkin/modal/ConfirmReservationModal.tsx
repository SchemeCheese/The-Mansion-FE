/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Modal, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatNumber } from 'helpers';
import { postAPI } from 'helpers/apiService';
import { sumBy } from 'lodash';
import moment from 'moment';
import { selectGuestCheckin } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import PattonButton from 'components/PattonButton';

import { RoomInfoType } from '../interface';

interface Props {
  roomNote: RoomInfoType;
  setRoomNote: (data: RoomInfoType) => void;
  setVisiable: (visible: boolean) => void;
  visible: boolean;
}

function ConfirmReservationModal({ roomNote, setRoomNote, setVisiable, visible }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const checkinReservationState = useAppSelector(selectGuestCheckin);
  const checkinReservationData = checkinReservationState.data;

  const handleOkSelectRoom = async () => {
    // Update room selection
    await postAPI(
      `api/v1/reservations/${checkinReservationData.reservation.id}/reservation-detail/${checkinReservationData.id}/book-room`,
      {
        rooms: [
          {
            reservation_equipment_id: null,
            room_type: checkinReservationData.charges[0].equipment_type_id,
            room_id: roomNote.roomId,
            use_start_date: checkinReservationData.checkin,
            use_end_date: checkinReservationData.checkout,
          },
        ],
        online_reservation: true,
        branch_code: checkinReservationData.reservation.branch_code,
        operator_code: checkinReservationData.reservation.operator_code,
        facility_code: checkinReservationData.reservation.facility_code,
      },
    );

    // Update note
    await postAPI(
      `api/v1/reservations/${checkinReservationData.reservation.id}/reservation-detail/${checkinReservationData.id}/update-note`,
      {
        note: roomNote.specialNote,
      },
    );

    navigate('/guest/checkin/upload-personal-id');
  };

  const handleCancelModalSelectRoom = () => {
    setVisiable(false);
  };

  return (
    <Modal
      className="modal-reservation-info"
      footer={[<PattonButton onClick={handleOkSelectRoom}>Select Room</PattonButton>]}
      onCancel={handleCancelModalSelectRoom}
      onOk={handleOkSelectRoom}
      title={<b>{t('Reservation Information')}</b>}
      visible={visible}
      width={1024}
    >
      <Row>
        <Col span={24}>
          <Row>
            <p>
              <span
                style={{
                  fontSize: 14,
                  paddingBottom: '2vh',
                }}
              >
                {t(
                  'guestCheckin.Thank you for staying with us. Please confirm your booking confirmation as below',
                )}
              </span>
            </p>
          </Row>
        </Col>
        <Col span={12} style={{ textAlign: 'left' }}>
          <Row>
            <span className="span-header">{t('guestCheckin.Thông tin đặt phòng')} / </span>
            <span className="span-header span-header-right span-blur">
              {t('guestCheckin.Reservation Information')}
            </span>
          </Row>
          <Row className="h-100">
            <Col
              span={24}
              style={{
                paddingRight: 20,
              }}
            >
              <Row style={{ paddingTop: 12 }}>
                <Col span={16}>
                  <span>Ngày tạo / </span>
                  <span className="reservation-information_span">Date : </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.created_date).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tên khách / </span>
                  <span className="reservation-information_span">Guest Name: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.guest_name}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Đặt phòng qua / </span>
                  <span className="reservation-information_span">Booking Via: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.source_ta}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tổng tiền phòng / </span>
                  <span className="reservation-information_span">Room Fee: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {formatNumber(
                      sumBy(checkinReservationData.charges, function (item: any) {
                        return item.actual_amount;
                      }),
                    )}
                  </span>
                </Col>
              </Row>
              <Row style={{ paddingBottom: 15 }}>
                <Col span={16}>
                  <span>Ghi chú / </span>
                  <span className="reservation-information_span">Notes: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.note}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Mã số đặt phòng / </span>
                  <span className="reservation-information_span">Reservation No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {checkinReservationData.reservation_number}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số phòng / </span>
                  <span className="reservation-information_span">Room Number: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> {roomNote.roomNo} </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đến / </span>
                  <span className="reservation-information_span">Checkin Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkin).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đi / </span>
                  <span className="reservation-information_span">Checkout Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkout).format('DD/MM/YYYY')}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số đêm / </span>
                  <span className="reservation-information_span">Nights: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {moment(checkinReservationData.checkout).diff(
                      moment(checkinReservationData.checkin),
                      'days',
                    )}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số khách / </span>
                  <span className="reservation-information_span">Guests: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right">
                    {formatNumber(
                      checkinReservationData.adults +
                        checkinReservationData.child +
                        checkinReservationData.baby,
                    )}
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12} style={{ paddingLeft: 30 }}>
          <Row style={{ paddingBottom: 15 }}>
            <span className="span-header"> {t('guestCheckin.Yêu cầu đặc biệt')} / </span>
            <span className="span-header span-header-right span-blur">
              {t('guestCheckin.Contact Information')}
            </span>
          </Row>
          <Row className="h-100">
            <Col span={24}>
              <Row style={{ paddingTop: 12 }}>
                <TextArea
                  onChange={e =>
                    setRoomNote({
                      roomId: roomNote.roomId,
                      roomNo: roomNote.roomNo,
                      roomTypeId: roomNote.roomTypeId,
                      specialNote: e.target.value,
                    })
                  }
                  rows={12}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default ConfirmReservationModal;
