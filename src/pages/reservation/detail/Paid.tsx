/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Paid Component
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber, randomKey } from 'helpers';
import PayDetailModal from 'pages/reservation/modal/TransactionModal/PayDetailModal';

interface DataType {
  balance: string;
  date: string;
  hidden?: boolean;
  paid: string;
  payment_method: string;
  total: string;
}

interface Props {
  items: Array<any>;
  type?: string;
}

function Paid({ items, type }: Props) {
  const { t } = useTranslation();
  const [isShowModal, setIsShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const columns: any = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
      key: 'date',
      hidden: false,
    },
    {
      title: t('common.Payment Method'),
      dataIndex: 'payment_method',
      key: 'payment_method',
      hidden: false,
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      hidden: false,
    },
    {
      title: t('common.Paid (VND)'),
      key: 'paid',
      dataIndex: 'paid',
      align: 'right',
      hidden: type === 'monthly-invoice',
    },
    {
      title: t('common.Balance'),
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (text: any) => (
        <span style={{ color: text === '-' ? '#000000' : '#F5222D' }}>{text}</span>
      ),
      hidden: false,
    },
  ].filter(item => !item.hidden);

  const data = items.map((item: any) => {
    return {
      ...item,
      key: randomKey(5),
      date: item.date,
      payment_method: item.payment_method,
      total: formatNumber(item.total),
      total_amount: item.total,
      paid: formatNumber(item.paid),
      balance: item.balance > 0 ? formatNumber(item.balance) : '-',
    };
  });

  return (
    <>
      <PayDetailModal payment={currentItem} setIsModalOpen={setIsShowModal} visible={isShowModal} />
      <Table
        columns={columns}
        dataSource={data}
        onRow={record => {
          return {
            onClick: () => {
              setCurrentItem(record);
              setIsShowModal(true);
            }, // click row
          };
        }}
        pagination={false}
        size="small"
      />
    </>
  );
}

export default Paid;
