/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 22/09/2023
Updated Date : 22/09/2023
Main functions : Financial Detail
************************************ */

import React from 'react';
import { Col, Table } from 'ui/antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import useColumns from 'pages/reservation/create/useColumns';
import { selectGetReservation } from 'selectors';

import { useAppSelector } from 'modules/hooks';

type FinancialItem = {
  date: string;
  description: string;
  gross_revenue: number;
  payment_method: string;
  payment_system_fee: number;
  ta_comp: number;
  transaction_amount: number;
};

function FinancialDetail() {
  const { financialDetailColumns } = useColumns();
  const { data: reservationInfo } = useAppSelector(selectGetReservation);

  const financialData = reservationInfo.financial_details.map((item: FinancialItem) => {
    return {
      date: moment(item.date).format('DD/MM/YYYY'),
      description: item.description,
      gross_revenue: formatNumber(item.gross_revenue),
      ta_comp: formatNumber(item.ta_comp),
      payment_method: item.payment_method,
      amount: formatNumber(item.transaction_amount),
      system_fee: formatNumber(item.payment_system_fee),
    };
  });

  return (
    <Col span={24} style={{ marginTop: 5, marginBottom: 15 }}>
      <Table
        columns={financialDetailColumns}
        dataSource={financialData}
        pagination={false}
        scroll={{ y: 240 }}
        size="small"
        summary={() => {
          return (
            <Table.Summary fixed>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Total Revenue</div>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>
                    {formatNumber(reservationInfo.financial_details_summary.total_revenue)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  {' '}
                  <div style={{ paddingLeft: 20 }}> Total TA Comp. </div>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>
                    {formatNumber(reservationInfo.financial_details_summary.total_tacomp)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Total Payment System Fee</div>
                </Table.Summary.Cell>

                <Table.Summary.Cell index={1}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>
                    {formatNumber(reservationInfo.financial_details_summary.total_system_fee)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
              {reservationInfo.financial_details_summary.tacomp_details.map((item: any) => (
                <Table.Summary.Row style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
                  <Table.Summary.Cell colSpan={6} index={0}>
                    <div style={{ paddingLeft: 20 }}>
                      Payment System Fee ({item.payment_method})
                    </div>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <div style={{ textAlign: 'right', paddingRight: 20 }}>
                      {formatNumber(item.payment_system_fee)}
                    </div>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              ))}

              <Table.Summary.Row style={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.65)' }}>
                <Table.Summary.Cell colSpan={6} index={0}>
                  <div style={{ paddingLeft: 20 }}>Net Revenue</div>{' '}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <div style={{ textAlign: 'right', paddingRight: 20 }}>
                    {formatNumber(reservationInfo.financial_details_summary.total_net_revenue)}
                  </div>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </Col>
  );
}

export default FinancialDetail;
