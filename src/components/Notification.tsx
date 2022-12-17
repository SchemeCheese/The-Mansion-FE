import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BellOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Menu, Tabs } from 'antd';
import { selectNotifications } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { getNotifcationsAction, readNotifcationsAction } from 'actions/notification';

function Notification() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications: any = useAppSelector(selectNotifications);
  const unReadTotal = notifications.data.reduce((accumulator: number, currentValue: any) => {
    if (currentValue.is_read === false) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  useEffect(() => {
    dispatch(getNotifcationsAction());
  }, []);

  const readBookingNotification = async (notification: any) => {
    dispatch(
      readNotifcationsAction({
        id: notification.id,
      }),
    );
    navigate(`/reservation/${notification.reservation_id}`);
  };

  const generateNotificationContent = (item: any) => {
    if (item.type === 'reservation' && item.detail_type === 'new') {
      return `<span style="color:red;">[Beds24]</span> New booking with folio <strong>${item.folio}</strong> from <strong>${item.additional_info.agent}</strong>`;
    }

    return '';
  };

  return (
    <Badge className="notification-badge" color="green" count={unReadTotal}>
      <Dropdown
        overlay={
          <Tabs
            className="notification-tabs"
            defaultActiveKey="1"
            style={{
              padding: 4,
              width: 350,
              height: 400,
              backgroundColor: '#ffffff',
              backgroundClip: 'padding-box',
              borderRadius: 8,
              outline: 'none',
              boxShadow:
                '0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%)',
            }}
          >
            <Tabs.TabPane key="1" style={{ height: '100%' }} tab="Reservation">
              <Menu style={{ height: '100%', boxShadow: 'none', marginTop: 5 }}>
                {notifications.data.map((item: any) => (
                  <Menu.Item style={{ background: item.is_read ? '' : '#e4f6f3' }}>
                    <p
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: generateNotificationContent(item) }}
                      onClick={() => readBookingNotification(item)}
                    />
                  </Menu.Item>
                ))}
              </Menu>
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="System">
              <Menu style={{ height: '100%' }} />
            </Tabs.TabPane>
          </Tabs>
        }
        trigger={['click']}
      >
        <BellOutlined onClick={e => e.preventDefault()} style={{ marginRight: 28 }} />
      </Dropdown>
    </Badge>
  );
}

export default Notification;
