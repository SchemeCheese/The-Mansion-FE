import './transaction.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Row } from 'antd';
import DiskA from 'pages/reservation/DiskA';
import Paid from 'pages/reservation/Paid';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function Transaction() {
  const { t } = useTranslation();

  const tabList = [
    {
      key: 'tab1',
      tab: t('transaction.Disk A'),
    },
    {
      key: 'tab2',
      tab: t('transaction.Paid'),
    },
  ];
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const contentList: any = {
    tab1: <DiskA />,
    tab2: <Paid />,
  };

  const gridStyleLeft: React.CSSProperties = {
    width: '50%',
    textAlign: 'left',
    color: '#1D39C4',
    paddingLeft: 16,
    paddingTop: 15,
  };

  const gridStyleRight: React.CSSProperties = {
    width: '50%',
    textAlign: 'right',
    color: '#1D39C4',
    paddingRight: 16,
    paddingTop: 15,
  };

  return (
    <Row
      style={{
        paddingTop: 16,
        background: '#F0F2F5',
        paddingBottom: 25,
        paddingRight: 15,
        paddingLeft: 15,
      }}
    >
      <Col span={16} style={{ paddingRight: 16 }}>
        <Card
          activeTabKey={activeTabKey1}
          className="transaction-tabs"
          onTabChange={key => {
            setActiveTabKey1(key);
          }}
          style={{ width: '100%' }}
          tabList={tabList}
        >
          {contentList[activeTabKey1]}
        </Card>
      </Col>
      <Col span={8}>
        <div className="site-card-border-less-wrapper transaction-checkout">
          <Card bordered={false} style={{ border: '1px solid #1D39C4' }} title="Checkout">
            <div style={{ flexGrow: 1, background: '#F7F9FA', marginTop: 1 }}>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Sub total')}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>12.000.000 </span>
                </Card.Grid>
              </div>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Deposit')}{' '}
                  <svg
                    fill="none"
                    height="14"
                    style={{ marginLeft: 12 }}
                    viewBox="0 0 14 14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                      fill="#1D39C4"
                    />
                  </svg>
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>1.000.000</span>
                </Card.Grid>
              </div>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Discount')}{' '}
                  <svg
                    fill="none"
                    height="14"
                    style={{ marginLeft: 12 }}
                    viewBox="0 0 14 14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                      fill="#1D39C4"
                    />
                  </svg>
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>1.000.000</span>
                </Card.Grid>
              </div>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  VAT
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>1.000.000</span>
                </Card.Grid>
              </div>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Exchange currency')}{' '}
                  <svg
                    fill="none"
                    height="14"
                    style={{ marginLeft: 12 }}
                    viewBox="0 0 14 14"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99992 0.333496C3.38087 0.333496 0.333252 3.38111 0.333252 7.00016C0.333252 10.6192 3.38087 13.6668 6.99992 13.6668C10.619 13.6668 13.6666 10.6192 13.6666 7.00016C13.6666 3.38111 10.619 0.333496 6.99992 0.333496ZM10.8094 7.00016C10.8094 7.26316 10.5962 7.47635 10.3333 7.47635H7.47611V10.3335C7.47611 10.5965 7.26291 10.8097 6.99992 10.8097C6.73693 10.8097 6.52373 10.5965 6.52373 10.3335V7.47635H3.66658C3.40359 7.47635 3.19039 7.26316 3.19039 7.00016C3.19039 6.73717 3.40359 6.52397 3.66659 6.52397H6.52373V3.66683C6.52373 3.40384 6.73693 3.19064 6.99992 3.19064C7.26291 3.19064 7.47611 3.40384 7.47611 3.66683V6.52397H10.3333C10.5962 6.52397 10.8094 6.73717 10.8094 7.00016Z"
                      fill="#1D39C4"
                    />
                  </svg>
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>USD</span>
                </Card.Grid>
              </div>

              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Exchange rate')}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>23.000</span>
                </Card.Grid>
              </div>
              <div className="checkout-card-grid">
                <Card.Grid hoverable={false} style={gridStyleLeft}>
                  {t('common.Amount')}
                </Card.Grid>
                <Card.Grid hoverable={false} style={gridStyleRight}>
                  <span style={{ fontSize: 16 }}>450</span>
                </Card.Grid>
              </div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #1D39C4', height: 60 }}>
              <Card.Grid hoverable={false} style={gridStyleLeft}>
                {t('common.Grand Total')}
              </Card.Grid>
              <Card.Grid hoverable={false} style={{ ...gridStyleRight, fontWeight: 900 }}>
                <span style={{ fontSize: 14 }}>10.000.000</span>
              </Card.Grid>
            </div>
          </Card>
        </div>
        <Row style={{ paddingTop: 17 }}>
          <Col span={12} style={{ paddingRight: 18 }}>
            <MButton
              style={{
                width: '100%',
                border: '1px solid #1D39C4',
                color: '#1D39C4',
                background: '#F0F2F5',
              }}
            >
              {t('common.Print Invoice')}
            </MButton>
          </Col>

          <Col span={12}>
            <PattonButton style={{ width: '100%' }} type="primary">
              {t('common.Payment')}
            </PattonButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Transaction;
