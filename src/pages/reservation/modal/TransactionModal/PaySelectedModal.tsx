/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 21/11/2022
Main functions : Transaction AddDiscount
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { formatNumber } from 'helpers';
import { selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

interface Props {
  discountAmount: any;
  isSelectAll: boolean;
  paySelectedRowKeys: any;
  selectedRows: any;
  setDiscountAmount: (value: any) => void;
  setIsModalOpen: (visible: boolean) => void;
  setIsModalOpenSelectedPaymentMethod: (visible: boolean) => void;
  setPaySelectedRowKeys: (valye: any) => void;
  setPaySelectedRows: (value: any) => void;
  totalAmount: number;
  visible: boolean;
}

interface DataTypePaySelected {
  amount: number;
  date: string;
  description: string;
  total: string;
  unit_price: string;
}

function PaySelectedModal({
  discountAmount,
  isSelectAll,
  paySelectedRowKeys,
  selectedRows,
  setDiscountAmount,
  setIsModalOpen,
  setIsModalOpenSelectedPaymentMethod,
  setPaySelectedRowKeys,
  setPaySelectedRows,
  totalAmount,
  visible,
}: Props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const reservationDetailData = useAppSelector(selectGetReservationDetail);
  const [discountType, setDiscountType] = useState('amount');
  const [discount, setDiscount] = useState('');

  const columns: ColumnsType<DataTypePaySelected> = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
    },
    {
      title: t('common.Unit price'),
      dataIndex: 'unit_price',
      align: 'right',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
    },
    {
      title: t('common.Total'),
      dataIndex: 'total',
      align: 'right',
    },
  ];

  const rowSelection = {
    selectedRowKeys: paySelectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], newSelectedRows: any) => {
      setPaySelectedRowKeys(newSelectedRowKeys);
      setPaySelectedRows(newSelectedRows);
    },
  };

  const handleChangePaySelected = (value: string) => {
    setDiscountType(value);

    if (value === 'percent') {
      setDiscountAmount(0);
      setDiscount('');
    } else {
      setDiscountAmount(0);
      setDiscount('');
    }
  };

  const handleSelectPaymentMethod = () => {
    setIsModalOpenSelectedPaymentMethod(true);
  };

  // useEffect(() => {
  //   if (reservationDetailData.data.amount_info?.discount_percent) {
  //     setDiscountAmount(
  //       (totalAmount * reservationDetailData.data.amount_info.discount_percent) / 100,
  //     );
  //   }
  // }, [totalAmount]);

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('paySelected.Select Payment Method')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleSelectPaymentMethod}
      title={<b>{t('paySelected.Pay Selected')}</b>}
      visible={visible}
      width={850}
    >
      <Form colon={false} layout="horizontal">
        <Table
          columns={columns}
          dataSource={selectedRows}
          pagination={false}
          rowSelection={{
            ...rowSelection,
          }}
          size="small"
        />
        <Row style={{ paddingTop: 30 }}>
          <Col span={14} />
          <Col span={6}>
            <Form.Item label={t('common.Discount')}>
              <Select
                defaultValue="amount"
                onChange={handleChangePaySelected}
                style={{ width: '95%' }}
              >
                <Option value="amount">Amount</Option>
                <Option value="percent">Percent</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Input
              onChange={event => {
                if (discountType === 'percent') {
                  setDiscountAmount((parseInt(event.target.value, 10) / 100) * totalAmount);
                  setDiscount(event.target.value);
                } else {
                  setDiscountAmount(event.target.value);
                  setDiscount(event.target.value);
                }
              }}
              placeholder="0"
              style={{ width: 120, height: 32, borderRadius: 2 }}
              value={discount}
            />
          </Col>
        </Row>
        <Row style={{ paddingRight: 10 }}>
          <Col span={16} />
          <Col span={8} style={{ marginBottom: 17 }}>
            <span>{t('common.Total Amount (VND)')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>{formatNumber(totalAmount)}</span>
          </Col>
        </Row>
        <Row style={{ paddingRight: 10 }}>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Sub Total')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>
              {discountAmount
                ? formatNumber(totalAmount - parseInt(discountAmount, 10))
                : formatNumber(totalAmount)}
            </span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default PaySelectedModal;
