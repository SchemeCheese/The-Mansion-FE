import 'styles/guest_thank.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { Col, Row } from 'antd';
import GuestBgIcon from 'pages/guest/GuestBgIcon';
import GuestFooter from 'pages/guest/GuestFooter';

import MButton from 'components/MButton';

function GuestThank() {
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
          {t('guest.Thank you!')}
        </Col>
        <Col span={24} />
        <Col span={24} style={{ textAlign: 'center' }}>
          <MButton
            className="btn-finish"
            style={{
              background: '#1890FF',
              borderRadius: '4px',
              width: '368px',
              height: '40px',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              textAlign: 'center',
              color: '#FFFFFF',
            }}
          >
            {t('common.Finish')}
          </MButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestThank;
