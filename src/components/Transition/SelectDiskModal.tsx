import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Modal, Select } from 'antd';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function SelectDiskModal({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      title={<b>{t('paySelected.Change Disk')}</b>}
      visible={visible}
    >
      <Form layout="vertical">
        <Form.Item label={t('paySelected.Select Disk')}>
          <Select defaultValue="A" onChange={handleChange}>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SelectDiskModal;
