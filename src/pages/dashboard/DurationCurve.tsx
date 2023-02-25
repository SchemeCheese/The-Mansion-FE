/** ***********************************
Module Name : Duration Curve
Developer Name : HanhTV
Created Date : 21/02/2023
Updated Date : 21/02/2023
Main functions : Duration Curve
************************************ */

import 'styles/duration_curve.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisOutlined, ExportOutlined } from '@ant-design/icons';
import DataSet from '@antv/data-set';
import { Button, Card, Col, DatePicker, Dropdown, Menu, Row, Select, Space, Spin } from 'antd';
import { Axis, Chart, Geom, Legend, Line, Tooltip } from 'bizcharts';
import moment from 'moment';
import { selectDurationCurveState } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { getDurationCurveAction } from 'actions';

import { RootState } from 'types';

const { Option } = Select;
const { RangePicker } = DatePicker;

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

  const data = Array.isArray(dataDuration) ? [...dataDuration] : [{ x: 0, y1: 0, y2: 0 }];

  data.sort((a, b) => a.x - b.x);
  const titleMap = {
    y1: 'Electric',
    y2: 'Water',
  };

  const ds = new DataSet({
    state: {
      start: data[0] && data[0].x ? data[0].x : '',
      end: data[data.length - 1] ? data[data.length - 1].x : '',
    },
  });
  const dv = ds.createView().source(data);

  dv.transform({
    type: 'filter',
    callback: (object: { x: string }) => {
      const date = object.x;

      return date <= ds.state.end && date >= ds.state.start;
    },
  });
  dv.transform({
    type: 'map',
    callback(row: { Electric: string; Water: string; y1: string; y2: string }) {
      const newRow = { ...row };

      newRow.Electric = row.y1;
      newRow.Water = row.y2;

      return newRow;
    },
  });
  dv.transform({
    type: 'fold',
    fields: [titleMap.y1, titleMap.y2], // 展开字段集
    key: 'key', // key字段
    value: 'value', // value字段
  });
  const timeScale = {
    type: 'time',
    tickInterval: 60 * 60 * 1000,
    mask: 'HH:mm',
    range: [0, 1],
  };
  let max;

  if (data[0] && data[0].y1 && data[0].y2) {
    max = Math.max(
      [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
      [...data].sort((a, b) => b.y2 - a.y2)[0].y2,
    );
  }

  const cols = {
    x: timeScale,
    value: {
      max,
      min: 0,
    },
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
                  Today: [moment(), moment()], // 'This 2.Septh': [moment().startOf('2.Septh'), moment().endOf('2.Septh')],
                }} // onChange={handleChange}
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
          <Chart autoFit data={dv} height={400} padding={[60, 20, 40, 40]} scale={cols}>
            <Tooltip shared showCrosshairs />
            <Legend itemHeight={50} name="key" position="top" />
            <Geom color="key" position="x*value" size={2} type="line" />
          </Chart>
        </div>
      </div>
    </Card>
  ) : (
    <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
  );
}

export default DurationCurve;
