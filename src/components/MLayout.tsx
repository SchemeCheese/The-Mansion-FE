import 'antd/dist/antd.min.css';
import './layout.css';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Menu } from 'antd';

import { logOut } from 'actions';

import Footer from 'components/Footer';

const { Content, Header, Sider } = Layout;

interface Props {
  children: React.ReactElement;
}

function MLayout(props: Props) {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  const dates = [];

  for (let index = 0; index < 10; index++) {
    const bgColor = index === 2 || index === 1 ? '#FFF2E8' : '#FFFFFF';

    dates.push(
      <Col
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

  const menu = (
    <Menu
      items={[
        {
          label: (
            <button onClick={handleClickLogout} type="button">
              Logout
            </button>
          ),
          key: '0',
        },
      ]}
    />
  );

  return (
    <Layout>
      <Sider collapsed={collapsed} collapsible trigger={null}>
        <div className="logo" />
        <Menu
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
          mode="inline"
          theme="dark"
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div style={{ float: 'right', paddingRight: '15px' }}>
            <Button style={{ marginRight: 28, fontSize: 12 }}>Switch Branch</Button>
            <span style={{ marginRight: 28, fontSize: 12 }}>System Date 19/05/2021</span>
            <SearchOutlined style={{ marginRight: 28 }} />
            <BellOutlined style={{ marginRight: 28 }} />
            <Dropdown overlay={menu} placement="bottom" trigger={['click']}>
              <Avatar src="https://joeschmoe.io/api/v1/random" style={{ marginRight: 28 }} />
            </Dropdown>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default MLayout;
