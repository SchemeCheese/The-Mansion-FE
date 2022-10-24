import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Form, Modal, Select } from 'antd';

import { changeDiskAction } from 'actions';

interface Props {
  saleDetailIds: any;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function SelectDiskModal({ saleDetailIds, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();

  const [diskSelected, setDiskSelected] = useState('1');

  const handleChange = (value: string) => {
    setDiskSelected(value);
    console.log(`selected ${value}`, saleDetailIds);
  };

  const handleButtonSubmit = () => {
    setIsModalOpen(false);
    dispatch(
      changeDiskAction({
        payload: {
          sale_detail_ids: saleDetailIds,
          storage_id: diskSelected,
        },
      }),
    );
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleButtonSubmit}
      title={<b>{t('paySelected.Change Disk')}</b>}
      visible={visible}
    >
      <Form layout="vertical">
        <Form.Item label={t('paySelected.Select Disk')}>
          <Select defaultValue="A" onChange={handleChange}>
            <Option value="1">A</Option>
            <Option value="2">B</Option>
            <Option value="3">C</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SelectDiskModal;
