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

import PattonButton from './PattonButton';

function TableSummary() {
  return (
    <Table.Summary fixed>
      <Table.Summary.Row>
        <Table.Summary.Cell colSpan={2} index={0}>
          Total Amount (VND)
        </Table.Summary.Cell>
        <Table.Summary.Cell colSpan={5} index={1}>
          <span style={{ fontSize: 16 }}>4.800.000 </span>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3}>
          <PattonButton style={{ float: 'right' }}>
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
