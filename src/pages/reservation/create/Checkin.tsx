import 'styles/reservation.css';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Modal, Row, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

import MInput from 'components/MInput';
import PattonButton from 'components/PattonButton';

interface Props {
  openModalCheckin: any;
  setIsModalCheckinOpen: any;
}

interface DataTypeRoomDeposit {
  deposit_amount: string;
  deposit_method: string;
  id: string;
  name: string;
  room_no: string;
  room_type: string;
  task: string;
}

interface DataTypeEarly {
  actual_CI_time: string;
  default_CI_time: string;
  early_CI_fee: string;
  early_CI_time: string;
  id: string;
  name: string;
  room_no: string;
  unit_price: string;
}

function CheckinModal({ openModalCheckin, setIsModalCheckinOpen }: Props) {
  const { t } = useTranslation();

  const handleOk = () => {
    setIsModalCheckinOpen(false);
  };

  const handleCancel = () => {
    setIsModalCheckinOpen(false);
  };

  const columnsRoomDeposit: ColumnsType<DataTypeRoomDeposit> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('transaction.Guest Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('common.Room Type'),
      dataIndex: 'room_type',
      key: 'room_type',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: t('reservation.Deposit Method'),
      key: 'deposit_method',
      dataIndex: 'deposit_method',
    },
    {
      title: t('reservation.Deposit Amount'),
      key: 'deposit_amount',
      dataIndex: 'deposit_amount',
      render: () => {
        return (
          <MInput name="actual_amount" placeholder="0" style={{ borderRadius: 4, width: 100 }} />
        );
      },
    },
    {
      title: t('common.Task'),
      key: 'task',
      dataIndex: 'task',
      render: text => (
        <a href="/" style={{ color: '#1D39C4' }}>
          {text}
        </a>
      ),
    },
  ];

  const dataRoomDeposit: DataTypeRoomDeposit[] = [
    {
      id: '',
      name: '',
      room_type: '',
      room_no: '',
      deposit_method: '',
      deposit_amount: '',
      task: 'Duplicate',
    },
    {
      id: '',
      name: '',
      room_type: '',
      room_no: '',
      deposit_method: '',
      deposit_amount: '',
      task: '',
    },
    {
      id: '',
      name: '',
      room_type: '',
      room_no: '',
      deposit_method: '',
      deposit_amount: '',
      task: '',
    },
  ];

  const columnsEarly: ColumnsType<DataTypeEarly> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('transaction.Guest Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('reservation.Room No'),
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: 'Default C/I Time',
      key: 'default_CI_time',
      dataIndex: 'default_CI_time',
    },
    {
      title: 'Actual C/I Time',
      key: 'actual_CI_time',
      dataIndex: 'actual_CI_time',
    },
    {
      title: 'Early C/I Time',
      key: 'early_CI_time',
      dataIndex: 'early_CI_time',
    },
    {
      title: t('common.Unit Price'),
      key: 'unit_price',
      dataIndex: 'unit_price',
    },
    {
      title: 'Early C/I Fee',
      key: 'early_CI_fee',
      dataIndex: 'early_CI_fee',
    },
  ];

  const dataEarly: DataTypeEarly[] = [
    {
      id: '',
      name: '',
      room_no: '',
      default_CI_time: '',
      actual_CI_time: '',
      early_CI_time: '',
      unit_price: '',
      early_CI_fee: '',
    },
    {
      id: '',
      name: '',
      room_no: '',
      default_CI_time: '',
      actual_CI_time: '',
      early_CI_time: '',
      unit_price: '',
      early_CI_fee: '',
    },
    {
      id: '',
      name: '',
      room_no: '',
      default_CI_time: '',
      actual_CI_time: '',
      early_CI_time: '',
      unit_price: '',
      early_CI_fee: '',
    },
  ];

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);

      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : ''}
      <div style={{ marginTop: 8 }}>
        <img
          alt="upload img"
          src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
        />
      </div>
    </div>
  );

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 60, borderRadius: 4 }}
      title={<b>Checkin confirmation</b>}
      visible={openModalCheckin}
      width={1000}
    >
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
            <Checkbox value="1">Hide room rates</Checkbox>
          </Col>
          <Col span={16}>
            <Checkbox value="2">Print Registration Card</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>

      <Card bordered={false} style={{ marginTop: 44 }} title={t('reservation.Room Deposit')}>
        <Row>
          <Col span={24} style={{ marginBottom: 15 }}>
            <Table columns={columnsRoomDeposit} dataSource={dataRoomDeposit} pagination={false} />
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ marginTop: 16 }} title={t('reservation.Early Checkin Fee')}>
        <Table columns={columnsEarly} dataSource={dataEarly} pagination={false} />
      </Card>

      <Row>
        <Col span={16}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            className="avatar-uploader checkin"
            listType="picture-card"
            name="avatar"
            onChange={handleChange}
            showUploadList={false}
          >
            {imageUrl ? (
              <img alt="avatar" src={imageUrl} style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Col>
        <Col span={8}>
          <Row style={{ paddingTop: 20 }}>
            <Col span={12}>
              <PattonButton style={{ width: 121, height: 44 }} type="primary">
                201
              </PattonButton>
            </Col>
            <Col span={12}>
              <img
                alt="upload img"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ width: 54, height: 44 }}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col span={12}>
              <PattonButton style={{ width: 121, height: 44 }} type="primary">
                202
              </PattonButton>
            </Col>
            <Col span={12}>
              <img
                alt="upload img"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ width: 54, height: 44 }}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col span={12}>
              <PattonButton style={{ width: 121, height: 44 }} type="primary">
                203
              </PattonButton>
            </Col>
            <Col span={12}>
              <img
                alt="upload img"
                src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_720/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/t9ur9cc1khkup1dmcbzd/IMGWorldsofAdventure.jpg"
                style={{ width: 54, height: 44 }}
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: 20 }}>
            <Col span={12}>
              <PattonButton style={{ width: 121, height: 44 }} type="primary">
                204
              </PattonButton>
            </Col>
            <Col span={12} />
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default CheckinModal;
