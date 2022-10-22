/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 14/09/2022
Main functions : Transaction Deposit
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

import { addItemAction } from 'actions';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

function Deposit({ isModalVisible, setModalVisible }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setModalVisible(false);
    console.log('Handle Cancel');
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        console.log('vaaaaaa', values);

        dispatch(
          addItemAction({
            payload: {
              items: [
                {
                  description_id: 88,
                  quantity: 1,
                  sales_price: values.amount,
                  normal_price: values.amount,
                  storage_id: 4,
                  comment_deposit: values.deposit_comment,
                  deposit_date: values.deposit_date.format('YYYY-MM_DD'),
                },
              ],
              reservation_id: '3482',
              reservation_detail_id: '4744',
            },
          }),
        );

        setModalVisible(false);
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
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

  const transactionType = ['Deposit'];

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
        form={form}
        initialValues={{
          print_bill: true,
          send_confirmation_email: true,
          deposit_date: moment(),
        }}
        layout="vertical"
        wrapperCol={{ span: 23 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item label={t('transaction.Status')}>
              <Input defaultValue="Waitlist" placeholder="Waitlist" readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Guest Name')}>
              <Input defaultValue="Steve Mark" placeholder="Steve Mark" readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Current Balance')}>
              <Input defaultValue="40.000" placeholder="40.000" readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('common.Amount')}
              name="amount"
              rules={[{ required: true, message: 'Please input amount!' }]}
            >
              <Input placeholder="Amount" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Select Currency.title')} name="currency">
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
            <Form.Item label={t('transaction.Exchanged Amount')}>
              <Input defaultValue="0" placeholder="0" readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('reservation.Payment Method.title')}
              name="payment_method"
              rules={[{ required: true, message: 'Please select payment method' }]}
            >
              <Select
                onChange={onChangePaymentMethod}
                placeholder="Select payment method"
                style={{ borderRadius: 2, width: '100%' }}
              >
                {paymentMethod.map(type => (
                  <Option key={type}>{type}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Transaction Type.title')}>
              <Select
                defaultValue={transactionType[0]}
                disabled
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
            <Form.Item label={t('transaction.Actual Deposit Date')} name="deposit_date">
              <DatePicker
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
              <Input placeholder="steve.mark@gmail.com" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('transaction.Comment')}
              name="deposit_comment"
              wrapperCol={{ span: 24 }}
            >
              <TextArea placeholder={t('transaction.Comment')} rows={5} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default Deposit;
