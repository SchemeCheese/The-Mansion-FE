/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer Detail Page
************************************ */

import 'styles/customer_detail.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row, Space } from 'ui/antd';
import { formatNumber } from 'helpers';
import CustomerDetailAbout from 'pages/customer/detail/CustomerDetailAbout';
import CustomerDetailFeedback from 'pages/customer/detail/CustomerDetailFeedback';
import CustomerDetailInformation from 'pages/customer/detail/CustomerDetailInformation';
import CustomerDetailInvoiceInfo from 'pages/customer/detail/CustomerDetailInvoiceInfo';
import CustomerDetailReservation from 'pages/customer/detail/CustomerDetailReservation';
import { selectGetCustomerDetail } from 'selectors';
import styled from 'styled-components';

import { useAppSelector } from 'modules/hooks';

import { getCustomerDetailAction } from 'actions';
import layoutStyles from 'components/layout.module.css';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

import { customerLevelMapping } from '../list/CustomerList';

const BreadscrumTitle = styled.p`
  color: rgba(0 0 0 85%);
  font-size: 14px;
  line-height: 22px;
`;

const BreadscrumData = styled.p`
  color: rgba(0 0 0 65%);
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
`;

function CustomerDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: customerData } = useAppSelector(selectGetCustomerDetail);

  const [directFeedbackState, setDirectFeedbackState] = useState<any>([
    {
      status: 'waitlist',
      created_date: '12/08/2020',
      type: 1,
      in_charge: 'Du Vu',
      branch: 'TMHA',
    },
  ]);

  const [socialFeedbackState, setSocialFeedbackState] = useState<any>([
    {
      created_date: '11/04/2023',
      platform: 'Google Profile',
      branch: 'TMHA',
      reviewer: 'Reviewer',
      star: '5 stars',
      comment:
        '- Mình có xuống nhờ các bạn support lúc đêm muộn mà vẫn được hỗ trợ rất nhiệt tình. - Phòng rất xinh, đầy đủ tiện nghi.',
    },
  ]);

  const [incomingReservationsState, setIncomingReservationsState] = useState<any>([
    {
      folio_id: '2944',
      status: 'waitlist',
      created_date: '12/08/2020',
      source_ta: 'Trang',
      checkin: '12/08/2020',
      checkout: '12/08/2020',
      booker_name: 'Du Vu',
      email: 'du.vu@gmail.com',
      phone: '091 234 5678',
      total_room: '1',
      branch: 'TMHA',
    },
  ]);

  const [pastReservationState, setPastReservationState] = useState<any>([
    {
      folio_id: '2944',
      branch: 'TMHA',
      checkin: '12/08/2020',
      checkout: '12/08/2020',
      booker_name: 'Du Vu',
      email: 'du.vu@gmail.com',
      phone: '091 234 5678',
      room_revenue: '2.000.000',
      other_revenue: '1.300.000',
      total_spent: '3.300.000',
    },
    {
      folio_id: '2944',
      branch: 'TMHA',
      checkin: '12/08/2020',
      checkout: '12/08/2020',
      booker_name: 'Du Vu',
      email: 'du.vu@gmail.com',
      phone: '091 234 5678',
      room_revenue: '2.000.000',
      other_revenue: '1.300.000',
      total_spent: '3.300.000',
    },
  ]);

  const statusMapping = (status: string) => {
    const svgStatus = {
      checkout: (
        <svg
          fill="none"
          height="6"
          style={{ marginRight: 6, position: 'relative', top: -2 }}
          viewBox="0 0 6 6"
          width="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" fill="#9254DE" r="3" />
        </svg>
      ),
      reserved: (
        <svg
          fill="none"
          height="6"
          style={{ marginRight: 6, position: 'relative', top: -2 }}
          viewBox="0 0 6 6"
          width="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" fill="#1D39C4" r="3" />
        </svg>
      ),
      canceled: (
        <svg
          fill="none"
          height="6"
          style={{ marginRight: 6, position: 'relative', top: -2 }}
          viewBox="0 0 6 6"
          width="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" fill="#F5222D" r="3" />
        </svg>
      ),
      inhouse: (
        <svg
          fill="none"
          height="6"
          style={{ marginRight: 6, position: 'relative', top: -2 }}
          viewBox="0 0 6 6"
          width="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" fill="#52C41A" r="3" />
        </svg>
      ),
    };

    if (
      status === 'checkout' ||
      status === 'reserved' ||
      status === 'canceled' ||
      status === 'inhouse'
    ) {
      return svgStatus[status];
    }

    return (
      <svg
        fill="none"
        height="6"
        style={{ marginRight: 6, position: 'relative', top: -2 }}
        viewBox="0 0 6 6"
        width="6"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" fill="black" fillOpacity="0.25" r="3" />
      </svg>
    );
  };

  useEffect(() => {
    dispatch(
      getCustomerDetailAction({
        id: String(id),
      }),
    );
  }, []);

  return (
    <>
      <Row
        className={layoutStyles.customBgHeader}
        style={{ paddingRight: 20, paddingLeft: 20, paddingBottom: 35 }}
      >
        <Col span={8}>
          <svg
            fill="none"
            height="20"
            viewBox="0 0 18 20"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0148 3.43912L9.4037 14.9198L4.60435 4.75035C4.42343 4.18284 4.20583 3.66109 3.95156 3.18511C2.8269 1.11186 1.75603 0.0500579 0.736505 0.00200232C0.421112 -0.0140162 0.257303 0.0660764 0.247523 0.24228C0.242633 0.333815 0.381993 0.441368 0.663158 0.562651C1.08613 0.73199 1.41374 0.910482 1.64846 1.09584C2.26946 1.56953 2.57508 1.90821 2.5653 2.10958C2.56285 2.13704 2.4895 2.18052 2.34281 2.24002C2.19611 2.29952 2.11788 2.41165 2.1081 2.57183C2.09587 2.77321 2.28902 3.08443 2.68265 3.50777C3.25476 4.11419 3.65084 4.59246 3.87821 4.938L3.932 5.14166L3.82442 5.13709C3.72418 5.13251 3.60683 5.0959 3.4748 5.02953C3.34033 4.96317 3.25965 4.92885 3.23276 4.92656C2.91736 4.91054 2.74866 5.07759 2.7291 5.42771C2.71933 5.58789 2.9736 6.00895 3.49192 6.68631C3.72663 6.99295 3.90511 7.22865 4.03224 7.40028V7.92431C3.99312 7.89914 3.92466 7.83278 3.82442 7.72294C3.69484 7.58106 3.5457 7.50783 3.37212 7.49868C2.95648 7.47808 2.73644 7.68403 2.71199 8.11425C2.69977 8.32935 2.78045 8.58336 2.95159 8.87398C3.24498 9.29275 3.5457 9.70466 3.85621 10.1097C3.92466 10.2127 3.9809 10.3134 4.03224 10.4141V11.588C3.53592 10.6292 2.96626 10.128 2.32325 10.096C1.83427 10.0731 1.58 10.2493 1.56044 10.6246C1.54577 10.906 1.90517 11.6772 2.64353 12.9381C3.37945 14.199 3.73641 15.0503 3.71196 15.4942C3.70951 15.5354 3.6924 15.5812 3.66061 15.6338C3.5237 15.5194 3.38434 15.2768 3.24743 14.9061C3.07384 14.4004 2.92714 14.0434 2.80979 13.8352C2.65331 13.5583 2.42349 13.3111 2.12766 13.096C1.82938 12.8786 1.58733 12.7665 1.40152 12.7573C0.897869 12.7322 0.631374 13.0159 0.59959 13.6086C0.580031 13.945 0.822076 14.3935 1.32328 14.9564C1.93451 15.6315 2.32569 16.2105 2.50173 16.691L2.47483 16.81C2.38926 16.8054 2.31592 16.7963 2.25968 16.7803C1.89295 16.627 1.55066 16.4302 1.23527 16.1853C0.958991 15.9839 0.812297 15.8832 0.797627 15.8809C0.293976 15.8581 0.0274815 16.0938 0.000587477 16.5926C-0.0116371 16.8352 0.166841 17.0778 0.543357 17.3249C1.44553 17.9061 1.87828 18.5538 1.83916 19.2654C1.83427 19.373 1.8196 19.4737 1.80248 19.5675L1.81471 19.7506C1.91006 19.849 2.02986 19.9016 2.17411 19.9085C2.54818 19.9268 3.06406 19.0274 3.72418 17.2151C4.59701 14.842 5.086 12.8328 5.19602 11.1784L9.36214 20L14.0344 10.4049L15.5575 19.3226H18L15.0148 3.43912Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
          <span style={{ paddingLeft: 10, fontSize: 20 }}>
            <span style={{ paddingRight: 16 }}>
              {`${customerData?.first_name} ${customerData?.last_name}`}
            </span>
          </span>

          <span
            style={{
              fontSize: 14,
            }}
          >
            {customerLevelMapping(customerData?.client_rank?.toString())}
          </span>
        </Col>
        <Col span={16} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <>
              <div>
                {customerData?.telephone_number1 && (
                  <>
                    <svg
                      fill="none"
                      height="16"
                      style={{ position: 'absolute', top: 6 }}
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect fill="#DFD4FF" height="16" opacity="0.01" width="16" />
                      <rect
                        fill="#885EFE"
                        height="13.3333"
                        opacity="0.01"
                        width="13.3333"
                        x="1.33325"
                        y="1.33398"
                      />
                      <path
                        d="M4.01473 7.10435C5.0814 9.20065 6.79992 10.9118 8.89622 11.9858L10.5258 10.3562C10.7258 10.1562 11.0221 10.0895 11.2814 10.1784C12.111 10.4525 13.0073 10.6007 13.9258 10.6007C14.3333 10.6007 14.6666 10.934 14.6666 11.3414V13.9266C14.6666 14.334 14.3333 14.6673 13.9258 14.6673C6.97029 14.6673 1.33325 9.03028 1.33325 2.07473C1.33325 1.66732 1.66659 1.33398 2.07399 1.33398H4.66659C5.07399 1.33398 5.40733 1.66732 5.40733 2.07473C5.40733 3.00065 5.55547 3.88954 5.82955 4.71917C5.91103 4.97843 5.85177 5.26732 5.64436 5.47473L4.01473 7.10435Z"
                        fill="black"
                        fillOpacity="0.45"
                      />
                    </svg>
                    <span style={{ paddingLeft: 25 }}>{customerData?.telephone_number1}</span>
                  </>
                )}
              </div>
              <PattonButton
                onClick={() => {
                  navigate('/reservation/create', {
                    state: {
                      reservationInfo: {
                        booker: customerData,
                      },
                    },
                  });
                }}
              >
                {t('customerDetail.New reservation')}
              </PattonButton>
            </>
          </Space>
        </Col>
        <Col span={24} style={{ padding: '25px 0 0 28px' }}>
          <div className="customer-detail-tag">
            {customerData &&
              customerData.labels &&
              customerData.labels.map((item: string) => <span>{item}</span>)}
          </div>
        </Col>
      </Row>
      <Row
        className={layoutStyles.customBgHeader}
        justify="space-between"
        style={{ paddingRight: 20, paddingLeft: 20 }}
      >
        <Col span={6} style={{ paddingLeft: 30 }}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Total Visits')}</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>{customerData.reservation_info?.total_visit}</BreadscrumData>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Total room night')}</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>{customerData.reservation_info?.total_night}</BreadscrumData>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Total Spent')}</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>
                {formatNumber(customerData.reservation_info?.total_spent)} VND
              </BreadscrumData>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Average spent')}</BreadscrumTitle>
            </Col>
            <Col span={12}>
              <BreadscrumData>
                {formatNumber(customerData.reservation_info?.avg_spent)} VND
              </BreadscrumData>
            </Col>
          </Row>
        </Col>
        <Col span={8} style={{ paddingRight: 20 }}>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Total Noshow')}</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <BreadscrumData>{customerData.reservation_info?.total_noshow}</BreadscrumData>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <BreadscrumTitle>{t('customerDetail.Total cancel')}</BreadscrumTitle>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <BreadscrumData>{customerData.reservation_info?.total_cancel}</BreadscrumData>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row
        className="content-customer-detail"
        style={{
          backgroundColor: '#F0F3F7',
          padding: '24px 24px 24px 24px',
        }}
      >
        <Col span={24} style={{ background: 'white' }}>
          <CustomerDetailFeedback
            directFeedback={directFeedbackState}
            socialFeedback={socialFeedbackState}
            statusMapping={statusMapping}
          />
        </Col>
        <Col span={24} style={{ background: 'white', marginTop: 16 }}>
          <CustomerDetailReservation statusMapping={statusMapping} />
        </Col>
        <Col span={24} style={{ background: 'white', marginTop: 16 }}>
          <CustomerDetailInformation />
        </Col>
        <Col span={24} style={{ background: 'white', marginTop: 16 }}>
          <CustomerDetailAbout />
        </Col>
        <Col span={24} style={{ background: 'white', marginTop: 16 }}>
          <CustomerDetailInvoiceInfo />
        </Col>
      </Row>
    </>
  );
}

export default CustomerDetail;
