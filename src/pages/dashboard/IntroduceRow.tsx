import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'ui/antd';
import numeral from 'numeral';
import Field from 'pages/dashboard/component/chart/Field';
import { selectElectricYesterdayState, selectWaterYesterdayState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getElectricYesterdayAction, getWaterYesterdayAction } from 'actions';

import ChartCard from './component/chart/ChartCard';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};

function IntroduceRow() {
  const dispatch = useDispatch();
  const electricYesterdayData = useAppSelector(selectElectricYesterdayState);
  const waterYesterdayData = useAppSelector(selectWaterYesterdayState);

  useEffect(() => {
    dispatch(getElectricYesterdayAction());
    dispatch(getWaterYesterdayAction());
  }, []);

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          action={
            <Tooltip title="M-O-M">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          footer={
            <Field
              label="Day passed"
              value={`${numeral(electricYesterdayData.dayPass).format('0%')}`}
            />
          }
          title="Electricity M-T-D"
          total={numeral(electricYesterdayData.totalMonth).format('0,0')}
        >
          M-O-M
          <span
            style={{
              marginLeft: '8px',
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {`${numeral(electricYesterdayData.dayPass).format('0%')}`}
          </span>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          footer={
            <Field
              label="Average per day"
              value={`${numeral(electricYesterdayData.avgYesterday).format('0,0')}`}
            />
          }
          title="Visits"
          total={numeral(electricYesterdayData.totalYesterday).format('0,0')}
        >
          ...
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          footer={
            <Field
              label="Day passed"
              value={`${numeral(waterYesterdayData.dayPass).format('0%')}`}
            />
          }
          title="Water M-T-D"
          total={numeral(waterYesterdayData.totalYesterday).format('0,0')}
        >
          M-O-M
          <span
            style={{
              marginLeft: '8px',
              color: 'rgba(0, 0, 0, 0.85)',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            {`${numeral(waterYesterdayData.dayPass).format('0%')}`}
          </span>
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          contentHeight={46}
          footer={
            <Field
              label="Average per day"
              value={`${numeral(waterYesterdayData.avgYesterday).format('0,0')}`}
            />
          }
          title="Yesterday"
          total={numeral(waterYesterdayData.totalMonth).format('0,0')}
        >
          ...
        </ChartCard>
      </Col>
    </Row>
  );
}

export default IntroduceRow;
