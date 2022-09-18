import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, DatePicker, Input, Modal, Row, Select, Table } from 'antd';
import TableSummary from 'pages/reservation/create/TableSummary';
import useColumns from 'pages/reservation/create/useColumns';
import _ from 'underscore';

import { searchRoom } from 'actions';

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
  const dispatch = useDispatch();
  const { selectedRoomsResultColumns } = useColumns();

  const ratesResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.rates,
  );
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
      render: () => (
        <Button style={{ color: '#1D39C4', paddingLeft: 0 }} type="link">
          Duplicate
        </Button>
      ),
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
        nights: 1,
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

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      destroyOnClose
      okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
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
              <Option value="1">Room 1</Option>
              <Option value="2">Room 2</Option>
              <Option value="3">Room 3</Option>
            </Select>
          </Col>
          <Col span={6}>
            <span style={{ paddingBottom: 5, display: 'inherit' }}>Quantity</span>
            <Select
              allowClear
              onChange={value => setQuantity(value)}
              placeholder="Select quantity"
              style={{ width: '100%' }}
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
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
