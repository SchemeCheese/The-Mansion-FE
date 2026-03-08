import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'ui/antd';
import HotelFacility from 'pages/report/list/HotelFacility';
import layoutStyles from 'components/layout.module.css';

const { TabPane } = Tabs;

function Report() {
  const { t } = useTranslation();

  return (
    <>
      <p className={layoutStyles.title}>{t('report.Report List')}</p>
      <Tabs
        className={`${layoutStyles.reservationTabs} ${layoutStyles.customBgHeader}`}
        defaultActiveKey="1"
        style={{ minHeight: '100%' }}
      >
        <TabPane key="1" className={layoutStyles.content} tab={t('report.Hotel Facility')}>
          <HotelFacility />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Report;
