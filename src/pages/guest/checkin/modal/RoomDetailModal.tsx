/** ***********************************
Module Name: Checkin
Developer Name: ThuLt
Created Date: 15/07/2023
Updated Date: 15/07/2023
Main functions: Guest Checkin
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Modal, Row } from 'antd';

import Icon from 'components/Icon';
import PattonButton from 'components/PattonButton';

interface Props {
  setVisiable: (visible: boolean) => void;
  visible: boolean;
}

function RoomDetailModal({ setVisiable, visible }: Props) {
  const { t } = useTranslation();

  const arrayAmeties = [
    '2 Stores',
    'Central Heating',
    'Dual Sinks',
    'Electric Range',
    'Fire Place',
    'Home Theater',
    'Laundry Room',
    'Lawn',
    'Marble Floors',
  ];

  return (
    <Modal
      className="modal-room-detail"
      footer={[<PattonButton>{t('common.OK')}</PattonButton>]}
      onCancel={() => setVisiable(false)}
      // onOk={handleOkDetail}
      style={{ top: 60, borderRadius: 4, height: 500 }}
      title="Room Information"
      visible={visible}
      width={1024}
    >
      <div
        style={{
          maxHeight: 650,
          overflow: 'scroll',
        }}
      >
        <Row
          gutter={30}
          style={{
            backgroundColor: 'rgba(240, 242, 245, 1)',
            padding: 20,
            margin: 0,
          }}
        >
          <Col span={24}>
            <Row>
              <p className="">
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: '24px',
                    paddingBottom: 20,
                  }}
                >
                  {t('guestCheckin.The Space')}
                </span>
              </p>
            </Row>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
          <Col span={8}>
            <div>
              <img
                alt="example"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ borderRadius: '4px', width: '100%' }}
              />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, paddingTop: 10 }}>Bedroom 1</div>
            <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.65)', paddingBottom: 10 }}>
              King-size bed
            </div>
          </Col>
        </Row>
        <Row
          gutter={30}
          style={{ background: 'rgba(247, 249, 250, 1)', padding: '24px', margin: 0 }}
        >
          <Col
            span={24}
            style={{
              paddingBottom: '1vh',
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {t('guestCheckin.Amenities')}
            </span>
          </Col>
          {arrayAmeties.map((item: any) => {
            return (
              <Col
                span={8}
                style={{
                  marginTop: 10,
                }}
              >
                <Icon name="checked" width={24} />
                <span
                  key={item}
                  style={{
                    fontSize: 14,
                    paddingLeft: '2%',
                    position: 'absolute',
                    paddingTop: '1%',
                  }}
                >
                  {' '}
                  {item}{' '}
                </span>
              </Col>
            );
          })}
        </Row>
      </div>
    </Modal>
  );
}

export default RoomDetailModal;
