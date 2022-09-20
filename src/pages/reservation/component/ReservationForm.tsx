import React from 'react';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Form, Row, Select, Table } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import ReservationDetailCard from 'pages/reservation/component/ReservationDetailCard';

import { colors } from 'modules/theme';

import MButton from 'components/MButton';
import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

const { Option } = Select;

interface Props {
  formRef?: any;
  isCreateForm: boolean;
  onFinish: any;
  onFinishFailed: any;
  reservationDetail?: any;
  roomList: any;
  roomingListColumns: any;
  rowSelection: any;
  setIsCancelBookingModalVisible: any;
  showModal: any;
}

function ReservationForm({
  formRef,
  isCreateForm,
  onFinish,
  onFinishFailed,
  reservationDetail,
  roomingListColumns,
  roomList,
  rowSelection,
  setIsCancelBookingModalVisible,
  showModal,
}: Props) {
  const { t } = useTranslation();

  return (
    <Form
      ref={formRef}
      autoComplete="off"
      initialValues={{
        paid: true,
        send_mail: true,
        no_show: true,
        market_segment_id: reservationDetail?.market_segment_id.toString(),
        path_of_reservation: reservationDetail?.path_of_reservation.toString(),
        external_reservation_number: reservationDetail?.external_reservation_number,
        note: reservationDetail?.note,
        booker_type: reservationDetail?.booker?.client_kind.toString(),
        booker_firstname: reservationDetail?.booker?.first_name,
        booker_lastname: reservationDetail?.booker?.last_name,
        booker_email: reservationDetail?.booker?.email_address1,
        booker_email_2: reservationDetail?.booker?.email_address2,
        booker_phone_number: reservationDetail?.booker?.telephone_number1,
        booker_rank: reservationDetail?.booker?.client_rank.toString(),
      }}
      labelCol={{
        span: 24,
      }}
      layout="vertical"
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      wrapperCol={{
        span: 23,
      }}
    >
      <Row className="content">
        <Col span={24}>
          <Card bordered={false} size="small" title="General Informations">
            <Row>
              <Col span={8}>
                <Form.Item label={t('reservation.Folio ID')} name="reservation_number">
                  <MInput disabled value="2808" />
                </Form.Item>
                <Form.Item
                  label={t('reservation.OTA Booking ID.title')}
                  name="external_reservation_number"
                >
                  <MInput placeholder={t('reservation.OTA Booking ID.placeholder')} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={t('reservation.Market.title')}
                  name="market_segment_id"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a market',
                    },
                  ]}
                >
                  <Select allowClear placeholder={t('reservation.Market.placeholder')}>
                    <Option value="1">OTA</Option>
                    <Option value="2">CDT</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t('reservation.Source.title')}
                  name="path_of_reservation"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a source',
                    },
                  ]}
                >
                  <Select allowClear placeholder={t('reservation.Source.placeholder')}>
                    <Option value="1">Agent</Option>
                    <Option value="2">Website</Option>
                    <Option value="4">Telephone</Option>
                    <Option value="8">Fax</Option>
                    <Option value="16">Email</Option>
                    <Option value="32">Walkin</Option>
                    <Option value="28">Direct</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t('reservation.Notes.title')} name="note">
                  <TextArea placeholder={t('reservation.Notes.placeholder')} rows={5} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card
            bordered={false}
            size="small"
            style={{ marginTop: 20 }}
            title={t('common.Booker Informations')}
          >
            <Row>
              <Col span={8}>
                <Form.Item
                  label={t('reservation.Type.title')}
                  name="booker_type"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type',
                    },
                  ]}
                >
                  <Select allowClear placeholder={t('reservation.Type.placeholder')}>
                    <Option value="1">Personal</Option>
                    <Option value="2">Group</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label={t('reservation.First Name.title')}
                  name="booker_firstname"
                  rules={[
                    {
                      required: true,
                      message: "Please input booker's first name",
                    },
                  ]}
                >
                  <MInput placeholder="Steve" />
                </Form.Item>
                <Form.Item label={t('reservation.Last Name.title')} name="booker_lastname">
                  <MInput placeholder="Nagaoka" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={t('reservation.Email.title')}
                  name="booker_email"
                  rules={[
                    {
                      required: true,
                      message: "Please input booker's email",
                    },
                  ]}
                >
                  <MInput placeholder={t('reservation.Email.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('reservation.Mobile Phone.title')}
                  name="booker_phone_number"
                  rules={[
                    {
                      required: true,
                      message: "Please input booker's phone number",
                    },
                  ]}
                >
                  <MInput placeholder={t('reservation.Mobile Phone.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('reservation.Rank.title')}
                  name="booker_rank"
                  rules={[
                    {
                      required: true,
                      message: "Please input booker's rank",
                    },
                  ]}
                >
                  <Select allowClear placeholder={t('reservation.Rank.placeholder')}>
                    <Option value="1">VIP</Option>
                    <Option value="2">Dominant Person</Option>
                    <Option value="3">General Person</Option>
                    <Option value="9">Undesirable Guest</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={t('reservation.Additional Email.title')} name="booker_email_2">
                  <MInput placeholder={t('reservation.Additional Email.placeholder')} />
                </Form.Item>
                <Form.Item label={t('reservation.Notes.title')} name="booker_note">
                  <TextArea placeholder={t('reservation.Notes.placeholder')} rows={5} />
                </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card
            bordered={false}
            size="small"
            style={{ marginTop: 20 }}
            title={t('reservation.Rooming List')}
          >
            <Row>
              <Col span={24}>
                <PattonButton onClick={showModal} type="primary">
                  {' '}
                  <PlusOutlined style={{ marginLeft: 0, marginRight: 4 }} /> {t('common.New')}
                </PattonButton>
                <MButton
                  onClick={() => setIsCancelBookingModalVisible(true)}
                  style={{ marginLeft: 15 }}
                >
                  {t('common.Delete Selected')}
                </MButton>
                <MButton style={{ marginLeft: 15 }}>{t('common.Print Registration Card')}</MButton>
              </Col>
              <Col span={24} style={{ marginTop: 20, marginBottom: 15 }}>
                <Table
                  columns={roomingListColumns}
                  dataSource={roomList}
                  pagination={false}
                  rowSelection={rowSelection}
                  size="small"
                />
              </Col>
              {!isCreateForm && <ReservationDetailCard />}
            </Row>
          </Card>

          {isCreateForm && (
            <Card
              bordered={false}
              size="small"
              style={{ marginTop: 20 }}
              title={t('common.Payment Informations')}
            >
              <Row style={{ paddingTop: 10 }}>
                <Col span={8}>
                  <p style={{ marginBottom: 25 }}>
                    <span>{t('reservation.Total Amount')}</span>
                    <span style={{ float: 'right', paddingRight: '12.5%', fontSize: 16 }}>
                      4,800,000
                    </span>
                  </p>
                  <Form.Item
                    label={t('reservation.Payment Method.title')}
                    name="payment_method"
                    wrapperCol={{
                      span: 21,
                    }}
                  >
                    <Select allowClear placeholder={t('reservation.Payment Method.placeholder')}>
                      <Option value="male">male</Option>
                      <Option value="female">female</Option>
                      <Option value="other">other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="paid" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Paid')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="send_mail" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Email reservation confirmation')}</Checkbox>
                  </Form.Item>
                  <Form.Item name="no_show" style={{ marginBottom: 12 }} valuePropName="checked">
                    <Checkbox>{t('reservation.Hide room rates')}</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ marginTop: -6 }}>
                  <Form.Item name="no_deposit" valuePropName="checked">
                    <Checkbox>{t('reservation.Confirm reservation without deposit')}</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
        {isCreateForm && (
          <Col span={24} style={{ textAlign: 'center', marginTop: 20, marginBottom: 140 }}>
            <MButton
              style={{
                color: colors.pattron,
                borderColor: colors.pattron,
                marginRight: 32,
                backgroundColor: '#e5e5e5',
              }}
            >
              {t('reservation.Save and add more details')}
            </MButton>
            <PattonButton htmlType="submit">{t('common.Save')}</PattonButton>
          </Col>
        )}
      </Row>
    </Form>
  );
}

export default ReservationForm;
