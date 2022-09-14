/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 14/09/2022
Main functions : Transaction Deposit
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

function Deposit({ isModalVisible, setModalVisible }: Props) {
  const handleCancel = () => {
    setModalVisible(false);
    console.log('Handle Cancel');
  };

  const handleOk = () => {
    setModalVisible(false);
  };

  const onChangeCurrency = (value: string) => {
    console.log(`selected ${value}`);
  };

  const selectCurrency = ['VND', 'JPY'];

  const onChangePaymentMethod = (value: string) => {
    console.log(`selected ${value}`);
  };

  const paymentMethod = ['Cash', 'Credit Card'];

  const onChangeTransactionType = (value: string) => {
    console.log(`selected ${value}`);
  };

  const transactionType = ['Deposit', 'abc'];

  const { t } = useTranslation();

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
      okText="Save"
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 80, borderRadius: 4 }}
      title={<b>Deposit</b>}
      visible={isModalVisible}
      width={518}
    >
      <Form
        initialValues={{
          print_bill: true,
          send_confirmation_email: true,
        }}
        layout="vertical"
        wrapperCol={{ span: 23 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item label={t('transaction.Status')} name="">
              <Input defaultValue="Waitlist" placeholder="Waitlist" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Guest Name')} name="">
              <Input defaultValue="Steve Mark" placeholder="Steve Mark" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Current Balance')} name="">
              <Input defaultValue="40.000" placeholder="40.000" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('common.Amount')} name="">
              <Input defaultValue="20.000" placeholder="20.000" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Select Currency.title')} name="">
              <Select
                defaultValue={selectCurrency[0]}
                onChange={onChangeCurrency}
                placeholder="Select Currency"
                style={{ borderRadius: 2, width: '100%' }}
              >
                {selectCurrency.map(type => (
                  <Option key={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Exchanged Amount')} name="">
              <Input defaultValue="0" placeholder="0" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('reservation.Payment Method.title')} name="">
              <Select
                defaultValue={paymentMethod[0]}
                onChange={onChangePaymentMethod}
                placeholder={t('transaction.Transaction Type.placeholder')}
                style={{ borderRadius: 2, width: '100%' }}
              >
                {paymentMethod.map(type => (
                  <Option key={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Transaction Type.title')} name="">
              <Select
                defaultValue={transactionType[0]}
                onChange={onChangeTransactionType}
                placeholder={t('transaction.Transaction Type.placeholder')}
                style={{ borderRadius: 2, width: '100%' }}
              >
                {transactionType.map(type => (
                  <Option key={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Actual Deposit Date')} name="date">
              <DatePicker
                defaultValue={moment('2017-08-08')}
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '100%',
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name="print_bill" valuePropName="checked">
              <Checkbox>{t('transaction.Print Bill')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="send_confirmation_email" valuePropName="checked">
              <Checkbox>{t('reservation.Send confirmation email')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('transaction.Receive Email')}
              name="email"
              wrapperCol={{ span: 12 }}
            >
              <Input defaultValue="steve.mark@gmail.com" placeholder="steve.mark@gmail.com" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={t('transaction.Comment')} name="comment" wrapperCol={{ span: 24 }}>
              <TextArea placeholder={t('transaction.Comment')} rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Deposit;
