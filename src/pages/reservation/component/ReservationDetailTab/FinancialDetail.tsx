/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 22/09/2023
Updated Date : 22/09/2023
Main functions : Financial Detail
************************************ */

import React from 'react';
import { Col, Table } from 'antd';
import useColumns from 'pages/reservation/create/useColumns';

const financialDetailDataSample = [
  {
    date: '22/07/2023',
    description: 'Phong Junior Deluxe Double Traveloka',
    gross_revenue: '1,012,500',
    ta_comp: '151,875',
    payment_method: 'VCC',
    amount: '860,625',
    system_fee: '26,417',
  },
  {
    date: '22/07/2023',
    description: 'Phong Junior Deluxe Double Traveloka',
    gross_revenue: '1,012,500',
    ta_comp: '151,875',
    payment_method: 'VCC',
    amount: '860,625',
    system_fee: '26,417',
  },
  {
    date: '22/07/2023',
    description: 'Thue xe',
    gross_revenue: '500,000',
    ta_comp: '0',
    payment_method: 'VNPAY',
    amount: '500,000',
    system_fee: '16,500',
  },
];

function FinancialDetail() {
  const { financialDetailColumns } = useColumns();

  return (
    <Col span={24} style={{ marginTop: 5, marginBottom: 15 }}>
      <Table
        columns={financialDetailColumns}
        dataSource={financialDetailDataSample}
        pagination={false}
        size="small"
        summary={() => {
          return (
            <>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Total Revenue</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>2,525,000</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  {' '}
                  <div style={{ paddingLeft: 20 }}> Total TA Comp. </div>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>303,750</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Total Payment System Fee</div>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>57,234</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Payment System Fee (VCC)</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>52,834</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Payment System Fee (VNPAY)</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>4,400</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Net Revenue</div>{' '}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>1,664,016</div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </Col>
  );
}

export default FinancialDetail;
