import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Row, Select } from 'antd';

const { Option } = Select;

interface Props {
  name: any;
  restField: any;
}

function PaymentMethod({ name, restField }: Props) {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  return (
    <>
      <Row>
        <Col span={6}>
          <Form.Item
            {...restField}
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
              placeholder={t('selectedPayMethod.Amount to pay.placeholder')}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue="cash"
            label={t('selectedPayMethod.Payment Method.title')}
            name={[name, 'payment_method']}
            rules={[{ required: true }]}
          >
            <Select onChange={(value: string) => setPaymentMethod(value)}>
              <Option value="1">Cash</Option>
              <Option value="2">Credit Card</Option>
              <Option value="3">Transfer</Option>
              <Option value="4">Virtual Credit Card</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
            initialValue="vnd"
            label={t('selectedPayMethod.Currency.title')}
            name={[name, 'currency_conversion_id']}
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="2">VND</Option>
              <Option value="3">USD</Option>
              <Option value="4">JPY</Option>
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
            {t('common.Exchange Rate')} : 210
          </span>
        </Col>
        <Col span={6}>
          <Form.Item
            {...restField}
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
      {paymentMethod === 'credit_card' && (
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Credit Card Type.title')}
              name="credit_card_type"
            >
              <Select placeholder={t('common.Select Type')}>
                <Option value="type 1">Type 1</Option>
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
              name="credit_card_number"
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
              name="card_holder_name"
            >
              <Input
                id="card-holder-name"
                placeholder={t('selectedPayMethod.Card Holder Name.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {paymentMethod === 'transfer' && (
        <Row>
          <Col span={6} />
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Authorized Person.title')}
              name="authorized_person"
            >
              <Select placeholder={t('common.Select Type')} />
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
