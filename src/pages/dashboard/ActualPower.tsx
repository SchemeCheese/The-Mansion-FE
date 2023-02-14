import 'styles/actual_power_card.css';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EllipsisOutlined, ExportOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Dropdown, Menu, Select, Space } from 'antd';
import moment from 'moment';
import { selectElectricPowerState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getElectricPowerAction } from 'actions';

import XYChartCard from './component/chart/XYChartCard';

const { Option } = Select;
const { RangePicker } = DatePicker;

function ActualPower() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getElectricPowerAction());
  }, []);

  const electricPower = useAppSelector(selectElectricPowerState);
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

  return (
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
          Actual Power
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
      <XYChartCard electricPower={electricPower.data} />
    </Card>
  );
}

export default ActualPower;
