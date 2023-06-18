import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { InboxOutlined } from '@ant-design/icons';
import { Checkbox, Col, Form, message, Modal, Row, Select, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import MInput from 'components/MInput';

const { Dragger } = Upload;

interface Props {
  dataInvoice?: any;
  isModalOpen: boolean;
  setModalVisible: (value: boolean) => void;
}

function AddInvoiceModal({ dataInvoice, isModalOpen, setModalVisible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;

  const handleChange = (value: string) => {
    setModalVisible(false);
  };

  const handleButtonSubmit = () => {
    setModalVisible(false);
  };

  const DragProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info: any) {
      const { status } = info.file;

      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

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
      <Form layout="vertical">
        <Row>
          <Col span={9} style={{ paddingRight: 15 }}>
            <Form.Item label={t('monthlyInvoice.Folio ID.title')}>
              <MInput />
            </Form.Item>
            <Form.Item label={t('monthlyInvoice.Type.title')}>
              <Select allowClear placeholder={t('monthlyInvoice.Type.placeholder')}>
                <Option value="1">OTA</Option>
                <Option value="2">CDT</Option>
                <Option value="4">CORPORATE</Option>
                <Option value="5">WHOLESALE</Option>
                <Option value="7">FIT</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={9} style={{ paddingLeft: 15 }}>
            <Form.Item label={t('monthlyInvoice.Guest Name.title')}>
              <MInput />
            </Form.Item>
            <Form.Item label={t('monthlyInvoice.Total.title')}>
              <MInput />
            </Form.Item>
          </Col>
          <Col span={6}>
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
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default AddInvoiceModal;
