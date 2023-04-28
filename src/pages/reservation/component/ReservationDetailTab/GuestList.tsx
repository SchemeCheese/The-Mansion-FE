/** ***********************************
Module Name : Reservation
Developer Name : KienNT
Created Date : 28/08/2022
Updated Date : 30/08/2022
Main functions : Guest List Tab
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Card, Col, message, Modal, Radio, Row, Typography } from 'antd';
import CreateGuestModal from 'pages/reservation/modal/CreateGuestModal';
import { selectSetMainGuest, selectUser } from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import {
  getReservation,
  getReservationDetail,
  removeGuestAction,
  setMainGuestAction,
} from 'actions';

const { Text, Title } = Typography;

interface Props {
  guests: any;
  reservationDetailId: string;
  reservationId: string;
}

function GuestList({ guests, reservationDetailId, reservationId }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentGuest, setCurrentGuest] = useState();

  const setMainGuestData = useAppSelector(selectSetMainGuest);
  const { changed } = useTreeChanges(setMainGuestData);
  const user = useAppSelector(selectUser);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showModal = () => {
    setCurrentGuest(undefined);
    setIsModalVisible(true);
  };

  const showUpdateModal = (item: any) => {
    setCurrentGuest(item);
    setIsModalVisible(true);
  };

  const confirmRemoveGuest = (item: any) => {
    Modal.confirm({
      title: t('common.Delete Confirm'),
      icon: <ExclamationCircleOutlined />,
      content: t('message.Do you want to delete this guest?'),
      okButtonProps: { style: { backgroundColor: '#1D39C4' } },
      onOk() {
        dispatch(
          removeGuestAction({
            payload: {
              reservation_detail_id: reservationDetailId,
              guest_id: item.id,
            },
          }),
        );
      },
    });
  };

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Set main guest successfully!'));

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changed]);

  const data = guests.map((item: any) => {
    return {
      ...item,
      key: item.id,
      check: false,
    };
  });

  return (
    <>
      {user.permission.reservation.edit && (
        <CreateGuestModal
          currentGuest={currentGuest}
          isModalVisible={isModalVisible}
          reservationDetailId={reservationDetailId}
          reservationId={reservationId}
          setIsModalVisible={setIsModalVisible}
        />
      )}

      <Row
        className="guest-list"
        style={{
          paddingLeft: 16,
          paddingTop: 24,
          paddingBottom: 24,
          paddingRight: 16,
          backgroundColor: 'white',
          minHeight: 300,
        }}
      >
        {user.permission.reservation.edit && (
          <Col onClick={showModal} span={8}>
            <div
              style={{
                width: '95%',
                height: '95%',
                border: '2px dashed rgba(0, 0, 0, 0.15)',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              <p
                style={{
                  position: 'absolute',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 22,
                  color: 'rgba(0, 0, 0, 0.45)',
                  margin: 0,
                  top: '50%',
                  left: '50%',
                  msTransform: 'translate(-50%, -50%)',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                + {t('common.Add New')}
              </p>
            </div>
          </Col>
        )}
        {data.map((value: any) => (
          <Col span={8}>
            <Card
              actions={[
                <Text onClick={() => confirmRemoveGuest(value)} type="secondary">
                  {t('common.Remove')}
                </Text>,
                <Text onClick={() => showUpdateModal(value)} type="secondary">
                  {t('common.Update')}
                </Text>,
              ]}
              className="guest-list-card"
              style={{
                width: '95%',
                marginBottom: 16,
                border: '1px solid rgba(0, 0, 0, 0.15)',
              }}
            >
              <Row>
                <Col span={12}>
                  <Title level={5}>{value.name}</Title>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Radio
                    checked={value.is_main_guest}
                    onClick={() => {
                      dispatch(
                        setMainGuestAction({
                          reservation_detail_id: reservationDetailId,
                          guest_id: value.id,
                        }),
                      );
                    }}
                    style={{ left: 15, fontSize: 13 }}
                    value={1}
                  >
                    {t('guest.Main Guest')}
                  </Radio>
                </Col>
              </Row>
              <Row style={{ marginBottom: 12 }}>
                <Col span={12}>
                  <Text style={{ fontSize: 12 }}>{t('common.ID')}:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{value.id_number}</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 12 }}>
                <Col span={12}>
                  <Text style={{ fontSize: 12 }}>{t('common.Nationality.title')}:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{value.nationality_text}</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 12 }}>
                <Col span={12}>
                  <Text style={{ fontSize: 12 }}>{t('guest.Place Of Issue')}:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{value.place_of_id}</Text>
                </Col>
              </Row>
              <Row style={{ marginBottom: 12 }}>
                <Col span={12}>
                  <Text style={{ fontSize: 12 }}>{t('guest.Date Of Issue')}:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{value.date_of_issue_of_passport}</Text>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <Text style={{ fontSize: 12 }}>{t('guest.Visa Expire Date')}:</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text style={{ fontSize: 12 }}>{value.expiration_date_of_visa}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default GuestList;
