/** ***********************************
Module Name : Night Audit
Developer Name : MinhNV
Created Date : 10/01/2023
Updated Date : 15/01/2023
Main functions : SalesCard Item
************************************ */

import 'styles/night_audit.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Row, Select, Tabs } from 'ui/antd';
import * as _ from 'lodash';
import numeral from 'numeral';
import { selectFuelState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { fetchFuelInfoAction } from 'actions';

import Bar from './Bar';

const { TabPane } = Tabs;

const { Option } = Select;

function SalesCard() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [fuelType, setFuelType] = useState('');

  const fuel = useAppSelector(selectFuelState);

  let waterRanking = _.chain(fuel.water)
    .groupBy('location')
    .map((objs: any, key: any) => ({
      location: key,
      m3: _.sumBy(objs, 'm3'),
    }))
    .value();
  let electricRanking = _.chain(fuel.electric)
    .groupBy('location')
    .map((objs: any, key: any) => ({
      location: key,
      kWh: _.sumBy(objs, 'kWh'),
    }))
    .value();

  waterRanking = _.orderBy(waterRanking, ['m3'], ['desc']);
  electricRanking = _.orderBy(electricRanking, ['kWh'], ['desc']);

  const xyWaterData = fuel.water.map(({ m3 }: any, index: number) => ({
    x: index,
    y: m3,
  })) as any;

  const xyElectricData = fuel.electric.map(({ kWh }: any, index: number) => ({
    x: index,
    y: kWh,
  })) as any;

  const fetchFuelData = (type: string) => {
    dispatch(
      fetchFuelInfoAction({
        type,
      }),
    );
    setFuelType(type);
  };

  useEffect(() => {
    fetchFuelData('year');
  }, []);

  return (
    <Card
      bodyStyle={{
        padding: 0,
      }}
      bordered={false}
    >
      <div>
        <Tabs
          size="large"
          tabBarExtraContent={
            <div style={{ paddingRight: 30 }}>
              <div>
                <span
                  aria-hidden="true"
                  onClick={() => fetchFuelData('day')}
                  style={{
                    marginLeft: 24,
                    cursor: 'pointer',
                    color: fuelType === 'day' ? '#1d39c4' : '',
                  }}
                >
                  This Day
                </span>
                <span
                  aria-hidden="true"
                  onClick={() => fetchFuelData('week')}
                  style={{
                    marginLeft: 24,
                    cursor: 'pointer',
                    color: fuelType === 'week' ? '#1d39c4' : '',
                  }}
                >
                  This Week
                </span>
                <span
                  aria-hidden="true"
                  onClick={() => fetchFuelData('month')}
                  style={{
                    marginLeft: 24,
                    cursor: 'pointer',
                    color: fuelType === 'month' ? '#1d39c4' : '',
                  }}
                >
                  This Month
                </span>
                <span
                  aria-hidden="true"
                  onClick={() => fetchFuelData('year')}
                  style={{
                    marginLeft: 24,
                    cursor: 'pointer',
                    color: fuelType === 'year' ? '#1d39c4' : '',
                  }}
                >
                  This Year
                </span>
              </div>
            </div>
          }
          tabBarStyle={{
            marginBottom: 24,
          }}
        >
          <TabPane key="sales" tab="Electricity">
            <Row style={{ paddingTop: 30 }}>
              <Col lg={12} md={12} sm={24} xl={16} xs={24}>
                <div style={{ padding: '0 0 32px 32px' }}>
                  <Row align="middle" style={{ paddingBottom: 20 }}>
                    <Col xs={2}>
                      <span>Branch</span>
                    </Col>
                    <Col xs={4}>
                      <Select
                        defaultValue="all"
                        style={{
                          width: 200,
                        }}
                      >
                        <Option value="all">All branch</Option>
                        <Option value="br_hn">Hanoi Branch</Option>
                        <Option value="br_pq">Phu Quoc Branch</Option>
                        <Option value="br_vt">Vung Tau Branch</Option>
                        <Option value="br_qn">Quang Ninh Branch</Option>
                        <Option value="br_cm">Ca Mau Branch</Option>
                        <Option value="br_hcm">Ho Chi Minh Branch</Option>
                        <Option value="br_dn">Da Nang Branch</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Bar data={xyElectricData} />
                </div>
              </Col>
              <Col lg={12} md={12} sm={24} xl={8} xs={24}>
                <div style={{ padding: '0 32px 32px 72px' }}>
                  <h4 style={{ fontWeight: 'bold' }}>Sales Ranking</h4>
                  <ul>
                    {electricRanking.map((item: any, index: number) => {
                      return (
                        <li
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 16,
                            zoom: 1,
                          }}
                        >
                          <span
                            style={{
                              color: '#fff',
                              backgroundColor: '#1890ff',
                              display: 'inline-block',
                              width: 20,
                              height: 20,
                              marginTop: 1.5,
                              marginRight: 16,
                              fontWeight: 600,
                              fontSize: 12,
                              lineHeight: '20px',
                              textAlign: 'center',
                              borderRadius: 20,
                            }}
                          >
                            {index + 1}
                          </span>
                          <span style={{ flex: '1 1' }}>{item.location}</span>
                          <span>{numeral(item.kWh).format('0,0')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane key="views" tab="Water">
            <Row>
              <Col lg={12} md={12} sm={24} xl={16} xs={24}>
                <div style={{ padding: '20px 0 32px 32px' }}>
                  <Bar data={xyWaterData} />
                </div>
              </Col>
              <Col lg={12} md={12} sm={24} xl={8} xs={24}>
                <div style={{ padding: '20px 32px 32px 72px' }}>
                  <h4 style={{ fontWeight: 'bold' }}>门店访问量排名</h4>
                  <ul>
                    {waterRanking.map((item: any, index: number) => {
                      return (
                        <li
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 16,
                            zoom: 1,
                          }}
                        >
                          <span
                            style={{
                              color: '#fff',
                              backgroundColor: '#1890ff',
                              display: 'inline-block',
                              width: 20,
                              height: 20,
                              marginTop: 1.5,
                              marginRight: 16,
                              fontWeight: 600,
                              fontSize: 12,
                              lineHeight: '20px',
                              textAlign: 'center',
                              borderRadius: 20,
                            }}
                          >
                            {index + 1}
                          </span>
                          <span style={{ flex: '1 1' }}>{item.location}</span>
                          <span>{numeral(item.m3).format('0,0')}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
}

export default SalesCard;
