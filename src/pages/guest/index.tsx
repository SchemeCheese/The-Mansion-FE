/** ***********************************
Module Name: Guest
Developer Name: MinhNV
Created Date: 17/04/2023
Updated Date: 17/04/2023
Main functions: Guest Index
************************************ */

import 'styles/guest_payment.css';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'ui/antd';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectUser } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { branchSelected, getFacilityAction } from 'actions';
import layoutStyles from 'components/layout.module.css';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import GuestBgIcon from './GuestBgIcon';

function Guest() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user && !window.localStorage.getItem('facility_id')) {
      dispatch(
        getFacilityAction({
          facility_id: user.facility_id.toString(),
        }),
      );
    }
  }, [user]);

  return (
    <>
      <Row
        className={`${layoutStyles.content} guest-thank`}
        style={{
          // background: 'white',
          width: '90%',
          marginLeft: '5%',
          marginTop: '5vh',
          marginBottom: '30vh',
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
            fontSize: 38,
            lineHeight: '46px',
            color: 'rgba(0, 0, 0, 0.85)',
            margin: '84px 0 106px 0',
          }}
        >
          {`${t('guest.Welcome to')} ${user.name}`}
        </Col>
        <Col span={24} />
        <Col span={24} style={{ textAlign: 'center' }}>
          <PattonButton
            onClick={() => navigate(`/guest/checkin`)}
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
            onClick={() => {
              navigate('/guest-room-number');
            }}
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
