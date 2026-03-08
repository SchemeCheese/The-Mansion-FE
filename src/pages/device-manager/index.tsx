import 'styles/night_audit.css';

import React from 'react';
import { Tabs } from 'ui/antd';
import DeviceManagerList from 'pages/device-manager/DeviceManagerList';
import layoutStyles from 'components/layout.module.css';

const { TabPane } = Tabs;

function DeviceManager() {
  return (
    <>
      <p className={layoutStyles.title}>Branch Power Monitoring</p>
      <Tabs
        className={`${layoutStyles.reservationTabs} ${layoutStyles.customBgHeader}`}
        defaultActiveKey="1"
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className={layoutStyles.content} tab="Device Manager">
          <DeviceManagerList />
        </TabPane>
      </Tabs>
    </>
  );
}

export default DeviceManager;
