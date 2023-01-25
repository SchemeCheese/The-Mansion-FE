/** ***********************************
Module Name : Night Audit
Developer Name : MinhNV
Created Date : 01/01/2023
Updated Date : 01/01/2023
Main functions : Night Audit Index
************************************ */

import 'styles/night_audit.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Form, Modal, Row, Select, Switch, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ColumnsType } from 'antd/lib/table';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

interface DataType {
  address: string;
  age: number;
  key: React.Key;
  name: string;
}

const { Option } = Select;

function NightAudit() {
  const { t } = useTranslation();
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);

  const showModal = () => {
    setIsPaymentMethodModalOpen(true);
  };

  const handleOk = () => {
    setIsPaymentMethodModalOpen(false);
  };

  const handleCancel = () => {
    setIsPaymentMethodModalOpen(false);
  };

  const checkinTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Folio ID'),
      dataIndex: 'name',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'age',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'address',
    },
    {
      title: t('common.Booker Via'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkin'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'address',
    },
    {
      title: t('common.Total Guest'),
      dataIndex: 'address',
    },
    {
      title: t('common.Status'),
      dataIndex: 'address',
    },
    {
      title: '',
      dataIndex: 'address',
    },
  ];

  const checkoutTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Room No'),
      dataIndex: 'age',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'address',
    },
    {
      title: t('common.Booking Number'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkin'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'address',
    },
    {
      title: t('common.Total Guest'),
      dataIndex: 'address',
    },
    {
      title: t('common.Remain'),
      dataIndex: 'address',
    },
    {
      title: t('common.Status'),
      dataIndex: 'address',
    },
  ];

  const inhouseTodayColumns: ColumnsType<DataType> = [
    {
      title: t('reservation.Room No'),
      dataIndex: 'age',
    },
    {
      title: t('common.Booker Name'),
      dataIndex: 'address',
    },
    {
      title: t('common.Booking Number'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkin'),
      dataIndex: 'address',
    },
    {
      title: t('reservation.Checkout'),
      dataIndex: 'address',
    },
    {
      title: t('common.Total Guest'),
      dataIndex: 'address',
    },
    {
      title: t('common.Rate'),
      dataIndex: 'address',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'address',
    },
  ];

  const data: DataType[] = [];

  for (let index = 0; index < 8; index++) {
    data.push({
      key: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
    });
  }

  useEffect(() => {
    // const dispatch = useDispatch();
  }, []);

  return (
    <>
      <p className="title">{t('nightAudit.Night Audit')}</p>
      <Button onClick={showModal}>Payment Method</Button>
      <Modal
        okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
        okText={t('common.Save')}
        onCancel={handleCancel}
        onOk={handleOk}
        title={<b>{t('common.Payment Method')}</b>}
        visible={isPaymentMethodModalOpen}
        width={430}
      >
        <Form>
          <Form.Item
            label={t('nightAudit.Charge Money')}
            name="switch"
            style={{ textAlign: 'right' }}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item className="payment-method-vertical-field" label={t('common.Amount')}>
            <MInput />
          </Form.Item>

          <Form.Item className="payment-method-vertical-field" label={t('common.Currency')}>
            <Select placeholder={t('common.Currency')}>
              <Option value="1">VND</Option>
              <Option value="2">USD</Option>
            </Select>
          </Form.Item>

          <Form.Item className="payment-method-vertical-field" label={t('common.Payment Method')}>
            <Select placeholder={t('common.Payment Method')}>
              <Option value="1">Cash</Option>
            </Select>
          </Form.Item>

          <Form.Item className="payment-method-vertical-field" label={t('common.Notes')}>
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span={12}>
          <p className="title">
            {' '}
            <span style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.45)' }}>
              {t('nightAudit.Current Date')}:{' '}
            </span>
            <span style={{ fontSize: 13, color: 'rgba(0, 0, 0, 0.85)' }}>27/12/2022</span>
          </p>
        </Col>
        <Col span={12} style={{ textAlign: 'right', paddingRight: 20, paddingBottom: 10 }}>
          <PattonButton>{t('nightAudit.Process Night Audit')}</PattonButton>
        </Col>
      </Row>
      <Row className="content">
        <Card bordered={false} style={{ width: '100%' }} title={t('nightAudit.I. Checkin Today')}>
          <Table columns={checkinTodayColumns} dataSource={data} pagination={false} size="middle" />
        </Card>
        <Card
          bordered={false}
          style={{ width: '100%', marginTop: 20 }}
          title={t('nightAudit.II. Checkout Today')}
        >
          <Table
            columns={checkoutTodayColumns}
            dataSource={data}
            pagination={false}
            size="middle"
          />
        </Card>
        <Card
          bordered={false}
          style={{ width: '100%', marginTop: 20 }}
          title={t('nightAudit.III. Inhouse')}
        >
          <Table columns={inhouseTodayColumns} dataSource={data} pagination={false} size="middle" />
        </Card>
      </Row>
    </>
  );
}

export default NightAudit;
