/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 30/04/2023
Updated Date: 30/04/2023
Main functions: Guest Thank you
************************************ */

import 'styles/guest_thank.css';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Spin } from 'antd';
import { selectCheckoutState, selectGetReservationCheckoutFromRoomNo } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { checkoutAction } from 'actions';

import PattonButton from 'components/PattonButton';

import GuestBgIcon from './GuestBgIcon';
import GuestFooter from './GuestFooter';

function GuestThank() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { type } = useParams();
  const params = useLocation();
  const searchParam = new URLSearchParams(params.search);

  const getPaymentMethodConst = () => {
    if (type === 'vn-pay') {
      return '4';
    }

    if (type === 'momo-pay') {
      return '5';
    }

    return '';
  };

  const isSuccessPayment = () => {
    if (type === 'vn-pay' && searchParam.get('vnp_ResponseCode') === '00') {
      return true;
    }

    if (type === 'momo-pay' && searchParam.get('resultCode') === '0') {
      return true;
    }

    return false;
  };

  const { data: reservationCheckoutData } = useAppSelector(selectGetReservationCheckoutFromRoomNo);
  const checkoutData = useAppSelector(selectCheckoutState);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      checkoutAction({
        payload: {
          reservation_detail_id: reservationCheckoutData.reservation_detail.id,
          sales_info_id: reservationCheckoutData.sales_info_id,
          sales_detail_id: reservationCheckoutData.sales_detail_id,
          payment_methods: [
            {
              amount_in_vnd: reservationCheckoutData.amount_info.unpaid,
              currency_conversion_id: 2,
              payment_amount: reservationCheckoutData.amount_info.unpaid,
              payment_method: getPaymentMethodConst(),
              payment_exchange_rate: 1,
            },
          ],
          reservation_id: reservationCheckoutData.reservation_detail.reservation.id,
          paid: {
            total_amount: reservationCheckoutData.amount_info.unpaid,
            discount_amount: reservationCheckoutData.amount_info.discount,
            balance_amount: 0,
          },
        },
      }),
    );
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
          {checkoutData.status !== 'SUCCESS' && <Spin />}
          {checkoutData.status === 'SUCCESS' && isSuccessPayment() && <>{t('guest.Thank you!')}</>}
          {checkoutData.status === 'SUCCESS' && !isSuccessPayment() && (
            <>
              <p
                style={{
                  color: 'red',
                  margin: 0,
                }}
              >
                Failure!
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: 'red',
                  margin: 0,
                }}
              >
                The transaction is failed!
              </p>
            </>
          )}
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
            {isSuccessPayment() ? <>{t('common.Finish')}</> : <>Checkout again</>}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </>
  );
}

export default GuestThank;
