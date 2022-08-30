/** ***********************************
Module Name : Reservation
Developer Name : HangNTT
Created Date : 24/08/2022
Updated Date : 26/08/2022
Main functions : Reservation List Page
************************************ */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Input, Row, Select, Table } from 'antd';
import moment from 'moment';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

function Reserved() {
  const [showMore, setShowMore] = useState(false);

  function handleChange() {
    setShowMore(!showMore);
  }

  const dataWaitlist = [];

  for (let index = 0; index < 100; index++) {
    dataWaitlist.push(
      {
        id: index,
        folio_id: '2944',
        status: 'Reserved',
        source_ta: 'Trang',
        checkin: '12/08/2010',
        checkout: '12/08/2010',
        booker_name: 'Du Vu',
        email: 'du.vu@gmail.com',
        phone: '0989878765',
        total_room: '2',
        agent: '-',
      },
      {
        id: index,
        folio_id: '2944',
        status: 'Inhouse',
        source_ta: 'Trang',
        checkin: '12/08/2010',
        checkout: '12/08/2010',
        booker_name: 'Du Vu',
        email: 'du.vu@gmail.com',
        phone: '0989878765',
        total_room: '2',
        agent: '-',
      },
      {
        id: index,
        folio_id: '2944',
        status: 'Checkout',
        source_ta: 'Trang',
        checkin: '12/08/2010',
        checkout: '12/08/2010',
        booker_name: 'Du Vu',
        email: 'du.vu@gmail.com',
        phone: '0989878765',
        total_room: '2',
        agent: '-',
      },
      {
        id: index,
        folio_id: '2944',
        status: 'Cancelled',
        source_ta: 'Trang',
        checkin: '12/08/2010',
        checkout: '12/08/2010',
        booker_name: 'Du Vu',
        email: 'du.vu@gmail.com',
        phone: '0989878765',
        total_room: '2',
        agent: '-',
      },
    );
  }

  // const colorArray = [
  //   {
  //     value: 'Reserved',
  //     color: '#1D39C4',
  //   },
  //   {
  //     value: 'Inhouse',
  //     color: '#52C41A',
  //   },
  //   {
  //     value: 'Checkout',
  //     color: '#9254DE',
  //   },
  //   {
  //     value: 'Cancelled',
  //     color: '#F5222D',
  //   },
  // ];

  const columnsWaitlist = [
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
            <circle
              cx="3"
              cy="3"
              // fill={colorArray
              //   .filter(item => item.value === text)
              //   .map(_item => {
              //     return _item.color;
              //   })}
              r="3"
            />
          </svg>
          {text}
        </span>
      ),
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

  const navigate = useNavigate();

  const handleClickRow = (id: number) => {
    navigate(`/reservation/${id}`);
  };

  return (
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
              <Button onClick={() => handleChange()} style={{ color: '#1D39C4' }} type="text">
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
        <Table
          columns={columnsWaitlist}
          dataSource={dataWaitlist}
          onRow={record => {
            return {
              onClick: () => handleClickRow(record.id),
            };
          }}
        />
      </Col>
    </Row>
  );
}

export default Reserved;
