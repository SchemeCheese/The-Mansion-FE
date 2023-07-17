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

  const [modalVisible, setModalVisible] = useState(false);
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

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = (event: any) => {
    setModalVisible(false);
  };

  const handleCancelModal = (event: any) => {
    setModalVisible(false);
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
            <Row gutter={30} style={{ paddingTop: 30 }}>
              <SelectRoomCard showModal={showModal} />
              <SelectRoomCard showModal={showModal} />
              <SelectRoomCard showModal={showModal} />
            </Row>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton style={{ marginLeft: 20 }}>{t('common.Next')}</PattonButton>
        </Col>
      </Row>
      <Modal
        className="modal-room-detail"
        footer={[<PattonButton onClick={handleOk}>{t('common.OK')}</PattonButton>]}
        onCancel={handleCancelModal}
        onOk={handleOk}
        title="Room Information"
        visible={modalVisible}
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
      <GuestFooter />
    </>
  );
}

export default GuestCheckinSelectRoom;
