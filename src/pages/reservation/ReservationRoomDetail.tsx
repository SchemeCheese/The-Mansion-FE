/** ***********************************
Module Name : Reservation
Developer Name : HangNTT
Created Date : 24/08/2022
Updated Date : 26/08/2022
Main functions : Reservation Room Detail Page
************************************ */

import React, { useState } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select, Table } from 'antd';
import moment from 'moment';

import BreadcrumbList from 'components/BreadcrumbList';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

function ReservationRoomDetail() {
  const [showMore, setShowMore] = useState(false);

  const breadcrumbData = ['Home', 'List', 'Detail'];

  const dataWaitlistDetail = [];

  for (let index = 0; index < 3; index++) {
    dataWaitlistDetail.push({
      folio_id: '2944',
      status: 'Waitlist',
      created_date: '12/08/2010',
      source_ta: 'Trang',
      checkin: '12/08/2010',
      checkout: '12/08/2010',
      guest_name: 'Du Vu',
      room_no: '202',
      room_type: 'Deluxe',
      sub_total: '3,000,000',
    });
  }

  const columnsWaitlistDetail = [
    {
      title: 'Folio ID',
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <span>
          <svg
            fill="none"
            height="6"
            style={{ marginRight: 4 }}
            viewBox="0 0 6 6"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="3" cy="3" fill="black" fillOpacity="0.25" r="3" />
          </svg>
          {text}
        </span>
      ),
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
      title: 'Guest Name',
      dataIndex: 'guest_name',
      key: 'guest_name',
    },
    {
      title: 'Room No',
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: 'Room Type',
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: 'Subtotal (VND)',
      dataIndex: 'sub_total',
      key: 'sub_total',
    },
  ];

  return (
    <>
      <BreadcrumbList data={breadcrumbData} />
      <p className="title">Reservation Detail</p>

      {/* <Tabs defaultActiveKey="1" style={{ minHeight: '90%' }}>
        <TabPane key="1" tab="Waitlist">
          <Waitlist />
        </TabPane>
        <TabPane key="2" tab="Reserved">
          Content of Tab Pane 2
        </TabPane>
        <TabPane key="3" tab="Calendar">
          Content of Tab Pane 3
        </TabPane>
        <TabPane key="4" tab="Channel Manager">
          Content of Tab Pane 4
        </TabPane>
      </Tabs> */}
      <Row style={{ background: 'white', padding: 16 }}>
        <Col span={24}>
          <Input.Group>
            <Row gutter={8}>
              <Col span={5}>
                <MInput placeholder="Email/Phone/Name" style={{ height: 32, fontSize: 12 }} />
              </Col>
              <Col span={3}>
                <MInput placeholder="Folio ID" style={{ height: 32, fontSize: 12 }} />
              </Col>
              <Col span={4}>
                <MInput placeholder="Travel Agent" style={{ height: 32, fontSize: 12 }} />
              </Col>
              <Col span={3}>
                <Select defaultValue="Zhejiang" style={{ width: '100%', fontSize: 12 }}>
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Col>
              <Col span={3}>
                <Select defaultValue="Zhejiang" style={{ width: '100%', fontSize: 12 }}>
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Col>
              <Col span={3}>
                <Select defaultValue="Zhejiang" style={{ width: '100%', fontSize: 12 }}>
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Col>
              <Col span={3} style={{ textAlign: 'center' }}>
                <Button
                  onClick={() => setShowMore(!showMore)}
                  style={{ color: '#1D39C4' }}
                  type="text"
                >
                  <span style={{ paddingRight: 6 }}>Show more</span>
                  <DownOutlined />
                </Button>
              </Col>
            </Row>
            {showMore ? (
              <Row gutter={8} style={{ paddingTop: 16 }}>
                <Col span={8}>
                  <span style={{ paddingRight: 11 }}>C/I</span>
                  <DatePicker
                    defaultValue={moment('2017-08-08')}
                    style={{
                      height: 32,
                      borderRadius: 4,
                      marginRight: 11,
                      width: '40%',
                    }}
                  />
                  <DatePicker
                    defaultValue={moment('2017-08-08')}
                    style={{ height: 32, borderRadius: 4, width: '40%' }}
                  />
                </Col>
                <Col span={8}>
                  <span style={{ paddingRight: 11 }}>C/O</span>
                  <DatePicker
                    defaultValue={moment('2017-08-08')}
                    style={{
                      height: 32,
                      borderRadius: 4,
                      marginRight: 11,
                      width: '40%',
                    }}
                  />
                  <DatePicker
                    defaultValue={moment('2017-08-08')}
                    style={{ height: 32, borderRadius: 4, width: '40%' }}
                  />
                </Col>
                <Col span={8}>
                  <span style={{ paddingRight: 11 }}>I/H</span>
                  <DatePicker
                    defaultValue={moment('2017-08-08')}
                    style={{
                      height: 32,
                      borderRadius: 4,
                      width: '40%',
                    }}
                  />
                </Col>
              </Row>
            ) : null}
          </Input.Group>
        </Col>
        <Col span={24} style={{ paddingTop: 16 }}>
          <PattonButton>
            {' '}
            <PlusOutlined style={{ marginLeft: 0, marginRight: 8 }} /> New
          </PattonButton>
        </Col>
        <Col span={24} style={{ paddingTop: 16 }}>
          <Table columns={columnsWaitlistDetail} dataSource={dataWaitlistDetail} />
        </Col>
      </Row>
    </>
  );
}

export default ReservationRoomDetail;
