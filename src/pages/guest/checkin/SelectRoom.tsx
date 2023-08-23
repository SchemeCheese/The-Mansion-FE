/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import 'styles/guest_checkin_select_room.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Col, Input, Modal, Row, Steps } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

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
    concept: '',
    is_smoking: false,
  });

  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [modalSelectRoomVisible, setModalSelectRoomVisible] = useState(false);

  const { handleCancel } = useGuest();

  const handleNext = () => {
    navigate('/guest/checkin/personal-id');
  };

  const showModalDetail = () => {
    setModalDetailVisible(true);
    setModalSelectRoomVisible(false);
  };

  const handleOkSelectRoom = (event: any) => {
    setModalSelectRoomVisible(false);
  };

  const handleCancelModalSelectRoom = (event: any) => {
    setModalSelectRoomVisible(false);
  };

  return (
    <>
      <Row
        className="content guest-payment-content guest-checkout-content"
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
              <SelectRoomCard isModalDetail showModalDetail={showModalDetail} />
              <SelectRoomCard isModalDetail showModalDetail={showModalDetail} />
              <SelectRoomCard isModalDetail showModalDetail={showModalDetail} />
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton onClick={handleNext} style={{ marginLeft: 20 }}>
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      {/* Modal Regard */}
      <Modal
        className="modal-regard"
        footer={[<PattonButton>{t('common.Checkin')}</PattonButton>]}
        onCancel={handleCancelModalSelectRoom}
        onOk={handleOkSelectRoom}
        visible={modalSelectRoomVisible}
        width={1024}
      >
        <Row style={{ paddingLeft: '6%', paddingRight: '6%' }}>
          <Row className="w-100">
            <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
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
            <Col className="pt-15" span={12} style={{ paddingLeft: 30 }}>
              <Row style={{ paddingBottom: 15 }}>
                <span className="span-header"> {t('guestCheckin.Thông tin liên hệ')} / </span>
                <span className="span-header span-header-right span-blur">
                  {t('guestCheckin.Contact Information')}
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
                      <span>Địa chỉ email / </span>
                      <span className="reservation-information_span">Email : </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> abc@gmail.com</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Điện thoại / </span>
                      <span className="reservation-information_span">Phone: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 091 234 5678 </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span> Quốc tịch / </span>
                      <span className="reservation-information_span">Nationality: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> Vietnam </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Ngày sinh / </span>
                      <span className="reservation-information_span">DOB: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 01/09/1990 </span>
                    </Col>
                  </Row>
                  <Row style={{ paddingBottom: 15 }}>
                    <Col span={16}>
                      <span>Ghi chú / </span>
                      <span className="reservation-information_span">Notes: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Chứng minh thư / </span>
                      <span className="reservation-information_span">Identification No: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 01334711261 </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Số hộ chiếu / </span>
                      <span className="reservation-information_span">Passport No: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 12367210 </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Hạn hộ chiếu / </span>
                      <span className="reservation-information_span">Expiry Date: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 23/10/2025 </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Số thị thực / </span>
                      <span className="reservation-information_span">Visa No: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 12367210 </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <span>Hạn thị thực / </span>
                      <span className="reservation-information_span">Expiry Date: </span>
                    </Col>
                    <Col span={8} style={{ marginBottom: 3 }}>
                      <span className="reservation-information_span-right"> 23/10/2025 </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="w-100" style={{ paddingTop: '2%' }}>
            <Col span={24}>
              <span className="span-header">{t('guestCheckin.Quy định của khách sạn')} /</span>
              <span className="span-header span-header-right span-blur">
                {t('guestCheckin.Hotel Regulation')}
              </span>
            </Col>
          </Row>
          <Row>
            <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
              <Row>
                <span>• Giờ nhận phòng /</span>
                <span className="reservation-information_span span-header-right">
                  Checkin Time:
                </span>
                15h00
              </Row>
              <Row>
                <span>• Giờ trả phòng /</span>
                <span className="reservation-information_span span-header-right">
                  Checkout Time:
                </span>
                Before 12h00
              </Row>
              <Row>
                <span>• Trẻ em sử dụng hồ bơi phải có sự giám sát của ba mẹ</span>
              </Row>
              <Row>
                <span className="span-blur">
                  (Childrens using pools must be full observed by parents.)
                </span>
              </Row>
            </Col>
            <Col className="pt-15 pl-15" span={12}>
              <Row className="pl-15">
                <span>
                  Trong phòng được cung cấp tủ két sắt, quý khách tự bảo quản tài sản của mình.
                  Villa sẽ không chịu trách nhiệm thất lạc tài sản của quý khách.{' '}
                </span>
                <span className="span-blur">
                  (In room with safe box provined for guest properties kept. The villa shall not
                  liable for any loss. )
                </span>
              </Row>
            </Col>
          </Row>
          <Row className="w-100">
            <Col className="pt-15" span={12} style={{ textAlign: 'left' }}>
              <Row className="pr-15">
                <Col className="pb-15">
                  <span className="span-header"> {t('guestCheckin.Yêu cầu đặc biệt')} / </span>
                  <span className="span-header span-header-right span-blur">
                    {t('guestCheckin.Other Note')}
                  </span>
                </Col>
                <Input.TextArea
                  name="note"
                  placeholder={t('guestCheckin.Please input your note')}
                  rows={8}
                  style={{ height: 100 }}
                />
              </Row>
            </Col>
            <Col className="pt-15 pb-15 pl-15" span={12}>
              <Row className="pl-15">
                <Col className="pb-15">
                  <span className="span-header"> Chữ ký /</span>
                  <span className="span-header span-header-right span-blur">Signature</span>
                </Col>
                <Input.TextArea name="note" rows={8} style={{ height: 100 }} />
              </Row>
            </Col>
          </Row>
        </Row>
      </Modal>
      <GuestFooter />
    </>
  );
}

export default GuestCheckinSelectRoom;
