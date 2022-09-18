import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Modal, Row, Select } from 'antd';

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function AddDiscount({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const onChangeDiscountType = (value: string) => {
    console.log(`selected ${value}`);
  };

  const discountTypes = ['Percent', 'Amount'];

  const onChangeSelectDisk = (value: string) => {
    console.log(`selected ${value}`);
  };

  const disks = ['A', 'B'];

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => setIsModalOpen(false)}
      title={<b>{t('common.Add Discount')}</b>}
      visible={visible}
      width={352}
    >
      <Form autoComplete="off" layout="vertical">
        <Row>
          <Form.Item label={t('common.Discount Type')} name="">
            <Select
              defaultValue={discountTypes[0]}
              onChange={onChangeDiscountType}
              placeholder="Select Type"
              style={{ borderRadius: 2, width: 311, height: 32 }}
            >
              {discountTypes.map(type => (
                <Option key={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label={t('common.Amount')} name="">
            <Input placeholder="20.000" style={{ borderRadius: 2, width: 311, height: 32 }} />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label={t('common.Select Disk')} name="">
            <Select
              defaultValue={disks[0]}
              onChange={onChangeSelectDisk}
              style={{ borderRadius: 2, width: 311, height: 32 }}
            >
              {disks.map(disk => (
                <Option key={disk}>{disk}</Option>
              ))}
            </Select>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddDiscount;
