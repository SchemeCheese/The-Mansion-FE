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
import { Button, Card, Col, DatePicker, Input, message, Modal, Row, Select, Table } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { formatNumber, randomKey } from 'helpers';
import moment from 'moment';
import TableSummary from 'pages/reservation/create/TableSummary';
import { selectAddReservationDetail } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { addReservationDetail, getReservation, getRoomType, searchRoom } from 'actions';

import { RootState } from 'types';

const { Option } = Select;

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
      title: 'Date',
      dataIndex: 'use_date',
      key: 'use_date',
    },
    {
      title: 'Rate Name',
      dataIndex: 'rate_name',
      key: 'rate_name',
      render: (text: any, record: any, index: number) => {
        const option: any = searchRoomResultState[index].rates?.map((item: any) => {
          return <Option value={item.equipment_charge_detail_id}>{item.rate_name}</Option>;
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
      title: 'Adl',
      dataIndex: 'adult',
      key: 'adult',
    },
    {
      title: 'Child',
      dataIndex: 'child',
      key: 'child',
    },
    {
      title: 'Rate detail',
      dataIndex: 'rate_detail',
      key: 'rate_detail',
    },
    {
      title: 'Unit price',
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: 'Updated price',
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
      title: 'Task',
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
        status: 'Waitlist',
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
        nights: moment.duration(moment(item.checkout).diff(moment(item.checkin))).asDays(),
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
      message.success('Add reservation booking successfully!');

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

    if (value === undefined) {
      valueTemporary = '';
    }

    const stateTemporary = {
      ...roomCondition,
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
      title: 'Checkin',
      dataIndex: 'checkin_date',
      key: 'checkin_date',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout_date',
      key: 'checkout_date',
    },
    {
      title: 'Room Type',
      dataIndex: 'room_type_text',
      key: 'room_type',
    },
    {
      title: 'Rate Name',
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'Task',
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
  ];

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

  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current < moment().endOf('day');
  };

  const disabledCheckoutDate: RangePickerProps['disabledDate'] = current => {
    return current < moment(roomCondition.checkin).endOf('day');
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      destroyOnClose
      okButtonProps={{ style: { backgroundColor: '#1D39C4' }, disabled: roomSelected.length === 0 }}
      okText="Save"
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 80, borderRadius: 4 }}
      title={<b>Select room and rate</b>}
      visible={isModalVisible}
      width={1000}
    >
      <Card bordered={false} size="small" title="Search room">
        <Row>
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Rate Type</span>
            <Select
              onChange={value => searchRoomSelect(value, 'charge_kind')}
              placeholder="Select rate type"
              style={{ width: '93%' }}
              value={roomCondition.charge_kind}
            >
              <Option value="1">Once</Option>
              <Option value="2">Time</Option>
              <Option value="3">Extend Time</Option>
              <Option value="4">Extend Rate</Option>
              <Option value="5">Monthly</Option>
            </Select>
          </Col>
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Checkin </span>
            <DatePicker
              disabledDate={disabledDate}
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
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}> Checkout</span>
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
          <Col span={5}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Room Type</span>
            <Select
              allowClear
              onChange={value => searchRoomSelect(value, 'room_type')}
              placeholder="Select room type"
              style={{ width: '93%' }}
            >
              {roomTypeOption}
            </Select>
          </Col>
          <Col span={4}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Quantity</span>
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
              style={{ border: 0 }}
              summary={() => {
                return (
                  <TableSummary
                    quantity={quantity}
                    roomCondition={roomCondition}
                    // roomTotalForm={roomTotalForm}
                    roomSelected={roomSelected}
                    searchRoomResultState={searchRoomResultState}
                    // setRoomTotalForm={setRoomTotalForm}
                    setRoomSelected={setRoomSelected}
                    totalAmount={totalAmount}
                  />
                );
              }}
            />
          </Col>
        </Row>
      </Card>
      <Card bordered={false} size="small" style={{ marginTop: 16 }} title="Selected Rooms Result">
        <Row>
          <Col span={24}>
            <Table
              columns={selectedRoomsResultColumns}
              dataSource={roomSelected}
              pagination={false}
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
