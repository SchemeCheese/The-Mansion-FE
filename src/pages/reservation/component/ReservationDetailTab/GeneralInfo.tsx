/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : General Info Tab
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, message, Modal, Row, Select, Spin, TimePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import { selectUpdateGeneralInfo, selectUser } from 'selectors';
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
  const [isUpdateReservationDetail, setIsUpdateReservationDetail] = useState(false);
  const dispatch = useDispatch();
  const updateGeneralInfoData = useAppSelector(selectUpdateGeneralInfo);
  const { changed } = useTreeChanges(updateGeneralInfoData);
  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary,
  );
  const roomTypes: any = useSelector<RootState>(
    ({ getRoomType: getRoomTypeTemporary }) => getRoomTypeTemporary.data,
  );
  const { data } = reservationDetailInfo;
  const user = useAppSelector(selectUser);

  const roomTypeOption = _.keys(roomTypes).map((key: any) => {
    return (
      <Option key={key} value={key}>
        {roomTypes[key]}
      </Option>
    );
  });

  const disabledCheckinDate: RangePickerProps['disabledDate'] = current => {
    return current > moment(generalInfoState.checkout_date).endOf('day');
  };

  const disabledCheckoutDate: RangePickerProps['disabledDate'] = current => {
    return current < moment(generalInfoState.checkin_date).endOf('day');
  };

  useEffect(() => {
    const dataReservationDetailInfo = {
      checkin_date: data.checkin,
      checkout_date: data.checkout,
      reservation_id: reservationId,
      reservation_detail_id: reservationDetailId,
      room_type: data.room_type,
      adults: data.adults ?? 0,
      child: data.child ?? 0,
      baby: data.baby ?? 0,
      note: data.note,
      checkin_time: data.checkin_time,
      checkout_time: data.checkout_time,
      pickup_time: data.pickup_time,
      dropoff_time: data.dropoff_time,
      transport_no_pickup: data.transport_no_pickup,
      transport_no_dropoff: data.transport_no_dropoff,
      early_check_in: data.early_check_in,
      late_check_out: data.late_check_out,
      honeymoon: data.honeymoon,
      birthday: data.birthday,
      pickup_required: data.pickup_required,
      dropoff_required: data.dropoff_required,
    };

    setGeneralInfoState(dataReservationDetailInfo);
    setIsUpdateReservationDetail(true);
  }, [reservationDetailInfo]);
  useEffect(() => {
    if (reservationDetailInfo.is_finish === false) {
      setIsUpdateReservationDetail(false);
    }
  }, [reservationDetailInfo.is_finish]);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Update general info successfully!'));

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

  const confirmUpdateCICO = () => {
    Modal.confirm({
      title: t('message.Update CICO Time Confirm'),
      okButtonProps: { style: { backgroundColor: '#1D39C4' } },
      icon: <ExclamationCircleOutlined />,
      content: t('message.Update CICO Note'),

      onOk() {
        dispatch(
          updateGeneralInfo({
            payload: {
              reservation_id: reservationId,
              reservation_detail_id: reservationDetailId,
              ...generalInfoState,
            },
          }),
        );
      },
    });
  };

  const handleUpdateGeneralInfo = () => {
    if (
      generalInfoState.checkin_date !== reservationDetailInfo.data.checkin ||
      generalInfoState.checkout_date !== reservationDetailInfo.data.checkout
    ) {
      confirmUpdateCICO();
    } else {
      dispatch(
        updateGeneralInfo({
          payload: {
            reservation_id: reservationId,
            reservation_detail_id: reservationDetailId,
            ...generalInfoState,
          },
        }),
      );
    }
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

  return reservationDetailInfo.is_finish && isUpdateReservationDetail === true ? (
    <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
        <span style={{ paddingRight: 15 }}>{t('common.Created Date')}: </span>
        <span>
          {reservationDetailInfo &&
            moment(reservationDetailInfo.data.created_date).format('DD/MM/YYYY')}
        </span>
        {user.permission.reservation.edit && (
          <PattonButton onClick={() => handleUpdateGeneralInfo()} style={{ float: 'right' }}>
            {t('common.Update')}
          </PattonButton>
        )}
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Room Type.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Select
              allowClear
              defaultValue={generalInfoState?.room_type?.toString()}
              onChange={value => handleChangeSelect(value, 'room_type')}
              placeholder={t('reservation.Room Type.placeholder')}
              style={{ width: '100%' }}
            >
              {roomTypeOption}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Adults.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Select
              defaultValue={generalInfoState?.adults?.toString()}
              onChange={value => handleChangeSelect(value, 'adults')}
              style={{ width: '100%' }}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Child.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Select
              defaultValue={generalInfoState?.child?.toString()}
              onChange={value => handleChangeSelect(value, 'child')}
              style={{ width: '100%' }}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Baby.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Select
              defaultValue={generalInfoState?.baby?.toString()}
              onChange={value => handleChangeSelect(value, 'baby')}
              style={{ width: '100%' }}
            >
              <Option value="0">0</Option>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
              <Option value="5">5</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Notes.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <TextArea
              defaultValue={generalInfoState.note}
              onChange={event => handleChangeInput(event, 'note')}
              placeholder={t('reservation.Notes.placeholder')}
              rows={5}
            />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Checkin')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <DatePicker
              defaultValue={moment(generalInfoState.checkin_date, formatDate)}
              disabledDate={disabledCheckinDate}
              onChange={date => handleChangeDateTime(date, 'checkin_date', '')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '100%',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Checkin Time')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
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
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.early_check_in)}
              onChange={event => handleChangeCheckBox(event.target, 'early_check_in')}
            >
              {t('reservation.Early Checkin')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.honeymoon)}
              onChange={event => handleChangeCheckBox(event.target, 'honeymoon')}
            >
              {t('reservation.Honeymoon Setup')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.pickup_required)}
              onChange={event => handleChangeCheckBox(event.target, 'pickup_required')}
            >
              {t('reservation.Pickup Request')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8, paddingTop: 30 }}>
            {t('reservation.Pickup Time')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
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
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Pickup Transport Code.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <MInput
              defaultValue={generalInfoState.transport_no_pickup}
              onChange={event => handleChangeInput(event, 'transport_no_pickup')}
              placeholder={t('reservation.Pickup Transport Code.placeholder')}
            />
          </Col>
        </Row>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Checkout')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <DatePicker
              defaultValue={moment(generalInfoState.checkout_date ?? undefined, formatDate)}
              disabledDate={disabledCheckoutDate}
              onChange={date => handleChangeDateTime(date, 'checkout_date', '')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '100%',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Checkout Time')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
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
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.late_check_out)}
              onChange={event => handleChangeCheckBox(event.target, 'late_check_out')}
            >
              {t('reservation.Late Checkout')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.birthday)}
              onChange={event => handleChangeCheckBox(event.target, 'birthday')}
            >
              {t('reservation.Birthday Setup')}
            </Checkbox>
          </Col>
        </Row>
        <Row>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <Checkbox
              checked={checkActiveCheckBox(generalInfoState.dropoff_required)}
              onChange={event => handleChangeCheckBox(event.target, 'dropoff_required')}
            >
              {t('reservation.Dropoff Request')}
            </Checkbox>
          </Col>
        </Row>

        <Row>
          <Col span={24} style={{ paddingBottom: 8, paddingTop: 30 }}>
            {t('reservation.Dropoff Time')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
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
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingBottom: 8 }}>
            {t('reservation.Dropoff Transport Code.title')}
          </Col>
          <Col span={23} style={{ paddingBottom: 24 }}>
            <MInput
              defaultValue={generalInfoState.transport_no_dropoff}
              onChange={event => handleChangeInput(event, 'transport_no_dropoff')}
              placeholder={t('reservation.Dropoff Transport Code.placeholder')}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  ) : null;
}

export default GeneralInfo;
