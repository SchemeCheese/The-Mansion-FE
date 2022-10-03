import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Col, DatePicker, Form, message, Row, Select, Spin, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { selectUpdateGeneralInfo } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { getReservation, getReservationDetail, updateGeneralInfo } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

const { Option } = Select;
const format = 'HH:mm';
const formatDate = 'YYYY-MM-DD';

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function GeneralInfo({ reservationDetailId, reservationId }: Props) {
  const { t } = useTranslation();
  const [generalInfoState, setGeneralInfoState] = useState<any>('');
  const dispatch = useDispatch();
  const updateGeneralInfoData = useAppSelector(selectUpdateGeneralInfo);
  const { changed } = useTreeChanges(updateGeneralInfoData);
  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );
  const roomTypes: any = useSelector<RootState>(
    ({ getRoomType: getRoomTypeTemporary }) => getRoomTypeTemporary.data,
  );

  const roomTypeOption = _.keys(roomTypes).map((key: any) => {
    return (
      <Option key={key} value={key}>
        {roomTypes[key]}
      </Option>
    );
  });

  useEffect(() => {
    const dataReservationDetailInfo = {
      checkin_date: reservationDetailInfo.checkin,
      checkout_date: reservationDetailInfo.checkout,
      reservation_id: reservationId,
      reservation_detail_id: reservationDetailId,
      room_type: reservationDetailInfo.room_type,
      adults: reservationDetailInfo.adults,
      child: reservationDetailInfo.child,
      baby: reservationDetailInfo.baby,
      note: reservationDetailInfo.note,
      checkin_time: reservationDetailInfo.checkin_time,
      checkout_time: reservationDetailInfo.checkout_time,
      pickup_time: reservationDetailInfo.pickup_time,
      dropoff_time: reservationDetailInfo.dropoff_time,
      transport_no_pickup: reservationDetailInfo.transport_no_pickup,
      transport_no_dropoff: reservationDetailInfo.transport_no_dropoff,
      early_check_in: reservationDetailInfo.early_check_in,
      late_check_out: reservationDetailInfo.late_check_out,
      honeymoon: reservationDetailInfo.honeymoon,
      birthday: reservationDetailInfo.birthday,
      pickup_required: reservationDetailInfo.pickup_required,
      dropoff_required: reservationDetailInfo.dropoff_required,
    };

    setGeneralInfoState(dataReservationDetailInfo);
  }, [reservationDetailInfo]);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success('Update general info successfully!');

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );
      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changed]);

  const handleUpdateGeneralInfo = () => {
    dispatch(
      updateGeneralInfo({
        payload: {
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
          ...generalInfoState,
        },
      }),
    );
  };

  const checkActiveCheckBox = (value: any) => {
    return value === 1;
  };

  const handleChangeCheckBox = (event: any, name: string) => {
    const checked = event.checked ? 1 : 0;
    const dataGeneralInfoState = { ...generalInfoState, [name]: checked };

    setGeneralInfoState(dataGeneralInfoState);
  };

  const handleChangeSelect = (value: string, name: string) => {
    const dataGeneralInfoState = { ...generalInfoState, [name]: value };

    setGeneralInfoState(dataGeneralInfoState);
  };

  const handleChangeDateTime = (date: any, name: string, type: string) => {
    let value = date.format(formatDate);

    if (type === 'time') {
      value = date.format(format);
    }

    const dataGeneralInfoState = { ...generalInfoState, [name]: value };

    setGeneralInfoState(dataGeneralInfoState);
  };

  const handleChangeInput = (event: any, name: string) => {
    const dataGeneralInfoState = { ...generalInfoState, [name]: event.target.value };

    setGeneralInfoState(dataGeneralInfoState);
  };

  if (!generalInfoState) {
    return <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />;
  }

  console.log('generalInfoState', reservationDetailInfo);

  return (
    <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
        <span style={{ paddingRight: 15 }}>{t('common.Created Date')}: </span>
        <span>{reservationDetailInfo.created_date}</span>
        <PattonButton onClick={() => handleUpdateGeneralInfo()} style={{ float: 'right' }}>
          {t('common.Update')}
        </PattonButton>
      </Col>
      <Col span={8}>
        <Form.Item label={t('reservation.Room Type.title')} name="room_type">
          <Select
            allowClear
            defaultValue={generalInfoState?.room_type?.toString()}
            onChange={value => handleChangeSelect(value, 'room_type')}
            placeholder={t('reservation.Room Type.placeholder')}
          >
            {roomTypeOption}
          </Select>
        </Form.Item>
        <Form.Item label={t('reservation.Adults.title')} name="adults">
          <Select
            defaultValue={generalInfoState?.adults?.toString()}
            onChange={value => handleChangeSelect(value, 'adults')}
          >
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('reservation.Child.title')} name="child">
          <Select
            defaultValue={generalInfoState?.child?.toString()}
            onChange={value => handleChangeSelect(value, 'child')}
          >
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('reservation.Baby.title')} name="baby">
          <Select
            defaultValue={generalInfoState?.baby?.toString()}
            onChange={value => handleChangeSelect(value, 'baby')}
          >
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('reservation.Notes.title')} name="note_general_info">
          <TextArea
            defaultValue={generalInfoState.note}
            onChange={event => handleChangeInput(event, 'note')}
            placeholder={t('reservation.Notes.placeholder')}
            rows={5}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={t('reservation.Checkin')} name="checkin_date">
          <DatePicker
            defaultValue={moment(generalInfoState.checkin_date, formatDate)}
            onChange={date => handleChangeDateTime(date, 'checkin_date', '')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label={t('reservation.Checkin Time')} name="checkin_time">
          <TimePicker
            defaultValue={
              generalInfoState.checkin_time
                ? moment(generalInfoState.checkin_time, format)
                : undefined
            }
            format={format}
            onChange={date => handleChangeDateTime(date, 'checkin_time', 'time')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item name="early_check_in" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.early_check_in)}
            onChange={event => handleChangeCheckBox(event.target, 'early_check_in')}
          >
            {t('reservation.Early Checkin')}
          </Checkbox>
        </Form.Item>
        <Form.Item name="honeymoon" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.honeymoon)}
            onChange={event => handleChangeCheckBox(event.target, 'honeymoon')}
          >
            {t('reservation.Honeymoon Setup')}
          </Checkbox>
        </Form.Item>
        <Form.Item name="pickup_required" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.pickup_required)}
            onChange={event => handleChangeCheckBox(event.target, 'pickup_required')}
          >
            {t('reservation.Pickup Request')}
          </Checkbox>
        </Form.Item>
        <Form.Item
          label={t('reservation.Pickup Time')}
          name="pickup_time"
          style={{ marginTop: 55 }}
        >
          <TimePicker
            defaultValue={
              generalInfoState.pickup_time
                ? moment(generalInfoState.pickup_time, format)
                : undefined
            }
            format={format}
            onChange={date => handleChangeDateTime(date, 'pickup_time', 'time')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item label={t('reservation.Pickup Transport Code.title')} name="transport_no_pickup">
          <MInput
            defaultValue={generalInfoState.transport_no_pickup}
            onChange={event => handleChangeInput(event, 'transport_no_pickup')}
            placeholder={t('reservation.Pickup Transport Code.placeholder')}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={t('reservation.Checkout')} name="checkout_date">
          <DatePicker
            defaultValue={moment(generalInfoState.checkout_date ?? '2017-08-08', formatDate)}
            onChange={date => handleChangeDateTime(date, 'checkout_date', '')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item label={t('reservation.Checkout Time')} name="checkout_time">
          <TimePicker
            defaultValue={
              generalInfoState.checkout_time
                ? moment(generalInfoState.checkout_time, format)
                : undefined
            }
            format={format}
            onChange={date => handleChangeDateTime(date, 'checkout_time', 'time')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item name="late_check_out" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.late_check_out)}
            onChange={event => handleChangeCheckBox(event.target, 'late_check_out')}
          >
            {t('reservation.Late Checkout')}
          </Checkbox>
        </Form.Item>
        <Form.Item name="birthday" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.birthday)}
            onChange={event => handleChangeCheckBox(event.target, 'birthday')}
          >
            {t('reservation.Birthday Setup')}
          </Checkbox>
        </Form.Item>
        <Form.Item name="dropoff_required" style={{ marginBottom: 12 }}>
          <Checkbox
            checked={checkActiveCheckBox(generalInfoState.dropoff_required)}
            onChange={event => handleChangeCheckBox(event.target, 'dropoff_required')}
          >
            {t('reservation.Dropoff Request')}
          </Checkbox>
        </Form.Item>
        <Form.Item
          label={t('reservation.Dropoff Time')}
          name="dropoff_time"
          style={{ marginTop: 55 }}
        >
          <TimePicker
            defaultValue={
              generalInfoState.dropoff_time
                ? moment(generalInfoState.dropoff_time, format)
                : undefined
            }
            format={format}
            onChange={date => handleChangeDateTime(date, 'dropoff_time', 'time')}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          label={t('reservation.Dropoff Transport Code.title')}
          name="transport_no_dropoff"
        >
          <MInput
            defaultValue={generalInfoState.transport_no_dropoff}
            onChange={event => handleChangeInput(event, 'transport_no_dropoff')}
            placeholder={t('reservation.Dropoff Transport Code.placeholder')}
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default GeneralInfo;
