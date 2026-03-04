import 'styles/reservation.css';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, message, Modal, Row, Select, Table, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { formatNumber } from 'helpers';
import moment from 'moment';
import { selectBranchInfo, selectCheckinState } from 'selectors';
import useTreeChanges from 'tree-changes-hook';

import { useAppSelector } from 'modules/hooks';

import { checkinAction, getReservation, printCheckinConfirmPDFReservationDetail } from 'actions';

import MInput from 'components/MInput';

const { Option } = Select;

interface Props {
  openModalCheckin: any;
  reservationId?: string | number;
  resetSelectedRows?: () => void;
  selectedRowKeys?: any;
  selectedRows: any;
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

function CheckinModal({
  openModalCheckin,
  reservationId,
  resetSelectedRows,
  selectedRowKeys,
  selectedRows,
  setIsModalCheckinOpen,
}: Props) {
  const { t } = useTranslation();
  const [hideRoomRate, setHideRoomRate] = useState(false);
  const [printRegistrationCard, setPrintRegistrationCard] = useState(false);
  const [earlyCheckinFee, setEearlyCheckinFee]: any[] = useState([]);
  const [language, setLanguage] = useState('en');
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectCheckinData = useAppSelector(selectCheckinState);

  const { changed } = useTreeChanges(selectCheckinData);

  const handleOk = () => {
    dispatch(
      checkinAction({
        payload: {
          reservation_id: id ?? '',
          hide_room_rate: hideRoomRate,
          print_registration_card: printRegistrationCard,
          reservation_detail: earlyCheckinFee,
        },
      }),
    );

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
    },
  ];

