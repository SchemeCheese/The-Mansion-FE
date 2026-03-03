/** ***********************************
Module Name : Duration Curve
Developer Name : HanhTV
Created Date : 21/02/2023
Updated Date : 21/02/2023
Main functions : Duration Curve
************************************ */

import 'styles/duration_curve.css';

import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisOutlined, ExportOutlined } from '@ant-design/icons';
import { Line as AntLine } from '@ant-design/plots';
import { Button, Card, Col, DatePicker, Dropdown, Menu, Row, Select, Space, Spin } from 'antd';
import moment from 'moment';
import { selectDurationCurveState } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { getDurationCurveAction } from 'actions';

import { RootState } from 'types';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface DurationDataItem {
  x: string;
  y1: number;
  y2: number;
}

function DurationCurve() {
  const dispatch = useDispatch();
  const durationData = useAppSelector(selectDurationCurveState);
  const dataDuration: any = useSelector<RootState>(({ getDurationCurve }) => getDurationCurve.data);
  const [isLoading, setIsLoading] = useState(true);
  const { changed: durationCurveChanged } = useTreeChanges(durationData);

  useEffect(() => {
    dispatch(getDurationCurveAction());
  }, []);

  useEffect(() => {
    if (durationCurveChanged('status', 'SUCCESS')) {
      setIsLoading(false);
    }
  }, [durationCurveChanged]);

  const menu = (
    <Menu>
      <Menu.Item>Action 1</Menu.Item>
      <Menu.Item>Action 2</Menu.Item>
    </Menu>
  );

  const dropdownGroup = (
    <span>
      <Dropdown overlay={menu} placement="bottomRight">
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );

  const data: DurationDataItem[] = Array.isArray(dataDuration)
    ? [...dataDuration].map(item => ({
        x: `${item?.x ?? ''}`,
        y1: Number(item?.y1) || 0,
        y2: Number(item?.y2) || 0,
      }))
    : [{ x: '', y1: 0, y2: 0 }];

  data.sort((a, b) => (a.x > b.x ? 1 : -1));

  const lineData = useMemo(
    () =>
      data.flatMap(item => [
        {
          x: item.x,
          value: item.y1,
          key: 'Electric',
        },
        {
          x: item.x,
          value: item.y2,
          key: 'Water',
        },
      ]),
    [data],
  );

  const maxValue = useMemo(
    () => lineData.reduce((max, item) => (item.value > max ? item.value : max), 0),
    [lineData],
  );

  const chartConfig: any = {
    data: lineData,
    xField: 'x',
    yField: 'value',
    seriesField: 'key',
    height: 400,
    autoFit: true,
    xAxis: {
      type: 'timeCat',
      tickCount: 8,
      label: {
        formatter: (value: string) => {
          const parsed = moment(value);

          return parsed.isValid() ? parsed.format('HH:mm') : value;
        },
      },
    },
    yAxis: {
      min: 0,
      max: maxValue > 0 ? maxValue : undefined,
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      shared: true,
      showCrosshairs: true,
    },
    color: ['#1890ff', '#13c2c2'],
    lineStyle: {
      lineWidth: 2,
    },
    point: {
      size: 2,
      shape: 'circle',
    },
    padding: [60, 20, 40, 40],
    interactions: [{ type: 'element-active' }],
  };

  return !isLoading ? (
    <Card
      bordered={false}
      className="actual-power-card"
      extra={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'inherit',
          }}
        >
          <div
            className="flexBetween"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
            >
              <Option value="jack">All branch</Option>
              <Option value="lucy">Lucy</Option>
              <Option disabled value="disabled">
                Disabled
              </Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Space
              direction="vertical"
              size={12}
              style={{
                marginLeft: '26px',
              }}
            >
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                }}
              />
            </Space>
          </div>
        </div>
      }
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          Duration Curve
          <Button style={{ marginLeft: 'auto' }} type="link">
            <ExportOutlined
              style={{
                color: '#1890ff',
              }}
            />
          </Button>
          {dropdownGroup}
        </div>
      }
    >
      <div className="analysis-offline">
        <Row
          gutter={30}
          style={{
            margin: '8px 0',
          }}
        >
          <Col span={4}>
            <div className="analysis-item">
              <h6 className="analysis-title">Maximum</h6>
              <h3 className="analysis-title">1,336.96</h3>
            </div>
          </Col>
          <Col span={3}>
            <div className="analysis-item">
              <h6 className="analysis-title">Minimum</h6>
              <h3 className="analysis-title">76.44</h3>
            </div>
          </Col>
          <Col span={3}>
            <div className="analysis-item">
              <h6 className="analysis-title">Average</h6>
              <h3 className="analysis-title">563.60</h3>
            </div>
          </Col>
          <Col span={3}>
            <div className="analysis-item">
              <h6 className="analysis-title">Median </h6>
              <h3 className="analysis-title">534.34</h3>
            </div>
          </Col>
          <Col span={3}>
            <div className="analysis-item">
              <h6 className="analysis-title">Standard deviation</h6>
              <h3 className="analysis-title">294.59</h3>
            </div>
          </Col>
          <Col span={3}>
            <div
              className="analysis-item"
              style={{
                borderRight: 'none',
              }}
            >
              <h6 className="analysis-title">Consumption</h6>
              <h3 className="analysis-title">405,788.99 </h3>
            </div>
          </Col>
        </Row>
        <div style={{ height: 430 }}>
          <AntLine {...chartConfig} />
        </div>
      </div>
    </Card>
  ) : (
    <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
  );
}

export default DurationCurve;
