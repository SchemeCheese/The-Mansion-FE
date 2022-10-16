import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'antd';

import { createPaymentAction } from 'actions';

import PaymentMethod from './PaymentMethod';

interface Props {
  reservationDetailId: string;
  selectedRows: any;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function SelectedPayMethodModal({
  reservationDetailId,
  selectedRows,
  setIsModalOpen,
  visible,
}: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmitPayment = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        dispatch(
          createPaymentAction({
            payload: {
              reservation_detail_id: reservationDetailId,
              sales_info_id: '21', // TODO: Fake data
              sales_detail_id: selectedRows,
              payment_methods: values,
            },
          }),
        );
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });

    // setIsModalOpen(false)
  };

  console.log('selectedRows aaaa', selectedRows);

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4, width: '111px' } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4, width: '111px' } }}
      okText={t('common.Pay')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleSubmitPayment}
      title={<b>{t('payDetail.Select Payment Method')}</b>}
      visible={visible}
      width={850}
    >
      <Form
        autoComplete="off"
        form={form}
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
          <Col span={24}>
            <Form.List name="payment_methods">
              {(fields, { add }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <React.Fragment key={key}>
                      <PaymentMethod name={name} restField={restField} />
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
