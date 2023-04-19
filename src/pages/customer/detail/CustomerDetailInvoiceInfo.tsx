import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Tabs } from 'antd';

import MInput from 'components/MInput';

const { TabPane } = Tabs;

function CustomerDetailInvoiceInfo() {
  const { t } = useTranslation();

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Invoice Informations')}>
        <Row style={{ padding: 16 }}>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Tax Code.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Tax Code.placeholder')} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Company Name.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Company Name.placeholder')} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.E-invoice email address.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.E-invoice email address.placeholder')} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Company Address.title')}
              </Col>
              <Col span={24} style={{ paddingBottom: 24, paddingRight: 16 }}>
                <MInput placeholder={t('customerDetail.Company Address.placeholder')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailInvoiceInfo;
