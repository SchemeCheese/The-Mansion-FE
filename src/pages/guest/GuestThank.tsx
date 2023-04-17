import 'styles/guest_thank.css';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'antd';
import lodash from 'lodash';
import GuestBgIcon from 'pages/guest/GuestBgIcon';
import GuestFooter from 'pages/guest/GuestFooter';
import { selectGetReservationCheckoutFromRoomNo } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { checkoutAction } from 'actions';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function GuestThank() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: reservationCheckoutData } = useAppSelector(selectGetReservationCheckoutFromRoomNo);

  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(
    //   checkoutAction({
    //     payload: {
    //       reservation_detail_id: reservationCheckoutData.reservation_detail.id,
    //       sales_info_id: reservationCheckoutData.sales_info_id,
    //       sales_detail_id: reservationCheckoutData.sales_detail_id,
    //       payment_methods: [{
    //         "amount_in_vnd": reservationCheckoutData.amount_info.unpaid,
    //         "currency_conversion_id": 2,
    //         "payment_amount": reservationCheckoutData.amount_info.unpaid,
    //         "payment_method": "4", // VNPAY
    //         "payment_exchange_rate": 1
    //     }],
    //       reservation_id: reservationCheckoutData.reservation_detail.reservation.id,
    //       paid: {
    //         total_amount: reservationCheckoutData.amount_info.unpaid,
    //         discount_amount: reservationCheckoutData.amount_info.discount,
    //         balance_amount: 0
    //       },
    //     },
    //   }),
    // );
  }, []);

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
          <PattonButton
            onClick={() => {
              navigate('/guest');
            }}
            style={{
              width: '368px',
              height: '40px',
            }}
          >
            {t('common.Finish')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestThank;
