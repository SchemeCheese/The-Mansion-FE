/** ***********************************
Module Name: Payment
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import 'styles/guest_checkin_select_room.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Modal, Row, Steps } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';

import Icon from 'components/Icon';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import SelectRoomCard from './SelectRoomCard';
import SelectRoomFilter from './SelectRoomFilter';

import { useGuest } from '../useGuest';

function GuestCheckinSelectRoom() {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [searchCondition, setSearchCondition] = useState({
    room_type: '',
    view: '',
    concept: '',
    is_smoking: false,
  });

  const [modalDetailVisible, setModalDetailVisible] = useState(false);
  const [modalSelectRoomVisible, setModalSelectRoomVisible] = useState(false);

  const arrayAmeties = [
    '2 Stores',
    'Central Heating',
    'Dual Sinks',
    'Electric Range',
    'Fire Place',
    'Home Theater',
    'Laundry Room',
    'Lawn',
    'Marble Floors',
  ];

  const { handleCancel } = useGuest();

  const showModalDetail = () => {
    setModalDetailVisible(true);
    setModalSelectRoomVisible(false);
  };

  const handleOkDetail = (event: any) => {
    setModalDetailVisible(false);
  };

  const handleCancelModalDetail = (event: any) => {
    setModalDetailVisible(false);
  };

  const showModalSelectRoom = () => {
    setModalDetailVisible(false);
    setModalSelectRoomVisible(true);
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
          marginBottom: '10vh',
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
              <SelectRoomCard
                isModalDetail
                showModalDetail={showModalDetail}
                showModalSelectRoom={showModalSelectRoom}
              />
              <SelectRoomCard
                isModalDetail
                showModalDetail={showModalDetail}
                showModalSelectRoom={showModalSelectRoom}
              />
              <SelectRoomCard
                isModalDetail
                showModalDetail={showModalDetail}
                showModalSelectRoom={showModalSelectRoom}
              />
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton style={{ marginLeft: 20 }}>{t('common.Next')}</PattonButton>
        </Col>
      </Row>
      {/* Modal Room Detail */}
      <Modal
        className="modal-room-detail"
        footer={[<PattonButton onClick={handleOkDetail}>{t('common.OK')}</PattonButton>]}
        onCancel={handleCancelModalDetail}
        onOk={handleOkDetail}
        title="Room Information"
        visible={modalDetailVisible}
        width={1024}
      >
        <Row
          gutter={30}
          style={{ backgroundColor: 'rgba(240, 242, 245, 1)', padding: '24px', margin: 0 }}
        >
          <Col span={24}>
            <Row>
              <p className="">
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: '24px',
                    paddingBottom: '2vh',
                  }}
                >
                  {t('guestCheckin.The Space')}
                </span>
              </p>
            </Row>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '4vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '2vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '2vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '2vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '2vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: '3vh', paddingBottom: '1vh' }}>
              {' '}
              Bedroom 1{' '}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: '2vh' }}>
              {' '}
              King-size bed
            </div>
          </Col>
        </Row>
        <Row
          gutter={30}
          style={{ background: 'rgba(247, 249, 250, 1)', padding: '24px', margin: 0 }}
        >
          <Col
            span={24}
            style={{
              paddingBottom: '1vh',
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {t('guestCheckin.Amenities')}
            </span>
          </Col>
          {arrayAmeties.map((item: any) => {
            return (
              <Col
                span={8}
                style={{
                  marginTop: '2vh',
                }}
              >
                <Icon name="checked" width={24} />
                <span
                  key={item}
                  style={{
                    fontSize: 14,
                    paddingLeft: '2%',
                    position: 'absolute',
                    paddingTop: '1%',
                  }}
                >
                  {' '}
                  {item}{' '}
                </span>
              </Col>
            );
          })}
        </Row>
      </Modal>
      {/* Modal Room Select */}
      <Modal
        className="modal-room-detail"
        footer={[<PattonButton onClick={handleOkSelectRoom}>{t('common.OK')}</PattonButton>]}
        onCancel={handleCancelModalSelectRoom}
        onOk={handleOkSelectRoom}
        title="Room Select"
        visible={modalSelectRoomVisible}
        width={1024}
      >
        <Row
          gutter={30}
          style={{ backgroundColor: 'rgba(240, 242, 245, 1)', padding: '24px', margin: 0 }}
        >
          <Col span={24}>
            <Row>
              <p className="">
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
          <Row className="select-room-card" gutter={30} style={{ paddingTop: 30, width: '100%' }}>
            <SelectRoomCard showModalDetail={showModalDetail} />
            <SelectRoomCard showModalDetail={showModalDetail} />
            <SelectRoomCard showModalDetail={showModalDetail} />
          </Row>
        </Row>
      </Modal>
      {/* Modal Reservation Information */}
      {/* <Modal
        className="modal-reservation-information"
        footer={[<PattonButton onClick={handleOkSelectRoom}>{t('common.Next')}</PattonButton>]}
        onCancel={handleCancelModalSelectRoom}
        onOk={handleOkSelectRoom}
        title="Reservation Information"
        visible={modalSelectRoomVisible}
        width={1024}
      >
        <Row
          className="content guest-payment-content modal-row"
        >
          <Col span={24}>
            <Row>
              <p className="">
                <span
                  style={{
                    fontSize: 14,
                    paddingBottom: '2vh',
                  }}
                >
                  {t('guestCheckin.Thank you for staying with us. Please select one of the available rooms below')}
                </span>
              </p>
            </Row>
          </Col>
          <Col span={12} style={{ paddingTop: 15, textAlign: 'left' }}>
            <Row>
              <span style={{
                fontSize: 16,
                fontWeight: 700
              }}
              >{t('guestCheckin.Thông tin đặt phòng')} / </span>
              <span style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.25)',
                paddingLeft: '1vh'
              }}>
                {t('guestCheckin.Reservation Information')}
              </span>
            </Row>
            <Row
              style={{
                height: '100%',
              }}
            >
              <Col
                span={24}
                style={{
                  paddingRight: 20,
                }}
              >
                <Row style={{ paddingTop: 12 }}>
                  <Col span={16}>
                    <span>{t('guestCheckin.Ngày tạo')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Date')} : </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 20/10/1010</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Tên khách')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Guest Name')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 111 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Đặt phòng qua')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Booking Via')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> Internet </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Tổng tiền phòng')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Room Fee')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 23.000 </span>
                  </Col>
                </Row>
                <Row style={{ paddingBottom: 15 }}>
                  <Col span={16}>
                    <span>{t('guestCheckin.Ghi chú')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Notes')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> Strong Wifi </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Mã số đặt phòng')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Reservation No')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 408 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Số phòng')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Room Number')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 14 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Ngày đến')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Checkin Date.title')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 20/10/2020 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Ngày đi')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Checkout Date.title')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 23/10/2020 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Số đêm')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Nights')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 4 </span>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <span>{t('guestCheckin.Số khách')} / </span>
                    <span className='reservation-information_span'>{t('guestCheckin.Guests')}: </span>
                  </Col>
                  <Col span={8} style={{ marginBottom: 3 }}>
                    <span className='reservation-information_span-right'> 4 </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ paddingTop: 15, paddingLeft: 30, paddingBottom: 40 }}>
            <Row style={{ paddingBottom: 15 }}>
              <span style={{
                fontSize: 16,
                fontWeight: 700
              }}
              >{t('guestCheckin.Yêu cầu đặc biệt')} / </span>
              <span>{' '}</span>
              <span className='span-blur' style={{
                fontSize: 16,
                fontWeight: 700,
                paddingLeft: '1vh'
              }}>
                {t('guestCheckin.Other Note')}
              </span>
            </Row>
            <Input.TextArea
              name="note"
              placeholder={t('guestCheckin.Please input your note')}
              style={{ height: 280 }}
              rows={8} />
          </Col>
        </Row>
      </Modal> */}
      <GuestFooter />
    </>
  );
}

export default GuestCheckinSelectRoom;
