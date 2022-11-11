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
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import {
  selectCreateGuest,
  selectGetLanguageCode,
  selectGetReservationDetail,
  selectGetRooms,
  selectRemoveGuest,
  selectUpdateGuest,
} from 'selectors';
import useTreeChanges from 'tree-changes-hook/lib';

import { useAppSelector } from 'modules/hooks';

import { FileEndpoint } from 'config';

import {
  createGuest,
  getLanguageCodeAction,
  getReservation,
  getReservationDetail,
  getRoomsAction,
  updateGuestAction,
} from 'actions';

const { Option } = Select;

const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

interface Props {
  currentGuest: any;
  isModalVisible: boolean;
  reservationDetailId: string;
  reservationId: string;
  setIsModalVisible: (value: boolean) => void;
}

function CreateGuestModal({
  currentGuest,
  isModalVisible,
  reservationDetailId,
  reservationId,
  setIsModalVisible,
}: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const { countries } = reservationDetailInfo.data;

  const handleOk = () => {
    form.submit();
  };

  const disabledPastDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current <= moment().endOf('day');
  };

  const disabledFutureDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current >= moment().endOf('day');
  };

  const onFinish = (values: any) => {
    setIsModalVisible(false);

    const pictures = pictureFileList.map((item: any) => {
      return {
        file_id: item.file_id,
        data: item.xhr ? JSON.parse(item.xhr.responseText).fileName : null,
      };
    });

    const faceRecognitionPictures = faceRecognitionFileList.map((item: any) => {
      return {
        file_id: item.file_id,
        data: item.xhr ? JSON.parse(item.xhr.responseText).fileName : null,
      };
    });

    if (currentGuest) {
      dispatch(
        updateGuestAction({
          payload: {
            ...values,
            guest_id: currentGuest.id,
            operator_code: 'the_mansion',
            reservation_detail_id: reservationDetailId,
            expiration_date_of_passport: values.expiration_date_of_passport
              ? values.expiration_date_of_passport.format('YYYY-MM-DD')
              : null,
            expiration_date_of_visa: values.expiration_date_of_visa
              ? values.expiration_date_of_visa.format('YYYY-MM-DD')
              : null,
            date_of_issue_of_passport: values.date_of_issue_of_passport
              ? values.date_of_issue_of_passport.format('YYYY-MM-DD')
              : null,
            date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : null,
            pictures,
            face_recognitions: faceRecognitionPictures,
          },
        }),
      );
    } else {
      dispatch(
        createGuest({
          payload: {
            ...values,
            operator_code: 'the_mansion',
            reservation_detail_id: reservationDetailId,
            expiration_date_of_passport: values.expiration_date_of_passport
              ? values.expiration_date_of_passport.format('YYYY-MM-DD')
              : null,
            expiration_date_of_visa: values.expiration_date_of_visa
              ? values.expiration_date_of_visa.format('YYYY-MM-DD')
              : null,
            date_of_issue_of_passport: values.date_of_issue_of_passport
              ? values.date_of_issue_of_passport.format('YYYY-MM-DD')
              : null,
            date_of_birth: values.date_of_birth ? values.date_of_birth.format('YYYY-MM-DD') : null,
            pictures,
            face_recognitions: faceRecognitionPictures,
          },
        }),
      );
    }
  };

  const resetForm = () => {
    form.resetFields();
    form.setFieldsValue({
      client_kind: '1',
    });
  };

  const createGuestData = useAppSelector(selectCreateGuest);
  const removeGuestData = useAppSelector(selectRemoveGuest);
  const updateGuestData = useAppSelector(selectUpdateGuest);
  const getRoomsData = useAppSelector(selectGetRooms);
  const languageCodeData = useAppSelector(selectGetLanguageCode);

  const { changed } = useTreeChanges(createGuestData);
  const { changed: removeGuestChanged } = useTreeChanges(removeGuestData);
  const { changed: updateGuestChanged } = useTreeChanges(updateGuestData);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success('Add guest successfully!');

      resetForm();

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [changed]);

  useEffect(() => {
    resetForm();
  }, [reservationDetailId]);

  useEffect(() => {
    if (updateGuestChanged('status', 'SUCCESS')) {
      message.success('Update guest successfully!');

      resetForm();

      setPictureFileList([]);
      setFaceRecognitionFileList([]);

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [updateGuestChanged]);

  useEffect(() => {
    if (removeGuestChanged('status', 'SUCCESS')) {
      message.success('Remove guest successfully!');

      dispatch(
        getReservation({
          reservation_id: reservationId,
        }),
      );

      dispatch(
        getReservationDetail({
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        }),
      );
    }
  }, [removeGuestChanged]);

  useEffect(() => {
    if (currentGuest?.pictures.length > 0) {
      const pictureFileListTemporary = currentGuest?.pictures.map((picture: any) => {
        return {
          uid: picture.id,
          name: picture.name,
          status: 'done',
          url: picture.url,
          file_id: picture.id,
        };
      });

      const faceRecognitionFileListTemporary = currentGuest?.face_recognitions.map(
        (picture: any) => {
          return {
            uid: picture.id,
            name: picture.name,
            status: 'done',
            url: picture.url,
            file_id: picture.id,
          };
        },
      );

      setPictureFileList(pictureFileListTemporary);
      setFaceRecognitionFileList(faceRecognitionFileListTemporary);
    } else {
      setPictureFileList([]);
      setFaceRecognitionFileList([]);
    }
  }, [currentGuest]);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [pictureFileList, setPictureFileList] = useState<UploadFile[]>([]);

  const [faceRecognitionFileList, setFaceRecognitionFileList] = useState<UploadFile[]>([]);

  const handleImgCancel = () => setPreviewVisible(false);

  const handlePicturePreview = async (file: any) => {
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

  const handlePictureChange = ({ file: currentFile, fileList: newPictureFileList }: any) =>
    setPictureFileList(newPictureFileList);
  const handleFaceRecognitionChange = ({ file: currentFile, fileList: newPictureFileList }: any) =>
    setFaceRecognitionFileList(newPictureFileList);
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

  useEffect(() => {
    form.setFieldsValue({
      first_name: currentGuest?.first_name,
      last_name: currentGuest?.last_name,
      client_kind: currentGuest?.client_kind ? currentGuest?.client_kind.toString() : '1',
      client_rank: currentGuest?.client_rank?.toString() ?? null,
      passport_number: currentGuest?.passport_number ?? null,
      date_of_issue_of_passport: currentGuest?.date_of_issue_of_passport
        ? moment(currentGuest.date_of_issue_of_passport)
        : null,
      place_of_id: currentGuest?.place_of_id,
      email_address1: currentGuest?.email_address1 ?? null,
      telephone_number1: currentGuest?.telephone_number1 ?? null,
      date_of_birth: currentGuest?.date_of_birth ? moment(currentGuest.date_of_birth) : null,
      nationality: currentGuest?.nationality,
      gender: currentGuest?.gender?.toString() ?? null,
      expiration_date_of_visa: currentGuest?.expiration_date_of_visa
        ? moment(currentGuest.expiration_date_of_visa)
        : null,
      expiration_date_of_passport: currentGuest?.expiration_date_of_passport
        ? moment(currentGuest.expiration_date_of_passport)
        : null,
      language: currentGuest?.language ?? null,
      married: currentGuest?.married?.toString() ?? null,
      is_smoker: currentGuest?.is_smoker ? currentGuest?.is_smoker.toString() : null,
      email_address2: currentGuest?.email_address2 ?? null,
      telephone_number2: currentGuest?.telephone_number2 ?? null,
      address1: currentGuest?.address1 ?? null,
      address2: currentGuest?.address2 ?? null,
      zip_code: currentGuest?.zip_code ?? null,
      currency_conversion_id: currentGuest?.currency_conversion_id
        ? currentGuest?.currency_conversion_id.toString()
        : null,
      favorite_equipment1: currentGuest?.favorite_equipment1
        ? currentGuest?.favorite_equipment1
        : null,
      favorite_equipment2: currentGuest?.favorite_equipment2
        ? currentGuest?.favorite_equipment2
        : null,
      vat_company: currentGuest?.vat_company ?? null,
      vat_address: currentGuest?.vat_address ?? null,
      vat_tax: currentGuest?.vat_tax ?? null,
      face_id: currentGuest?.face_id ?? null,
    });
  }, [currentGuest]);

  useEffect(() => {
    dispatch(getLanguageCodeAction());
    dispatch(getRoomsAction());
  }, []);

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
          // initialValues={{
          //   first_name: currentGuest?.first_name ?? '',
          //   client_kind: currentGuest?.client_kind ?? '1',
          //   date_of_birth: undefined,
          //   expiration_date_of_visa: undefined,
          //   expiration_date_of_passport: undefined,
          // }}
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
              <Form.Item
                label={t('guest.Guest Type')}
                name="client_kind"
                rules={[
                  {
                    required: true,
                    message: 'Please select type!',
                  },
                ]}
              >
                <Select>
                  <Option value="1">Personal</Option>
                  <Option value="2">Group</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Card bordered={false} size="small" title={t('common.General Informations')}>
                <Row>
                  <Col span={8}>
                    <Form.Item
                      label={t('guest.First Name.title')}
                      name="first_name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input firstname!',
                        },
                      ]}
                    >
                      <Input placeholder={t('guest.First Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={t('guest.Last Name.title')}
                      name="last_name"
                      rules={[
                        {
                          required: true,
                          message: 'Please input lastname!',
                        },
                      ]}
                    >
                      <Input placeholder={t('guest.Last Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Rank.title')} name="client_rank">
                      <Select allowClear placeholder={t('guest.Rank.placeholder')}>
                        <Option value="1">VIP</Option>
                        <Option value="2">Dominant</Option>
                        <Option value="4">General</Option>
                        <Option value="9">Undesirable Guest</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={t('guest.Identity / Passport No.title')}
                      name="passport_number"
                    >
                      <Input placeholder={t('guest.Identity / Passport No.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Date Of Issue')} name="date_of_issue_of_passport">
                      <DatePicker
                        disabledDate={disabledFutureDate}
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
                    <Form.Item label={t('guest.Place Of Issue')} name="place_of_id">
                      <Input placeholder={t('guest.Place Of Issue')} />
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
                  <Col span={8}>
                    <Form.Item label={t('common.Face ID.title')} name="face_id">
                      <Input placeholder={t('common.Face ID.placeholder')} />
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
                        disabledDate={disabledFutureDate}
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
                        {countries?.map((country: any) => (
                          <Option value={country.id.toString()}>{country.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('common.Gender')} name="gender">
                      <Select placeholder="Select Gender">
                        <Option value="1">Male</Option>
                        <Option value="2">Female</Option>
                        <Option value="3">Undefined</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Visa Expire Date')} name="expiration_date_of_visa">
                      <DatePicker
                        disabledDate={disabledPastDate}
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
                      name="expiration_date_of_passport"
                    >
                      <DatePicker
                        disabledDate={disabledPastDate}
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
                      <Select placeholder="Select Language">
                        {languageCodeData.items?.map((item: any) => {
                          return <Option value={item.id}>{item.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Marital Status')} name="married">
                      <Select placeholder="Select status">
                        <Option value="1">Not Married</Option>
                        <Option value="2">Married</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={16}>
                    <Row>
                      <Col span={12}>
                        <Form.Item label={t('guest.Smoking')} name="is_smoker">
                          <Select placeholder="Select smoking">
                            <Option value="1">Smoking</Option>
                            <Option value="2">No smoking</Option>
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
                      <Select placeholder="Select currency">
                        <Option value="2">VND</Option>
                        <Option value="3">USD</Option>
                        <Option value="4">JPY</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item label={t('guest.Preferred Room Type 1')} name="favorite_equipment1">
                      <Select placeholder="Select prefred room">
                        {getRoomsData.items?.map((item: any) => {
                          return <Option value={item.id}>{item.name}</Option>;
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Preferred Room Type 2')} name="favorite_equipment2">
                      <Select placeholder="Select prefred room">
                        {getRoomsData.items?.map((item: any) => {
                          return <Option value={item.id}>{item.name}</Option>;
                        })}
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
                      action={`${process.env.REACT_APP_API_HOST}/${FileEndpoint.UPLOAD}`}
                      fileList={pictureFileList}
                      headers={{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                      }}
                      listType="picture-card"
                      onChange={handlePictureChange}
                      onPreview={handlePicturePreview}
                    >
                      {pictureFileList.length >= 8 ? null : uploadButton}
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
                      action={`${process.env.REACT_APP_API_HOST}/${FileEndpoint.UPLOAD}`}
                      fileList={faceRecognitionFileList}
                      headers={{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                      }}
                      listType="picture-card"
                      onChange={handleFaceRecognitionChange}
                      onPreview={handlePicturePreview}
                    >
                      {faceRecognitionFileList.length >= 8 ? null : uploadButton}
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
                    <Form.Item label={t('guest.Company Name.title')} name="vat_company">
                      <Input placeholder={t('guest.Company Name.placeholder')} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={t('guest.Tax Code.title')} name="vat_tax">
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
