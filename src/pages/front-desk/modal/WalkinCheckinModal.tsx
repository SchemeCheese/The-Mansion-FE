import { notify } from 'ui/notification';
/** ***********************************
Module Name : Front Desk
Developer Name : MinhNV
Created Date : 07/12/2022
Updated Date : 15/12/2022
Main functions : Walk In Check In Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
} from 'ui/antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import TextArea from 'antd/lib/input/TextArea';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectCreateReservation, selectGetWalkinRooms, selectRoomTypes } from 'selectors';
import useTreeChanges from 'tree-changes-hook';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { createReservation, searchRoom } from 'actions';
import reservationStyles from 'styles/reservation.module.css';

import { RootState } from 'types';

const { Option } = Select;
const timeFormat = 'HH:mm';

interface Props {
  isModalVisible: boolean;
  room: any;
  setIsModalVisible: (value: boolean) => void;
}

function WalkinCheckinModal({ isModalVisible, room, setIsModalVisible }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: roomTypesData } = useAppSelector(selectRoomTypes);
  const roomsList: any = useAppSelector(selectGetWalkinRooms);
  const createReservationData = useAppSelector(selectCreateReservation);
  const { changed: createReservationChanged } = useTreeChanges(createReservationData);

  const [searchRoomResultState, setSearchRoomResultState] = useState<any>([]);
  const [chargeKind, setChargeKind] = useState('1');

  const roomColumns = [
    {
      title: t('common.Date'),
      dataIndex: 'use_date',
      key: 'use_date',
    },
    {
      title: t('common.Rate'),
      dataIndex: 'rate_name',
      key: 'rate_name',
    },
    {
      title: t('common.Hours'),
      dataIndex: 'hours',
      key: 'hours',
      hidden: chargeKind === '1',
    },
    {
      title: t('common.Total Guest'),
      dataIndex: 'total_guest',
      key: 'total_guest',
      hidden: chargeKind !== '1',
    },
    {
      title: t('common.Content'),
      dataIndex: 'content',
      key: 'content',
      hidden: chargeKind !== '1',
    },
    {
      title: t('common.Unit Price'),
      dataIndex: 'unit_price',
      key: 'unit_price',
    },
    {
      title: t('common.Updated Price'),
      dataIndex: 'updated_price',
      key: 'updated_price',
      render: (text: string, record: any, index: number) => {
        return (
          <Input
            name="updated_price"
            onChange={event => {
              const stateTemporary = [...searchRoomResultState];
              const selectedRoom = { ...searchRoomResultState[index] };

              stateTemporary[index] = {
                ...selectedRoom,
                updated_price: event.target.value,
              };

              setSearchRoomResultState(stateTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4 }}
            value={searchRoomResultState[index]?.updated_price}
          />
        );
      },
    },
    {
      title: t('common.Subtotal'),
      dataIndex: 'sub_total_format',
      key: 'sub_total_format',
      hidden: chargeKind === '1',
    },
    {
      title: t('common.Task'),
      dataIndex: 'rate_name',
      key: 'rate_name',
      render: (text: string, record: any, index: number) => {
        return (
          <Button
            onClick={() => {
              const stateTemporary = [...searchRoomResultState];
              const duplicateRecord = stateTemporary[index];

              setSearchRoomResultState(
                searchRoomResultState.map((item: any) => {
                  return {
                    ...item,
                    actual_amount: duplicateRecord.actual_amount,
                  };
                }),
              );
            }}
            style={{ color: '#1D39C4', paddingLeft: 0 }}
            type="link"
          >
            Duplicate
          </Button>
        );
      },
    },
  ].filter((item: any) => !item.hidden);

  const searchRoomsResult: any = useSelector<RootState>(
    ({ searchRoom: searchRoomTemporary }) => searchRoomTemporary.charges,
  );

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

  const disabledCheckoutDate: RangePickerProps['disabledDate'] = current => {
    const formValues = form.getFieldsValue();

    if (chargeKind === '1') {
      return current < moment(formValues.checkin).endOf('day');
    }

    return current < moment(formValues.checkin).subtract(1, 'day').endOf('day');
  };

  const onFinish = (values: any) => {
    setIsModalVisible(false);

    const charges = searchRoomResultState.map((item: any) => {
      return {
        room_type: values.room_type,
        charge_kind: item.charge_kind,
        actual_amount: item.hours * item.updated_price,
        use_date: item.use_date,
        description_id: item.description_id,
        equipment_charge_detail_id: item.equipment_charge_detail_id,
        hours: item.hours,
      };
    });

    dispatch(
      createReservation({
        payload: {
          ...values,
          booker_type: '1',
          type: 'walkin_checkin',
          rooms: [
            {
              room_id: values.room_id,
              room_type: values.room_type,
              checkin_date: values.checkin.format('YYYY-MM-DD'),
              checkout_date: values.checkout.format('YYYY-MM-DD'),
              checkin_time: values.checkin_time ? values.checkin_time.format('HH:mm') : null,
              checkout_time: values.checkout_time ? values.checkout_time.format('HH:mm') : null,
              quantity: 1,
              charges,
            },
          ],
          is_checkin: 1,
        },
      }),
    );
  };

  const resetForm = () => {
    form.resetFields();
  };

  useEffect(() => {
    resetForm();
  }, []);

  const computeCICOTime = () => {
    const temporary = [...searchRoomsResult];
    const formValues = form.getFieldsValue();

    let hoursTime = 1;

    if (chargeKind === '2') {
      const checkinTime = moment(
        `${formValues.checkin.format('YYYY-MM-DD')} ${formValues.checkin_time.format(timeFormat)}`,
      );
      const checkoutTime = moment(
        `${formValues.checkout.format('YYYY-MM-DD')} ${formValues.checkout_time.format(
          timeFormat,
        )}`,
      );

      hoursTime = Math.ceil(moment.duration(checkoutTime.diff(checkinTime)).asHours());

      if (hoursTime <= 0) {
        notify.warn(t('message.The checkin time or checkout time is invalid'));

        return;
      }
    }

    setSearchRoomResultState(
      temporary.map(item => {
        return {
          ...item,
          unit_price: formatNumber(item.price),
          updated_price: item.price,
          hours: chargeKind === '1' ? 1 : hoursTime,
        };
      }),
    );
  };

  useEffect(() => {
    computeCICOTime();
  }, [searchRoomsResult]);

  useEffect(() => {
    if (createReservationChanged('status', 'SUCCESS')) {
      notify.success(t('message.Create reservation successfully!'));

      navigate(`/reservation/${createReservationData.reservation_created.id}`);
    }
  }, [createReservationChanged]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const searchRoomAction = () => {
    const values = form.getFieldsValue();

    if (values.checkin && values.checkout && values.room_type) {
      dispatch(
        searchRoom({
          checkin: values.checkin.format('YYYY-MM-DD'),
          checkout: values.checkout.format('YYYY-MM-DD'),
          room_type: values.room_type,
          source_type: '7',
          source_id: '23',
          charge_kind: chargeKind,
        }),
      );
    }
  };

  const convertDataSearchRoom = (charges: any) => {
    const result: any[] = [];

    charges.forEach((item: any) => {
      result.push({
        use_date: item.use_date,
        rate_name: item.rate_name,
        total_guest: 2,
        content: item.rate_detail,
        unit_price: formatNumber(item.price),
        updated_price: item.updated_price,
        hours: item.hours,
        sub_total: item.hours * item.updated_price,
        sub_total_format: formatNumber(item.hours * item.updated_price),
        task: '',
      });
    });

    return result;
  };

  useEffect(() => {
    if (isModalVisible) {
      form.setFieldsValue({
        booker_firstname: '',
        booker_lastname: '',
        booker_rank: undefined,
        booker_email: '',
        booker_phone_number: '',
        passport_number: '',
        date_of_issue_of_passport: undefined,
        place_of_id: '',
        checkin_time: moment(),
        adult: 2,
        child: 1,
        checkin: moment(),
        checkout: moment().add(1, 'days'),
        room_type: room?.equipment_type_id.toString(),
        room_id: room?.id.toString(),
      });

      setChargeKind('1');
      searchRoomAction();
    }
  }, [isModalVisible]);

  useEffect(() => {
    if (chargeKind === '2') {
      const checkoutDate = moment().add(2, 'hours');

      form.setFieldsValue({
        checkout: checkoutDate,
        checkout_time: checkoutDate,
      });
    } else {
      form.setFieldsValue({
        checkout: moment().add(1, 'days'),
        checkout_time: undefined,
      });
    }

    searchRoomAction();
  }, [chargeKind]);

  return (
    <Modal
      bodyStyle={{
        backgroundColor: '#F0F2F5',
      }}
      className={reservationStyles.newGuestModal}
      okText="Save"
      onCancel={handleCancel}
      onOk={handleOk}
      style={{
        top: 40,
      }}
      title="Walk In Check In"
      visible={isModalVisible}
      width={1000}
    >
      <Form
        autoComplete="off"
        form={form}
        initialValues={{
          adult: 2,
          child: 1,
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
        <Row style={{ maxHeight: '70vh', overflow: 'auto' }}>
          <Col span={24}>
            <Card bordered={false} size="small" title={t('common.Booker Information')}>
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={t('guest.First Name.title')}
                    name="booker_firstname"
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
                    name="booker_lastname"
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
                  <Form.Item
                    label={t('guest.Rank.title')}
                    name="booker_rank"
                    rules={[
                      {
                        required: true,
                        message: "Please input booker's rank",
                      },
                    ]}
                  >
                    <Select allowClear placeholder={t('guest.Rank.placeholder')}>
                      <Option value="1">VIP</Option>
                      <Option value="2">Dominant</Option>
                      <Option value="3">General</Option>
                      <Option value="9">Undesirable Guest</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Email.title')} name="booker_email">
                    <Input placeholder={t('common.Email.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Mobile Phone.title')} name="booker_phone_number">
                    <Input placeholder={t('common.Mobile Phone.placeholder')} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('guest.Identity Passport No.title')} name="passport_number">
                    <Input placeholder={t('guest.Identity Passport No.placeholder')} />
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
                <Col span={4}>
                  <Form.Item label={t('common.Adult')} name="adult">
                    <Select allowClear>
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item label={t('common.Child')} name="child">
                    <Select allowClear>
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card bordered={false} size="small" title="Booking Information">
              <Row>
                <Col span={8}>
                  <Form.Item
                    label={t('common.Room Type')}
                    name="room_type"
                    rules={[
                      {
                        required: true,
                        message: 'Please input room type!',
                      },
                    ]}
                  >
                    <Select
                      onChange={searchRoomAction}
                      placeholder={t('reservation.Room Type.placeholder')}
                    >
                      {_.keys(roomTypesData).map((key: any) => {
                        return (
                          <Option key={key} value={key}>
                            {roomTypesData[key]}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label={t('common.Room Number')} name="room_id">
                    <Select placeholder="Select room">
                      {roomsList.items?.map((item: any) => (
                        <Option value={item.id.toString()}>{item.code}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label={t('reservation.Rate Type.title')}>
                    <Select
                      onChange={value => setChargeKind(value)}
                      placeholder={t('reservation.Rate Type.placeholder')}
                      style={{ width: '93%' }}
                      value={chargeKind}
                    >
                      <Option value="1">{t('reservation.Rate Type.Once')}</Option>
                      <Option value="2">{t('reservation.Rate Type.By Hours')}</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={16}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t('common.Checkin Date')}
                        name="checkin"
                        rules={[
                          {
                            required: true,
                            message: 'Please input checkin!',
                          },
                        ]}
                      >
                        <DatePicker
                          disabled
                          disabledDate={disabledPastDate}
                          onChange={date => searchRoomAction()}
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={t('common.Checkin Time')} name="checkin_time">
                        <TimePicker
                          disabled
                          format="HH:mm"
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={t('common.Checkout Date')}
                        name="checkout"
                        rules={[
                          {
                            required: true,
                            message: 'Please input checkout!',
                          },
                        ]}
                      >
                        <DatePicker
                          disabledDate={disabledCheckoutDate}
                          onChange={date => searchRoomAction()}
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label={t('common.Checkout Time')} name="checkout_time">
                        <TimePicker
                          format="HH:mm"
                          onChange={computeCICOTime}
                          style={{
                            height: 32,
                            borderRadius: 4,
                            marginRight: 11,
                            width: '100%',
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Form.Item label={t('common.Notes')} name="note">
                    <TextArea rows={5} style={{ borderRadius: 4 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Table
              columns={roomColumns}
              dataSource={convertDataSearchRoom(searchRoomResultState)}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default WalkinCheckinModal;
