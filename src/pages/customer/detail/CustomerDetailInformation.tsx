/** ***********************************
Module Name : Customer
Developer Name : MinhNV
Created Date : 23/06/2023
Updated Date : 23/06/2023
Main functions : Customer Detail Page
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, DatePicker, Form, message, Row, Select, Tabs } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { formatDate } from 'helpers';
import { getAPI, putAPI } from 'helpers/apiService';
import moment, { Moment } from 'moment';
import { selectGetCustomerDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getCustomerDetailAction } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { TabPane } = Tabs;
const { Option } = Select;

const setDateValue = (value: string) => {
  return value ? moment(value) : undefined;
};

const getDateValue = (value: Moment) => {
  return value ? value.format(formatDate) : null;
};

function CustomerDetailInformation() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: customerData } = useAppSelector(selectGetCustomerDetail);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [customerConfig, setCustomerConfig]: any = useState();

  const pastDate: RangePickerProps['disabledDate'] = value => {
    // Can not select days before today
    return value <= moment().endOf('day');
  };

  const futureDate: RangePickerProps['disabledDate'] = value => {
    // Can not select days after today
    return value >= moment().endOf('day');
  };

  const onContactFormFinish = async (values: any) => {
    const result = await putAPI(`/api/v1/guests/${id}/update`, values);

    if (result.data.success) {
      message.success('Update contact info successfully!');

      dispatch(
        getCustomerDetailAction({
          id: String(id),
        }),
      );
    }
  };

  const onOfficialFormFinish = async (values: any) => {
    const result = await putAPI(`/api/v1/guests/${id}/update`, {
      ...values,
      date_of_issue_of_id: getDateValue(values.date_of_issue_of_id),
      expiration_date_of_id: getDateValue(values.expiration_date_of_id),
      date_of_issue_of_passport: getDateValue(values.date_of_issue_of_passport),
      expiration_date_of_passport: getDateValue(values.expiration_date_of_passport),
      expiration_date_of_visa: getDateValue(values.expiration_date_of_visa),
    });

    if (result.data.success) {
      message.success('Update contact info successfully!');

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
      client_kind: String(customerData.client_kind),
    });

    form2.setFieldsValue({
      ...customerData,
      date_of_issue_of_id: setDateValue(customerData.date_of_issue_of_id),
      expiration_date_of_id: setDateValue(customerData.expiration_date_of_id),
      date_of_issue_of_passport: setDateValue(customerData.date_of_issue_of_passport),
      expiration_date_of_passport: setDateValue(customerData.expiration_date_of_passport),
      expiration_date_of_visa: setDateValue(customerData.expiration_date_of_visa),
    });
  }, [customerData]);

  useEffect(() => {
    async function fetchCustomerConfig() {
      const response = await getAPI(`/api/v1/get-customer-config`);

      setCustomerConfig(response.data);
    }

    fetchCustomerConfig();
  }, []);

  return (
    <Tabs className="customer-detail-tab" defaultActiveKey="1" style={{ minHeight: '100%' }}>
      <TabPane key="contact-info" tab={t('customerDetail.Contact Informations')}>
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 23 }}
          layout="vertical"
          onFinish={onContactFormFinish}
          wrapperCol={{ span: 23 }}
        >
          <Row style={{ padding: 16 }}>
            <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
              <PattonButton onClick={() => form.submit()} style={{ float: 'right' }}>
                {t('common.Update')}
              </PattonButton>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.Type.title')}
                name="client_kind"
                rules={[{ required: true, message: 'Please input the type!' }]}
              >
                <Select
                  allowClear
                  placeholder={t('customerDetail.Type.placeholder')}
                  style={{ width: '100%' }}
                >
                  <Option value="1">Personal</Option>
                  <Option value="2">Group</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={t('customerDetail.First Name.title')}
                name="first_name"
                rules={[{ required: true, message: 'Please input the type!' }]}
              >
                <MInput />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.Email 1.title')}
                name="email_address1"
                rules={[{ type: 'email' }]}
              >
                <MInput placeholder={t('customerDetail.Email 1.placeholder')} />
              </Form.Item>

              <Form.Item label={t('customerDetail.Mobile phone 1.title')} name="telephone_number1">
                <MInput placeholder={t('customerDetail.Mobile phone 1.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.Email 2.title')}
                name="email_address2"
                rules={[{ type: 'email' }]}
              >
                <MInput placeholder={t('customerDetail.Email 2.placeholder')} />
              </Form.Item>

              <Form.Item label={t('customerDetail.Mobile phone 2.title')} name="telephone_number2">
                <MInput placeholder={t('customerDetail.Mobile phone 2.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.Last Name.title')}
                name="last_name"
                rules={[{ required: true, message: 'Please input the type!' }]}
              >
                <MInput placeholder={t('customerDetail.Last Name.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label={t('customerDetail.Address.title')} name="address1">
                <MInput placeholder={t('customerDetail.Address.placeholder')} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane key="official-info" tab={t('customerDetail.Official Informations')}>
        <Form
          autoComplete="off"
          form={form2}
          labelCol={{ span: 23 }}
          layout="vertical"
          onFinish={onOfficialFormFinish}
          wrapperCol={{ span: 23 }}
        >
          <Row style={{ padding: 16 }}>
            <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
              <PattonButton onClick={() => form2.submit()} style={{ float: 'right' }}>
                {t('common.Update')}
              </PattonButton>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('customerDetail.National Identification ID Number.title')}
                name="id_number"
              >
                <MInput
                  placeholder={t('customerDetail.National Identification ID Number.placeholder')}
                />
              </Form.Item>

              <Form.Item label={t('customerDetail.Date of issue.title')} name="date_of_issue_of_id">
                <DatePicker
                  disabledDate={futureDate}
                  placeholder={t('customerDetail.Date of issue.placeholder')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item label={t('customerDetail.Valid until.title')} name="expiration_date_of_id">
                <DatePicker
                  disabledDate={pastDate}
                  placeholder={t('customerDetail.Valid until.placeholder')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item label={t('customerDetail.Issuing authority.title')} name="place_of_id">
                <MInput placeholder={t('customerDetail.Issuing authority.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('customerDetail.Passport Number.title')} name="passport_number">
                <MInput placeholder={t('customerDetail.Passport Number.placeholder')} />
              </Form.Item>

              <Form.Item
                label={t('customerDetail.Date of issue.title')}
                name="date_of_issue_of_passport"
              >
                <DatePicker
                  disabledDate={futureDate}
                  placeholder={t('customerDetail.Date of issue.placeholder')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item
                label={t('customerDetail.Valid until.title')}
                name="expiration_date_of_passport"
              >
                <DatePicker
                  disabledDate={pastDate}
                  placeholder={t('customerDetail.Valid until.placeholder')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item
                label={t('customerDetail.Issuing authority.title')}
                name="place_of_passort"
              >
                <MInput placeholder={t('customerDetail.Issuing authority.placeholder')} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('customerDetail.Nationality.title')} name="nationality">
                <Select
                  allowClear
                  placeholder={t('customerDetail.Nationality.placeholder')}
                  style={{ width: '100%' }}
                >
                  {customerConfig &&
                    Object.keys(customerConfig.nationalities).map((key: string) => {
                      return <Option value={key}>{customerConfig.nationalities[key]}</Option>;
                    })}
                </Select>
              </Form.Item>

              <Form.Item
                label={t('customerDetail.Immigration Visa Number.title')}
                name="visa_number"
              >
                <MInput placeholder={t('customerDetail.Immigration Visa Number.placeholder')} />
              </Form.Item>
              <Form.Item
                label={t('customerDetail.Valid until.title')}
                name="expiration_date_of_visa"
              >
                <DatePicker
                  disabledDate={pastDate}
                  placeholder={t('customerDetail.Valid until.placeholder')}
                  style={{
                    height: 32,
                    borderRadius: 4,
                    marginRight: 11,
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item label={t('customerDetail.Issuing authority.title')} name="place_of_visa">
                <MInput placeholder={t('customerDetail.Issuing authority.placeholder')} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </TabPane>
    </Tabs>
  );
}

export default CustomerDetailInformation;
