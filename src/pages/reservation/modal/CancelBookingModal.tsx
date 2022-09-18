/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 05/09/2022
Updated Date : 05/09/2022
Main functions : Cancel Booking Modal
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, Form, Input, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

interface Props {
  isModalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

function CancelBookingModal({ isModalVisible, setModalVisible }: Props) {
  const handleCancel = () => {
    setModalVisible(false);
    console.log('Handle Cancel');
  };

  const handleOk = () => {
    setModalVisible(false);
    console.log('Handle OK');
  };

  const { t } = useTranslation();

  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
      okText="Save"
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 80, borderRadius: 4 }}
      title={<b>Cancel Booking</b>}
      visible={isModalVisible}
      width={850}
    >
      <Row>
        <Col span={8}>
          <Form.Item label={t('reservation.Folio ID')}>
            <Input defaultValue="2808" disabled value="2000" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <div
            style={{
              bottom: 0,
              position: 'absolute',
              paddingBottom: 24,
              textAlign: 'center',
              paddingLeft: 34,
            }}
          >
            <span>{t('reservation.Receptionist')}: Nguyen Dac Trung</span>
          </div>
        </Col>
        <Col span={8}>
          <Form.Item
            name="remember"
            style={{
              marginBottom: 12,
              bottom: 0,
              position: 'absolute',
              paddingBottom: 9,
              width: '100%',
              textAlign: 'right',
            }}
            valuePropName="checked"
          >
            <Checkbox>{t('reservation.Send confirmation email')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('reservation.Type.title')} name="type">
            <Select allowClear placeholder={t('reservation.Type.placeholder')}>
              <Option value="room1">Room 1</Option>
              <Option value="room2">Room 2</Option>
              <Option value="room3">Room 3</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t('reservation.Reason for booking cancellation (Optional).title')}
            name="type"
            wrapperCol={{ span: 24 }}
          >
            <TextArea
              placeholder={t('reservation.Reason for booking cancellation (Optional).placeholder')}
              rows={5}
            />
          </Form.Item>
        </Col>
      </Row>
    </Modal>
  );
}

export default CancelBookingModal;
