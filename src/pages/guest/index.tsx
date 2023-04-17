/** ***********************************
Module Name: Guest
Developer Name: MinhNV
Created Date: 17/04/2023
Updated Date: 17/04/2023
Main functions: Guest Index
************************************ */

import 'styles/guest_payment.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { Col, Row } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import GuestBgIcon from './GuestBgIcon';

function Guest() {
  const { t } = useTranslation();

  return (
    <>
      <Row
        className="content guest-thank"
        style={{
          // background: 'white',
          width: '90%',
          marginLeft: '5%',
          maxHeight: '90vh',
          marginTop: '5vh',
          position: 'relative',
        }}
      >
        <GuestBgIcon />
        <Col
          span={24}
          style={{
            textAlign: 'center',
          }}
        >
          <SVG src="media/images/logo.svg" />
        </Col>
        <Col
          span={24}
          style={{
            textAlign: 'center',
            fontWeight: 400,
            fontSize: 38,
            lineHeight: '46px',
            color: 'rgba(0, 0, 0, 0.85)',
            margin: '84px 0 106px 0',
          }}
        >
          {t('guest.Welcome to The Mansion Hanoi Hotel')}
        </Col>
        <Col span={24} />
        <Col span={24} style={{ textAlign: 'center' }}>
          <PattonButton
            style={{
              borderRadius: 4,
              height: 40,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '24px',
              textAlign: 'center',
              width: 229,
              color: '#FFFFFF',
            }}
          >
            {t('common.Checkin')}
          </PattonButton>
          <MButton
            style={{
              borderRadius: 4,
              height: 40,
              fontWeight: 400,
              fontSize: 16,
              lineHeight: '24px',
              textAlign: 'center',
              width: 229,
              marginLeft: 20,
              color: 'rgba(0, 0, 0, 0.65)',
            }}
          >
            {t('common.Checkout')}
          </MButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default Guest;
