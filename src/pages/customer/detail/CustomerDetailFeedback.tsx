/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer Detail Page
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Col, Row, Table, Tabs } from 'antd';

import PattonButton from 'components/PattonButton';

const { TabPane } = Tabs;

interface Props {
  directFeedback: any;
  socialFeedback: any;
  statusMapping: (status: string) => any;
}

function CustomerDetailFeedback({ directFeedback, socialFeedback, statusMapping }: Props) {
  const { t } = useTranslation();

  const feedbackColumns = [
    {
      title: t('customerDetail.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <div style={{ minWidth: 80 }}>
          {statusMapping(text)}
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
      ),
    },
    {
      title: t('customerDetail.Created Date'),
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: t('customerDetail.Type.title'),
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: t('customerDetail.Incharge'),
      dataIndex: 'in_charge',
      key: 'in_charge',
    },
    {
      title: t('customerDetail.Branch'),
      dataIndex: 'branch',
      key: 'branch',
    },
  ];

  const socialFeedbackColumns = [
    {
      title: t('customerDetail.Created Date'),
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: t('customerDetail.Platform'),
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: t('customerDetail.Branch'),
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: t('customerDetail.Reviewer'),
      dataIndex: 'reviewer',
      key: 'reviewer',
    },
    {
      title: t('customerDetail.Star'),
      dataIndex: 'star',
      key: 'star',
    },
    {
      title: t('customerDetail.Comment'),
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="1" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Direct Feedbacks')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ paddingTop: 16 }}>
            <PattonButton type="primary">
              {' '}
              <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> {t('common.New')}
            </PattonButton>
          </Col>
          <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
            <Table
              className="feedback-list"
              columns={feedbackColumns}
              dataSource={directFeedback}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="w" tab={t('customerDetail.Social Feedbacks')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ paddingTop: 16 }}>
            <PattonButton type="primary">
              {' '}
              <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> {t('common.New')}
            </PattonButton>
          </Col>
          <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
            <Table
              columns={socialFeedbackColumns}
              dataSource={socialFeedback}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailFeedback;
