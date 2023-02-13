/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Select Pay Method Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Modal, Row } from 'antd';
import { formatNumber } from 'helpers';
import PaymentMethod from 'pages/reservation/modal/TransactionModal/PaymentMethod';
import { selectGetReservationDetail } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { checkoutAction } from 'actions';

interface Props {
  setIsModalSelectedPaymentMethod: (visible: boolean) => void;
  visible: boolean;
}

function SelectedPayMethodModalFinal({ setIsModalSelectedPaymentMethod, visible }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { id } = useParams();

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const totalAmountAfterDiscount = reservationDetailInfo?.data.amount_info?.grand_total;
  const totalAmount = reservationDetailInfo?.data.amount_info?.grand_total;
  const exchangeRates = reservationDetailInfo.data.exchange_rates;
  const { amount_info: amountInfo, paid, transactions } = reservationDetailInfo.data;

  const [paidAmount, setPaidAmount] = useState(totalAmountAfterDiscount);

  const saleDetailUnPaidId: any = [];

  if (transactions) {
    Object.keys(transactions).forEach((key: any) => {
      transactions[key].items.forEach((item: any) => {
        saleDetailUnPaidId.push(item.sale_detail_id);
      });
    });
  }

  useEffect(() => {
    setPaidAmount(totalAmountAfterDiscount);

    form.setFieldsValue({
      payment_methods: [
        {
          amount_in_vnd: formatNumber(totalAmountAfterDiscount),
          currency_conversion_id: 2,
          payment_amount: totalAmountAfterDiscount,
          payment_method: '1',
        },
      ],
    });
  }, [totalAmountAfterDiscount]);

  const handleSubmitPayment = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        const paymentMethods = values.payment_methods.map((item: any) => {
          const rate = _.find(exchangeRates, r => {
            return r.id === item.currency_conversion_id;
          });

          return {
            ...item,
            payment_exchange_rate: rate.exchange_rate,
          };
        });

        dispatch(
          checkoutAction({
            payload: {
              reservation_detail_id: reservationDetailInfo?.reservation_detail_id,
              sales_info_id: reservationDetailInfo.data.sales_info_id,
              sales_detail_id: saleDetailUnPaidId,
              payment_methods: paymentMethods,
              reservation_id: id ?? '',
              paid: {
                total_amount: amountInfo.grand_total,
                discount_amount: amountInfo.discount,
                balance_amount: 0,
              },
            },
          }),
        );
        setIsModalSelectedPaymentMethod(false);
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
  };

  const computePaidAmount = () => {
    const formValues = form.getFieldsValue();
    const paidAmountSum = _.reduce(
      formValues.payment_methods,
      function (memo: any, number_: any) {
        const rate = _.find(exchangeRates, r => {
          return r.id === number_.currency_conversion_id;
        });

        if (number_.payment_amount) {
          return memo + parseInt(number_.payment_amount, 10) * rate.exchange_rate;
        }

        return memo;
      },
      0,
    );

    setPaidAmount(paidAmountSum);
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4, width: '111px' } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4, width: '111px' } }}
      okText={t('common.Pay')}
      onCancel={() => setIsModalSelectedPaymentMethod(false)}
      onOk={handleSubmitPayment}
      title={<b>{t('payDetail.Select Payment Method')}</b>}
      visible={visible}
      width={850}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        name="basic"
        wrapperCol={{
          span: 23,
        }}
      >
        <Row>
          <Col span={8} style={{ marginBottom: 10 }}>
            <span style={{ lineHeight: '31px' }}>{t('common.Total Amount (VND)')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>
              {formatNumber(totalAmountAfterDiscount)}
            </span>
          </Col>
          <Col span={7} />
          <Col span={9} style={{ marginBottom: 10 }}>
            <span style={{ lineHeight: '31px' }}>{t('common.Total amount to pay')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>{formatNumber(paidAmount)}</span>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={8} style={{ marginBottom: 10, marginTop: 15 }} />
          <Col span={7} />
          <Col span={9}>
            <span style={{ lineHeight: '31px' }}>{t('common.Balance')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>
              {formatNumber(totalAmount - paidAmount)}
            </span>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Form.List name="payment_methods">
              {(fields, { add }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <React.Fragment key={key}>
                      <PaymentMethod
                        computePaidAmount={computePaidAmount}
                        form={form}
                        name={name}
                        restField={restField}
                      />
                    </React.Fragment>
                  ))}
                  <Form.Item>
                    <Button
                      key="button"
                      onClick={() => add()}
                      style={{
                        borderRadius: 4,
                        border: '1px dashed #1D39C4',
                        color: '#1D39C4',
                      }}
                    >
                      {t('selectedPayMethod.Add new amount')}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default SelectedPayMethodModalFinal;
