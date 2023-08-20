/** ***********************************
Module Name: Payment
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React from 'react';
import { Button, Card, Col, Radio, Row } from 'antd';
import { t } from 'i18next';

import Icon from 'components/Icon';

interface Props {
  isModalDetail?: any;
  showModalDetail: any;
  showModalSelectRoom?: any;
}

function SelectRoomCard({ isModalDetail, showModalDetail, showModalSelectRoom }: Props) {
  return (
    <Col span={8}>
      {!isModalDetail && (
        <Col
          span={24}
          style={{
            border: '1px solid  #f0f0f0',
            backgroundColor: '#ffffff',
          }}
        >
          <Row style={{ paddingTop: '6%', paddingBottom: '8%' }}>
            <Col span={8}>
              <span
                style={{
                  fontSize: 16,
                  color: '#1D39C4',
                  fontWeight: 600,
                  backgroundColor: 'rgb(0, 0, 255, 0.1)',
                  borderLeft: '3px solid #1D39C4',
                  borderRadius: '2px',
                  height: '100%',
                  width: '10vh',
                  padding: '7% 14% 7% 14%',
                }}
              >
                104
              </span>
            </Col>
            <Col span={16} style={{ textAlign: 'center' }}>
              <Radio name="select_room">{t('guestCheckin.Select this room')}</Radio>
            </Col>
          </Row>
        </Col>
      )}
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        style={{ width: '100%' }}
      >
        {isModalDetail && (
          <Col
            span={24}
            style={{
              marginBottom: 15,
              height: '100%',
              paddingRight: 0,
            }}
          >
            <Row>
              <Col span={8}>
                <span
                  aria-hidden="true"
                  onClick={() => showModalDetail(true)}
                  role="button"
                  style={{
                    fontSize: 16,
                    color: '#1D39C4',
                    fontWeight: 600,
                    backgroundColor: 'rgb(0, 0, 255, 0.1)',
                    borderLeft: '3px solid #1D39C4',
                    borderRadius: '2px',
                    height: '100%',
                    width: '10vh',
                    padding: '7% 14% 7% 14%',
                    cursor: 'pointer',
                  }}
                >
                  104
                </span>
              </Col>
              <Col span={16} style={{ textAlign: 'right' }}>
                <Radio name="select_room">{t('guestCheckin.Select this room')}</Radio>
              </Col>
            </Row>
          </Col>
        )}
        <Col
          span={24}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <span>
            <Icon name="view" width={20} />
          </span>
          <span style={{ fontSize: 14, paddingLeft: '2%', position: 'absolute' }}>
            {t('guestCheckin.City View')}
          </span>
          <span style={{ fontSize: 14, float: 'right', color: '#00000073' }}>
            {t('guestCheckin.Room Type')}
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Icon name="northwing" width={20} />
          <span style={{ fontSize: 14, paddingLeft: '1%' }}>{t('guestCheckin.Northwing')}</span>
          <span style={{ fontSize: 20, float: 'right', fontWeight: 600 }}>
            {t('guestCheckin.Studio Twin')}
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Icon name="smoking" width={20} />
          <span style={{ fontSize: 14, paddingLeft: '1%' }}> {t('guestCheckin.Smoking')}</span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 12, color: '#00000073' }}>{t('guestCheckin.Hourly Rate')}</span>
          <span style={{ fontSize: 12, float: 'right', color: '#00000073' }}>
            {' '}
            {t('guestCheckin.Daily Rate')}{' '}
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginBottom: '2h',
          }}
        >
          <span style={{ fontSize: 20 }}> 350,000 </span>
          <span style={{ fontSize: 20, float: 'right' }}> 1,350,000 </span>
        </Col>
      </Card>
    </Col>
  );
}

export default SelectRoomCard;
