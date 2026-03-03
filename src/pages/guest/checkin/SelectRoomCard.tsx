/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/10/2023
Main functions: Guest Checkin
************************************ */

import React from 'react';
import { Card, Col, Radio, Row } from 'antd';
import { formatNumber } from 'helpers';
import { t } from 'i18next';

import Icon from 'components/Icon';

import { RoomInfoType } from './interface';

interface Props {
  roomInfo: any;
  roomNote: RoomInfoType;
  setRoomNote: (data: RoomInfoType) => void;
  showModalDetail: (visible: boolean) => void;
}

function SelectRoomCard({ roomInfo, roomNote, setRoomNote, showModalDetail }: Props) {
  const handleClickCover = () => {
    showModalDetail(true);
  };

  const viewMapping = {
    '256': t('common.Ocean View'),
    '512': t('common.Mountain View'),
  };

  const directionMapping = {
    '16': t('common.North Direction'),
    '32': t('common.East Direction'),
    '64': t('common.West Direction'),
    '128': t('common.South Direction'),
  };

  const wingMapping = {
    '1': t('common.Northwing'),
    '2': t('common.Eastwing'),
    '4': t('common.Westwing'),
    '8': t('common.Southwing'),
  };

  return (
    <Col
      span={8}
      style={{
        paddingTop: 20,
      }}
    >
      <Col
        span={24}
        style={{
          border: '1px solid  #f0f0f0',
          backgroundColor: '#ffffff',
        }}
      >
        <Row style={{ paddingTop: '6%', paddingBottom: '8%' }}>
          <Col span={13}>
            <div
              style={{
                fontSize: 16,
                color: '#1D39C4',
                fontWeight: 600,
                backgroundColor: 'rgb(0, 0, 255, 0.1)',
                borderLeft: '3px solid #1D39C4',
                borderRadius: '2px',
                height: '100%',
                width: '95%',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 15,
              }}
            >
              {roomInfo.name}
            </div>
          </Col>
          <Col span={11} style={{ textAlign: 'center' }}>
            <Radio
              onChange={() =>
                setRoomNote({
                  roomId: roomInfo.id,
                  roomNo: roomInfo.name,
                  roomTypeId: roomInfo.equipment_type_id,
                  specialNote: roomNote.specialNote,
                })
              }
              value={roomInfo.id}
            >
              {String(t('guestCheckin.Select this room'))}
            </Radio>
          </Col>
        </Row>
      </Col>
      <Card
        cover={
          <div aria-hidden onClick={handleClickCover} role="button">
            <img alt="example" src={roomInfo.photo[0] ?? ''} style={{ width: '100%' }} />
          </div>
        }
        style={{ width: '100%' }}
      >
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
          <span style={{ fontSize: 14, position: 'absolute' }}>
            {roomInfo && roomInfo.view !== undefined && roomInfo.view !== null && (
              <span style={{ paddingLeft: 6 }}>
                {roomInfo.view === 0 && String(t('common.Not yet setting'))}
                {roomInfo.view.toString() === '256' && viewMapping['256']}
                {roomInfo.view.toString() === '512' && viewMapping['512']}
              </span>
            )}
          </span>
          <span style={{ fontSize: 14, float: 'right', color: '#00000073' }}>
            {String(t('guestCheckin.Room Type'))}
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
          <span style={{ fontSize: 14 }}>
            {roomInfo && roomInfo.wing !== undefined && roomInfo.wing !== null && (
              <span style={{ paddingLeft: 6 }}>
                {roomInfo.wing === 0 && String(t('common.Not yet setting'))}
                {roomInfo.wing.toString() === '1' && wingMapping['1']}
                {roomInfo.wing.toString() === '2' && wingMapping['2']}
                {roomInfo.wing.toString() === '4' && wingMapping['4']}
                {roomInfo.wing.toString() === '8' && wingMapping['8']}
              </span>
            )}
          </span>
          <span style={{ fontSize: 20, float: 'right', fontWeight: 600 }}>{roomInfo.type}</span>
        </Col>
        <Col
          span={24}
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {roomInfo.is_smoking ? (
            <>
              <Icon name="smoking" width={20} />
              <span style={{ fontSize: 14, paddingLeft: '1%' }}>
                {String(t('frontDesk.Smoking'))}
              </span>
            </>
          ) : (
            <>
              <Icon name="no-smoking" width={20} />
              <span style={{ fontSize: 14, paddingLeft: '1%' }}>
                {String(t('frontDesk.No Smoking'))}
              </span>
            </>
          )}
        </Col>
        <Col
          span={24}
          style={{
            marginTop: 20,
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 12, color: '#00000073' }}>
            {String(t('guestCheckin.Hourly Rate'))}
          </span>
          <span style={{ fontSize: 12, float: 'right', color: '#00000073' }}>
            {' '}
            {String(t('guestCheckin.Daily Rate'))}
          </span>
        </Col>
        <Col
          span={24}
          style={{
            marginBottom: '2h',
          }}
        >
          <span style={{ fontSize: 20 }}>{formatNumber(roomInfo.price_per_hour)}</span>
          <span style={{ fontSize: 20, float: 'right' }}>
            {formatNumber(roomInfo.price_per_night)}
          </span>
        </Col>
      </Card>
    </Col>
  );
}

export default SelectRoomCard;
