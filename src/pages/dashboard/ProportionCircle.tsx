import 'styles/area_card_consumption.css';

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EllipsisOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Menu, Radio, RadioChangeEvent, Row, Select, Tabs } from 'antd';
import { selectElectricAreaState, selectWaterAreaState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getElectricAreaAction, getWaterAreaAction } from 'actions';

import Pie from './Pie';

const { Option } = Select;
const { TabPane } = Tabs;

function ProportionCircle() {
  const dispatch = useDispatch();
  const [tabActive, setTabActive] = useState('e');
  const [totalElectric, setTotalElectric] = useState(0);
  const [totalWater, setTotalWater] = useState(0);
  const [salesType, setSalesType] = useState('all');
  const electricArea = useAppSelector(selectElectricAreaState);
  const waterArea = useAppSelector(selectWaterAreaState);

  useEffect(() => {
    dispatch(getElectricAreaAction());
    dispatch(getWaterAreaAction());
  }, []);

  useEffect(() => {
    if (electricArea.data) {
      setTotalElectric(electricArea.data.reduce((pre, now) => now.y + pre, 0));
    }

    if (waterArea.data) {
      setTotalWater(waterArea.data.reduce((pre, now) => now.y + pre, 0));
    }
  }, [electricArea, waterArea]);

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

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  // @ts-ignore
  return (
    <Card
      bordered={false}
      className="area_card_consumption"
      extra={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 'inherit',
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
          <div
            style={{
              right: '54px',
              bottom: '12px',
            }}
          >
            <Radio.Group onChange={handleChangeSalesType} value={salesType}>
              <Radio.Button onClick={() => setTabActive('e')} value="all">
                Electricity
              </Radio.Button>
              <Radio.Button onClick={() => setTabActive('w')} value="online">
                water
              </Radio.Button>
              <Radio.Button onClick={() => setTabActive('a')} value="stores">
                other
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
      loading={false}
      style={{
        height: '100%',
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        color: 'rgba(0, 0, 0, 0.85)',
        fontSize: '14px',
        fontVariant: 'tabular-nums',
        lineHeight: '1.5715',
        listStyle: 'none',
        position: 'relative',
        background: '#fff',
        borderRadius: '2px',
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          Area M-T-D consumption
          <Button style={{ marginLeft: 'auto' }} type="link">
            <ExportOutlined
              style={{
                color: 'rgba(0, 0, 0, 0.45)',
              }}
            />
          </Button>
          {dropdownGroup}
        </div>
      }
    >
      <div>
        <br />
        <br />
        <br />
        <Tabs activeKey={tabActive} className="tab-circle" defaultActiveKey={tabActive}>
          <TabPane key="e" tab="Tab 1">
            {tabActive === 'e' && (
              <Pie
                // hasLegend
                animate
                data={electricArea.data}
                height={248}
                lineWidth={4}
                subTitle="Electric"
                total={totalElectric}
                valueFormat={value => value}
              />
            )}
          </TabPane>
          <TabPane key="w" tab="Tab 2">
            {tabActive === 'w' && (
              <Pie
                data={waterArea.data}
                height={248}
                lineWidth={4}
                subTitle="Water"
                total={totalWater}
                valueFormat={value => value}
              />
            )}
          </TabPane>
          <TabPane key="a" tab="Tab 3">
            Comming soon
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
}

export default ProportionCircle;
