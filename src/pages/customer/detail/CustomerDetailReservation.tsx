import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Pagination, Row, Table, Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  incomingReservation: any;
  pastReservation: any;
  statusMapping: (status: string) => any;
}

function CustomerDetailReservation({ incomingReservation, pastReservation, statusMapping }: Props) {
  const { t } = useTranslation();

  const reservationsColumns = [
    {
      title: t('customerDetail.Folio ID'),
      dataIndex: 'folio_id',
      key: 'folio_id',
    },
    {
      title: t('customerDetail.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <div style={{ minWidth: 80 }}>
          {statusMapping(text)}
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </div>
      ),
    },
    {
      title: t('customerDetail.Created Date'),
      dataIndex: 'created_date',
      key: 'created_date',
    },
    {
      title: t('customerDetail.Source TA'),
      dataIndex: 'source_ta',
      key: 'source_ta',
    },
    {
      title: t('customerDetail.Checkin'),
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: t('customerDetail.Checkout'),
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: t('customerDetail.Booker Name'),
      dataIndex: 'booker_name',
      key: 'booker_name',
    },
    {
      title: t('customerDetail.Email'),
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: t('customerDetail.Phone'),
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: t('customerDetail.Total room'),
      dataIndex: 'total_room',
      key: 'total_room',
    },
    {
      title: t('customerDetail.Branch'),
      dataIndex: 'branch',
      key: 'branch',
    },
  ];

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="1" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Incoming reservations')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
            <Table
              columns={reservationsColumns}
              dataSource={incomingReservation}
              pagination={false}
              size="small"
            />
            <Pagination
              defaultCurrent={1}
              onChange={() => console.log('paginate Incoming reservations')}
              pageSize={10}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15 }}
              total={100}
            />
          </Col>
        </Row>
      </TabPane>
      <TabPane key="w" tab={t('customerDetail.Past reservations')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
            <Table
              columns={reservationsColumns}
              dataSource={pastReservation}
              pagination={false}
              size="small"
            />
            <Pagination
              defaultCurrent={1}
              onChange={() => console.log('paginate Past reservations')}
              pageSize={10}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15 }}
              total={100}
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailReservation;
