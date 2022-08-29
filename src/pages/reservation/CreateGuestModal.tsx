/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 28/08/2022
Updated Date : 30/08/2022
Main functions : Create Guest Modal
************************************ */

import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Col, DatePicker, Form, Input, Modal, Row, Select, Upload, UploadFile } from 'antd';
import moment from 'moment';

const { Option } = Select;

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

function CreateGuestModal({ isModalVisible, setIsModalVisible }: any) {
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);

  const handleImgCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: any) => {
    const currentFile = file;

    if (!currentFile.url && !currentFile.preview) {
      currentFile.preview = await getBase64(currentFile.originFileObj);
    }

    setPreviewImage(currentFile.url || currentFile.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      currentFile.name || currentFile.url.substring(currentFile.url.lastIndexOf('/') + 1),
    );
  };

  const handleChange = ({ fileList: newFileList }: any) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Modal footer={null} onCancel={handleImgCancel} title={previewTitle} visible={previewVisible}>
        <img
          alt="example"
          src={previewImage}
          style={{
            width: '100%',
          }}
        />
      </Modal>
      <Modal
        bodyStyle={{
          backgroundColor: '#F0F2F5',
        }}
        className="new-guest-modal"
        okText="Save"
        onCancel={handleCancel}
        onOk={handleOk}
        style={{
          top: 20,
        }}
        title="Create New Guest"
        visible={isModalVisible}
        width={1000}
      >
        <Form
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 24,
          }}
          layout="vertical"
          name="basic"
          wrapperCol={{
            span: 23,
          }}
        >
          <Row>
            <Col span={9}>
              <Form.Item label="Guest Type" name="market">
                <Select defaultValue="personal">
                  <Option value="personal">Personal</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Card bordered={false} size="small" title="General Informations">
                <Row>
                  <Col span={8}>
                    <Form.Item label="First Name" name="first_name">
                      <Input placeholder="Steve" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Last Name" name="last_name">
                      <Input placeholder="Mark" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Rank" name="rank">
                      <Select allowClear placeholder="Select rank">
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Identity / Passport No." name="passport">
                      <Input placeholder="233202783028" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Date Of Issue" name="date_of_issue">
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Place Of Issue" name="place_of_issue">
                      <Select defaultValue="usa">
                        <Option value="usa">USA</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Email" name="email">
                      <Input placeholder="steve.mark@gmail.com" />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Mobile Phone" name="mobile_phone">
                      <Input placeholder="1800 882 3639" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Card bordered={false} size="small" title="Other Informations">
                <Row>
                  <Col span={8}>
                    <Form.Item label="Date Of Birth" name="dob">
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Nationality" name="nationality">
                      <Select allowClear placeholder="Select nationality">
                        <Option value="married">Married</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Gender" name="gender">
                      <Select defaultValue="male">
                        <Option value="male">Male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Visa Expire Date" name="visa_expire_date">
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Passport Expire date " name="passport_expire_date ">
                      <DatePicker
                        defaultValue={moment('2017-08-08')}
                        style={{
                          height: 32,
                          borderRadius: 4,
                          marginRight: 11,
                          width: '100%',
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Language" name="language">
                      <Select defaultValue="english">
                        <Option value="english">English</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Marital Status" name="marital_status">
                      <Select defaultValue="married">
                        <Option value="married">Married</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Smoking" name="smoking">
                          <Select defaultValue="no">
                            <Option value="no">No smoking</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>

                  <Col span={24}>
                    <hr
                      style={{ borderTop: '0.5px solid #DCE2EA', marginTop: -5, marginBottom: 15 }}
                    />
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Email 2" name="email2">
                      <Input placeholder="Email 2" />
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label="Mobile Number 2" name="mobile_number_2">
                          <Input placeholder="Mobile Number 2" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Address 1" name="address1">
                      <Input placeholder="Address 1" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Address 2" name="address2">
                      <Input placeholder="Address 2" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Zip Code" name="zip_code">
                      <Input placeholder="Zip Code" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Currency" name="currency">
                      <Select defaultValue="usd">
                        <Option value="usd">USD</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label="Preferred Room Type 1" name="preferred_room_type_1">
                      <Select defaultValue="alex">
                        <Option value="alex">Alex</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Preferred Room Type 2" name="preferred_room_type_2">
                      <Select defaultValue="alex">
                        <Option value="alex">Alex</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Card bordered={false} size="small" title="Pictures">
                <Row>
                  <Col span={24}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      fileList={fileList}
                      listType="picture-card"
                      onChange={handleChange}
                      onPreview={handlePreview}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                  </Col>
                  <Col span={8} />
                  <Col span={8} />
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Card bordered={false} size="small" title="Guest Face Recognition">
                <Row>
                  <Col span={24}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      fileList={fileList}
                      listType="picture-card"
                      onChange={handleChange}
                      onPreview={handlePreview}
                    >
                      {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                  </Col>
                  <Col span={8} />
                  <Col span={8} />
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Card bordered={false} size="small" title="Invoice Information">
                <Row>
                  <Col span={16}>
                    <Form.Item label="Company Name" name="company_name">
                      <Input placeholder="ACS" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Tax Code" name="tax_code">
                      <Input placeholder="2187432093842" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Address"
                      name="address"
                      style={{ paddingRight: 12 }}
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Input placeholder="Address" />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default CreateGuestModal;
