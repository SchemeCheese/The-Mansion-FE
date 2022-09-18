/** ***********************************
Module Name : Reservation
Developer Name : HangNT
Created Date : 02/09/2022
Updated Date : 04/09/2022
Main functions : Table Summary Componnent
************************************ */

import React from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Table } from 'antd';
import _ from 'underscore';

import PattonButton from 'components/PattonButton';

interface Props {
  quantity: number;
  roomTotalForm: any;
  searchRoomResultState: any;
  setRoomSelected: (data: any) => void;
  setRoomTotalForm: (data: any) => void;
  totalAmount: number;
}

function TableSummary({
  quantity,
  roomTotalForm,
  searchRoomResultState,
  setRoomSelected,
  setRoomTotalForm,
  totalAmount,
}: Props) {
  const handleClick = () => {
    const dataSelectedRoomsResult: any[] = [];
    const dataRoomTotalForm = [...roomTotalForm];
    const groupRooms: any = _.groupBy(searchRoomResultState, 'rate_name');

    _.values(groupRooms).forEach((element: any) => {
      const x = _.sortBy(element, 'date');

      const sum = _.reduce(
        element,
        function (memo: any, number_: any) {
          return memo + parseInt(number_.actual_amount, 10);
        },
        0,
      );

      dataSelectedRoomsResult.push({
        checkin: _.first(x).use_date,
        checkout: _.last(x).use_date,
        room_type: _.first(x).room_type,
        rate_name: _.first(x).rate_name,
        quantity,
        subtotal: sum * quantity,
        task: '',
      });

      dataRoomTotalForm.push({
        room_type: 2,
        checkin_date: _.first(x).use_date,
        checkout_date: _.last(x).use_date,
        actual_amount: sum * quantity,
        charges: searchRoomResultState,
      });
    });

    setRoomSelected(dataSelectedRoomsResult);
    setRoomTotalForm(dataRoomTotalForm);
  };

  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell colSpan={2} index={0}>
          Total Amount (VND)
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={5} index={1}>
          <span style={{ fontSize: 16 }}>{totalAmount} </span>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          <PattonButton onClick={handleClick} style={{ float: 'right' }}>
            {' '}
            <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} />{' '}
            <span style={{ marginLeft: -5 }}>Add</span>
          </PattonButton>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    </Table.Summary>
  );
}

export default TableSummary;
