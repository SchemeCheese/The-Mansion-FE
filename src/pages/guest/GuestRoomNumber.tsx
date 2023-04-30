/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 30/04/2023
Updated Date: 30/04/2023
Main functions: Guest Room Number
************************************ */

import 'styles/guest_room_number.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Input, Row } from 'antd';
import GuestBgIcon from 'pages/guest/GuestBgIcon';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectGetReservationCheckoutFromRoomNo } from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import { getReservationCheckoutByRoomNoAction } from 'actions';

import PattonButton from 'components/PattonButton';

function GuestRoomNumber() {
  const { t } = useTranslation();
  const [numberPhone, setNumberPhone] = useState('');
  const listNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNumberPhone = (number: number | string) => {
    const txtNumber = `${numberPhone}${number}`;

    setNumberPhone(txtNumber);
  };

  const getReservationCheckoutFromRoomNoData = useAppSelector(
    selectGetReservationCheckoutFromRoomNo,
  );
  const { changed } = useTreeChanges(getReservationCheckoutFromRoomNoData);

  useEffect(() => {
    if (changed('is_finish', true)) {
      navigate('/guest-checkout');
    }
  }, [changed]);

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
          <SVG src="/media/images/logo.svg" />
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
            onChange={e => {
              setNumberPhone(e.target.value);
            }}
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
          <PattonButton
            disabled={numberPhone === ''}
            onClick={() => {
              dispatch(
                getReservationCheckoutByRoomNoAction({
                  room_no: numberPhone,
                }),
              );
            }}
            style={{
              width: 370,
              height: 40,
              fontSize: 16,
            }}
          >
            {t('common.Confirm')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestRoomNumber;
