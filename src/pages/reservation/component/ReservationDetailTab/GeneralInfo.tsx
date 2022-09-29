import React from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, DatePicker, Form, Row, Select, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

import PattonButton from 'components/PattonButton';

const { Option } = Select;
const format = 'HH:mm';

function GeneralInfo() {
  const { t } = useTranslation();

  return (
    <Row style={{ paddingLeft: 15, backgroundColor: 'white', paddingTop: 15 }}>
      <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
        <span style={{ paddingRight: 15 }}>{t('common.Created Date')}: </span>
        <span>2017-08-08</span>
        <PattonButton style={{ float: 'right' }}>{t('common.Update')}</PattonButton>
      </Col>
      <Col span={8}>
        <Form.Item
          label={t('reservation.Room Type.title')}
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder={t('reservation.Room Type.placeholder')}>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('reservation.Adults.title')}
          name="adults"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="2">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('reservation.Child.title')}
          name="child"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="0">
            <Option value="0">0</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('reservation.Baby.title')}
          name="baby"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select defaultValue="0">
            <Option value="0">0</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={t('reservation.Notes.title')}
          name="note"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea placeholder={t('reservation.Notes.placeholder')} rows={5} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={t('reservation.Checkin')}
          name="checkin"
          rules={[
            {
              required: true,
            },
          ]}
        >
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

        <Form.Item
          label={t('reservation.Checkin Time')}
          name="checkin_time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker
            defaultValue={moment('2017-08-08')}
            format={format}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Early Checkin')}</Checkbox>
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Honeymoon Setup')}</Checkbox>
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Pickup Request')}</Checkbox>
        </Form.Item>
        <Form.Item
          label={t('reservation.Pickup Time')}
          name="pickup_time"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginTop: 55 }}
        >
          <TimePicker
            defaultValue={moment('2017-08-08')}
            format={format}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          label={t('reservation.Pickup Transport Code.title')}
          name="pickup_transport_code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder={t('reservation.Pickup Transport Code.placeholder')}>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label={t('reservation.Checkout')}
          name="checkout"
          rules={[
            {
              required: true,
            },
          ]}
        >
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

        <Form.Item
          label={t('reservation.Checkout Time')}
          name="checkout_time"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TimePicker
            defaultValue={moment('2017-08-08')}
            format={format}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Late Checkout')}</Checkbox>
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Birthday Setup')}</Checkbox>
        </Form.Item>
        <Form.Item name="remember" style={{ marginBottom: 12 }} valuePropName="checked">
          <Checkbox>{t('reservation.Dropoff Request')}</Checkbox>
        </Form.Item>
        <Form.Item
          label={t('reservation.Dropoff Time')}
          name="market"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginTop: 55 }}
        >
          <TimePicker
            defaultValue={moment('2017-08-08')}
            format={format}
            style={{
              height: 32,
              borderRadius: 4,
              marginRight: 11,
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          label={t('reservation.Dropoff Transport Code.title')}
          name="room_type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select allowClear placeholder={t('reservation.Dropoff Transport Code.placeholder')}>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
}

export default GeneralInfo;
