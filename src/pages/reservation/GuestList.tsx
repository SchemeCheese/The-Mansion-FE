/** ***********************************
Module Name : Reservation
Developer Name : KienNT
Created Date : 28/08/2022
Updated Date : 30/08/2022
Main functions : Guest List Tab
************************************ */

import React from 'react';
import { Card, Col, Radio, Row, Typography } from 'antd';

const { Text, Title } = Typography;

const data = [
  {
    name: 'Wei Fang',
    check: true,
    id: '330212198903214921',
    nationality: 'China',
    place_of_issue: 'China',
    date: '2017-07-17',
    expire: '2017-07-17',
  },
  {
    name: 'Serati Ma',
    id: '330212198903214921',
    check: false,
    nationality: 'China',
    place_of_issue: 'China',
    date: '2017-07-17',
    expire: '2017-07-17',
  },
  {
    name: 'Kenneth Chan',
    id: '330212198903214921',
    check: false,
    nationality: 'China',
    place_of_issue: 'China',
    date: '2017-07-17',
    expire: '2017-07-17',
  },
  {
    name: 'Joey Tang',
    id: '330212198903214921',
    check: false,
    nationality: 'China',
    place_of_issue: 'China',
    date: '2017-07-17',
    expire: '2017-07-17',
  },
  {
    name: 'Ken Ng',
    id: '330212198903214921',
    check: false,
    nationality: 'China',
    place_of_issue: 'China',
    date: '2017-07-17',
    expire: '2017-07-17',
  },
];

function GuestList() {
  return (
    <Row
      className="guest-list"
      style={{
        paddingLeft: 16,
        paddingTop: 24,
        paddingBottom: 24,
        paddingRight: 16,
        backgroundColor: 'white',
      }}
    >
      <Col span={8}>
        <div
          style={{
            width: '95%',
            height: '95%',
            border: '2px dashed rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            cursor: 'pointer',
          }}
        >
          <p
            style={{
              position: 'absolute',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: 14,
              lineHeight: 22,
              color: 'rgba(0, 0, 0, 0.45)',
              margin: 0,
              top: '50%',
              left: '50%',
              msTransform: 'translate(-50%, -50%)',
              transform: 'translate(-50%, -50%)',
            }}
          >
            + Add New
          </p>
        </div>
      </Col>
      {data.map(value => (
        <Col span={8}>
          <Card
            actions={[<Text type="secondary">Remove</Text>, <Text type="secondary">Update</Text>]}
            className="guest-list-card"
            style={{
              width: '95%',
              marginBottom: 16,
              border: '1px solid rgba(0, 0, 0, 0.15)',
            }}
          >
            <Row>
              <Col span={12}>
                <Title level={5}>{value.name}</Title>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Radio checked={value.check} style={{ left: 15, fontSize: 13 }} value={1}>
                  Main Guest
                </Radio>
              </Col>
            </Row>
            <Row style={{ marginBottom: 12 }}>
              <Col span={12}>
                <Text style={{ fontSize: 12 }}>ID:</Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: 12 }}>{value.id}</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 12 }}>
              <Col span={12}>
                <Text style={{ fontSize: 12 }}>Nationality:</Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: 12 }}>{value.nationality}</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 12 }}>
              <Col span={12}>
                <Text style={{ fontSize: 12 }}>Place Of Issue:</Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: 12 }}>{value.place_of_issue}</Text>
              </Col>
            </Row>
            <Row style={{ marginBottom: 12 }}>
              <Col span={12}>
                <Text style={{ fontSize: 12 }}>Date Of Issue:</Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: 12 }}>{value.date}</Text>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Text style={{ fontSize: 12 }}>Visa Expire Date:</Text>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Text style={{ fontSize: 12 }}>{value.expire}</Text>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GuestList;
