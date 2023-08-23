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

import PattonButton from 'components/PattonButton';

interface Props {
  setVisiable: (visible: boolean) => void;
  visible: boolean;
}

function ConfirmReservation({ setVisiable, visible }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOkSelectRoom = () => {
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
                  'guestCheckin.Thank you for staying with us. Please select one of the available rooms below',
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
                  <span className="reservation-information_span-right"> 20/10/1010</span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tên khách / </span>
                  <span className="reservation-information_span">Guest Name: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 111 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Đặt phòng qua / </span>
                  <span className="reservation-information_span">Booking Via: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> Internet </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Tổng tiền phòng / </span>
                  <span className="reservation-information_span">Room Fee: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 23.000 </span>
                </Col>
              </Row>
              <Row style={{ paddingBottom: 15 }}>
                <Col span={16}>
                  <span>Ghi chú / </span>
                  <span className="reservation-information_span">Notes: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> Strong Wifi </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Mã số đặt phòng / </span>
                  <span className="reservation-information_span">Reservation No: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 408 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số phòng / </span>
                  <span className="reservation-information_span">Room Number: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 14 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đến / </span>
                  <span className="reservation-information_span">Checkin Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 20/10/2020 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Ngày đi / </span>
                  <span className="reservation-information_span">Checkout Date: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 23/10/2020 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số đêm / </span>
                  <span className="reservation-information_span">Nights: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 4 </span>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <span>Số khách / </span>
                  <span className="reservation-information_span">Guests: </span>
                </Col>
                <Col span={8} style={{ marginBottom: 3 }}>
                  <span className="reservation-information_span-right"> 4 </span>
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
                <TextArea rows={12} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default ConfirmReservation;
