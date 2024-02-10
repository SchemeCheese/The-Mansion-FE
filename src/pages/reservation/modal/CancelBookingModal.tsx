/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 05/09/2022
Updated Date : 05/09/2022
Main functions : Cancel Booking Modal
************************************ */

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Checkbox, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import { selectCancelReservationDetail, selectRoomOptions, selectUser } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { cancelReservationDetail, getReservation, getRoomOption } from 'actions';

const { Option } = Select;

interface Props {
  cancelCurrentItem?: any;
  isModalVisible: boolean;
  reservation: any;
  selectedRowKeys: any;
  setModalVisible: (value: boolean) => void;
  setSelectedRowKeys: (value: any) => void;
}

function CancelBookingModal({
  cancelCurrentItem,
  isModalVisible,
  reservation,
  selectedRowKeys,
  setModalVisible,
  setSelectedRowKeys,
}: Props) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = (values: any) => {
    setModalVisible(false);

    dispatch(
      cancelReservationDetail({
        payload: {
          reservation_id: reservation.id,
          client_info_id: reservation.client_info_id,
          cancel_reason: values.cancel_reason,
          cancel_type: values.cancel_type,
          reservation_detail_id: selectedRowKeys,
        },
      }),
    );
  };

  const handleOk = () => {
    form.submit();
  };

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const cancelReservationData = useAppSelector(selectCancelReservationDetail);
  const { changed } = useTreeChanges(cancelReservationData);

  const userData = useAppSelector(selectUser);
  const roomOptionsData: any = useAppSelector(selectRoomOptions);

  const roomOptions = _.keys(roomOptionsData?.data).map((key: any) => {
    return (
      <Option key={key} value={key}>
        {roomOptionsData?.data[key]}
      </Option>
    );
  });

  useEffect(() => {
    dispatch(getRoomOption());
  }, []);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Cancel reservation successfully!'));

      setSelectedRowKeys([]);

      dispatch(
        getReservation({
          reservation_id: reservation.id ?? '',
        }),
      );
    }
  }, [changed]);

  useEffect(() => {
    form.setFieldsValue({
      cancel_type: undefined,
      cancel_reason: '',
    });
  }, [isModalVisible]);

  useEffect(() => {
    if (cancelCurrentItem) {
      form.setFieldsValue({
        cancel_type: cancelCurrentItem.cancelInfo.cancel_type.toString(),
        cancel_reason: cancelCurrentItem.cancelInfo.opinion_content,
      });
    }
  }, [cancelCurrentItem]);

  return (
    <Modal
      okButtonProps={{
        style: {
          backgroundColor: '#1D39C4',
          display: cancelCurrentItem !== null ? 'none' : 'initial',
        },
      }}
      okText={t('common.Save')}
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 80, borderRadius: 4 }}
      title={<b>{t('reservation.Cancel Booking')}</b>}
      visible={isModalVisible}
      width={850}
    >
      <Form
        autoComplete="off"
        form={form}
        initialValues={{
          folio_id: reservation.reservation_number,
        }}
        labelCol={{
          span: 24,
        }}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        wrapperCol={{
          span: 23,
        }}
      >
        <Row>
          <Col span={8}>
            <Form.Item label={t('reservation.Folio ID')} name="folio_id">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={8}>
            <div
              style={{
                bottom: 0,
                position: 'absolute',
                paddingBottom: 24,
                textAlign: 'center',
                paddingLeft: 34,
              }}
            >
              <span>
                {t('reservation.Receptionist')}:{' '}
                {cancelCurrentItem ? cancelCurrentItem.cancelInfo.receptionist : userData.username}
              </span>
            </div>
          </Col>
          <Col span={8}>
            <Form.Item
              name="send_email_confirm"
              style={{
                marginBottom: 12,
                bottom: 0,
                position: 'absolute',
                paddingBottom: 9,
                width: '100%',
                textAlign: 'right',
              }}
              valuePropName="checked"
            >
              <Checkbox disabled={cancelCurrentItem !== null}>
                {t('reservation.Send confirmation email')}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={t('reservation.Type.title')}
              name="cancel_type"
              rules={[
                {
                  required: true,
                  message: 'Please select a cancel type',
                },
              ]}
            >
              <Select
                allowClear
                disabled={cancelCurrentItem !== null}
                placeholder={t('reservation.Type.placeholder')}
              >
                {roomOptions}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('reservation.Reason for booking cancellation.title')}
              name="cancel_reason"
              rules={[
                {
                  required: true,
                  message: 'Please select a reason',
                },
              ]}
              wrapperCol={{ span: 24 }}
            >
              <TextArea
                placeholder={t('reservation.Reason for booking cancellation.placeholder')}
                readOnly={cancelCurrentItem !== null}
                rows={5}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default CancelBookingModal;
