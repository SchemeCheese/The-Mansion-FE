/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Payment Method Modal
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select } from 'antd';
import { formatNumber } from 'helpers';
import { selectGetReservationDetail } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

const { Option } = Select;

interface Props {
  computePaidAmount: any;
  form: any;
  name: any;
  restField: any;
}

function PaymentMethod({ computePaidAmount, form, name, restField }: Props) {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState('1');
  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const exchangeRates = reservationDetailInfo.data.exchange_rates;
  const creditcardTypes = reservationDetailInfo.data.creditcard_types;
  const { employees } = reservationDetailInfo.data;

  const onChangeAmountToPay = (value: any, key: any) => {
    const fields = form.getFieldsValue();

    const { payment_methods: paymentMethodTemporary } = fields;
    const currencyId = paymentMethodTemporary[key].currency_conversion_id;

    const rate = _.find(exchangeRates, item => {
      return item.id === currencyId;
    });

    Object.assign(paymentMethodTemporary[key], {
      payment_amount: value,
      amount_in_vnd: formatNumber(value * rate.exchange_rate),
    });
    form.setFieldsValue({ paymentMethodTmp: paymentMethodTemporary });

    computePaidAmount();
  };

  const onChangeCurrency = (value: any, key: any) => {
    const fields = form.getFieldsValue();
    const { payment_methods: paymentMethodTemporary } = fields;

    const rate = _.find(exchangeRates, item => {
      return item.id === value;
    });

    Object.assign(paymentMethodTemporary[key], {
      amount_in_vnd: formatNumber(paymentMethodTemporary[key].payment_amount * rate.exchange_rate),
    });
    form.setFieldsValue({ paymentMethodTmp: paymentMethodTemporary });

    computePaidAmount();
  };

  const getRate = (key: any) => {
    const fields = form.getFieldsValue();
    const { payment_methods: paymentMethodTemporary } = fields;

    if (!paymentMethodTemporary) {
      return 1;
    }

    const currencyId = paymentMethodTemporary[key]?.currency_conversion_id ?? 2;

    const rate = _.find(exchangeRates, item => {
      return item.id === currencyId;
    });

    return rate?.exchange_rate;
  };

  return (
    <>
      <Row>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue="0"
            label={
              <label htmlFor="amount-to-pay" style={{ fontWeight: 'bold' }}>
                {t('selectedPayMethod.Amount to pay.title')}
              </label>
            }
            name={[name, 'payment_amount']}
            rules={[{ required: true }]}
          >
            <Input
              id="amount-to-pay"
              onChange={e => onChangeAmountToPay(e.target.value, restField.fieldKey)}
              placeholder={t('selectedPayMethod.Amount to pay.placeholder')}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue="1"
            label={t('selectedPayMethod.Payment Method.title')}
            name={[name, 'payment_method']}
            rules={[{ required: true }]}
          >
            <Select onChange={(value: string) => setPaymentMethod(value)}>
              <Option value="1">Cash</Option>
              <Option value="2">Credit Card</Option>
              <Option value="3">Coupon</Option>
              <Option value="4">VNPay</Option>
              <Option value="5">Momo</Option>
              <Option value="99">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue={2}
            label={t('selectedPayMethod.Currency.title')}
            name={[name, 'currency_conversion_id']}
            rules={[{ required: true }]}
          >
            <Select onChange={value => onChangeCurrency(value, restField.fieldKey)}>
              {exchangeRates?.map((item: any) => {
                return <Option value={item.id}>{item.currency_code.toUpperCase()}</Option>;
              })}
            </Select>
          </Form.Item>
          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              fontSize: '10px',
              lineHeight: '12px',
            }}
          >
            {t('common.Exchange Rate')} : {formatNumber(getRate(restField.fieldKey))}
          </span>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue="0"
            label={
              <label htmlFor="amount-in-vnd-2" style={{ fontWeight: 'bold' }}>
                {t('selectedPayMethod.Amount in VND.title')}
              </label>
            }
            name={[name, 'amount_in_vnd']}
          >
            <Input
              id="amount-in-vnd-2"
              placeholder={t('selectedPayMethod.Amount in VND.placeholder')}
            />
          </Form.Item>
        </Col>
      </Row>
      {paymentMethod === '2' && (
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Credit Card Type.title')}
              name={[name, 'creditcard_type']}
            >
              <Select placeholder={t('common.Select Type')}>
                {creditcardTypes.map((cardType: any) => {
                  return <Option value={cardType.id}>{cardType.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="credit-card-number" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Credit Card Number.title')}
                </label>
              }
              name={[name, 'creditcard_number']}
            >
              <Input
                id="credit-card-number"
                placeholder={t('selectedPayMethod.Credit Card Number.placeholder')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="card-holder-name">
                  {t('selectedPayMethod.Card Holder Name.title')}
                </label>
              }
              name={[name, 'creditcard_name']}
            >
              <Input
                id="card-holder-name"
                placeholder={t('selectedPayMethod.Card Holder Name.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {/* {paymentMethod === '3' && (
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Authorized Person.title')}
              name={[name, 'transfer_to_user_id']}
            >
              <Select placeholder={t('common.Select Type')}>
                {employees.map((employee: any) => {
                  return <Option value={employee.id}>{employee.name}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} />
          <Col span={6} />
        </Row>
      )} */}
    </>
  );
}

export default PaymentMethod;
