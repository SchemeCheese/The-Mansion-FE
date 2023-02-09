import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import moment from 'moment';
import PaymentSummary from 'pages/reservation/component/ReservationDetailTab//PaymentSummary';
import SelectedPayMethodModalFinal from 'pages/reservation/component/ReservationDetailTab/SelectedPayMethodModalFinal';
import {
  selectAddLateCheckoutFeeState,
  selectBranchInfo,
  selectCheckoutState,
  selectGetReservation,
  selectGetReservationDetail,
} from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import { addLateCheckoutFeeAction, getReservation, getReservationDetail } from 'actions';

import MInput from 'components/MInput';

interface DataTypeLate {
  actual_CO_time: string;
  default_CO_time: string;
  early_CI_fee: string;
  id: string;
  late_CO_time: string;
  name: string;
  room_no: string;
  unit_price: string;
}

interface Props {
  isModalSelectedPaymentMethod: boolean;
  isModalShowLateFee: boolean;
  isModalShowPaymentDetail: boolean;
  setIsModalSelectedPaymentMethod: (isModalSelectedPaymentMethod: boolean) => void;
  setIsModalShowLateFee: (isModalShowLateFee: boolean) => void;
  setIsModalShowPaymentDetail: (isModalShowPayment: boolean) => void;
}

function CheckoutModal({
  isModalSelectedPaymentMethod,
  isModalShowLateFee,
  isModalShowPaymentDetail,
  setIsModalSelectedPaymentMethod,
  setIsModalShowLateFee,
  setIsModalShowPaymentDetail,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);

  const [lateCOFee, setLateCOFee]: any[] = useState([]);
  const selectGetReservationData: any = useAppSelector(selectGetReservation);
  const selectAddLateCheckoutFeeData: any = useAppSelector(selectAddLateCheckoutFeeState);
  const branchInfoSelected: any = useAppSelector(selectBranchInfo);
  const selectCheckoutDate: any = useAppSelector(selectCheckoutState);

  const { changed: addLateCheckoutFeeChanged } = useTreeChanges(selectAddLateCheckoutFeeData);
  const { changed: checkoutChanged } = useTreeChanges(selectCheckoutDate);

  const defaultCOTime = moment(branchInfoSelected.normal_time_check_in, 'HH:mm:ss');
  const actualTime: any = useRef(moment());
  const duration = moment.duration(actualTime.current.diff(defaultCOTime));

  const columnsEarly: ColumnsType<DataTypeLate> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('transaction.Guest Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: t('reservation.Default C/O Time'),
      key: 'default_CO_time',
      dataIndex: 'default_CO_time',
    },
    {
      title: t('reservation.Actual C/O Time'),
      key: 'actual_CO_time',
      dataIndex: 'actual_CO_time',
    },
    {
      title: t('reservation.Late C/O Time'),
      key: 'late_CO_time',
      dataIndex: 'late_CO_time',
    },
    {
      title: t('common.Unit Price'),
      key: 'unit_price',
      dataIndex: 'unit_price',
      render: (text: any, record: any, index: number) => {
        return (
          <MInput
            onChange={e => {
              const earlyCheckinFeeTemporary: any = [...lateCOFee];
              const editRecord = {
                ...earlyCheckinFeeTemporary[index],
                unit_price: e.target.value,
                early_CI_fee: formatNumber(
                  earlyCheckinFeeTemporary[index].unit_price * Math.round(duration.asHours()),
                ),
              };

              earlyCheckinFeeTemporary[index] = editRecord;
              setLateCOFee(earlyCheckinFeeTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4, width: 100 }}
            value={lateCOFee[index]?.unit_price}
          />
        );
      },
    },
    {
      title: t('reservation.Late C/O Fee'),
      key: 'early_CI_fee',
      dataIndex: 'early_CI_fee',
      render: (text: any, record: any, index: number) => {
        return formatNumber(lateCOFee[index].unit_price * Math.round(duration.asHours()));
      },
    },
  ];

  const handleAddCheckoutLateFee = () => {
    dispatch(
      addLateCheckoutFeeAction({
        payload: {
          reservation_id: id ?? '',
          reservation_detail: [
            {
              id: reservationDetailInfo.data.id,
              late_checkout_fee: {
                hour_total: lateCOFee[0].late_CO_time,
                sale_price: lateCOFee[0].unit_price,
              },
            },
          ],
        },
      }),
    );
  };

  useEffect(() => {
    if (selectGetReservationData.is_finish && reservationDetailInfo.is_finish) {
      const reservationDetailInfoMore = selectGetReservationData.data?.rooms.find((item: any) => {
        return item.id === reservationDetailInfo.data.id;
      });

      const lateCOFeeData: any = [
        {
          id: 1,
          name: reservationDetailInfoMore.main_guest_name
            ? reservationDetailInfoMore.main_guest_name
            : '-',
          room_no: reservationDetailInfoMore.room_no,
          default_CO_time: defaultCOTime.format('HH:mm:ss'),
          actual_CO_time: actualTime.current.format('HH:mm:ss'),
          late_CO_time: Math.round(duration.asHours()),
          unit_price: 2000000,
          early_CI_fee: formatNumber(2000000 * Math.round(duration.asHours())),
        },
      ].filter((item: any) => {
        return item.late_CO_time > 0;
      });

      setLateCOFee(lateCOFeeData);
    }
  }, [selectGetReservationData, reservationDetailInfo]);

  useEffect(() => {
    if (addLateCheckoutFeeChanged('status', 'SUCCESS')) {
      message.success(t('message.Add late checkout fee successfully!'));

      setIsModalShowLateFee(false);
      setIsModalShowPaymentDetail(true);

      dispatch(
        getReservation({
          reservation_id: id ?? '',
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: id ?? '',
          reservation_detail_id: reservationDetailInfo.data.id,
        }),
      );
    }
  }, [addLateCheckoutFeeChanged]);

  useEffect(() => {
    if (checkoutChanged('status', 'SUCCESS')) {
      message.success(t('message.Checkout successfully!'));

      setIsModalShowLateFee(false);
      setIsModalShowPaymentDetail(false);

      dispatch(
        getReservation({
          reservation_id: id ?? '',
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: id ?? '',
          reservation_detail_id: reservationDetailInfo.data.id,
        }),
      );
    }
  }, [checkoutChanged]);

  return (
    <>
      <Modal
        okButtonProps={{
          style: { backgroundColor: '#1D39C4' },
        }}
        okText={t('common.Continue to checkout')}
        onCancel={() => setIsModalShowLateFee(false)}
        onOk={handleAddCheckoutLateFee}
        title={<b>{t('common.Late Checkout Fee')}</b>}
        visible={isModalShowLateFee}
        width={1000}
      >
        <Table columns={columnsEarly} dataSource={lateCOFee} pagination={false} size="small" />
      </Modal>
      <PaymentSummary
        closeModal={() => setIsModalShowPaymentDetail(false)}
        payment={[]}
        setIsModalOpen={() => {
          setIsModalSelectedPaymentMethod(true);
        }}
        visible={isModalShowPaymentDetail}
      />
      <SelectedPayMethodModalFinal
        setIsModalSelectedPaymentMethod={setIsModalSelectedPaymentMethod}
        visible={isModalSelectedPaymentMethod}
      />
    </>
  );
}

export default CheckoutModal;
