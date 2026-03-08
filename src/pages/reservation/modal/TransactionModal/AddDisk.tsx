import { notify } from 'ui/notification';
/** ***********************************
Module Name : Reservation
Developer Name : HanhTV
Created Date : 26/02/2023
Updated Date : 26/02/2023
Main functions : Transaction Add Disk
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, Modal, Row } from 'ui/antd';
import { selectAddDisk } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { addDiskAction } from 'actions';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function AddDisk({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const [dataName, setDataName] = useState<any>('');
  const addDiskData = useAppSelector(selectAddDisk);
  const { changed: addDiskChanged } = useTreeChanges(addDiskData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addDiskChanged('status', 'SUCCESS')) {
      notify.success(t('message.Add disk successfully!'));
    }
  }, [addDiskChanged]);

  const handleAddDisk = () => {
    dispatch(
      addDiskAction({
        payload: {
          name: dataName,
        },
      }),
    );
    setDataName('');
    setIsModalOpen(false);
  };

  return (
    <Modal
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleAddDisk}
      open={visible}
      style={{ top: 50 }}
      styles={{ body: { backgroundColor: '#F0F2F5' } }}
      title={<b>{t('transaction.Add Disk')}</b>}
      width={500}
    >
      <Form autoComplete="off" layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item label="Name" name="name">
              <Input ref={dataName} onChange={event => setDataName(event.target.value)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddDisk;
