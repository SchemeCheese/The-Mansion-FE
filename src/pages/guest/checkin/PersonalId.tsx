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
import { Col, Radio, RadioChangeEvent, Row, Steps } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';

import Icon from 'components/Icon';
import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import { useGuest } from '../useGuest';

function GuestCheckinPersonalId() {
  const { t } = useTranslation();
  const { Step } = Steps;

  const [isIdentityCard, setIsIdentityCard] = useState(true);
  const [isPassPort, setIsPassPort] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [isBack, setIsBack] = useState(false);

  const { handleCancel } = useGuest();

  const onChangeIdentityCard = (e: RadioChangeEvent) => {
    setIsIdentityCard(e.target.checked);
    setIsPassPort(!e.target.checked);
  };

  const onChangePassPort = (e: RadioChangeEvent) => {
    setIsPassPort(e.target.checked);
    setIsIdentityCard(!e.target.checked);
    setIsBack(!e.target.checked);
    setIsFront(e.target.checked);
  };

  const onChangeFront = (e: RadioChangeEvent) => {
    setIsBack(!e.target.checked);
    setIsFront(e.target.checked);
  };

  const onChangeBack = (e: RadioChangeEvent) => {
    setIsFront(!e.target.checked);
    setIsBack(e.target.checked);
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
          <Row className="h-100">
            <Col span={24} style={{ marginBottom: 30 }}>
              <Steps current={2}>
                <Step title={t('guestCheckin.Select your stay')} />
                <Step title={t('guestCheckin.Select your room')} />
                <Step title={t('guestCheckin.Upload your persional ID')} />
                <Step title={t('guestCheckin.Payment')} />
              </Steps>
            </Col>
            <Col className="guest-checkout-confirm" span={24}>
              <Col span={24}>
                <p>
                  {' '}
                  {t('guestCheckin.Identity Card')} / {t('guestCheckin.Passport Photo')}{' '}
                </p>
              </Col>
              <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
                <Col span={12} style={{ paddingRight: '1%' }}>
                  <div className="camera-input">
                    <Radio checked={isIdentityCard} onChange={onChangeIdentityCard}>
                      <p
                        style={{
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 14,
                        }}
                      >
                        {t('guestCheckin.Identity Card')}
                      </p>
                    </Radio>
                  </div>
                </Col>
                <Col span={12} style={{ paddingLeft: '1%' }}>
                  <div className="camera-input">
                    <Radio checked={isPassPort} onChange={onChangePassPort}>
                      <p
                        style={{
                          color: 'rgba(0, 0, 0, 0.85)',
                          fontSize: 14,
                        }}
                      >
                        {t('guestCheckin.Passport')}
                      </p>
                    </Radio>
                  </div>
                </Col>
              </Row>
              <Row style={{ maxHeight: '70vh', overflow: 'auto', paddingTop: 30 }}>
                <Col offset={isIdentityCard ? 0 : 6} span={12} style={{ paddingRight: '1%' }}>
                  <div className="camera-input">
                    <Radio checked={isFront} onChange={onChangeFront}>
                      <p className="radio-label">
                        <span style={{ paddingTop: 5 }}> {t('guestCheckin.Front')} </span>
                        <span className="span-blur">
                          {t('guestCheckin.Insert the back-facing Identity Card')}
                        </span>
                      </p>
                      <div className="radio-border">
                        <div
                          className={`border-box ${
                            isFront ? 'border-box_active ' : 'border-box_non-active '
                          }`}
                        />
                      </div>
                      <div className={`circle ${isFront ? 'circle_active' : 'circle_non-active'}`}>
                        <Icon name="ic-camera" width={25} />
                      </div>
                    </Radio>
                  </div>
                </Col>
                {isIdentityCard && (
                  <Col span={12} style={{ paddingLeft: '1%' }}>
                    <div className="camera-input">
                      <Radio checked={isBack} onChange={onChangeBack}>
                        <p className="radio-label">
                          <span style={{ paddingTop: 5 }}> {t('guestCheckin.Back')} </span>
                          <span className="span-blur">
                            {t('guestCheckin.Insert the back-facing Identity Card')}
                          </span>
                        </p>
                        <div className="radio-border">
                          <div
                            className={`border-box ${
                              isBack ? 'border-box_active ' : 'border-box_non-active '
                            }`}
                          />
                        </div>
                        <div className={`circle ${isBack ? 'circle_active' : 'circle_non-active'}`}>
                          <Icon name="ic-camera" width={25} />
                        </div>
                      </Radio>
                    </div>
                  </Col>
                )}
              </Row>
              <Row style={{ maxHeight: '70vh', overflow: 'auto', paddingTop: 30 }}>
                <Col span={12} style={{ paddingRight: '1%' }}>
                  <div className="camera-input" style={{ display: 'grid' }}>
                    <p className="radio-label">
                      <span style={{ paddingTop: 5 }}> {t('guestCheckin.Front')} </span>
                    </p>
                    <img
                      alt="upload img"
                      className="ic-image"
                      src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                    />
                    <div className="ic-group-btn">
                      <button className="circle circle_active mr-3" type="button">
                        <Icon name="ic-change" width={25} />
                      </button>
                      <button className="circle circle_delete" type="button">
                        <Icon name="ic-delete" width={25} />
                      </button>
                    </div>
                  </div>
                </Col>
                <Col span={12} style={{ paddingLeft: '1%' }}>
                  <div className="camera-input" style={{ display: 'grid' }}>
                    <p className="radio-label">
                      <span style={{ paddingTop: 5 }}> {t('guestCheckin.Back')} </span>
                    </p>
                    <img
                      alt="upload img"
                      className="ic-image"
                      src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                    />
                    <div className="ic-group-btn">
                      <button className="circle circle_active mr-3" type="button">
                        <Icon name="ic-change" width={25} />
                      </button>
                      <button className="circle circle_delete" type="button">
                        <Icon name="ic-delete" width={25} />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton style={{ marginLeft: 20 }}>{t('common.Next')}</PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestCheckinPersonalId;
