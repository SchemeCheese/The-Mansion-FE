import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, DatePicker, Row, Select } from 'ui/antd';
import moment from 'moment';

import { downloadCSVBranchManagerAction } from 'actions';

import PattonButton from 'components/PattonButton';

const { Option } = Select;
const formatDate = 'YYYY-MM-DD';

function DownLoadCSV() {
  const dispatch = useDispatch();
  const [cateIdState, setCateIdState] = useState<string>('all');
  const [startDateState, setStartDateState] = useState<string>('');
  const [endDateState, setEndDateState] = useState<string>('');

  const handlerDownloadCsv = () => {
    dispatch(
      downloadCSVBranchManagerAction({
        payload: {
          language: 'en',
          start_date: startDateState,
          end_date: endDateState,
          cate_id: cateIdState,
          file_name: 'branch_power_monitoring.csv',
        },
      }),
    );
  };

  const handleChangeSelect = (value: string) => {
    setCateIdState(value);
  };

  const handleChangeDateTime = (date: any, type: string) => {
    const value = date.format(formatDate);

    if (type === 'start') {
      setStartDateState(value);
    } else {
      setEndDateState(value);
    }
  };

  const disabledDate = (current: any) => {
    return current && current < moment().endOf('day');
  };

  return (
    <Card>
      <Row align="bottom">
        <Col sm={4} xs={24}>
          <p>Categories</p>
          <Select
            defaultValue={cateIdState}
            onChange={value => handleChangeSelect(value)}
            style={{
              width: 178,
            }}
          >
            <Option value="all">All</Option>
            <Option value="hotel">Hotel</Option>
            <Option value="spa">Spa</Option>
            <Option value="restaurant">Restaurant</Option>
            <Option value="pool">Pool</Option>
            <Option value="golf_course">Golf course</Option>
            <Option value="other">Other</Option>
          </Select>
        </Col>

        <Col sm={3}>
          <p>Start date</p>
          <DatePicker
            defaultValue={startDateState ? moment(startDateState, formatDate) : undefined}
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            onChange={date => handleChangeDateTime(date, 'start')}
          />
        </Col>

        <Col sm={3}>
          <p>End date</p>
          <DatePicker
            defaultValue={endDateState ? moment(endDateState, formatDate) : undefined}
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            onChange={date => handleChangeDateTime(date, 'end')}
          />
        </Col>

        <Col sm={3}>
          <PattonButton onClick={handlerDownloadCsv}>Download</PattonButton>
        </Col>
      </Row>
    </Card>
  );
}

export default DownLoadCSV;
