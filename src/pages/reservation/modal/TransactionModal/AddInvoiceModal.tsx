/** ***********************************
Module Name : Monthly Invoice
Developer Name : HanhTV
Created Date : 26/02/2023
Updated Date : 26/02/2023
Main functions : Ann monthly invoice modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, DatePicker, Form, message, Modal, Row, Select, Upload } from 'antd';
import { AxiosError } from 'axios';
import { getAPI, postAPI } from 'helpers/apiService';
import { selectBranchInfo, selectGetReservation, selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { FileEndpoint, reservationMonthCharge } from 'config';

import MInput from 'components/MInput';

const { Dragger } = Upload;

interface Props {
  dataInvoice?: any;
  isModalOpen: boolean;
  setAddMonthlyInvoiceSucess: (value: boolean) => void;
  setModalVisible: (value: boolean) => void;
}

function AddInvoiceModal({
  dataInvoice,
  isModalOpen,
  setAddMonthlyInvoiceSucess,
  setModalVisible,
}: Props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [descriptions, setDescriptions] = useState([]);
  const monthFormat = 'MM-YYYY';
  const branchInfo = useAppSelector(selectBranchInfo);
  const [file, setFile] = useState();
  const reservationData = useAppSelector(selectGetReservation).data;
  const reservationDetailInfoData = useAppSelector(selectGetReservationDetail).data;

  const handleButtonSubmit = () => {
    form
      .validateFields()
      .then(async values => {
        const formData = new FormData();

        if (file) {
          formData.append('file', file);
        }

        formData.append('charge_kind', reservationMonthCharge.CHARGE_KIND);
        formData.append('description_id', values.description_id);
        formData.append('use_month', values.use_month.format('MM-YYYY'));
        formData.append('actual_amount', values.actual_amount);
        formData.append('operator_code', branchInfo.operator_code);

        const response = await postAPI(
          `api/v1/reservations/${dataInvoice.reservation_id}/reservation-detail/${dataInvoice.reservation_detail_id}/monthly-invoices`,
          formData,
          '',
          true,
        );

        response.data?.success
          ? message.success('Create Monthly Invoice successfully.')
          : message.error('Create Monthly Invoice failed.');

        form.resetFields();

        setModalVisible(false);
        setAddMonthlyInvoiceSucess(true);
      })
      .catch(error => {
        if (error instanceof AxiosError) {
          message.error('Create Monthly Invoice failed.');
        }
      });
  };

  const onDescriptionChange = (value: string) => {
    form.setFieldsValue({
      description_id: value,
    });
  };

  useEffect(() => {
    async function getDescriptions() {
      const data = await getAPI(
        `api/v1/descriptions?description_kind=${reservationMonthCharge.DESCRIPTION_KIND}`,
      );

      setDescriptions(data?.data);
    }

    if (isModalOpen) {
      getDescriptions();
    }
  }, [isModalOpen]);

  const DragProps = {
    name: 'file',
    maxCount: 1,
    action: `${process.env.REACT_APP_API_HOST}/${FileEndpoint.UPLOAD}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    onChange(info: any) {
      const { status } = info.file;

      setFile(info.fileList[0]?.originFileObj);

      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText="Upload"
      onCancel={() => setModalVisible(false)}
      onOk={handleButtonSubmit}
      title={<b>{t('monthlyInvoice.Add new invoice')}</b>}
      visible={isModalOpen}
      width={850}
    >
      <Form
        form={form}
        initialValues={{
          guest_name: undefined,
          use_month: undefined,
          actual_amount: undefined,
          description_id: undefined,
        }}
        layout="vertical"
      >
        <Row>
          <Col span={9} style={{ paddingRight: 15 }}>
            <Form.Item label={t('monthlyInvoice.Folio ID.title')}>
              <MInput defaultValue={reservationData.reservation_number} disabled />
            </Form.Item>
            <Form.Item
              label={t('monthlyInvoice.Type.title')}
              name="description_id"
              rules={[{ required: true, message: 'Select type' }]}
            >
              <Select
                allowClear
                onChange={onDescriptionChange}
                placeholder={t('monthlyInvoice.Type.placeholder')}
              >
                {descriptions.length > 0 &&
                  descriptions.map((description: any) => (
                    <Option key={description.id}>{description.name}</Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={9} style={{ paddingLeft: 15 }}>
            <Form.Item label={t('monthlyInvoice.Guest Name.title')}>
              <MInput defaultValue={reservationDetailInfoData.guest_name} disabled />
            </Form.Item>
            <Form.Item
              label={t('monthlyInvoice.Total.title')}
              name="actual_amount"
              rules={[
                {
                  required: true,
                  message: 'Please input total',
                },
              ]}
            >
              <MInput placeholder="30.000" type="number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('monthlyInvoice.Use Month.title')}
              name="use_month"
              rules={[{ required: true, message: 'Select use month' }]}
              style={{ paddingLeft: 20 }}
            >
              <DatePicker
                format={monthFormat}
                picker="month"
                placeholder={t('monthlyInvoice.Use Month.placeholder')}
              />
            </Form.Item>
            <Form.Item
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
              <Checkbox>{t('monthlyInvoice.Send notification email')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Dragger
                {...DragProps}
                style={{
                  background: '#FFFFFF',
                  border: '1px dashed rgba(0, 0, 0, 0.15)',
                  borderRadius: '2px',
                  height: 112,
                }}
              >
                {/* <p className="ant-upload-drag-icon"> */}
                {/*  <InboxOutlined /> */}
                {/* </p> */}
                {/* <p className="ant-upload-text">Click or drag file to this area to upload</p> */}
                <p className="ant-upload-hint">Upload file here</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddInvoiceModal;
