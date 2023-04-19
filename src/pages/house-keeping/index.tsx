/** ***********************************
Module Name: House Keeping
Developer Name: HanhTV
Created Date: 12/04/2023
Updated Date: 12/04/2023
Main functions: House Keeping Index
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Form, Pagination, Row, Spin } from 'antd';
import { selectHouseKeepingState } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getHouseKeepingAction } from 'actions';

import MInput from 'components/MInput';
import Room from 'components/Room';

function HouseKeeping() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const houseKeepingData: any = useAppSelector(selectHouseKeepingState);
  const [searchCondition, setSearchCondition] = useState<any>({
    current_page: 1,
    per_page: 9,
  });

  useEffect(() => {
    dispatch(getHouseKeepingAction(searchCondition));
  }, []);

  const onChangeCurrentPage = (page: number, perPage: number) => {
    setSearchCondition({
      ...searchCondition,
      current_page: page,
      per_page: perPage,
    });
    dispatch(getHouseKeepingAction(searchCondition));
  };

  const searchInput = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(getHouseKeepingAction(searchCondition));
    }
  };

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
      {houseKeepingData ? (
        <Row className="content house-keeping-content">
          <Row style={{ background: 'white', width: '100%' }}>
            <Col span={24}>
              <Col span={5}>
                <Form style={{ padding: '16px 0 0 16px' }}>
                  <Form.Item className="search-house-keeping">
                    <MInput
                      onChange={e =>
                        setSearchCondition({
                          ...searchCondition,
                          room_number: e.target.value,
                        })
                      }
                      onKeyUp={event => searchInput(event)}
                      placeholder="Enter Equipment Code"
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Col>
          </Row>
          <Room />
          <Row style={{ background: 'white', width: '100%' }}>
            <Col span={24}>
              {houseKeepingData.total > 0 && (
                <Pagination
                  defaultCurrent={houseKeepingData.current_page}
                  onChange={onChangeCurrentPage}
                  pageSize={houseKeepingData.per_page}
                  showSizeChanger={false}
                  style={{ float: 'right', marginTop: 15, padding: '0 16px 16px 0' }}
                  total={houseKeepingData.total}
                />
              )}
            </Col>
          </Row>
        </Row>
      ) : (
        <Spin style={{ width: '100%', minHeight: 300, marginTop: '15%' }} />
      )}
    </>
  );
}

export default HouseKeeping;
