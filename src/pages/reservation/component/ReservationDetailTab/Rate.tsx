import { notify } from 'ui/notification';
/** ***********************************
Module Name : Reservation
Developer Name : KienNT
Created Date : 24/08/2022
Updated Date : 28/08/2022
Main functions : Rate Tab
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Table } from 'ui/antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectGetReservation, selectUpdateRate, selectUser } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';
import { colors } from 'modules/theme';

import { getReservation, getReservationDetail, updateRate } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';
import detailStyles from 'pages/reservation/detail/reservation-detail.module.css';

import { RootState } from 'types';

interface Props {
  reservationDetailId: string;
  reservationId: string;
}

function Rate({ reservationDetailId, reservationId }: Props) {
  const { t } = useTranslation();

  const [ratesState, setRatesState] = useState<any>([]);
  const dispatch = useDispatch();
  const reservationData = useAppSelector(selectGetReservation).data;
  const reservationDetailInfo: any = useSelector<RootState>(
    ({ getReservationDetail: getReservationDetailTemporary }) => getReservationDetailTemporary.data,
  );
  const user = useAppSelector(selectUser);
  const chargesSummary = reservationDetailInfo.charges_summary;

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
      base_price: formatNumber(item.base_price),
      update_price_with_tax: formatNumber(item.update_price_with_tax),
      updated_price_without_tax: formatNumber(item.updated_price_without_tax),
      tax_toal: formatNumber(item.tax_toal),
      ta_comp_room_fee: formatNumber(item.ta_comp_room_fee),
      ta_comp_tax: formatNumber(item.ta_comp_tax),
      gross_price: formatNumber(item.gross_price),
    };
  });

  const columns = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('common.Room Type'),
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: t('common.Rate Name'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Unit Price (Tax & SF Incl.)'),
      dataIndex: 'unit_price',
      key: 'unit_price',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Base Price'),
      dataIndex: 'base_price',
      key: 'base_price',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Updated Price (Tax Excl.)'),
      dataIndex: 'updated_price_without_tax',
      key: 'updated_price_without_tax',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Tax'),
      dataIndex: 'tax_toal',
      key: 'tax_toal',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Updated Price (Tax Incl.)'),
      dataIndex: 'update_price_with_tax',
      key: 'update_price_with_tax',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.TA Comp. On Room Fee'),
      dataIndex: 'ta_comp_room_fee',
      key: 'ta_comp_room_fee',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.TA Comp. On Tax'),
      dataIndex: 'ta_comp_tax',
      key: 'ta_comp_tax',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Gross Unit Price'),
      dataIndex: 'gross_price',
      key: 'gross_price',
      hidden: !reservationData.external_reservation_number,
    },
    {
      title: t('common.Rate Detail'),
      dataIndex: 'rate_detail',
      key: 'rate_detail',
    },
    {
      title: t('common.Unit Price'),
      dataIndex: 'unit_price',
      key: 'unit_price',
      hidden: reservationData.external_reservation_number,
    },
    {
      title: t('common.Update Price'),
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
      title: t('common.Task'),
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
            {t('common.Duplicate')}
          </button>
        );
      },
    },
  ].filter(item => !item.hidden);

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
      notify.success(t('message.Update rate successfully!'));

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
    <Row className={detailStyles.ratePane} justify="end">
      {user.permission.reservation.edit && (
        <Col className={detailStyles.rateHeader} span={24}>
          <PattonButton
            className={detailStyles.rateUpdateAction}
            onClick={() => handleUpdateRate()}
          >
            {t('common.Update')}
          </PattonButton>
        </Col>
      )}
      <Col className={detailStyles.rateTableCol} span={24}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
          summary={() =>
            reservationData.external_reservation_number && (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>{t('common.Subtotal')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2}>
                    {formatNumber(chargesSummary.subtotal)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>{t('common.Total TA Comp.')}</Table.Summary.Cell>
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2}>
                    {formatNumber(chargesSummary.total_ta_comp)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <b>{t('common.Net Amount')}</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2} />
                  <Table.Summary.Cell index={2}>
                    {formatNumber(chargesSummary.net_income)}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} />
                </Table.Summary.Row>
              </Table.Summary>
            )
          }
        />
      </Col>
    </Row>
  );
}

export default Rate;
