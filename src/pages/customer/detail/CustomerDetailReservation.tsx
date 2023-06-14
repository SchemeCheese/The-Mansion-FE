/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer Detail Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Col, Pagination, Row, Table, Tabs } from 'antd';
import { formatNumber } from 'helpers';
import { getAPI } from 'helpers/apiService';
import { selectGetCustomerDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

const { TabPane } = Tabs;

interface Props {
  statusMapping: (status: string) => any;
}

function CustomerDetailReservation({ statusMapping }: Props) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [incomingReservations, setIncomingReservations]: any = useState();
  const [pastReservations, setPastReservations]: any = useState();

  const reservationsColumns = [
    {
      title: t('customerDetail.Folio ID'),
      dataIndex: 'folio_number',
      key: 'folio_number',
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
      dataIndex: 'booker_email',
      key: 'booker_email',
    },
    {
      title: t('customerDetail.Phone'),
      dataIndex: 'booker_phone',
      key: 'booker_phone',
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

  const pastReservationColumns = [
    {
      title: t('customerDetail.Folio ID'),
      dataIndex: 'folio_number',
      key: 'folio_number',
    },
    {
      title: t('customerDetail.Branch'),
      dataIndex: 'branch',
      key: 'branch',
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
      dataIndex: 'booker_email',
      key: 'booker_email',
    },
    {
      title: t('customerDetail.Phone'),
      dataIndex: 'booker_phone',
      key: 'booker_phone',
    },
    {
      title: t('customerDetail.Room revenue'),
      dataIndex: 'room_revenue',
      key: 'room_revenue',
      render: (text: number) => {
        return formatNumber(text);
      },
    },
    {
      title: t('customerDetail.Other revenue'),
      dataIndex: 'other_revenue',
      key: 'other_revenue',
      render: (text: number) => {
        return formatNumber(text);
      },
    },
    {
      title: t('customerDetail.Total spent'),
      dataIndex: 'total_spent',
      key: 'total_spent',
      render: (text: number) => {
        return formatNumber(text);
      },
    },
  ];

  const { data: customerData } = useAppSelector(selectGetCustomerDetail);

  async function fetchIncomingReservations(page: number) {
    const inComingReservationsResponse: any = await getAPI(
      `/api/v1/guests/${id}/get-reservations/incoming?current_page=${page}`,
    );

    setIncomingReservations(inComingReservationsResponse.data);
  }

  async function fetchPastReservations(page: number) {
    const pastReservationsResponse: any = await getAPI(
      `/api/v1/guests/${id}/get-reservations/past?current_page=${page}`,
    );

    setPastReservations(pastReservationsResponse.data);
  }

  useEffect(() => {
    fetchIncomingReservations(1);
    fetchPastReservations(1);
  }, []);

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="1" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Incoming reservations')}>
        <Row style={{ padding: 16 }}>
          <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
            {incomingReservations && (
              <>
                <Table
                  className="reservation-list"
                  columns={reservationsColumns}
                  dataSource={incomingReservations.data}
                  onRow={(record: any) => {
                    return {
                      onClick: () => {
                        window.open(`/reservation/${record.id}`, '_blank');
                      },
                    };
                  }}
                  pagination={false}
                  size="small"
                />
                <Pagination
                  defaultCurrent={1}
                  onChange={value => fetchIncomingReservations(value)}
                  pageSize={10}
                  showSizeChanger={false}
                  style={{ float: 'right', marginTop: 15 }}
                  total={incomingReservations.total}
                />
              </>
            )}
          </Col>
        </Row>
      </TabPane>
      <TabPane key="w" tab={t('customerDetail.Past reservations')}>
        <Row style={{ padding: 16 }}>
          {pastReservations && (
            <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
              <Table
                className="reservation-list"
                columns={pastReservationColumns}
                dataSource={pastReservations.data}
                pagination={false}
                size="small"
              />
              <Pagination
                defaultCurrent={1}
                onChange={value => fetchPastReservations(value)}
                pageSize={10}
                showSizeChanger={false}
                style={{ float: 'right', marginTop: 15 }}
                total={pastReservations.total}
              />
            </Col>
          )}
        </Row>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailReservation;
