import React from 'react';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  DownOutlined,
  LeftOutlined,
  RedoOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, DatePicker, Dropdown, Menu, Row, Space, Table, Tag } from 'antd';

import { colors } from 'modules/theme';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

const onChange = (date: any, dateString: string) => {
  console.log(date, dateString);
};

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

function ChannelManagement() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_: any, { tags }: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === 'loser') {
              color = 'volcano';
            }

            return (
              <Tag key={tag} color={color}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <p>Invite {record.name}</p>
          <p>Delete</p>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const dates = [];

  for (let index = 0; index < 10; index++) {
    const bgColor = index === 2 || index === 1 ? '#FFF2E8' : '#FFFFFF';

    dates.push(
      <Col
        key={index}
        flex={1}
        style={{
          border: '1px solid #E8E8E8',
          borderRightStyle: 'none',
          textAlign: 'center',
          backgroundColor: bgColor,
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          Fri
        </p>
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          27
        </p>
        <p
          style={{
            margin: 0,
            color: 'rgba(0, 0, 0, 0.45)',
          }}
        >
          NOV
        </p>
      </Col>,
    );
  }

  return (
    <>
      <Row style={{ paddingBottom: 20 }}>
        <Col offset={16} span={8}>
          <div style={{ float: 'right' }}>
            <PattonButton>Bulk Update</PattonButton>
            <MButton icon={<RedoOutlined />} style={{ marginLeft: 10 }}>
              Search
            </MButton>
            <PattonButton style={{ marginLeft: 10 }}>Save</PattonButton>
          </div>
        </Col>
      </Row>
      <Row style={{ backgroundColor: '#FFFFFF' }}>
        <Col
          span={8}
          style={{
            border: '1px solid #FFF2E8',
            borderRightStyle: 'none',
            textAlign: 'center',
            paddingTop: 18,
            color: colors.pattron,
            fontWeight: 'bold',
          }}
        >
          <Space size="middle">
            <RedoOutlined />
            <DoubleLeftOutlined />
            <LeftOutlined />
            <DatePicker onChange={onChange} />
            <RightOutlined />
            <DoubleRightOutlined />
          </Space>
        </Col>
        <Col span={16}>
          <Row>{dates}</Row>
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col span={24}>
          <Space size="middle">
            <Dropdown overlay={menu}>
              <Button>
                <Space>
                  Button
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown overlay={menu}>
              <Button>
                <Space>
                  Button
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Dropdown overlay={menu}>
              <Button>
                <Space>
                  Button
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </Col>
      </Row>
      <Row style={{ paddingTop: 20 }}>
        <Col span={24}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}

export default ChannelManagement;
