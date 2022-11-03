import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'antd';
import { formatNumber } from 'helpers';
import { selectGetReservationDetail } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { createPaymentAction } from 'actions';

import PaymentMethod from './PaymentMethod';

interface Props {
  discountAmount: string;
  reservationDetailId: string;
  selectedRowKeys: any;
  setIsModalOpenPaySelected: (visible: boolean) => void;
  setIsModalOpenSelectedPaymentMethod: (visible: boolean) => void;
  totalAmount: any;
  visible: boolean;
}

function SelectedPayMethodModal({
  discountAmount,
  reservationDetailId,
  selectedRowKeys,
  setIsModalOpenPaySelected,
  setIsModalOpenSelectedPaymentMethod,
  totalAmount,
  visible,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [paidAmount, setPaidAmount] = useState(0);

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const exchangeRates = reservationDetailInfo.data.exchange_rates;

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
          createPaymentAction({
            payload: {
              reservation_detail_id: reservationDetailId,
              sales_info_id: reservationDetailInfo.data.sales_info_id,
              sales_detail_id: selectedRowKeys,
              payment_methods: paymentMethods,
              discount_amount: discountAmount ? parseInt(discountAmount, 10) : 0,
            },
          }),
        );

        setIsModalOpenSelectedPaymentMethod(false);
        setIsModalOpenPaySelected(false);
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

        return memo + parseInt(number_.payment_amount, 10) * rate.exchange_rate;
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
      onCancel={() => setIsModalOpenSelectedPaymentMethod(false)}
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
            <span style={{ lineHeight: '31px' }}>{t('common.Total Amount')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>
              {discountAmount
                ? formatNumber(totalAmount - parseInt(discountAmount, 10))
                : formatNumber(totalAmount)}
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
              {discountAmount
                ? formatNumber(totalAmount - parseInt(discountAmount, 10) - paidAmount)
                : formatNumber(totalAmount - paidAmount)}
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
                        form={form}
                        name={name}
                        restField={restField}
                        setPaidAmount={computePaidAmount}
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

export default SelectedPayMethodModal;