  const dataRoomDeposit: DataTypeRoomDeposit[] = selectedRows.map((item: any, index: number) => {
    return {
      id: 1 + index,
      name: item.name,
      room_type: item.room_type_text,
      room_no: item.room_no,
      deposit_method: item.deposit_method,
      deposit_amount: item.deposit,
      task: 'Duplicate',
    };
  });

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
      title: t('reservation.Default C/I Time'),
      key: 'default_CI_time',
      dataIndex: 'default_CI_time',
    },
    {
      title: t('reservation.Actual C/I Time'),
      key: 'actual_CI_time',
      dataIndex: 'actual_CI_time',
    },
    {
      title: t('reservation.Early C/I Time'),
      key: 'early_CI_time',
      dataIndex: 'early_CI_time',
    },
    {
      title: t('common.Unit Price'),
      key: 'unit_price',
      dataIndex: 'unit_price',
      render: (text: any, record: any, index: number) => {
        return (
          <MInput
            onChange={e => {
              const earlyCheckinFeeTemporary = [...earlyCheckinFee];
              const editRecord = {
                id: earlyCheckinFeeTemporary[index].id,
                early_checkin_fee: {
                  ...earlyCheckinFeeTemporary[index].early_checkin_fee,
                  sale_price: e.target.value,
                },
              };

              earlyCheckinFeeTemporary[index] = editRecord;
              setEearlyCheckinFee(earlyCheckinFeeTemporary);
            }}
            placeholder="0"
            style={{ borderRadius: 4, width: 100 }}
            value={earlyCheckinFee[index]?.early_checkin_fee.sale_price}
          />
        );
      },
    },
    {
      title: t('reservation.Early C/I Fee'),
      key: 'early_CI_fee',
      dataIndex: 'early_CI_fee',
      render: (text: any, record: any, index: number) => {
        return formatNumber(
          parseInt(earlyCheckinFee[index]?.early_checkin_fee.sale_price, 10) *
            parseInt(earlyCheckinFee[index]?.early_checkin_fee.hour_total, 10),
        );
      },
    },
  ];

  const branchInfoSelected: any = useAppSelector(selectBranchInfo);

  const defaultTime = moment(branchInfoSelected.normal_time_check_in, 'HH:mm:ss');
  const actualTime: any = useRef(moment());
  const duration = moment.duration(defaultTime.diff(actualTime.current));

  const dataEarly: DataTypeEarly[] = selectedRows
    .map((item: any, index: number) => {
      return {
        id: 1 + index,
        name: item.name,
        room_no: item.room_no,
        default_CI_time: defaultTime.format('HH:mm:ss'),
        actual_CI_time: actualTime.current.format('HH:mm:ss'),
        early_CI_time: Math.round(duration.asHours()),
        unit_price: '',
        early_CI_fee: '',
      };
    })
    .filter((item: any) => {
      return item.early_CI_time > 0;
    });

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

  const handleChangeLanguage = (value: string) => {
    setLanguage(value);
  };

  useEffect(() => {
    const checkInFee = selectedRows.map((item: any) => {
      return {
        id: item.reservation_detail_id,
        early_checkin_fee: {
          hour_total: Math.round(duration.asHours()),
          sale_price: branchInfoSelected.addition_cico_fee,
        },
      };
    });

    setEearlyCheckinFee(checkInFee);
  }, [selectedRows]);

  useEffect(() => {
    if (changed('status', 'SUCCESS')) {
      message.success(t('message.Checkin successfully!'));

      dispatch(
        getReservation({
          reservation_id: id ?? '',
        }),
      );

      if (printRegistrationCard) {
        const formattedDateNow = moment(new Date()).format('DD_MM_YYYY');

        dispatch(
          printCheckinConfirmPDFReservationDetail({
            payload: {
              language,
              reservation_info_id: reservationId ?? '',
              reservation_detail_ids: selectedRowKeys,
              file_name: `the_mansion_${formattedDateNow}_detail_${reservationId ?? ''}.'pdf'`,
              hide_room_rate: hideRoomRate === true ? '1' : '0',
            },
          }),
        );
      }

      if (resetSelectedRows) {
        resetSelectedRows();
      }
    }
  }, [changed]);

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={handleCancel}
      onOk={handleOk}
      style={{ top: 60, borderRadius: 4 }}
      title={<b>{t('reservation.Checkin confirmation')}</b>}
      visible={openModalCheckin}
      width={1000}
    >
      <Checkbox.Group style={{ width: '100%' }}>
        <Row>
          <Col span={8}>
            <Checkbox onChange={e => setHideRoomRate(e.target.checked)} value="1">
              {t('reservation.Hide room rates')}
            </Checkbox>
          </Col>
          <Col span={10}>
            <Checkbox onChange={e => setPrintRegistrationCard(e.target.checked)} value="2">
              {t('common.Print Registration Card')}
            </Checkbox>
          </Col>
          <Col span={6}>
            <Row
              style={{
                alignItems: 'center',
                display: printRegistrationCard ? 'flex' : 'none',
              }}
            >
              <Col span={12}>{t('common.Select language')}</Col>
              <Col span={12}>
                <Select
                  allowClear
                  onChange={value => handleChangeLanguage(value)}
                  style={{ width: '100%' }}
                  value={language}
                >
                  <Option value="vi">{t('common.Vietnamese')}</Option>
                  <Option value="en">{t('common.English')}</Option>
                  <Option value="jp">{t('common.Japanese')}</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Checkbox.Group>

      <Card bordered={false} style={{ marginTop: 44 }} title={t('reservation.Room Deposit')}>
        <Row>
          <Col span={24} style={{ marginBottom: 15 }}>
            <Table
              columns={columnsRoomDeposit}
              dataSource={dataRoomDeposit}
              pagination={false}
              size="small"
            />
          </Col>
        </Row>
      </Card>

      <Card bordered={false} style={{ marginTop: 16 }} title={t('reservation.Early Checkin Fee')}>
        <Table columns={columnsEarly} dataSource={dataEarly} pagination={false} size="small" />
      </Card>
    </Modal>
  );
}

export default CheckinModal;
