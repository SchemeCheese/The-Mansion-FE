/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 28/08/2022
Updated Date : 30/08/2022
Main functions : Create Guest Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from 'antd';
import moment from 'moment';
import { selectCreateGuest } from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import { createGuest } from 'actions';

const { Option } = Select;

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

interface Props {
  isModalVisible: boolean;
  reservationDetailId: string;
  setIsModalVisible: (value: boolean) => void;
}

function CreateGuestModal({ isModalVisible, reservationDetailId, setIsModalVisible }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    form.submit();
  };

  const onFinish = (values: any) => {
    setIsModalVisible(false);
    dispatch(
      createGuest({
        payload: {
          ...values,
          operator_code: 'the_mansion',
          reservation_detail_id: reservationDetailId,
          expiration_date_passport: moment(values.expiration_date_passport).format('YYYY-MM-DD'),
          expiration_date_visa: moment(values.expiration_date_visa).format('YYYY-MM-DD'),
          date_of_issue: moment(values.date_of_issue).format('YYYY-MM-DD'),
          date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
        },
      }),
    );
  };

  const createGuestData = useAppSelector(selectCreateGuest);

  const { changed } = useTreeChanges(createGuestData);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success('Add guest successfully!');
    }
  }, [changed]);

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
      uid: '-6',
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
          form={form}
          initialValues={{
            remember: true,
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
            <Col span={9}>
              <Form.Item label={t('guest.Guest Type')} name="client_kind">
                <Select defaultValue="personal">
                  <Option value="1">Personal</Option>
                  <Option value="2">female</Option>
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
                    <Form.Item label={t('guest.Rank.title')} name="client_rank">
                      <Select allowClear placeholder={t('guest.Rank.placeholder')}>
                        <Option value="1">male</Option>
                        <Option value="2">female</Option>
                        <Option value="3">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Identity / Passport No.title')} name="passport_no">
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
                    <Form.Item label={t('common.Email.title')} name="email_address1">
                      <Input placeholder={t('common.Email.placeholder')} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label={t('common.Mobile Phone.title')} name="telephone_number1">
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
                    <Form.Item label={t('common.Date Of Birth')} name="date_of_birth">
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
                        <Option value="1">Male</Option>
                        <Option value="2">female</Option>
                        <Option value="0">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Visa Expire Date')} name="expiration_date_visa">
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
                    <Form.Item
                      label={t('guest.Passport Expire Date')}
                      name="expiration_date_passport"
                    >
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
                    <Form.Item label={t('guest.Marital Status')} name="married">
                      <Select defaultValue="married">
                        <Option value="1">Married</Option>
                        <Option value="2">female</Option>
                        <Option value="3">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label={t('guest.Smoking')} name="is_smoker">
                          <Select defaultValue="no">
                            <Option value="1">No smoking</Option>
                            <Option value="2">female</Option>
                            <Option value="3">other</Option>
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
                    <Form.Item label={t('guest.Email 2.title')} name="email_address2">
                      <Input placeholder={t('guest.Email 2.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label={t('guest.Mobile Number 2.title')}
                          name="telephone_number2"
                        >
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
                    <Form.Item label={t('common.Currency')} name="currency_conversion_id">
                      <Select defaultValue="usd">
                        <Option value="1">USD</Option>
                        <Option value="2">female</Option>
                        <Option value="3">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label={t('guest.Preferred Room Type 1')} name="favorite_equipment1">
                      <Select defaultValue="alex">
                        <Option value="1">Alex</Option>
                        <Option value="2">female</Option>
                        <Option value="3">other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Preferred Room Type 2')} name="favorite_equipment2">
                      <Select defaultValue="alex">
                        <Option value="1">Alex</Option>
                        <Option value="2">female</Option>
                        <Option value="3">other</Option>
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
                      name="vat_address"
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
