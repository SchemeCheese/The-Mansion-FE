/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Quick Bulk Update Modal
************************************ */

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, DatePicker, Form, Input, Modal, Row } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';

import { updateRoomAvailableAction } from 'actions';

interface Props {
  isShowQuickUpdateModal: boolean;
  setIsShowQuickUpdateModal: any;
  updateInfo: any;
}

function QuickBulkUpdateModal({
  isShowQuickUpdateModal,
  setIsShowQuickUpdateModal,
  updateInfo,
}: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOK = () => {
    form.validateFields().then(values => {
      form.resetFields();

      dispatch(
        updateRoomAvailableAction({
          payload: {
            room_number: values.room_number,
            room_id: updateInfo.room_id,
            start_date: values.start_date.format('YYYY-MM-DD'),
            end_date: values.end_date.format('YYYY-MM-DD'),
            enabled_day: values.enabled_day,
          },
        }),
      );

      setIsShowQuickUpdateModal(false);
    });
  };

  const disabledEndDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current < moment(updateInfo.from_date).endOf('day');
  };

  useEffect(() => {
    form.setFieldsValue({
      room_number: updateInfo.room_number,
      start_date: moment(updateInfo.from_date),
      end_date: moment(updateInfo.from_date),
    });
  }, [updateInfo]);

  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: '#1D39C4' } }}
      okText="Save"
      onCancel={() => setIsShowQuickUpdateModal(false)}
      onOk={handleOK}
      title={
        <>
          <svg
            fill="none"
            height="20"
            viewBox="0 0 12 20"
            width="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9477 7.7013C11.9126 7.63688 11.8617 7.58329 11.8002 7.54601C11.7387 7.50873 11.6688 7.48908 11.5977 7.48908H6.32712L7.21074 0.464925C7.22022 0.370918 7.19902 0.276326 7.15055 0.19638C7.10207 0.116434 7.02915 0.0557853 6.94352 0.0241997C6.85789 -0.00738599 6.76453 -0.00807098 6.67848 0.022255C6.59243 0.052581 6.51869 0.112153 6.46914 0.19138L0.0595965 11.8743C0.0221153 11.9377 0.0015728 12.0104 8.67728e-05 12.0848C-0.00139925 12.1593 0.016225 12.2328 0.0511425 12.2977C0.0860601 12.3627 0.137007 12.4169 0.198731 12.4545C0.260454 12.4922 0.33072 12.5121 0.402283 12.5121H5.59407L4.89381 19.5468C4.88693 19.6405 4.91036 19.7339 4.96038 19.8121C5.01039 19.8904 5.08412 19.9489 5.16982 19.9785C5.25553 20.0082 5.34829 20.0071 5.43335 19.9755C5.51841 19.944 5.59088 19.8837 5.63923 19.8044L11.9429 8.12271C11.9794 8.05919 11.9991 7.98672 12 7.91269C12.0008 7.83866 11.9828 7.76572 11.9477 7.7013Z"
              fill="black"
              fillOpacity="0.45"
            />
          </svg>
          <span style={{ paddingLeft: 10 }}>Quick Bulk Update</span>
        </>
      }
      visible={isShowQuickUpdateModal}
      width={850}
    >
      <Form
        autoComplete="off"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        form={form}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        initialValues={{
          // start_date: moment(),
          // end_date: moment(),
          enabled_day: ['0', '1', '2', '3', '4', '5', '6'],
        }}
        name="basic"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Set Availability to"
              name="room_number"
              rules={[{ required: true, message: 'Please input number!' }]}
            >
              <Input style={{ width: '35%' }} />
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              name="start_date"
              rules={[{ required: true, message: 'Please input from date!' }]}
            >
              <DatePicker disabled placeholder="From Date" style={{ width: '90%' }} />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="end_date"
              rules={[{ required: true, message: 'Please input to date !' }]}
            >
              <DatePicker
                disabledDate={disabledEndDate}
                placeholder="To Date"
                style={{ width: '90%' }}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item name="enabled_day">
              <Checkbox.Group>
                <Checkbox style={{ lineHeight: '32px' }} value="1">
                  Mon
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="2">
                  Tue
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="3">
                  Web
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="4">
                  Thu
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="5">
                  Fri
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="6">
                  Sat
                </Checkbox>
                <Checkbox style={{ lineHeight: '32px' }} value="0">
                  Sun
                </Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default QuickBulkUpdateModal;
