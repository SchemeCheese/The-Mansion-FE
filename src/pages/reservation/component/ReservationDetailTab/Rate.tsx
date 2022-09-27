/** ***********************************
Module Name : Reservation
Developer Name : KienNT
Created Date : 24/08/2022
Updated Date : 28/08/2022
Main functions : Rate Tab
************************************ */

import React from 'react';
import { Col, Input, Row, Table } from 'antd';
import { formatNumber } from 'helpers';

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
    render: (text: string) => {
      return <Input style={{ width: 100 }} value={text} />;
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

interface Props {
  rates: any;
}

function Rate({ rates }: Props) {
  const data = rates.map((item: any) => {
    return {
      date: item.use_date,
      room_type: item.room_type_text,
      rate_name: item.rate_name,
      rate_detail: item.rate_detail,
      unit_price: formatNumber(item.actual_amount),
      update_price: item.actual_amount,
      task: 'aa',
    };
  });

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
