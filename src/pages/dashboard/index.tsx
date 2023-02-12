/** ***********************************
Module Name : Night Audit
Developer Name : MinhNV
Created Date : 10/01/2023
Updated Date : 15/01/2023
Main functions : Dashboard Index
************************************ */

import 'styles/night_audit.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'antd';

import IntroduceRow from './IntroduceRow';
import ProportionCircle from './ProportionCircle';
import SalesCard from './SalesCard';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <Row className="content">
      <Col span={24} style={{ paddingBottom: 10 }}>
        <IntroduceRow />
      </Col>
      <Col span={24} style={{ paddingBottom: 10 }}>
        <SalesCard />
      </Col>
      <Col span={12} style={{ paddingBottom: 10 }}>
        <ProportionCircle />
      </Col>
    </Row>
  );
}

export default Dashboard;
