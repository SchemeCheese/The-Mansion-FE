/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 14/04/2023
Updated Date: 14/04/2023
Main functions: Guest Payment
************************************ */

import 'styles/guest_payment.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Form, Pagination, Radio, Row, Space, Steps, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

function Guest() {
  interface DataType {
    age: number;
    key: string;
    name: string;
  }

  const paymentSummaryLabelStyle: React.CSSProperties = {
    lineHeight: '22px',
    color: '#1D39C4',
    fontSize: 14,
    fontWeight: 400,
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
    },
  ];

  const { Step } = Steps;

  return (
    <Row
      className="content guest-payment-content"
      style={{
        background: 'white',
        width: '90%',
        textAlign: 'center',
        marginLeft: '5%',
        maxHeight: '90vh',
        marginTop: '5vh',
      }}
    >
      <Col span={24}>
        <Row
          style={{
            height: '100%',
          }}
        >
          <Col span={24} style={{ marginBottom: 30 }}>
            <Steps current={3}>
              <Step title="Select your stay" />
              <Step title="Select your room" />
              <Step title="Upload your personal ID" />
              <Step title="Payment" />
            </Steps>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={16}>
                <Table columns={columns} dataSource={data} pagination={false} size="small" />
              </Col>
              <Col
                span={8}
                style={{
                  paddingLeft: 30,
                }}
              >
                <Row
                  style={{
                    height: '100%',
                  }}
                >
                  <Col span={12} style={{ height: '100%' }}>
                    <div
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingTop: 30,
                        width: '98%',
                        height: '100%',
                      }}
                    >
                      <Radio>
                        <p
                          style={{
                            color: 'rgba(0, 0, 0, 0.85)',
                            fontSize: 14,
                          }}
                        >
                          Cash Credit Card
                        </p>
                      </Radio>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      style={{
                        border: '1px solid rgba(0, 0, 0, 0.15)',
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        paddingTop: 30,
                        width: '98%',
                        height: '100%',
                        float: 'right',
                      }}
                    >
                      <Radio>
                        <p
                          style={{
                            color: 'rgba(0, 0, 0, 0.85)',
                            fontSize: 14,
                          }}
                        >
                          E-Wallet
                        </p>
                      </Radio>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={16} style={{ paddingTop: 15, textAlign: 'left' }}>
        <Row
          style={{
            border: '1px solid #9DD9FE',
            height: '100%',
          }}
        >
          <Col
            span={24}
            style={{
              background: '#E6F7FF',
              borderRadius: 2,
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            <Row style={{ paddingTop: 12 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Sub total</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Deposit</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Discount</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>VAT</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Exchange currency</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Exchange rate</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
            <Row style={{ paddingTop: 5, paddingBottom: 5 }}>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Amount</span>
              </Col>
              <Col span={8} style={{ marginBottom: 3 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
          </Col>
          <Col
            span={24}
            style={{
              paddingRight: 20,
              paddingLeft: 20,
              paddingTop: 10,
            }}
          >
            <Row>
              <Col span={16}>
                {' '}
                <span style={paymentSummaryLabelStyle}>Grand total</span>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 14,
                    float: 'right',
                    color: '#1D39C4',
                    fontWeight: 100,
                    fontStyle: 'italic',
                  }}
                >
                  1.200.00
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col span={8} style={{ paddingTop: 15 }}>
        <div
          style={{
            background: '#E6F7FF',
            border: '1px solid #9DD9FE',
            borderRadius: 2,
            marginLeft: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <p style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)' }}>
            Please contact the Reception for instructions.
          </p>
        </div>
      </Col>
      <Col
        span={24}
        style={{
          background: '#F7F9FA',
          border: '1px solid #DCE2EA',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 15,
          paddingTop: 25,
          paddingBottom: 10,
        }}
      >
        <svg
          fill="none"
          height="20"
          viewBox="0 0 21 20"
          width="21"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M0.0791016 10C0.0791016 4.57143 4.83126 0 10.4745 0C16.2156 0 20.8698 4.47715 20.8698 10C20.8698 15.4286 16.1176 20 10.4745 20C4.83126 20 0.0791016 15.4286 0.0791016 10ZM10.4745 3C6.45562 3 3.19771 6.13401 3.19771 10C3.19771 13.866 6.45562 17 10.4745 17C14.4933 17 17.7512 13.866 17.7512 10H10.4745V3Z"
            fill="#FAAD14"
            fillOpacity="0.85"
            fillRule="evenodd"
          />
        </svg>
        <p
          style={{
            fontSize: 13,
            color: 'rgba(0, 0, 0, 0.65)',
            paddingTop: 5,
          }}
        >
          Waiting for payment
        </p>
      </Col>

      <Col span={24} style={{ marginTop: 25, marginBottom: 25 }}>
        <MButton>Cancel</MButton>
        <PattonButton style={{ marginLeft: 20 }}>Next</PattonButton>
      </Col>
    </Row>
  );
}

export default Guest;
