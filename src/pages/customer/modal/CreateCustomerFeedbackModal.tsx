import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

function CreateCustomerFeedbackModal({ isModalVisible, setIsModalVisible }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.submit();
  };

  return (
    <Modal
      bodyStyle={{
        background: '#FFFFFF',
      }}
      className="new-customer-feedback-modal"
      okText={t('common.Save')}
      onCancel={() => setIsModalVisible(false)}
      onOk={handleOk}
      style={{
        top: 40,
      }}
      title={t('customer.Create New Feedback')}
      visible={isModalVisible}
      width={1000}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        wrapperCol={{
          span: 23,
        }}
      >
        <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <Form.Item label={t('customer.Booker Name.title')} name="booker_name">
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t('customer.Receive Date.title')} name="receive_date">
                  <DatePicker
                    placeholder={t('customer.Receive Date.placeholder')}
                    style={{
                      height: 32,
                      borderRadius: 4,
                      marginRight: 11,
                      width: '100%',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t('customer.Feedback Type.title')} name="feedback_type">
                  <Select allowClear placeholder={t('customer.Feedback Type.placeholder')}>
                    <Option value="1">VIP</Option>
                    <Option value="2">Dominant</Option>
                    <Option value="4">General</Option>
                    <Option value="9">Undesirable Guest</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={t('customer.Receiving Feedback Staff.title')}
                  name="receiving_feedback_staff"
                >
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('customer.Responding Staff.title')} name="responding_staff">
                  <Input placeholder="" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('customer.Feedback.title')} name="feedback">
                  <TextArea
                    placeholder={t('customer.Feedback.placeholder')}
                    rows={5}
                    style={{ borderRadius: 4 }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('customer.Responding.title')} name="responding">
                  <TextArea
                    placeholder={t('customer.Responding.placeholder')}
                    rows={5}
                    style={{ borderRadius: 4 }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CreateCustomerFeedbackModal;
