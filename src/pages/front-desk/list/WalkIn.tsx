import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Checkbox, Col, message, Modal, Pagination, Row, Select } from 'antd';

import MInput from 'components/MInput';

import RoomInfo from './RoomInfo';

const { Option } = Select;

function WalkIn() {
  const { t } = useTranslation();

  return (
    <Row style={{ background: 'white', padding: 8 }}>
      <Col span={24} style={{ paddingLeft: 8, paddingTop: 10 }}>
        <MInput
          placeholder={t('common.Room Number')}
          style={{
            width: 200,
          }}
        />
        <Select
          allowClear
          placeholder={t('common.Room Type')}
          style={{
            width: 200,
            marginLeft: 15,
          }}
        >
          <Option value="1">Premium Alex</Option>
          <Option value="2">Superior Double</Option>
          <Option value="3">Deluxe with Balcony</Option>
          <Option value="4">Studio Twin</Option>
          <Option value="5">Studio Double</Option>
          <Option value="6">Royal Family</Option>
        </Select>
        <Checkbox
          style={{
            marginLeft: 35,
          }}
        >
          Smocking Room
        </Checkbox>
      </Col>
      <RoomInfo />
      <RoomInfo />
      <RoomInfo />
      <RoomInfo />
      <RoomInfo />
      <RoomInfo />
      <Col span={24} style={{ paddingTop: 20 }}>
        <Pagination defaultCurrent={1} style={{ float: 'right', paddingRight: 8 }} total={50} />
      </Col>
    </Row>
  );
}

export default WalkIn;
