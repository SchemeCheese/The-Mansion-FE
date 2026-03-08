/** ***********************************
Module Name : Reservation
Developer Name : Xuan
Created Date : 14/09/2022
Updated Date : 21/11/2022
Main functions : Transaction AddDiscount
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input, Modal, Row, Select } from 'ui/antd';
import { selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

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

  const { id } = useParams();
  const getReservationDetailData = useAppSelector(selectGetReservationDetail);

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

        dispatch(
          addItemAction({
            payload: {
              items: [
                {
                  description_id: 89,
                  quantity: 1,
                  sales_price: values.discount_amount,
                  normal_price: values.discount_amount,
                  price_type: values.price_type,
                  storage_id: values.storage_id,
                },
              ],
              reservation_id: id ?? '',
              reservation_detail_id: getReservationDetailData.data.id,
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
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleAddDiscount}
      open={visible}
      styles={{ body: { backgroundColor: '#F0F2F5' } }}
      title={<b>{t('common.Add Discount')}</b>}
      width={352}
    >
      <Form
        autoComplete="off"
        form={form}
        initialValues={{
          price_type: 'total',
        }}
        layout="vertical"
      >
        <Row>
          <Form.Item
            label={t('common.Discount Type')}
            name="price_type"
            rules={[{ required: true, message: 'Please select type!' }]}
          >
            <Select
              onChange={onChangeDiscountType}
              placeholder="Select Type"
              style={{ borderRadius: 2, width: 311, height: 32 }}
            >
              <Option value="percent">{t('common.Percent')}</Option>
              <Option value="total">{t('common.Amount')}</Option>
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
              placeholder={t('common.Select Disk')}
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
