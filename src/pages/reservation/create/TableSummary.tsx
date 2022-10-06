/** ***********************************
Module Name : Reservation
Developer Name : HangNT
Created Date : 02/09/2022
Updated Date : 24/09/2022
Main functions : Table Summary Componnent
************************************ */

import React from 'react';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { Table } from 'antd';
import { formatNumber } from 'helpers';
import _ from 'underscore';

import PattonButton from 'components/PattonButton';

interface Props {
  quantity: number;
  roomCondition: any;
  roomSelected: any;
  searchRoomResultState: any;
  setRoomSelected: (data: any) => void;
  totalAmount: number;
}

function TableSummary({
  quantity,
  roomCondition,
  roomSelected,
  searchRoomResultState,
  setRoomSelected,
  totalAmount,
}: Props) {
  const handleClick = () => {
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

      dataSelectedRoomsResult.push({
        checkin_date: roomCondition.checkin,
        checkout_date: roomCondition.checkout,
        room_type: roomCondition.room_type,
        room_type_text: _.first(reservationDetail).room_type,
        rate_name: _.first(reservationDetail).rate_name,
        quantity,
        subtotal: formatNumber(sum * quantity),
        task: '',
        actual_amount: sum,
        charges: searchRoomResultState,
      });
    });

    setRoomSelected(dataSelectedRoomsResult);
  };

  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell colSpan={2} index={0}>
          Total Amount for each room (VND)
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={5} index={1}>
          <span style={{ fontSize: 16 }}>{formatNumber(totalAmount)}</span>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          <PattonButton
            disabled={totalAmount === 0}
            onClick={handleClick}
            style={{ float: 'right' }}
          >
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
