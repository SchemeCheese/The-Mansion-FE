import React from 'react';
import { Col, Tabs } from 'antd';

import BreadcrumbList from 'components/BreadcrumbList';

import Reserved from './Reserved';
import Waitlist from './Waitlist';

const { TabPane } = Tabs;

function Reservation() {
  const dates = [];

  for (let index = 0; index < 10; index++) {
    const bgColor = index === 2 || index === 1 ? '#FFF2E8' : '#FFFFFF';

    dates.push(
      <Col
        flex={1}
        style={{
          border: '1px solid #E8E8E8',
          borderRightStyle: 'none',
          textAlign: 'center',
          backgroundColor: bgColor,
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          Fri
        </p>
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          27
        </p>
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          NOV
        </p>
      </Col>,
    );
  }

  const breadcrumbData = ['Home', 'List', 'App'];

  return (
    <>
      <BreadcrumbList data={breadcrumbData} />

      <p className="title">Reservation List</p>

      <Tabs defaultActiveKey="1" style={{ minHeight: '90%' }}>
        <TabPane key="1" className="content" tab="Waitlist">
          <Waitlist />
        </TabPane>
        <TabPane key="2" className="content" tab="Reserved">
          <Reserved />
        </TabPane>
        <TabPane key="3" className="content" tab="Calendar">
          Content of Tab Pane 3
        </TabPane>
        <TabPane key="4" className="content" tab="Channel Manager">
          Content of Tab Pane 4
        </TabPane>
      </Tabs>
    </>
  );
}

export default Reservation;
