import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

const useColumns = () => {
  const { t } = useTranslation();
  const roomingListColumns = [
    {
      title: t('common.Status'),
      dataIndex: 'status',
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
    },
    {
      title: t('reservation.Room Type.title'),
      dataIndex: 'room_type',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
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
      title: t('reservation.Nights'),
      dataIndex: 'nights',
    },
    {
      title: t('reservation.Adl'),
      dataIndex: 'adl',
    },
    {
      title: t('reservation.Child.title'),
      dataIndex: 'child',
    },
    {
      title: t('reservation.Baby.title'),
      dataIndex: 'baby',
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
      title: t('reservation.Deposit'),
      dataIndex: 'deposit',
    },
  ];

  const selectedRoomsResultColumns = [
    {
      title: 'Checkin',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
    {
      title: 'Task',
      dataIndex: 'task',
      key: 'task',
      render: () => (
        <Button style={{ color: '#F5222D', paddingLeft: 0 }} type="link">
          {t('common.Delete')}
        </Button>
      ),
    },
  ];

  return {
    roomingListColumns,
    selectedRoomsResultColumns,
  };
};

export default useColumns;
