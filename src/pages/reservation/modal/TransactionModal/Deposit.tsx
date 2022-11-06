/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 31/10/2022
Main functions : Transaction Deposit
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectGetReservationDetail } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { addItemAction } from 'actions';

const { Option } = Select;

interface Props {
  grandTotal: number;
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

function Deposit({ grandTotal, isModalVisible, setModalVisible }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const getReservationDetailData = useAppSelector(selectGetReservationDetail);
  const exchangeRates = getReservationDetailData?.data?.exchange_rates;

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        const rate = _.find(exchangeRates, item => {
          return item.id === values.currency;
        });

        dispatch(
          addItemAction({
            payload: {
              items: [
                {
                  description_id: 88,
                  quantity: 1,
                  sales_price: values.amount * rate.exchange_rate,
                  normal_price: values.amount * rate.exchange_rate,
                  storage_id: 4,
                  comment_deposit: values.deposit_comment,
                  deposit_date: values.deposit_date.format('YYYY-MM_DD'),
                },
              ],
              reservation_id: id ?? '',
              reservation_detail_id: getReservationDetailData.data.id,
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
    const rate = _.find(exchangeRates, item => {
      return item.id === value;
    });
    const formValue = form.getFieldsValue();

    form.setFieldsValue({
      exchanged_amount: formatNumber(formValue.amount * rate.exchange_rate),
    });
  };

  const paymentMethod = ['Cash', 'Credit Card'];

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
          currency: 2,
        }}
        layout="vertical"
        wrapperCol={{ span: 23 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item label={t('transaction.Status')}>
              <Input defaultValue={getReservationDetailData.data.status} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Guest Name')}>
              <Input defaultValue={getReservationDetailData.data.guest_name} readOnly />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Current Balance')}>
              <Input readOnly value={formatNumber(grandTotal)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('common.Amount')}
              name="amount"
              rules={[{ required: true, message: 'Please input amount!' }]}
            >
              <Input
                onChange={e => {
                  const formValue = form.getFieldsValue();

                  const rate = _.find(exchangeRates, item => {
                    return item.id === formValue.currency;
                  });

                  form.setFieldsValue({
                    exchanged_amount: formatNumber(
                      parseInt(e.target.value, 10) * rate.exchange_rate,
                    ),
                  });
                }}
                placeholder="Amount"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Select Currency.title')} name="currency">
              <Select
                onChange={onChangeCurrency}
                placeholder="Select Currency"
                style={{ borderRadius: 2, width: '100%' }}
              >
                {exchangeRates?.map((rate: any) => (
                  <Option key={rate.id} value={rate.id}>
                    {rate.currency_code}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('transaction.Exchanged Amount')} name="exchanged_amount">
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
