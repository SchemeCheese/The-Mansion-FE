import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface DataType {
  balance: string;
  date: string;
  paid: string;
  payment_method: string;
  total: string;
}

function Paid() {
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('common.Payment Method'),
      dataIndex: 'payment_method',
      key: 'payment_method',
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      key: 'total',
      align: 'right',
    },
    {
      title: t('common.Paid (VND)'),
      key: 'paid',
      dataIndex: 'paid',
      align: 'right',
    },
    {
      title: t('common.Balance'),
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (text: any) => (
        <span style={{ color: text === '-' ? '#000000' : '#F5222D' }}>{text}</span>
      ),
    },
  ];

  const data = [
    {
      date: '28/07/2020',
      payment_method: 'CS, CC',
      total: '40.000',
      paid: '40.000',
      balance: '-',
    },
    {
      date: '28/07/2020',
      payment_method: 'TF, CC',
      total: '40.000',
      paid: '200.000',
      balance: '200.000',
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} size="small" />;
}

export default Paid;
