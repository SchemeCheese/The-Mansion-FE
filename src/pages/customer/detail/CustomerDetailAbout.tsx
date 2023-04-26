import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Checkbox, Col, DatePicker, Row, Select, Space, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

function CustomerDetailAbout() {
  const { t } = useTranslation();

  return (
    <Card
      bordered={false}
      className="customer-detail-about"
      size="small"
      title={t('customerDetail.Get to know more about your customer')}
    >
      <Row style={{ padding: 16 }}>
        <Col span={24} style={{ marginTop: 15, marginBottom: 15, paddingRight: 15 }}>
          <PattonButton
            onClick={() => console.log('handleUpdate Get to know more about your customer')}
            style={{ float: 'right' }}
          >
            {t('common.Update')}
          </PattonButton>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Rank.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Rank.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Date of birth.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <DatePicker
                // onChange={date => handleChangeDateTime(date, 'checkout_date', '')}
                style={{
                  height: 32,
                  borderRadius: 4,
                  marginRight: 11,
                  width: '100%',
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Favourite Room Types 1.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Favourite Room Types 1.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Favourite Room Types 2.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Favourite Room Types 2.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Notes.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <TextArea placeholder={t('customerDetail.Notes.placeholder')} rows={5} />
            </Col>
          </Row>
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
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Marital Status.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Marital Status.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Pillow Type.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Pillow Type.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Mattress  Type.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Mattress  Type.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Favourite Tours.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <TextArea placeholder={t('customerDetail.Favourite Tours.placeholder')} rows={5} />
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24} style={{ paddingBottom: 8, visibility: 'hidden' }}>
              {t('customerDetail.Smoker.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 27, paddingTop: 5 }}>
              <Checkbox checked>{t('customerDetail.Smoker.title')}</Checkbox>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Gender.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Gender.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Allergies.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Allergies.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Baby seat.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Select
                allowClear
                placeholder={t('customerDetail.Baby seat.placeholder')}
                style={{ width: '100%' }}
              >
                <Option>1</Option>
                <Option>2</Option>
                <Option>3</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Favourite Food and Beverage.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <TextArea
                placeholder={t('customerDetail.Favourite Food and Beverage.placeholder')}
                rows={5}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={24} style={{ paddingBottom: 8 }}>
              {t('customerDetail.Hastag.title')}
            </Col>
            <Col span={23} style={{ paddingBottom: 24 }}>
              <Space size={[0, 8]} wrap>
                <Tag color="#1D39C4" style={{ borderRadius: '15px' }}>
                  Group
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Couple
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Discovery tour
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Vacation trip
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  European Food
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Asian Food
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Anniversary
                </Tag>
                <Tag color="rgba(0, 0, 0, 0.45)" style={{ borderRadius: '15px' }}>
                  Birthday
                </Tag>
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default CustomerDetailAbout;
