import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, DatePicker, Form, Row, Select } from 'antd';
import moment from 'moment';

import PattonButton from 'components/PattonButton';

const { Option } = Select;
const formatDate = 'YYYY-MM-DD';

function HotelFacility() {
  const { t } = useTranslation();

  return (
    <Form
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      name="basic"
      wrapperCol={{
        span: 23,
      }}
    >
      <Card bordered={false} size="small">
        <Row>
          <Col span={8}>
            <Form.Item label={t('report.Branch.title')} name="branch">
              <Select allowClear placeholder={t('report.Branch.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('report.Facility.title')} name="facility">
              <Select allowClear placeholder={t('report.Facility.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('report.Equipment Type.title')} name="equipment_type">
              <Select allowClear placeholder={t('report.Equipment Type.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t('report.Report Type.title')} name="report_type">
              <Select allowClear placeholder={t('report.Report Type.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('report.Sort order by.title')} name="sort_order_by">
              <Select allowClear placeholder={t('report.Sort order by.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('report.Sort order type.title')} name="sort_order_type">
              <Select allowClear placeholder={t('report.Sort order type.placeholder')}>
                <Option value="1">Personal</Option>
                <Option value="2">Group</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={t('report.Report Start Date.title')} name="report_start_date">
              <DatePicker
                defaultValue={moment('2017-08-08', formatDate)}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label={t('report.Report End Date.title')} name="report_end_date">
              <DatePicker
                defaultValue={moment('2017-08-08', formatDate)}
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col sm={8} style={{ marginBottom: 24 }}>
            <PattonButton
              style={{
                width: 120,
                height: 32,
                marginRight: 8,
              }}
            >
              {t('report.Export Excel')}
            </PattonButton>
            <PattonButton
              style={{
                width: 120,
                height: 32,
                border: '1px solid #D9D9D9',
                background: '#FFF',
                color: 'rgba(0, 0, 0, 0.65)',
              }}
            >
              {t('report.Reset')}
            </PattonButton>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

export default HotelFacility;
