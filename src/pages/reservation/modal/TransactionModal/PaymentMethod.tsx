/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 07/05/2022
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
  canDelete?: boolean;
  computePaidAmount: any;
  deleteRow?: any;
  form: any;
  name: any;
  restField: any;
}

function PaymentMethod({ canDelete, computePaidAmount, deleteRow, form, name, restField }: Props) {
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
              <Option value="4">Virtual Credit Card</Option>
              <Option value="5">Momo</Option>
              <Option value="6">VNPay</Option>
              <Option value="7">Bank Transfer</Option>
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
        <Col span={5}>
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
        {canDelete && (
          <Col
            span={1}
            style={{
              paddingTop: 35,
              paddingLeft: 10,
              cursor: 'pointer',
            }}
          >
            <svg
              fill="none"
              height="14"
              onClick={() => deleteRow()}
              viewBox="0 0 12 14"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M8.05136 2.00016H10.3078C10.8742 2.00016 11.3334 2.46655 11.3334 3.04183V3.87516C11.3334 4.10529 11.1497 4.29183 10.9232 4.29183H1.077C0.850422 4.29183 0.666748 4.10529 0.666748 3.87516V3.04183C0.666748 2.46655 1.12596 2.00016 1.69239 2.00016H3.9488V1.5835C3.9488 0.893127 4.49982 0.333496 5.17957 0.333496H6.82059C7.50034 0.333496 8.05136 0.893127 8.05136 1.5835V2.00016ZM5.17957 1.16683C4.95341 1.16683 4.76931 1.3538 4.76931 1.5835V2.00016H7.23085V1.5835C7.23085 1.3538 7.04676 1.16683 6.82059 1.16683H5.17957Z"
                fill="#F5222D"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M1.31689 5.26158C1.3134 5.1873 1.37174 5.12516 1.44495 5.12516H10.5545C10.6277 5.12516 10.686 5.1873 10.6825 5.26158L10.3441 12.4762C10.3128 13.1439 9.7728 13.6668 9.11484 13.6668H2.8846C2.22664 13.6668 1.68664 13.1439 1.65535 12.4762L1.31689 5.26158ZM8.051 5.75016C7.82434 5.75016 7.64075 5.93663 7.64075 6.16683V11.5835C7.64075 11.8137 7.82434 12.0002 8.051 12.0002C8.27767 12.0002 8.46126 11.8137 8.46126 11.5835V6.16683C8.46126 5.93663 8.27767 5.75016 8.051 5.75016ZM5.99972 5.75016C5.77306 5.75016 5.58946 5.93663 5.58946 6.16683V11.5835C5.58946 11.8137 5.77306 12.0002 5.99972 12.0002C6.22638 12.0002 6.40998 11.8137 6.40998 11.5835V6.16683C6.40998 5.93663 6.22638 5.75016 5.99972 5.75016ZM3.94844 5.75016C3.72178 5.75016 3.53818 5.93663 3.53818 6.16683V11.5835C3.53818 11.8137 3.72178 12.0002 3.94844 12.0002C4.1751 12.0002 4.3587 11.8137 4.3587 11.5835V6.16683C4.3587 5.93663 4.1751 5.75016 3.94844 5.75016Z"
                fill="#F5222D"
                fillRule="evenodd"
              />
            </svg>
          </Col>
        )}
      </Row>
      {(paymentMethod === '2' || paymentMethod === '4') && (
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
          <Col span={5}>
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
      {paymentMethod === '7' && (
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
      )}
    </>
  );
}

export default PaymentMethod;
