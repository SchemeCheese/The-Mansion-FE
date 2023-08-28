import 'styles/night_audit.css';

import React from 'react';
import { Tabs } from 'antd';
import DeviceManagerList from 'pages/device-manager/DeviceManagerList';

const { TabPane } = Tabs;

function DeviceManager() {
  return (
    <>
      <p className="title">Branch Power Monitoring</p>
      <Tabs
        className="reservation-tabs custom-bg-header"
        defaultActiveKey="1"
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className="content" tab="Device Manager">
          <DeviceManagerList />
        </TabPane>
      </Tabs>
    </>
  );
}

export default DeviceManager;
