/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 25/11/2022
Updated Date : 26/11/2022
Main functions : Front Desk List
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';

import WalkIn from './WalkIn';

const { TabPane } = Tabs;

function FrontDesk() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handeleActive = (activeKey: string) => {
    console.log('Handle Active');
  };

  return (
    <>
      <p className="title">{t('frontDesk.Front Desk')}</p>

      <Tabs
        className="reservation-tabs"
        defaultActiveKey="1"
        onChange={activeKey => handeleActive(activeKey)}
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className="content" tab={t('frontDesk.Walk In')}>
          <WalkIn />
        </TabPane>
        <TabPane key="2" className="content" tab={t('frontDesk.CheckIn Today')}>
          <p>OK</p>
        </TabPane>
        <TabPane key="3" className="content" tab={t('frontDesk.In House')}>
          <p>OK</p>
        </TabPane>
        <TabPane key="4" className="content" tab={t('frontDesk.Checkout Today')}>
          <p>OK</p>
        </TabPane>
      </Tabs>
    </>
  );
}

export default FrontDesk;
