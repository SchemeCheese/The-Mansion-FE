import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, message, Modal, Row, Table } from 'antd';
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
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { addLateCheckoutFeeAction, getReservation, getReservationDetail } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

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
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);

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
    if (lateCOFee.length > 0 && parseInt(lateCOFee[0].unit_price, 10) > 0) {
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
    } else {
      setIsModalShowLateFee(false);
      setIsModalShowPaymentDetail(true);
    }
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
          unit_price: branchInfoSelected.addition_cico_fee,
          early_CI_fee: formatNumber(
            branchInfoSelected.addition_cico_fee * Math.round(duration.asHours()),
          ),
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
      setIsFinishModalOpen(true);
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
      <Modal footer={null} onCancel={() => setIsFinishModalOpen(false)} visible={isFinishModalOpen}>
        <Row style={{ marginTop: 15 }}>
          <Col span={4} style={{ textAlign: 'right' }}>
            <svg
              fill="none"
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0C4.92545 0 0 4.92545 0 11C0 17.0746 4.92545 22 11 22C17.0746 22 22 17.0746 22 11C22 4.92545 17.0746 0 11 0ZM11 20.1339C5.9567 20.1339 1.86607 16.0433 1.86607 11C1.86607 5.9567 5.9567 1.86607 11 1.86607C16.0433 1.86607 20.1339 5.9567 20.1339 11C20.1339 16.0433 16.0433 20.1339 11 20.1339Z"
                fill="#52C41A"
              />
            </svg>
            <svg
              fill="none"
              height="8"
              style={{ position: 'relative', top: -7, right: 16 }}
              viewBox="0 0 10 8"
              width="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.59169 0.0957031H8.44013C8.18968 0.0957031 7.95151 0.216015 7.80419 0.422265L3.94437 5.77494L2.19615 3.34905C2.04883 3.14526 1.81312 3.02249 1.56022 3.02249H0.408654C0.249055 3.02249 0.155752 3.20419 0.249055 3.33432L3.30843 7.57718C3.3807 7.67805 3.47598 7.76025 3.58636 7.81695C3.69674 7.87365 3.81905 7.90323 3.94314 7.90323C4.06723 7.90323 4.18954 7.87365 4.29992 7.81695C4.4103 7.76025 4.50558 7.67805 4.57785 7.57718L9.74883 0.407534C9.84459 0.2774 9.75129 0.0957031 9.59169 0.0957031Z"
                fill="#52C41A"
              />
            </svg>
          </Col>
          <Col span={18}>
            <p style={{ fontSize: 16, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.88)' }}>
              {t('message.Checkout Success')}
            </p>

            <p> {t("message.Don't forget to say Thank You to our beloved guest !")}</p>
            <PattonButton
              onClick={() => setIsFinishModalOpen(false)}
              style={{ float: 'right', marginTop: 20 }}
            >
              {t('message.Done')}
            </PattonButton>
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default CheckoutModal;
