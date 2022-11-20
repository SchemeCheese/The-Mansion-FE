/** ***********************************
Module Name : Reservation
Developer Name : KienNT
Created Date : 24/08/2022
Updated Date : 28/08/2022
Main functions : Rate Tab
************************************ */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, message, Row, Table } from 'antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectUpdateRate } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import { getReservation, getReservationDetail, updateRate } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

import { RootState } from 'types';

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function Rate({ reservationDetailId, reservationId }: Props) {
  const [ratesState, setRatesState] = useState<any>([]);
  const dispatch = useDispatch();
  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );

  useEffect(() => {
    setRatesState(reservationDetailInfo.charges);
  }, [reservationDetailInfo.charges]);

  const data = ratesState.map((item: any, index: number) => {
    return {
      key: index,
      date: moment(item.use_date).format('DD/MM/YYYY'),
      room_type: item.room_type_text,
      rate_name: item.rate_name,
      rate_detail: item.rate_detail,
      unit_price: formatNumber(item.unit_price),
      actual_amount: item.actual_amount,
    };
  });

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
      dataIndex: 'actual_amount',
      key: 'actual_amount',
      render: (text: string, record: any, index: number) => {
        return (
          <MInput
            name="actual_amount"
            onChange={event => {
              const stateTemporary: any = [...ratesState];
              const currentItem = { ...stateTemporary[index] };

              stateTemporary[index] = {
                ...currentItem,
                actual_amount: event.target.value,
              };

              setRatesState(stateTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4, width: 100 }}
            value={ratesState[index]?.actual_amount}
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
          <button
            onClick={() => {
              const stateTemporary = [...ratesState];
              const duplicateRecord = stateTemporary[index];

              setRatesState(
                ratesState.map((item: any) => {
                  return {
                    ...item,
                    actual_amount: duplicateRecord.actual_amount,
                  };
                }),
              );
            }}
            style={{ color: colors.pattron }}
            type="button"
          >
            Duplicate
          </button>
        );
      },
    },
  ];

  const updateRateData = useAppSelector(selectUpdateRate);
  const { changed } = useTreeChanges(updateRateData);

  const handleUpdateRate = () => {
    dispatch(
      updateRate({
        payload: {
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
          charges: ratesState,
        },
      }),
    );
  };

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success('Update rate successfully!');

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );
      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changed]);

  return (
    <Row justify="end" style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col span={24}>
        <PattonButton
          onClick={() => handleUpdateRate()}
          style={{ float: 'right', marginRight: 20 }}
        >
          Update
        </PattonButton>
      </Col>
      <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
        <Table columns={columns} dataSource={data} pagination={false} size="small" />
      </Col>
    </Row>
  );
}

export default Rate;
