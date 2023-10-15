/** ***********************************
Module Name: Checkin
Developer Name: MinhNV
Created Date: 15/10/2023
Updated Date: 15/10/2023
Main functions: Scan QRCode Modal
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrReader } from 'react-qr-reader';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';

import { getReservationGuestCheckinAction } from 'actions';

interface Props {
  setVisiable: (visible: boolean) => void;
  visible: boolean;
}

function ScanQRCodeModal({ setVisiable, visible }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Modal
      className="modal-room-detail"
      footer={null}
      onCancel={() => setVisiable(false)}
      title="Scan QR Code"
      visible={visible}
      width={800}
    >
      <div style={{ backgroundColor: '#F0F2F5', height: '100%' }}>
        <svg
          fill="none"
          height="52"
          style={{
            position: 'absolute',
            top: '22%',
            left: '24%',
          }}
          viewBox="0 0 54 52"
          width="54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 47.5V28.5C4 15.2452 14.7452 4.5 28 4.5H49.5"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </svg>
        <svg
          fill="none"
          height="52"
          style={{
            position: 'absolute',
            top: '22%',
            right: '22%',
          }}
          viewBox="0 0 54 52"
          width="54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M49.5 47.5V28.5C49.5 15.2452 38.7548 4.5 25.5 4.5H4"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </svg>
        <svg
          fill="none"
          height="51"
          style={{
            position: 'absolute',
            top: '65%',
            left: '24%',
          }}
          viewBox="0 0 54 51"
          width="54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 4V23C4 36.2548 14.7452 47 28 47H49.5"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </svg>
        <svg
          fill="none"
          height="51"
          style={{
            position: 'absolute',
            top: '65%',
            right: '22%',
          }}
          viewBox="0 0 54 51"
          width="54"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M49.5 4V23C49.5 36.2548 38.7548 47 25.5 47H4"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8"
          />
        </svg>

        <div
          style={{
            width: 400,
            height: 400,
            textAlign: 'center',
            marginLeft: '26%',
            position: 'absolute',
            top: '17%',
          }}
        >
          <QrReader
            constraints={{ facingMode: 'user' }}
            onResult={(result: any, error) => {
              if (result) {
                const data = JSON.parse(result?.text);

                localStorage.setItem('checkin_booking', result?.text);

                dispatch(
                  getReservationGuestCheckinAction({
                    reservation_info_id: data.reservation_info_id,
                    reservation_detail_id: data.reservation_detail_id,
                  }),
                );

                setVisiable(false);
              }

              if (error) {
                console.info(error);
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ScanQRCodeModal;
