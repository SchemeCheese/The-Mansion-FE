import React, { useEffect } from 'react';
// import useColumns from 'pages/reservation/create/useColumns';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, DatePicker, Input, Modal, Row, Select, Table } from 'antd';
import moment from 'moment';
import TableSummary from 'pages/reservation/create/TableSummary';
import _ from 'underscore';

import { getRoomType, searchRoom } from 'actions';

import { RootState } from 'types';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  quantity: number;
  roomCondition: any;
  roomList: any;
  roomSelected: any;
  roomTotalForm: any;
  searchRoomResultState: any;
  setIsModalVisible: (data: boolean) => void;
  setQuantity: (data: any) => void;
  setRoomCondition: (data: any) => void;
  setRoomList: (data: any) => void;
  setRoomSelected: (data: any) => void;
  setRoomTotalForm: (data: any) => void;
  setSearchRoomResultState: (data: any) => void;
  totalAmount: number;
}

function SelectRoomModal({
  isModalVisible,
  quantity,
  roomCondition,
  roomList,
  roomSelected,
  roomTotalForm,
  searchRoomResultState,
  setIsModalVisible,
  setQuantity,
  setRoomCondition,
  setRoomList,
  setRoomSelected,
  setRoomTotalForm,
  setSearchRoomResultState,
  totalAmount,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const { selectedRoomsResultColumns } = useColumns();

  const ratesResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.rates,
  );
  const quantityResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.total,
  );
  const roomTypes: any = useSelector<RootState>(
    ({ getRoomType: getRoomTypeTemporary }) => getRoomTypeTemporary.data,
  );

  console.log('Roooom type', roomTypes);

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
        console.log('record', record, ratesResult);

        const option: any = ratesResult?.map((item: any) => {
          return <Option value={item.rate_id}>{item.rate_name}</Option>;
        });

        return (
          <Select
            defaultValue={text}
            onChange={value => {
              console.log('value', value);
              const xy = _.findWhere(ratesResult, {
                rate_id: value,
              });

              const stateTemporary = [...searchRoomResultState];
              const xxx = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...xxx,
                price: xy.price,
                actual_amount: xy.price,
              };

              setSearchRoomResultState(stateTemporary);
            }}
            placeholder="Select rate"
            style={{ width: '100%' }}
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
        console.log('searchRoomResultState', record, index, text);

        return (
          <Input
            name="actual_amount"
            onChange={event => {
              const stateTemporary = [...searchRoomResultState];
              const xxx = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...xxx,
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
        console.log('Duplicate', record, index, text);

        return (
          <Button
            onClick={event => {
              const stateTemporary = [...searchRoomResultState];
              const duplicateRecord = stateTemporary[index];

              const stateTemporaryWithDuplicate = [
                ...stateTemporary.slice(0, index + 1),
                duplicateRecord,
              ].concat(stateTemporary.slice(index + 1));

              setSearchRoomResultState(stateTemporaryWithDuplicate);
              console.log('AAA', event.target);
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
    const data1 = [...roomList];

    roomSelected.forEach((item: any) => {
      data1.push({
        status: 'Waitlist',
        name: '-',
        room_type: item.room_type,
        room_no: '-',
        ci: item.checkin,
        co: item.checkout,
        nights: moment.duration(moment(item.checkout).diff(moment(item.checkin))).asDays(),
        adl: 2,
        child: '-',
        baby: '-',
        rate: item.rate_name,
        subtotal: item.subtotal,
        deposit: '-',
      });
    });

    setRoomList(data1);

    setIsModalVisible(false);
  };

  const searchRoomDate = (date: any, key: string) => {
    const stateTemporary = {
      ...roomCondition,
      [key]: date?.format('YYYY-MM-DD') ?? '',
    };

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

    if (stateTemporary.checkin && stateTemporary.checkout && stateTemporary.room_type) {
      dispatch(searchRoom(stateTemporary));
    }
  };

  const convertDataSearchRoom = (charges: any) => {
    const result: any[] = [];

    charges.forEach((item: any) => {
      result.push({
        use_date: item.use_date,
        rate_name: item.selected_rate_id,
        adult: '',
        child: '',
        rate_detail: item.rate_detail,
        unit_price: item.price,
        actual_amount: item.price,
        task: '',
      });
    });

    return result;
  };

  const selectedRoomsResultColumns = [
    {
      title: 'Checkin',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Room Type',
      dataIndex: 'room_type',
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
        console.log('AAAAA', text, record, index);

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
              setRoomTotalForm(dataRoomTotalForm);
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
    console.log('itemmm', key);

    return <Option value={key}>{roomTypes[key]}</Option>;
  });

  const quantityOption = [];

  for (let index = 0; index < quantityResult; index++) {
    quantityOption.push(<Option value={index + 1}>{index + 1}</Option>);
  }

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
          <Col span={6}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Checkin </span>
            <DatePicker
              onChange={date => searchRoomDate(date, 'checkin')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '90%',
              }}
            />
          </Col>
          <Col span={6}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}> Checkout</span>
            <DatePicker
              onChange={date => searchRoomDate(date, 'checkout')}
              style={{
                height: 32,
                borderRadius: 4,
                marginRight: 11,
                width: '90%',
              }}
            />
          </Col>
          <Col span={6}>
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
          <Col span={6}>
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
                    roomSelected={roomSelected}
                    roomTotalForm={roomTotalForm}
                    searchRoomResultState={searchRoomResultState}
                    setRoomSelected={setRoomSelected}
                    setRoomTotalForm={setRoomTotalForm}
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
