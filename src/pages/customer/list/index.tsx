/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer List Page
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import CustomerList from 'pages/customer/list/CustomerList';

const { TabPane } = Tabs;

function Customer() {
  const { t } = useTranslation();

  return (
    <>
      <p className="title" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
        {t('customer.Customers Relations')}
      </p>
      <p className="title">{t('customer.Customer List')}</p>

      <Tabs className="customer-tabs custom-bg-header" defaultActiveKey="1">
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
