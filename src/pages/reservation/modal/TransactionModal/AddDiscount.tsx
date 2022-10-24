import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Form, Input, Modal, Row, Select } from 'antd';

import { addItemAction } from 'actions';

const { Option } = Select;

interface Props {
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function AddDiscount({ setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onChangeDiscountType = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onChangeSelectDisk = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleAddDiscount = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        let discountAmount = 0;

        discountAmount =
          values.discount_type === '1'
            ? (values / 100) * values.discount_amount
            : values.discount_amount;

        dispatch(
          addItemAction({
            payload: {
              items: [
                {
                  description_id: 89,
                  quantity: 1,
                  sales_price: discountAmount,
                  normal_price: discountAmount,
                  storage_id: values.storage_id,
                },
              ],
              reservation_id: '3482',
              reservation_detail_id: '4744',
            },
          }),
        );

        setIsModalOpen(false);
      })
      .catch(error => {
        console.log('Validate Failed:', error);
      });
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleAddDiscount}
      title={<b>{t('common.Add Discount')}</b>}
      visible={visible}
      width={352}
    >
      <Form
        autoComplete="off"
        form={form}
        initialValues={{
          discount_type: '2',
        }}
        layout="vertical"
      >
        <Row>
          <Form.Item
            label={t('common.Discount Type')}
            name="discount_type"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select
              onChange={onChangeDiscountType}
              placeholder="Select Type"
              style={{ borderRadius: 2, width: 311, height: 32 }}
            >
              <Option value="1">Percent</Option>
              <Option value="2">Amount</Option>
            </Select>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label={t('common.Amount')}
            name="discount_amount"
            rules={[{ required: true, message: 'Please input amount!' }]}
          >
            <Input placeholder="20.000" style={{ borderRadius: 2, width: 311, height: 32 }} />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item
            label={t('common.Select Disk')}
            name="storage_id"
            rules={[{ required: true, message: 'Please select disk!' }]}
          >
            <Select
              onChange={onChangeSelectDisk}
              placeholder="Select Disk"
              style={{ borderRadius: 2, width: 311, height: 32 }}
            >
              <Option value="1">A</Option>
              <Option value="2">B</Option>
              <Option value="3">C</Option>
            </Select>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddDiscount;
