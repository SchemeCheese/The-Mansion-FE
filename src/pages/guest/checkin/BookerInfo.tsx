/** ***********************************
Module Name: Payment
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import 'styles/guest_checkin_select_room.css';

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Col, Form, Row, Steps } from 'antd';
import GuestFooter from 'pages/guest/GuestFooter';
import {
  selectBranchInfo,
  selectCreateReservation,
  selectGuestCheckin,
  selectSearchRoom,
} from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import {
  addItemAction,
  createReservation,
  getReservationGuestCheckinAction,
  getReservationNumber,
  searchRoom,
} from 'actions';

import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

import { useGuest } from '../useGuest';

function GuestCheckinBookerInfo() {
  const { t } = useTranslation();
  const { Step } = Steps;
  const [form] = Form.useForm();

  const { handleCancel } = useGuest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reservationNumberResult: any = useSelector<RootState>(
    ({ getReservationNumber: getReservationNumberTemporary }) =>
      getReservationNumberTemporary.reservation_number,
  );

  const handleNext = (values: any) => {
    const bookingInfo = JSON.parse(localStorage.getItem('guest_checkin_booking') || '');

    dispatch(
      createReservation({
        payload: {
          agent_info_id: '25',
          booker_email: values.email,
          booker_email_2: '',
          booker_firstname: values.first_name,
          booker_lastname: values.last_name,
          booker_note: '',
          booker_phone_number: '',
          booker_rank: '',
          booker_type: '',
          market_segment_id: '7',
          note: '',
          reservation_number: reservationNumberResult,
          rooms: [
            {
              room_id: bookingInfo.room_id,
              room_type: bookingInfo.room_type_id,
              checkin_date: bookingInfo.checkin_date,
              checkout_date: bookingInfo.checkout_date,
              checkin_time: bookingInfo.checkin_time,
              checkout_time: bookingInfo.checkout_time,
              quantity: 1,
              charges: bookingInfo.charges,
            },
          ],
        },
      }),
    );
  };

  const branchInfoSelected: any = useAppSelector(selectBranchInfo);
  const chargesData = useAppSelector(selectSearchRoom);
  const createReservationData = useAppSelector(selectCreateReservation);

  const checkinReservationState = useAppSelector(selectGuestCheckin);
  const checkinReservationData = checkinReservationState.data;

  const { changed: chagresChanged } = useTreeChanges(chargesData);
  const { changed: createReservationChanged } = useTreeChanges(createReservationData);
  const { changed: checkinReservationChanged } = useTreeChanges(checkinReservationState);

  useEffect(() => {
    if (checkinReservationChanged('is_finish', true)) {
      const transactionInfo: any = Object.values(checkinReservationData.transactions);
      let transactionItems: any = [];

      if (transactionInfo.length > 0) {
        const transactionArray = transactionInfo[0];

        transactionItems = transactionArray.items.map((item: any) => item.description_id);
      }

      const roomCharges = checkinReservationData.charges
        .map((item: any) => {
          return {
            description_id: item.description_id,
            quantity: 1,
            normal_price: item.actual_amount,
            sales_price: item.actual_amount,
            storage_id: 1, // Disk A
          };
        })
        .filter((item: any) => {
          return !transactionItems.includes(item.description_id);
        });

      if (roomCharges.length > 0) {
        dispatch(
          addItemAction({
            payload: {
              items: roomCharges,
              reservation_id: checkinReservationData.reservation.id,
              reservation_detail_id: checkinReservationData.id,
            },
          }),
        );
      }

      navigate('/guest/checkin/payment');
    }
  }, [checkinReservationChanged]);

  useEffect(() => {
    if (createReservationChanged('status', 'SUCCESS')) {
      const bookingInfo = {
        reservation_info_id: createReservationData.reservation_created.id,
        reservation_detail_id: createReservationData.reservation_created.reservation_detail_id[0],
      };

      dispatch(getReservationGuestCheckinAction(bookingInfo));

      localStorage.setItem('checkin_booking', JSON.stringify(bookingInfo));
    }
  }, [createReservationChanged]);

  useEffect(() => {
    if (chagresChanged('is_searching', false)) {
      const charges = chargesData.charges.map(item => {
        return {
          charge_kind: item.charge_kind,
          description_id: item.description_id,
          equipment_charge_detail_id: item.equipment_charge_detail_id,
          actual_amount: item.price,
          reservation_charge_id: item.reservation_charge_id,
          selected_rate_id: item.selected_rate_id,
          use_date: item.use_date,
        };
      });

      const bookingInfo = JSON.parse(localStorage.getItem('guest_checkin_booking') || '');

      localStorage.setItem(
        'guest_checkin_booking',
        JSON.stringify({
          ...bookingInfo,
          charges,
        }),
      );
    }
  }, [chagresChanged]);

  useEffect(() => {
    const bookingInfo = JSON.parse(localStorage.getItem('guest_checkin_booking') || '');

    // Get reservation number
    dispatch(getReservationNumber(branchInfoSelected));

    dispatch(
      searchRoom({
        charge_kind: '1',
        checkin: bookingInfo.checkin_date,
        checkout: bookingInfo.checkout_date,
        room_type: bookingInfo.room_type_id,
        source_id: '7',
        source_type: '25',
      }),
    );
  }, []);

  return (
    <Form
      autoComplete="off"
      form={form}
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      name="basic"
      onFinish={handleNext}
      wrapperCol={{
        span: 23,
      }}
    >
      <Row
        className="content guest-payment-content guest-checkout-content"
        style={{
          background: 'white',
          width: '90%',
          marginLeft: '5%',
          marginTop: '5vh',
          marginBottom: 10,
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
              <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
                <Col span={8}>
                  <Form.Item
                    label="First name"
                    name="first_name"
                    required
                    rules={[{ required: true, message: 'Please input first name' }]}
                  >
                    <MInput placeholder="Input the name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Last name"
                    name="last_name"
                    required
                    rules={[{ required: true, message: 'Please input last name' }]}
                  >
                    <MInput placeholder="Input the name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Email" name="email">
                    <MInput placeholder="Input the name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="ID Number" name="id_number">
                    <MInput placeholder="Input the ID" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passport Number" name="passport_number">
                    <MInput placeholder="Input the passport Number" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: 25, marginBottom: 25, textAlign: 'center' }}>
          <MButton onClick={handleCancel}>{t('common.Back')}</MButton>
          <PattonButton onClick={() => form.submit()} style={{ marginLeft: 20 }}>
            {t('common.Next')}
          </PattonButton>
        </Col>
      </Row>
      <GuestFooter />
    </Form>
  );
}

export default GuestCheckinBookerInfo;
