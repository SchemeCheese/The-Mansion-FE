import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Card, Col, DatePicker, Form, Row, Select, Spin } from 'antd';
import { headerWithAuthorization } from 'helpers';
import { getAPI } from 'helpers/apiService';
import moment from 'moment';
import { selectGetRooms } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { getRoomsAction } from 'actions';

import PattonButton from 'components/PattonButton';

const { Option } = Select;
const formatDate = 'YYYY-MM-DD';

function HotelFacility() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const getRoomsData = useAppSelector(selectGetRooms);
  const [form] = Form.useForm();

  const [facilities, setFacilities] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onReportFormFinish = async (values: any) => {
    const newValues = {
      ...values,
      start_date: values.start_date.format(formatDate),
      end_date: values.end_date ? values.end_date.format(formatDate) : undefined,
    };

    Object.keys(newValues).forEach(key =>
      newValues[key] === undefined ? delete newValues[key] : {},
    );

    const query = new URLSearchParams(Object(newValues)).toString();

    setIsLoading(true);

    fetch(`${process.env.REACT_APP_API_HOST}/api/v1/reports/${values.report_type}?${query}`, {
      method: 'GET',
      headers: headerWithAuthorization(),
    }).then(response => {
      setIsLoading(false);
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `Report_${values.report_type}_${moment().format('YYYYMMDDhmm')}.xlsx`;
        a.click();
      });
    });
  };

  const changeBranch = async (value: string) => {
    const response = await getAPI(`api/v1/branchs/${value}`);

    setFacilities(response.data.facilities);
    form.setFieldsValue({
      facility_id: undefined,
    });
  };

  const resetForm = () => {
    form.setFieldsValue({
      start_date: moment().subtract(15, 'days'),
      end_date: moment(),
      branch_id: window.localStorage.getItem('branch_id') ?? '1',
      facility_id: window.localStorage.getItem('facility_id') ?? '1',
      report_type: undefined,
      sort_order_by: undefined,
      sort_order_type: undefined,
      equipment_type: undefined,
    });
  };

  useEffect(() => {
    dispatch(getRoomsAction());

    form.setFieldsValue({
      start_date: moment().subtract(15, 'days'),
      end_date: moment(),
      branch_id: window.localStorage.getItem('branch_id') ?? '1',
      facility_id: window.localStorage.getItem('facility_id') ?? '1',
    });
  }, []);

  useEffect(() => {
    const branchId = window.localStorage.getItem('branch_id') ?? '1';

    async function fetchBranchInfo() {
      const response = await getAPI(`api/v1/branchs`);

      setBranchs(response.data);
    }

    async function fetchFacilityInfo() {
      const response = await getAPI(`api/v1/branchs/${branchId}`);

      setFacilities(response.data.facilities);
    }

    fetchBranchInfo();
    fetchFacilityInfo();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        name="basic"
        onFinish={onReportFormFinish}
        style={
          {
            // minHeight: 'calc(100vh - 209px)',
          }
        }
        wrapperCol={{
          span: 23,
        }}
      >
        <Card bordered={false} size="small">
          <Row>
            <Col span={8}>
              <Form.Item
                label={t('report.Branch.title')}
                name="branch_id"
                rules={[{ required: true, message: 'Please select branch' }]}
              >
                <Select
                  allowClear
                  onChange={changeBranch}
                  placeholder={t('report.Branch.placeholder')}
                >
                  {branchs.length > 0 &&
                    branchs.map((branch: any) => <Option key={branch.id}>{branch.name}</Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                label={t('report.Facility.title')}
                name="facility_id"
                rules={[{ required: true, message: 'Please select facility' }]}
              >
                <Select allowClear placeholder={t('report.Facility.placeholder')}>
                  {facilities.length > 0 &&
                    facilities.map((facility: any) => (
                      <Option key={facility.id} value={facility.id.toString()}>
                        {facility.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item label={t('report.Equipment Type.title')} name="equipment_type">
                <Select allowClear placeholder={t('report.Equipment Type.placeholder')}>
                  {getRoomsData.items?.map((item: any) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('report.Report Type.title')}
                name="report_type"
                rules={[{ required: true, message: 'Please select report type' }]}
              >
                <Select allowClear placeholder={t('report.Report Type.placeholder')}>
                  <Option value="staying">Staying Report</Option>
                  <Option value="sales">Sale Report</Option>
                </Select>
              </Form.Item>

              <Form.Item label={t('report.Sort order by.title')} name="sort_order_by">
                <Select allowClear placeholder={t('report.Sort order by.placeholder')}>
                  <Option value="checkin_date">Chekin Date</Option>
                  <Option value="checkout_date">Checkout Date</Option>
                  <Option value="equipment_type">Equipment Type</Option>
                  <Option value="folio_number">Booking ID</Option>
                </Select>
              </Form.Item>

              <Form.Item label={t('report.Sort order type.title')} name="sort_order_type">
                <Select allowClear placeholder={t('report.Sort order type.placeholder')}>
                  <Option value="asc">ASC</Option>
                  <Option value="desc">DESC</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('report.Report Start Date.title')}
                name="start_date"
                rules={[{ required: true, message: 'Please select the start date' }]}
              >
                <DatePicker format={formatDate} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label={t('report.Report End Date.title')} name="end_date">
                <DatePicker format={formatDate} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col sm={8} style={{ marginBottom: 24 }}>
              <PattonButton
                onClick={() => form.submit()}
                style={{
                  width: 120,
                  height: 32,
                  marginRight: 8,
                }}
              >
                {t('report.Export Excel')}
              </PattonButton>
              <PattonButton
                onClick={resetForm}
                style={{
                  width: 120,
                  height: 32,
                  border: '1px solid #D9D9D9',
                  background: '#FFF',
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                {t('report.Reset')}
              </PattonButton>
            </Col>
          </Row>
        </Card>
      </Form>
    </Spin>
  );
}

export default HotelFacility;
