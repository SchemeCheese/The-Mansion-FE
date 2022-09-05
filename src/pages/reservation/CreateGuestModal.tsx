/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 28/08/2022
Updated Date : 30/08/2022
Main functions : Create Guest Modal
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation();

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
              <Form.Item label={t('guest.Guest Type')} name="market">
                <Select defaultValue="personal">
                  <Option value="personal">Personal</Option>
                  <Option value="female">female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Card bordered={false} size="small" title={t('common.General Informations')}>
                <Row>
                  <Col span={8}>
                    <Form.Item label={t('guest.First Name.title')} name="first_name">
                      <Input placeholder={t('guest.First Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Last Name.title')} name="last_name">
                      <Input placeholder={t('guest.Last Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Rank.title')} name="rank">
                      <Select allowClear placeholder={t('guest.Rank.placeholder')}>
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Identity / Passport No.title')} name="passport">
                      <Input placeholder={t('guest.Identity / Passport No.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Date Of Issue')} name="date_of_issue">
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
                    <Form.Item label={t('guest.Place Of Issue')} name="place_of_issue">
                      <Select defaultValue="usa">
                        <Option value="usa">USA</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('common.Email.title')} name="email">
                      <Input placeholder={t('common.Email.placeholder')} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label={t('common.Mobile Phone.title')} name="mobile_phone">
                      <Input placeholder={t('common.Mobile Phone.placeholder')} />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Card bordered={false} size="small" title="Other Informations">
                <Row>
                  <Col span={8}>
                    <Form.Item label={t('common.Date Of Birth')} name="dob">
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
                    <Form.Item label={t('common.Nationality.title')} name="nationality">
                      <Select allowClear placeholder={t('common.Nationality.placeholder')}>
                        <Option value="married">Married</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('common.Gender')} name="gender">
                      <Select defaultValue="male">
                        <Option value="male">Male</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Visa Expire Date')} name="visa_expire_date">
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
                    <Form.Item label={t('guest.Passport Expire Date')} name="passport_expire_date ">
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
                    <Form.Item label={t('common.Language')} name="language">
                      <Select defaultValue="english">
                        <Option value="english">English</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Marital Status')} name="marital_status">
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
                        <Form.Item label={t('guest.Smoking')} name="smoking">
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
                    <Form.Item label={t('guest.Email 2.title')} name="email2">
                      <Input placeholder={t('guest.Email 2.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label={t('guest.Mobile Number 2.title')} name="mobile_number_2">
                          <Input placeholder={t('guest.Mobile Number 2.placeholder')} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Address 1.title')} name="address1">
                      <Input placeholder={t('guest.Address 1.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Address 2.title')} name="address2">
                      <Input placeholder={t('guest.Address 2.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('common.Zip Code.title')} name="zip_code">
                      <Input placeholder={t('common.Zip Code.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('common.Currency')} name="currency">
                      <Select defaultValue="usd">
                        <Option value="usd">USD</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label={t('guest.Preferred Room Type 1')}
                      name="preferred_room_type_1"
                    >
                      <Select defaultValue="alex">
                        <Option value="alex">Alex</Option>
                        <Option value="female">female</Option>
                        <Option value="other">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={t('guest.Preferred Room Type 2')}
                      name="preferred_room_type_2"
                    >
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
              <Card bordered={false} size="small" title={t('guest.Pictures')}>
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
              <Card bordered={false} size="small" title={t('guest.Guest Face Recognition')}>
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
              <Card bordered={false} size="small" title={t('common.Invoice Information')}>
                <Row>
                  <Col span={16}>
                    <Form.Item label={t('guest.Company Name.title')} name="company_name">
                      <Input placeholder={t('guest.Company Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Tax Code.title')} name="tax_code">
                      <Input placeholder={t('guest.Tax Code.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={t('guest.Address.title')}
                      name="address"
                      style={{ paddingRight: 12 }}
                      wrapperCol={{
                        span: 24,
                      }}
                    >
                      <Input placeholder={t('guest.Address.placeholder')} />
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
