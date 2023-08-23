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

import PattonButton from 'components/PattonButton';

import SelectRoomCard from '../SelectRoomCard';

interface Props {
  setVisiable: (visible: boolean) => void;
  showModalConfirm: (visible: boolean) => void;
  showModalDetail: (visible: boolean) => void;
  visible: boolean;
}

function SelectRoomModal({ setVisiable, showModalConfirm, showModalDetail, visible }: Props) {
  const { t } = useTranslation();

  const handleOkSelectRoom = () => {
    showModalConfirm(true);
  };

  const handleCancelModalSelectRoom = () => {
    setVisiable(false);
  };

  return (
    <Modal
      className="modal-room-detail"
      footer={[<PattonButton onClick={handleOkSelectRoom}>{t('common.OK')}</PattonButton>]}
      onCancel={handleCancelModalSelectRoom}
      onOk={handleOkSelectRoom}
      title="Room Select"
      visible={visible}
      width={1024}
    >
      <Row
        gutter={30}
        style={{ backgroundColor: 'rgba(240, 242, 245, 1)', padding: '24px', margin: 0 }}
      >
        <Col
          span={24}
          style={{
            paddingLeft: 0,
          }}
        >
          <Row>
            <span
              style={{
                fontSize: 14,
                paddingBottom: 10,
              }}
            >
              {t(
                'guestCheckin.Thank you for staying with us. Please select one of the available rooms below',
              )}
            </span>
          </Row>
        </Col>
        <Row className="select-room-card" gutter={30} style={{ paddingTop: 5, width: '100%' }}>
          <SelectRoomCard showModalDetail={showModalDetail} />
          <SelectRoomCard showModalDetail={showModalDetail} />
          <SelectRoomCard showModalDetail={showModalDetail} />
        </Row>
      </Row>
    </Modal>
  );
}

export default SelectRoomModal;
