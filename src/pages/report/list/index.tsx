import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import HotelFacility from 'pages/report/list/HotelFacility';

const { TabPane } = Tabs;

function Report() {
  const { t } = useTranslation();

  return (
    <>
      <p className="title">{t('report.Report List')}</p>
      <Tabs
        className="reservation-tabs custom-bg-header"
        defaultActiveKey="1"
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className="content" tab={t('report.Hotel Facility')}>
          <HotelFacility />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Report;
