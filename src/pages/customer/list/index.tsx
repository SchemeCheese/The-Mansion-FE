/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer List Page
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui/antd';
import CustomerList from 'pages/customer/list/CustomerList';
import layoutStyles from 'components/layout.module.css';

const { TabPane } = Tabs;

function Customer() {
  const { t } = useTranslation();

  return (
    <>
      <p className={layoutStyles.title} style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
        {t('customer.Customers Relations')}
      </p>
      <p className={layoutStyles.title}>{t('customer.Customer List')}</p>

      <Tabs className={`customer-tabs ${layoutStyles.customBgHeader}`} defaultActiveKey="1">
        <TabPane key="1" className={layoutStyles.content} tab={t('customer.List')}>
          <CustomerList type="list" />
        </TabPane>
        <TabPane key="2" className={layoutStyles.content} tab={t('customer.Members Management')}>
          <CustomerList type="member_management" />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Customer;
