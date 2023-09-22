/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : useColumns hook
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge, Button } from 'antd';

const useColumns = (callback?: any) => {
  const { t } = useTranslation();
  const roomingListColumns = [
    {
      title: t('common.Status'),
      dataIndex: 'status',
      render: (text: string, record: any) => {
        if (text?.toLowerCase() === 'canceled') {
          return (
            <span
              aria-hidden="true"
              onClick={() => {
                callback?.setCancelCurrentItem(record);
                callback?.setIsCancelBookingModalVisible(true);
              }}
            >
              <Badge count={text} />
            </span>
          );
        }

        return <span>{text}</span>;
      },
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
    },
    {
      title: t('reservation.Room Type.title'),
      dataIndex: 'room_type_text',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Room No')}</div>;
      },
      dataIndex: 'room_no',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: t('reservation.C/I'),
      dataIndex: 'ci',
    },
    {
      title: t('reservation.C/O'),
      dataIndex: 'co',
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Nights')}</div>;
      },
      dataIndex: 'nights',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Adl')}</div>;
      },
      dataIndex: 'adl',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Child.title')}</div>;
      },
      dataIndex: 'child',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Baby.title')}</div>;
      },
      dataIndex: 'baby',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: t('reservation.Rate'),
      dataIndex: 'rate',
    },
    {
      title: t('reservation.Subtotal'),
      dataIndex: 'subtotal',
      render: (text: string) => <div style={{ textAlign: 'right', paddingRight: 20 }}>{text}</div>,
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}>{t('reservation.Deposit')}</div>;
      },
      dataIndex: 'deposit',
      render: (text: string) => <div style={{ textAlign: 'right', paddingRight: 20 }}>{text}</div>,
    },
  ];

  const financialDetailColumns = [
    {
      title: () => {
        return <div style={{ textAlign: 'left', paddingLeft: 40 }}> {t('common.Date')}</div>;
      },
      dataIndex: 'date',
      width: 100,
      render: (text: string) => <div style={{ textAlign: 'center', paddingLeft: 40 }}>{text}</div>,
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
      width: 150,
    },
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}> {t('reservation.Gross Revenue')}</div>;
      },
      dataIndex: 'gross_revenue',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center', paddingRight: 20 }}> {t('reservation.TA Comp.')}</div>
        );
      },
      dataIndex: 'ta_comp',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },

    {
      title: t('reservation.Payment Method.title'),
      dataIndex: 'payment_method',
    },
    {
      title: () => {
        return <div style={{}}> {t('reservation.Transaction Amount')}</div>;
      },
      dataIndex: 'amount',
      render: (text: string) => <div style={{ textAlign: 'center' }}>{text}</div>,
    },
    {
      title: t('reservation.Payment System Fee'),
      dataIndex: 'system_fee',
      with: 50,
      render: (text: string) => <div style={{ textAlign: 'right', paddingRight: 80 }}>{text}</div>,
    },
  ];

  // const selectedRoomsResultColumns = [
  //   {
  //     title: 'Checkin',
  //     dataIndex: 'checkin',
  //     key: 'checkin',
  //   },
  //   {
  //     title: 'Checkout',
  //     dataIndex: 'checkout',
  //     key: 'checkout',
  //   },
  //   {
  //     title: 'Room Type',
  //     dataIndex: 'room_type',
  //     key: 'room_type',
  //   },
  //   {
  //     title: 'Rate Name',
  //     dataIndex: 'rate_name',
  //     key: 'rate_name',
  //   },
  //   {
  //     title: 'Quantity',
  //     dataIndex: 'quantity',
  //     key: 'quantity',
  //   },
  //   {
  //     title: 'Subtotal',
  //     dataIndex: 'subtotal',
  //     key: 'subtotal',
  //   },
  //   {
  //     title: 'Task',
  //     dataIndex: 'task',
  //     key: 'task',
  //     render: () => (
  //       <Button style={{ color: '#F5222D', paddingLeft: 0 }} type="link">
  //         {t('common.Delete')}
  //       </Button>
  //     ),
  //   },
  // ];

  return {
    roomingListColumns,
    financialDetailColumns,
    // selectedRoomsResultColumns,
  };
};

export default useColumns;
