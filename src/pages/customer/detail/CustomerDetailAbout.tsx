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
import { Card, Checkbox, Col, DatePicker, Form, message, Row, Select, Space, Tag } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/lib/input/TextArea';
import { formatDate } from 'helpers';
import { getAPI, putAPI } from 'helpers/apiService';
import moment from 'moment';
import { selectGetCustomerDetail, selectGetRooms } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getCustomerDetailAction } from 'actions';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

const getSelectValue = (value: number) => {
  if (value !== null) {
    return String(value);
  }

  return undefined;
};

function CustomerDetailAbout() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data: customerData } = useAppSelector(selectGetCustomerDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [tags, setTags]: any = useState([]);
  const getRoomsData = useAppSelector(selectGetRooms);

  const [customerConfig, setCustomerConfig]: any = useState();

  const futureDate: RangePickerProps['disabledDate'] = value => {
    // Can not select days after today
    return value >= moment().endOf('day');
  };

  const onContactFormFinish = async (values: any) => {
    const result = await putAPI(`/api/v1/guests/${id}/update`, {
      ...values,
      date_of_birth: values.date_of_birth ? values.date_of_birth.format(formatDate) : null,
      tags,
    });

    if (result.data.success) {
      message.success('Update more info successfully!');

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
      client_rank: getSelectValue(customerData.client_rank),
      married: getSelectValue(customerData.married),
      pillow_type: getSelectValue(customerData.pillow_type),
      gender: getSelectValue(customerData.gender),
      mattress_type: getSelectValue(customerData.mattress_type),
      baby_seat: getSelectValue(customerData.baby_seat),
      date_of_birth: customerData.date_of_birth ? moment(customerData.date_of_birth) : undefined,
    });

    setTags(
      customerData.tags.map((item: number) => {
        return item.toString();
      }),
    );
  }, [customerData]);

  useEffect(() => {
    async function fetchCustomerConfig() {
      const response = await getAPI(`/api/v1/get-customer-config`);

      setCustomerConfig(response.data);
    }

    fetchCustomerConfig();
  }, []);

  const handleSelectTag = (key: string) => {
    const newTags: Array<string> = [...tags];

    const indexTag = newTags.indexOf(key);

    if (indexTag === -1) {
      newTags.push(key);
    } else {
      newTags.splice(indexTag, 1);
    }

    setTags(newTags);
  };

  return (
    <Card
      bordered={false}
      className="customer-detail-about"
      size="small"
      title={t('customerDetail.Get to know more about your customer')}
    >
      <Form
        autoComplete="off"
        form={form}
        labelCol={{ span: 23 }}
        layout="vertical"
        name="basic"
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
              label={t('customerDetail.Rank.title')}
              name="client_rank"
              rules={[{ required: true, message: 'Please input the type!' }]}
            >
              <Select
                allowClear
                placeholder={t('customerDetail.Rank.placeholder')}
                style={{ width: '100%' }}
              >
                <Option value="1">VIP</Option>
                <Option value="2">Dominant Person</Option>
                <Option value="3">General Person</Option>
                <Option value="9">Undesirable Guest</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('customerDetail.Date of birth.title')} name="date_of_birth">
              <DatePicker
                disabledDate={futureDate}
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '100%',
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('customerDetail.Favourite Room Types 1.title')}
              name="favorite_equipment1"
            >
              <Select
                allowClear
                placeholder={t('customerDetail.Favourite Room Types 1.placeholder')}
                style={{ width: '100%' }}
              >
                {getRoomsData.items?.map((item: any) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>

            <Form.Item label={t('customerDetail.Pillow Type.title')} name="pillow_type">
              <Select
                allowClear
                placeholder={t('customerDetail.Pillow Type.placeholder')}
                style={{ width: '100%' }}
              >
                {customerConfig &&
                  Object.keys(customerConfig.pillow_types).map((key: string) => {
                    return <Option value={key}>{customerConfig.pillow_types[key]}</Option>;
                  })}
              </Select>
            </Form.Item>

            <Form.Item
              label={t('customerDetail.Favourite Food and Beverage.title')}
              name="fav_food"
            >
              <TextArea
                placeholder={t('customerDetail.Favourite Food and Beverage.placeholder')}
                rows={5}
              />
            </Form.Item>

            <Form.Item label={t('customerDetail.Notes.title')} name="note">
              <TextArea placeholder={t('customerDetail.Notes.placeholder')} rows={5} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Member ID.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <MInput placeholder={t('customerDetail.Member ID.placeholder')} />
              </Col>
            </Row>
            <Form.Item label={t('customerDetail.Marital Status.title')} name="married">
              <Select
                allowClear
                placeholder={t('customerDetail.Marital Status.placeholder')}
                style={{ width: '100%' }}
              >
                <Option value="1">Not Married</Option>
                <Option value="2">Married</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={t('customerDetail.Favourite Room Types 2.title')}
              name="favorite_equipment2"
            >
              <Select
                allowClear
                placeholder={t('customerDetail.Favourite Room Types 2.placeholder')}
                style={{ width: '100%' }}
              >
                {getRoomsData.items?.map((item: any) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </Form.Item>

            <Form.Item label={t('customerDetail.Mattress Type.title')} name="mattress_type">
              <Select
                allowClear
                placeholder={t('customerDetail.Mattress Type.placeholder')}
                style={{ width: '100%' }}
              >
                {customerConfig &&
                  Object.keys(customerConfig.mattress_type).map((key: string) => {
                    return <Option value={key}>{customerConfig.mattress_type[key]}</Option>;
                  })}
              </Select>
            </Form.Item>

            <Form.Item label={t('customerDetail.Allergies Notes.title')} name="allergies_note">
              <TextArea placeholder={t('customerDetail.Allergies Notes.placeholder')} rows={5} />
            </Form.Item>

            <Form.Item label={t('customerDetail.Favourite Tours.title')} name="fav_tour">
              <TextArea placeholder={t('customerDetail.Favourite Tours.placeholder')} rows={5} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="is_smoker" style={{ marginTop: 30 }} valuePropName="checked">
              <Checkbox>{t('customerDetail.Smoker.title')}</Checkbox>
            </Form.Item>
            <Form.Item label={t('customerDetail.Gender.title')} name="gender">
              <Select
                allowClear
                placeholder={t('customerDetail.Gender.placeholder')}
                style={{ width: '100%' }}
              >
                <Option value="1">Male</Option>
                <Option value="2">Female</Option>
                <Option value="3">Undefined</Option>
              </Select>
            </Form.Item>

            <Form.Item label={t('customerDetail.Baby seat.title')} name="baby_seat">
              <Select
                allowClear
                placeholder={t('customerDetail.Baby seat.placeholder')}
                style={{ width: '100%' }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </Form.Item>

            <Form.Item label={' '} />

            <Form.Item label={t('customerDetail.Allergies.title')} name="allergies">
              <Select
                allowClear
                mode="multiple"
                placeholder={t('customerDetail.Allergies.placeholder')}
                style={{ width: '100%' }}
              >
                {customerConfig &&
                  Object.keys(customerConfig.allergies).map((key: string) => {
                    return <Option value={key}>{customerConfig.allergies[key]}</Option>;
                  })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24} style={{ paddingBottom: 8 }}>
                {t('customerDetail.Hastag.title')}
              </Col>
              <Col span={23} style={{ paddingBottom: 24 }}>
                <Space size={[0, 8]} wrap>
                  {customerConfig &&
                    Object.keys(customerConfig.tags).map((key: string) => {
                      return (
                        <Tag
                          color={tags.includes(key) ? '#1D39C4' : 'rgba(0, 0, 0, 0.45)'}
                          onClick={() => handleSelectTag(key)}
                          style={{ borderRadius: '15px', cursor: 'pointer' }}
                        >
                          {customerConfig.tags[key]}
                        </Tag>
                      );
                    })}
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default CustomerDetailAbout;
