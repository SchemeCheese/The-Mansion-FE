/** ***********************************
Module Name: House Keeping
Developer Name: HanhTV
Created Date: 12/04/2023
Updated Date: 12/04/2023
Main functions: House Keeping Index
************************************ */

import 'styles/house_keeping.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, Form, Pagination, Radio, Row } from 'antd';

import MInput from 'components/MInput';

function HouseKeeping() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Col span={24}>
          <p className="title">
            <span
              style={{
                fontStyle: 'normal',
                color: 'rgba(0, 0, 0, 0.85)',
              }}
            >
              {t('common.House Keeping')}
            </span>
          </p>
        </Col>
        <Col span={24}>
          <p className="">
            <span
              style={{
                fontSize: 13,
                lineHeight: '20px',
                paddingLeft: 24,
                color: 'rgba(0, 0, 0, 0.45)',
              }}
            >
              {t('houseKeeping.House Keeping Management')}
            </span>
          </p>
        </Col>
      </Row>
      <Row className="content house-keeping-content">
        <Row style={{ background: 'white', width: '100%' }}>
          <Col span={24}>
            <Col span={5}>
              <Form style={{ padding: '16px 0 0 16px' }}>
                <Form.Item className="search-house-keeping">
                  <MInput placeholder="Enter Equipment Code" />
                </Form.Item>
              </Form>
            </Col>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="Alex - Premium Alex"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="An Hoi - Superior Double"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={1}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={2}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 16px 16px 16px' }}
              title="Dong Hiep - Superior Double"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={1}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={3}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="Alex - Premium Alex"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={3}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={2}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="An Hoi - Superior Double"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={1}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={2}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 16px 16px 16px' }}
              title="Dong Hiep - Superior Double"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={1}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={3}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="Alex - Premium Alex"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={3}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={2}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              style={{ textAlign: 'center', margin: '0 0 16px 16px' }}
              title="An Hoi - Superior Double"
            >
              <Row>
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Room Status')}</p>
                  <Radio.Group value={1}>
                    <Col>
                      <Radio value={1}>Empty</Radio>
                    </Col>
                    <Col>
                      {' '}
                      <Radio value={2}>Busy</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Inspect</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
                <Col span={4} />
                <Col span={10} style={{ textAlign: 'left' }}>
                  <p>{t('houseKeeping.Cleaning Status')}</p>
                  <Radio.Group value={2}>
                    <Col>
                      <Radio value={1}>Ready</Radio>
                    </Col>
                    <Col>
                      <Radio value={2}>Cleaning</Radio>
                    </Col>
                    <Col>
                      <Radio value={3}>Dirty</Radio>
                    </Col>
                  </Radio.Group>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={24}>
            <Pagination
              defaultCurrent={2}
              pageSize={5}
              showSizeChanger={false}
              style={{ float: 'right', marginTop: 15, padding: '0 16px 16px 0' }}
              total={40}
            />
          </Col>
        </Row>
      </Row>
    </>
  );
}

export default HouseKeeping;
