import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Select, Tabs } from 'antd';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { TabPane } = Tabs;
const { Option } = Select;

function CustomerDetailInformation() {
  const { t } = useTranslation();

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="1" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Contact Informations')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
            <PattonButton
              onClick={() => console.log('handleUpdate Contact Informations')}
              style={{ float: 'right' }}
            >
              {t('common.Update')}
            </PattonButton>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Type.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <Select
                  allowClear
                  placeholder={t('customerDetail.Type.placeholder')}
                  style={{ width: '100%' }}
                >
                  <Option>1</Option>
                  <Option>2</Option>
                  <Option>3</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.First Name.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Email 1.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Email 1.placeholder')} />
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Mobile phone 1.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Mobile phone 1.placeholder')} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Email 2.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Email 2.placeholder')} />
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Mobile phone 2.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Mobile phone 2.placeholder')} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Last Name.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput />
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Address.title')}
              </Col>
              <Col span={24} style={{ paddingBottom: 24, paddingRight: 16 }}>
                <MInput placeholder={t('customerDetail.Address.placeholder')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </TabPane>
      <TabPane key="w" tab={t('customerDetail.Official Informations')}>
        <Row style={{ padding: 16 }}>Official Informations</Row>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailInformation;
