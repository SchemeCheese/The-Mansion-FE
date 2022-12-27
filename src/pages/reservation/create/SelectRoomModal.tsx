/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 24/09/2022
Updated Date : 24/09/2022
Main functions : Select Room Modal Componnent
************************************ */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  message,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { formatNumber, randomKey } from 'helpers';
import moment from 'moment';
import { selectAddReservationDetail } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { addReservationDetail, getReservation, getRoomType, searchRoom } from 'actions';

import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

const { Option } = Select;

const timeFormat = 'HH:mm';

interface Props {
  isModalVisible: boolean;
  quantity: number;
  reservation?: any;
  roomCondition: any;
  roomSelected: any;
  roomTotalForm: any;
  searchRoomResultState: any;
  setIsModalVisible: (data: boolean) => void;
  setQuantity: (data: any) => void;
  setRoomCondition: (data: any) => void;
  setRoomSelected: (data: any) => void;
  setRoomTotalForm: (data: any) => void;
  setSearchRoomResultState: (data: any) => void;
  totalAmount: number;
}

function SelectRoomModal({
  isModalVisible,
  quantity,
  reservation,
  roomCondition,
  roomSelected,
  roomTotalForm,
  searchRoomResultState,
  setIsModalVisible,
  setQuantity,
  setRoomCondition,
  setRoomSelected,
  setRoomTotalForm,
  setSearchRoomResultState,
  totalAmount,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const quantityResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.total,
  );
  const roomTypes: any = useSelector<RootState>(
    ({ getRoomType: getRoomTypeTemporary }) => getRoomTypeTemporary.data,
  );

  const addReservationDetailData = useAppSelector(selectAddReservationDetail);
  const { changed } = useTreeChanges(addReservationDetailData);

  const searchRoomColumns = [
    {
      title: t('common.Date'),
      dataIndex: 'use_date',
      key: 'use_date',
    },
    {
      title: t('common.Rate Name'),
      dataIndex: 'rate_name',
      key: 'rate_name',
      render: (text: any, record: any, index: number) => {
        const option: any = searchRoomResultState[index].rates?.map((item: any) => {
          return (
            <Option key={item.equipment_charge_detail_id} value={item.equipment_charge_detail_id}>
              {item.rate_name}
            </Option>
          );
        });

        return (
          <Select
            // defaultValue={record.rate_id}
            onChange={value => {
              const selectedRate = _.findWhere(searchRoomResultState[index].rates, {
                equipment_charge_detail_id: value,
              });

              const stateTemporary = [...searchRoomResultState];
              const selectedRoom = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...selectedRoom,
                price: formatNumber(selectedRate.price),
                actual_amount: selectedRate.price,
                current_rate_id: value,
              };

              setSearchRoomResultState(stateTemporary);
            }}
            placeholder="Select rate"
            style={{ width: '100%' }}
            value={searchRoomResultState[index].current_rate_id ?? record.rate_id}
          >
            {option}
          </Select>
        );
      },
    },
    {
      title: t('reservation.Adl'),
      dataIndex: 'adult',
      key: 'adult',
    },
    {
      title: t('reservation.Child.title'),
      dataIndex: 'child',
      key: 'child',
    },
    {
      title: t('common.Rate Detail'),
      dataIndex: 'rate_detail',
      key: 'rate_detail',
    },
    {
      title: t('common.Unit Price'),
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: t('common.Update Price'),
      dataIndex: 'actual_amount',
      key: 'actual_amount',
      render: (text: string, record: any, index: number) => {
        return (
          <Input
            name="actual_amount"
            onChange={event => {
              const stateTemporary = [...searchRoomResultState];
              const selectedRoom = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...selectedRoom,
                actual_amount: event.target.value,
              };

              setSearchRoomResultState(stateTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4 }}
            value={searchRoomResultState[index]?.actual_amount}
          />
        );
      },
    },
    {
      title: t('common.Task'),
      dataIndex: 'task',
      key: 'task',
      render: (text: string, record: any, index: number) => {
        return (
          <Button
            onClick={() => {
              const stateTemporary = [...searchRoomResultState];
              const duplicateRecord = stateTemporary[index];

              setSearchRoomResultState(
                searchRoomResultState.map((item: any) => {
                  return {
                    ...item,
                    actual_amount: duplicateRecord.actual_amount,
                  };
                }),
              );
            }}
            style={{ color: '#1D39C4', paddingLeft: 0 }}
            type="link"
          >
            Duplicate
          </Button>
        );
      },
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    const dataRoomTotalForm = [...roomTotalForm];

    roomSelected.forEach((item: any) => {
      const uniqueKey = randomKey(5);

      dataRoomTotalForm.push({
        key: uniqueKey,
        status: t('reservation.Waitlist'),
        name: '-',
        room_type_text: item.room_type_text,
        room_no: '-',
        ci: item.checkin_date,
        co: item.checkout_date,
        quantity: item.quantity,
        // Data to send API
        room_type: roomCondition.room_type,
        checkin_date: item.checkin_date,
        checkout_date: item.checkout_date,
        actual_amount: item.actual_amount,
        charges: item.charges,
        nights: moment
          .duration(moment(item.checkout_date).diff(moment(item.checkin_date)))
          .asDays(),
        adl: 2,
        child: '-',
        baby: '-',
        rate: item.rate_name,
        subtotal: item.subtotal,
        deposit: '-',
      });
    });

    setRoomTotalForm(dataRoomTotalForm);
    setIsModalVisible(false);

    if (reservation) {
      dispatch(
        addReservationDetail({
          payload: {
            client_info_id: reservation.client_info_id,
            reservation_id: reservation.id,
            rooms: roomSelected,
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Add reservation booking successfully!'));

      dispatch(
        getReservation({
          reservation_id: reservation.id,
        }),
      );
    }
  }, [changed]);

  const searchRoomDate = (date: any, key: string) => {
    let stateTemporary = {
      ...roomCondition,
      [key]: date?.format('YYYY-MM-DD') ?? '',
    };

    if (key === 'checkin') {
      stateTemporary = {
        ...stateTemporary,
        checkout: date?.add(1, 'days').format('YYYY-MM-DD') ?? '',
      };
    }

    setRoomCondition(stateTemporary);

    if (stateTemporary.checkin && stateTemporary.checkout && stateTemporary.room_type) {
      dispatch(searchRoom(stateTemporary));
    }
  };

  const searchRoomSelect = (value: string, key: string) => {
    let valueTemporary = value;
    let roomConditionTemporary = { ...roomCondition };

    roomConditionTemporary =
      (key === 'charge_kind' && value === '2') ||
      (key !== 'charge_kind' && roomCondition.charge_kind !== '1')
        ? {
            ...roomConditionTemporary,
            checkout: roomConditionTemporary.checkin,
          }
        : {
            ...roomConditionTemporary,
            checkout: moment(roomConditionTemporary.checkin).add(1, 'days').format('YYYY-MM-DD'),
          };

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...roomConditionTemporary,
      [key]: valueTemporary,
      current_page: 1,
    };

    setRoomCondition(stateTemporary);

    if (
      stateTemporary.checkin &&
      stateTemporary.checkout &&
      stateTemporary.room_type &&
      stateTemporary.charge_kind
    ) {
      dispatch(searchRoom(stateTemporary));
    }
  };

  const convertDataSearchRoom = (charges: any) => {
    const result: any[] = [];

    charges.forEach((item: any) => {
      result.push({
        key: randomKey(5),
        use_date: item.use_date,
        rate_name: item.rate_name,
        adult: '',
        child: '',
        rate_detail: item.rate_detail,
        unit_price: item.price,
        actual_amount: item.price,
        task: '',
        rate_id: item.equipment_charge_detail_id,
      });
    });

    return result;
  };

  const selectedRoomsResultColumns = [
    {
      title: t('reservation.Checkin'),
      dataIndex: 'checkin_date',
      key: 'checkin_date',
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'checkout_date',
      key: 'checkout_date',
    },
    {
      title: t('common.Room Type'),
      dataIndex: 'room_type_text',
      key: 'room_type',
    },
    {
      title: t('common.Rate Name'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Hours'),
      dataIndex: 'hours',
      key: 'hours',
      hidden: roomCondition.charge_kind !== '2',
    },
    {
      title: t('common.Months'),
      dataIndex: 'months',
      key: 'months',
      hidden: roomCondition.charge_kind !== '5',
    },
    {
      title: t('common.Quantity'),
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: t('common.Subtotal'),
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: t('common.Task'),
      dataIndex: 'task',
      key: 'task',
      render: (text: any, record: any, index: number) => {
        return (
          <Button
            onClick={() => {
              const roomSelectedTemporary = [...roomSelected];
              const dataRoomTotalForm = [...roomTotalForm];

              roomSelectedTemporary.splice(index, 1);
              dataRoomTotalForm.splice(
                dataRoomTotalForm.length - roomSelectedTemporary.length + index - 1,
                1,
              );

              setRoomSelected(roomSelectedTemporary);
            }}
            style={{ color: '#F5222D', paddingLeft: 0 }}
            type="link"
          >
            {t('common.Delete')}
          </Button>
        );
      },
    },
  ].filter(item => !item.hidden);

  useEffect(() => {
    dispatch(getRoomType());
  }, []);

  const roomTypeOption = _.keys(roomTypes).map((key: any) => {
    return (
      <Option key={key} value={key}>
        {roomTypes[key]}
      </Option>
    );
  });

  const quantityOption = [];

  for (let index = 0; index < quantityResult; index++) {
    quantityOption.push(
      <Option key={index} value={index + 1}>
        {index + 1}
      </Option>,
    );
  }

  const disabledChekinDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today
    return current < moment().subtract(1, 'day').endOf('day');
  };

  const disabledCheckoutDate: RangePickerProps['disabledDate'] = current => {
    return current < moment(roomCondition.checkin).subtract(1, 'day').endOf('day');
  };

  const handleAddRoom = () => {
    const dataSelectedRoomsResult: any = [...roomSelected];
    const groupRooms: any = _.groupBy(searchRoomResultState, 'rate_name');

    _.values(groupRooms).forEach((element: any) => {
      const reservationDetail = _.sortBy(element, 'date');

      const sum = _.reduce(
        element,
        function (memo: any, number_: any) {
          return memo + parseInt(number_.actual_amount, 10);
        },
        0,
      );

      let hoursTime = 1;
      let monthsTime = 1;

      if (roomCondition.charge_kind === '2') {
        const checkinTime = moment(
          `${roomCondition.checkin} ${roomCondition.checkin_time.format(timeFormat)}`,
        );
        const checkoutTime = moment(
          `${roomCondition.checkout} ${roomCondition.checkout_time.format(timeFormat)}`,
        );

        hoursTime = Math.ceil(moment.duration(checkoutTime.diff(checkinTime)).asHours());

        if (hoursTime <= 0) {
          message.warn(t('message.The checkin time or checkout time is invalid'));

          return;
        }
      }

      if (roomCondition.charge_kind === '5') {
        monthsTime = roomCondition.months;
      }

      dataSelectedRoomsResult.push({
        key: randomKey(5),
        checkin_date: roomCondition.checkin,
        checkout_date: roomCondition.checkout,
        room_type: roomCondition.room_type,
        room_type_text: _.first(reservationDetail).room_type,
        rate_name: _.first(reservationDetail).rate_name,
        quantity,
        subtotal: formatNumber(sum * quantity * monthsTime * hoursTime),
        hours: hoursTime,
        months: monthsTime,
        task: '',
        actual_amount: sum,
        charges: searchRoomResultState,
      });
    });

    setRoomSelected(dataSelectedRoomsResult);
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      destroyOnClose
      okButtonProps={{ style: { backgroundColor: '#1D39C4' }, disabled: roomSelected.length === 0 }}
      okText={t('common.Save')}
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 60, borderRadius: 4 }}
      title={<b>{t('message.Select room and rate')}</b>}
      visible={isModalVisible}
      width={1000}
    >
      <Card bordered={false} size="small" title={t('message.Search room')}>
        <Row>
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>
              {t('reservation.Rate Type.title')}
            </span>
            <Select
              onChange={value => searchRoomSelect(value, 'charge_kind')}
              placeholder={t('reservation.Rate Type.placeholder')}
              style={{ width: '93%' }}
              value={roomCondition.charge_kind}
            >
              <Option value="1">{t('reservation.Rate Type.Once')}</Option>
              <Option value="2">{t('reservation.Rate Type.By Hours')}</Option>
              <Option value="5">{t('reservation.Rate Type.By Months')}</Option>
            </Select>
          </Col>
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>{t('reservation.Checkin')}</span>
            <DatePicker
              disabledDate={disabledChekinDate}
              onChange={date => searchRoomDate(date, 'checkin')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '93%',
              }}
              value={roomCondition.checkin ? moment(roomCondition.checkin) : null}
            />
          </Col>
          {roomCondition.charge_kind.toString() === '5' && (
            <Col span={5}>
              <span style={{ paddingBottom: 5, display: 'inherit' }}>{t('common.Months')}</span>
              <Select
                defaultValue="1"
                disabled={quantityResult === 0}
                onChange={value =>
                  setRoomCondition({
                    ...roomCondition,
                    months: value,
                  })
                }
                style={{ width: '93%' }}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
              </Select>
            </Col>
          )}
          {roomCondition.charge_kind.toString() === '2' && (
            <Col span={5}>
              <span style={{ paddingBottom: 5, display: 'inherit' }}>
                {t('reservation.Checkin Time')}
              </span>
              <TimePicker
                allowClear={false}
                format={timeFormat}
                onChange={time =>
                  setRoomCondition({
                    ...roomCondition,
                    checkin_time: time,
                    checkout_time: time?.clone().add(1, 'hours'),
                  })
                }
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '93%',
                }}
                value={roomCondition.checkin_time}
              />
            </Col>
          )}
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>
              {' '}
              {t('reservation.Checkout')}
            </span>
            <DatePicker
              disabledDate={disabledCheckoutDate}
              onChange={date => searchRoomDate(date, 'checkout')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '93%',
              }}
              value={roomCondition.checkout ? moment(roomCondition.checkout) : null}
            />
          </Col>
          {roomCondition.charge_kind.toString() === '2' && (
            <Col span={4}>
              <span style={{ paddingBottom: 5, display: 'inherit' }}>
                {t('reservation.Checkout Time')}
              </span>
              <TimePicker
                allowClear={false}
                format={timeFormat}
                onChange={time =>
                  setRoomCondition({
                    ...roomCondition,
                    checkout_time: time,
                  })
                }
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '93%',
                }}
                value={roomCondition.checkout_time}
              />
            </Col>
          )}
          <Col
            span={5}
            style={{ marginTop: roomCondition.charge_kind.toString() === '1' ? 0 : 12 }}
          >
            <span style={{ paddingBottom: 5, display: 'inherit' }}>{t('common.Room Type')}</span>
            <Select
              allowClear
              onChange={value => searchRoomSelect(value, 'room_type')}
              placeholder="Select room type"
              style={{ width: '93%' }}
            >
              {roomTypeOption}
            </Select>
          </Col>
          <Col
            span={4}
            style={{ marginTop: roomCondition.charge_kind.toString() === '1' ? 0 : 12 }}
          >
            <span style={{ paddingBottom: 5, display: 'inherit' }}>{t('common.Quantity')}</span>
            <Select
              defaultValue="1"
              disabled={quantityResult === 0}
              onChange={value => setQuantity(value)}
              style={{ width: '100%' }}
            >
              {quantityOption}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ paddingTop: 16 }}>
            <Table
              columns={searchRoomColumns}
              dataSource={convertDataSearchRoom(searchRoomResultState)}
              pagination={false}
              size="small"
              summary={() => {
                return (
                  <Table.Summary fixed>
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={2} index={0}>
                        {t('reservation.Total Amount for each room (VND)')}
                      </Table.Summary.Cell>
                      <Table.Summary.Cell colSpan={5} index={1}>
                        <span style={{ fontSize: 16 }}>{formatNumber(totalAmount)}</span>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <PattonButton
                          disabled={totalAmount === 0}
                          onClick={handleAddRoom}
                          style={{ float: 'right' }}
                        >
                          {' '}
                          <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} />{' '}
                          <span style={{ marginLeft: -5 }}>{t('common.Add')}</span>
                        </PattonButton>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                );
              }}
            />
          </Col>
        </Row>
      </Card>
      <Card
        bordered={false}
        size="small"
        style={{ marginTop: 16 }}
        title={t('message.Selected Rooms Result')}
      >
        <Row>
          <Col span={24}>
            <Table
              columns={selectedRoomsResultColumns}
              dataSource={roomSelected}
              pagination={false}
              scroll={{ y: 120 }}
              size="small"
              style={{ border: 0 }}
            />
          </Col>
        </Row>
      </Card>
    </Modal>
  );
}

export default SelectRoomModal;
