import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import CustomerList from 'pages/customer/list/CustomerList';

const { TabPane } = Tabs;

function Customer() {
  const { t } = useTranslation();

  const handleActive = (activeKey: string) => {
    console.log('handleActive', activeKey);
  };

  return (
    <>
      {/* <BreadcrumbList data={breadcrumbData} /> */}
      <p className="title" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
        {t('customer.Customers Relations')}
      </p>
      <p className="title">{t('customer.Customer List')}</p>

      <Tabs
        className="customer-tabs"
        defaultActiveKey="1"
        onChange={activeKey => handleActive(activeKey)}
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className="content" tab={t('customer.List')}>
          <CustomerList type="list" />
        </TabPane>
        <TabPane key="2" className="content" tab={t('customer.Members Management')}>
          <CustomerList type="member_management" />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Customer;
