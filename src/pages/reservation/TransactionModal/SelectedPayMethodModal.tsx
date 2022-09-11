import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function SelectedPayMethodModal({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const handlerClickAddNewAmount = () => {
    console.log('handlerClickAddNewAmount');
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4, width: '111px' } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4, width: '111px' } }}
      okText={t('common.Pay')}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      title={<b>{t('payDetail.Select Payment Method')}</b>}
      visible={visible}
      width={850}
    >
      <Form
        autoComplete="off"
        initialValues={{
          remember: true,
        }}
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
            <span style={{ fontSize: 20, float: 'right' }}>4.000.000</span>
          </Col>
          <Col span={7} />
          <Col span={9} style={{ marginBottom: 10 }}>
            <span style={{ lineHeight: '31px' }}>{t('common.Total amount to pay')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>4.000.000</span>
          </Col>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Col span={8} style={{ marginBottom: 10, marginTop: 15 }} />
          <Col span={7} />
          <Col span={9}>
            <span style={{ lineHeight: '31px' }}>{t('common.Balance')}</span>
            <span style={{ fontSize: 20, float: 'right' }}>800.000</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="amount-to-pay" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount to pay.title')}
                </label>
              }
              name="amount_to_pay"
              rules={[{ required: true }]}
            >
              <Input
                defaultValue="10.000"
                id="amount-to-pay"
                placeholder={t('selectedPayMethod.Amount to pay.placeholder')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Payment Method.title')}
              name="payment_method"
              rules={[{ required: true }]}
            >
              <Select defaultValue="cash">
                <Option value="cash">Cash</Option>
                <Option value="credit card">Credit Card</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6} style={{ position: 'relative' }}>
            <Form.Item
              label={t('selectedPayMethod.Currency.title')}
              name="currency"
              rules={[{ required: true }]}
            >
              <Select defaultValue="JPY">
                <Option value="jpy">JPY</Option>
                <Option value="vnd">VND</Option>
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
              label={
                <label htmlFor="amount-in-vnd" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount in VND.title')}
                </label>
              }
              name="amount_in_vnd"
            >
              <Input
                defaultValue="2.000.000"
                id="amount-in-vnd"
                placeholder={t('selectedPayMethod.Amount in VND.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="amount-to-pay" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount to pay.title')}
                </label>
              }
              name="amount_to_pay"
              rules={[{ required: true }]}
            >
              <Input
                defaultValue="1.000.000"
                id="amount-to-pay"
                placeholder={t('selectedPayMethod.Amount to pay.placeholder')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Payment Method.title')}
              name="payment_method"
              rules={[{ required: true }]}
            >
              <Select defaultValue="cash">
                <Option value="cash">Cash</Option>
                <Option value="credit card">Credit Card</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Currency.title')}
              name="currency"
              rules={[{ required: true }]}
            >
              <Select defaultValue="JPY">
                <Option value="jpy">JPY</Option>
                <Option value="vnd">VND</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="amount-in-vnd-2" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount in VND.title')}
                </label>
              }
              name="amount_in_vnd"
            >
              <Input
                defaultValue="2.000.000"
                id="amount-in-vnd-2"
                placeholder={t('selectedPayMethod.Amount in VND.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
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
                defaultValue="1223 3434 4667 801"
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
                defaultValue="STEVE MARK"
                id="card-holder-name"
                placeholder={t('selectedPayMethod.Card Holder Name.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="amount-to-pay-2" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount to pay.title')}
                </label>
              }
              name="amount_to_pay"
              rules={[{ required: true }]}
            >
              <Input
                defaultValue="10.000"
                id="amount-to-pay-2"
                placeholder={t('selectedPayMethod.Amount to pay.placeholder')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Payment Method.title')}
              name="payment_method"
              rules={[{ required: true }]}
            >
              <Select defaultValue="bank transfer">
                <Option value="bank transfer">Bank Transfer</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('selectedPayMethod.Currency.title')}
              name="currency"
              rules={[{ required: true }]}
            >
              <Select defaultValue="JPY">
                <Option value="jpy">JPY</Option>
                <Option value="vnd">VND</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={
                <label htmlFor="amount-in-vnd-3" style={{ fontWeight: 'bold' }}>
                  {t('selectedPayMethod.Amount in VND.title')}
                </label>
              }
              name="amount_in_vnd"
            >
              <Input
                defaultValue="1.000.000"
                id="amount-in-vnd-3"
                placeholder={t('selectedPayMethod.Amount in VND.placeholder')}
              />
            </Form.Item>
          </Col>
        </Row>
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
        <Row>
          <Col span={24}>
            <Button
              key="button"
              onClick={handlerClickAddNewAmount}
              style={{
                borderRadius: 4,
                border: '1px dashed #1D39C4',
                color: '#1D39C4',
              }}
            >
              {t('selectedPayMethod.Add new amount')}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default SelectedPayMethodModal;
