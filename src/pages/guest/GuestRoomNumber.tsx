import 'styles/guest_room_number.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { Col, Input, Row } from 'antd';
import GuestBgIcon from 'pages/guest/GuestBgIcon';
import GuestFooter from 'pages/guest/GuestFooter';

import MButton from 'components/MButton';

function GuestRoomNumber() {
  const { t } = useTranslation();
  const [numberPhone, setNumberPhone] = useState('');
  const listNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];

  const handleNumberPhone = (number: number | string) => {
    const txtNumber = `${numberPhone}${number}`;

    setNumberPhone(txtNumber);
  };

  return (
    <>
      <Row
        className="content guest-room-number"
        style={{
          // background: 'white',
          width: '90%',
          marginLeft: '5%',
          maxHeight: '90vh',
          marginTop: '5vh',
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
            fontSize: 20,
            lineHeight: '28px',
            margin: '24px 0 24px 0',
          }}
        >
          {t('guest.Please input your Room Number to checkout')}
        </Col>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Input
            style={{
              background: '#F0F3F7',
              border: '1px solid #1890FF',
              borderRadius: '4px',
              width: '514px',
              height: '48px',
            }}
            value={numberPhone}
          />
        </Col>
        <div style={{ width: 277, margin: 'auto', padding: '20px 0 24px 0' }}>
          <Col className="list-number">
            {listNumber.map((number: number | string) => (
              <Col
                className={`item-number ${number === '' ? 'not-number' : ''}`}
                onClick={() => handleNumberPhone(number)}
              >
                <span>{number}</span>
              </Col>
            ))}
          </Col>
        </div>
        <Col span={24} />
        <Col span={24} style={{ textAlign: 'center' }}>
          <MButton className="btn-confirm">{t('common.Confirm')}</MButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestRoomNumber;
