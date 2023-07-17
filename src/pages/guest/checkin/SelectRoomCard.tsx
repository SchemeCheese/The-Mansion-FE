/** ***********************************
Module Name: Payment
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React from 'react';
import { Card, Col } from 'antd';
import { t } from 'i18next';

import Icon from 'components/Icon';

interface Props {
  showModal: any;
}

function SelectRoomCard({ showModal }: Props) {
  return (
    <Col span={8}>
      <Card
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        onClick={showModal}
        style={{ width: '350px' }}
      >
        <Col
          span={24}
          style={{
            marginBottom: '3vh',
            height: '100%',
          }}
        >
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
              padding: '3% 5% 3% 5%',
            }}
          >
            104
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: '2vh',
            marginBottom: '2h',
          }}
        >
          <span>
            <Icon name="view" width={20} />
          </span>
          <span style={{ fontSize: 14, paddingLeft: '2%', position: 'absolute' }}>
            {' '}
            {t('guestCheckin.City View')}
          </span>
          <span style={{ fontSize: 14, float: 'right', color: '#00000073' }}>
            {t('guestCheckin.Room Type')}
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: '2vh',
            marginBottom: '2h',
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
            marginTop: '2vh',
            marginBottom: '2h',
          }}
        >
          <Icon name="smoking" width={20} />
          <span style={{ fontSize: 14, paddingLeft: '1%' }}> {t('guestCheckin.Smoking')}</span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: '2vh',
            marginBottom: '2h',
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
