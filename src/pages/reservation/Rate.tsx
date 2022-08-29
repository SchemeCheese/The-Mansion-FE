import React from 'react';
import { Col, Input, Row, Table } from 'antd';

import { colors } from 'modules/theme';

import PattonButton from 'components/PattonButton';

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
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
    title: 'Rate Detail',
    dataIndex: 'rate_detail',
    key: 'rate_detail',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unit_price',
    key: 'unit_price',
  },
  {
    title: 'Update Price',
    dataIndex: 'update_price',
    key: 'update_price',
    render: () => {
      return <Input style={{ width: 100 }} />;
    },
  },
  {
    title: 'Task',
    dataIndex: 'task',
    key: 'task',
    render: () => {
      return (
        <button style={{ color: colors.pattron }} type="button">
          Duplicate
        </button>
      );
    },
  },
];

const data: object[] = [];

for (let index = 0; index < 5; index++) {
  data.push({
    date: '2022-01-02',
    room_type: 'Premium Alex',
    rate_name: 'AA',
    rate_detail: 'BB',
    unit_price: 'VND',
    update_price: 'a',
    task: 'aa',
  });
}

function Rate() {
  return (
    <Row justify="end" style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col span={24}>
        <PattonButton style={{ float: 'right', marginRight: 20 }}>Update</PattonButton>
      </Col>
      <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
        <Table columns={columns} dataSource={data} pagination={false} size="small" />
      </Col>
    </Row>
  );
}

export default Rate;
