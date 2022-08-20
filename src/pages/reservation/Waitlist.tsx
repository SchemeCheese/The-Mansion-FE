import React from 'react';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Dropdown, Input, Menu, Row, Select, Space, Table } from 'antd';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

const menu = (
  <Menu
    items={[
      {
        label: '1st menu item',
        key: '1',
        icon: <UserOutlined />,
      },
      {
        label: '2nd menu item',
        key: '2',
        icon: <UserOutlined />,
      },
      {
        label: '3rd menu item',
        key: '3',
        icon: <UserOutlined />,
      },
    ]}
  />
);

function Waitlist() {
  const dataWaitlist = [];

  for (let index = 0; index < 1000; index++) {
    dataWaitlist.push({
      folio_id: '1234',
      created_date: '12/08/2010',
      source_ta: 'Ming',
      checkin: '12/08/2010',
      checkout: '12/08/2010',
      booker_name: 'Ming',
      email: 'test@gmail.com',
      phone: '0989878765',
      total_room: '2',
      agent: '-',
    });
  }

  const columnsWaitlist = [
    {
      title: 'Folio ID',
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: 'Created Date',
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: 'Source TA',
      dataIndex: 'source_ta',
      key: 'source_ta',
    },
    {
      title: 'Checkin',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Booker Name',
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Total Room',
      dataIndex: 'total_room',
      key: 'total_room',
    },
    {
      title: 'Agent',
      dataIndex: 'agent',
      key: 'agent',
    },
  ];

  return (
    <Row style={{ background: 'white', padding: 16 }}>
      <Col span={24}>
        <Input.Group>
          <Row gutter={8}>
            <Col span={5}>
              <MInput placeholder="Email/Phone/Name" />
            </Col>
            <Col span={3}>
              <MInput placeholder="Folio ID" />
            </Col>
            <Col span={4}>
              <MInput placeholder="Travel Agent" />
            </Col>
            <Col span={3}>
              <Select defaultValue="Zhejiang" style={{ width: '100%' }}>
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Select defaultValue="Zhejiang" style={{ width: '100%' }}>
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Select defaultValue="Zhejiang" style={{ width: '100%' }}>
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Col>
            <Col span={3}>
              <Dropdown overlay={menu} trigger={['click']}>
                <button onClick={e => e.preventDefault()} style={{ float: 'right' }} type="button">
                  <Space
                    style={{
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '17px',
                      textAlign: 'center',
                      paddingTop: 7,
                    }}
                  >
                    <span style={{ paddingRight: 6 }}>Show more</span>
                    <DownOutlined />
                  </Space>
                </button>
              </Dropdown>
            </Col>
          </Row>
        </Input.Group>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <PattonButton>
          {' '}
          <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> New
        </PattonButton>
      </Col>
      <Col span={24} style={{ paddingTop: 16 }}>
        <Table columns={columnsWaitlist} dataSource={dataWaitlist} />
      </Col>
    </Row>
  );
}

export default Waitlist;
