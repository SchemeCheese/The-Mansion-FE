/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer Detail Page
************************************ */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Form, message, Row, Tabs } from 'antd';
import { putAPI } from 'helpers/apiService';
import { selectGetCustomerDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getCustomerDetailAction } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { TabPane } = Tabs;

function CustomerDetailInvoiceInfo() {
  const { t } = useTranslation();
  const { data: customerData } = useAppSelector(selectGetCustomerDetail);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { id } = useParams();

  const onFormFinish = async (values: any) => {
    const result = await putAPI(`api/v1/guests/${id}/update`, values);

    if (result.data.success) {
      message.success('Update invoice info successfully!');

      dispatch(
        getCustomerDetailAction({
          id: String(id),
        }),
      );
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      ...customerData,
    });
  }, [customerData]);

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="" style={{ minHeight: '100%' }}>
      <TabPane key="e" tab={t('customerDetail.Invoice Informations')}>
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 23 }}
          layout="vertical"
          name="basic"
          onFinish={onFormFinish}
          wrapperCol={{ span: 23 }}
        >
          <Row style={{ padding: 16 }}>
            <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
              <PattonButton onClick={() => form.submit()} style={{ float: 'right' }}>
                {t('common.Update')}
              </PattonButton>
            </Col>
            <Col span={8}>
              <Form.Item label={t('customerDetail.Tax Code.title')} name="tax_code">
                <MInput placeholder={t('customerDetail.Tax Code.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('customerDetail.Company Name.title')} name="vat_company">
                <MInput placeholder={t('customerDetail.Company Name.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.E-invoice email address.title')}
                name="e_mail"
                rules={[{ type: 'email' }]}
              >
                <MInput placeholder={t('customerDetail.E-invoice email address.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={t('customerDetail.Company Address.title')} name="vat_address">
                <MInput placeholder={t('customerDetail.Company Address.placeholder')} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailInvoiceInfo;
