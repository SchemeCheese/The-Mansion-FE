import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { formatNumber } from 'helpers';
import moment from 'moment';
import useColumns from 'pages/reservation/create/useColumns';
import { selectReservationByFolio } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { changeRoomAction, getReservationByFolio, resetReservationByFolio } from 'actions';

import { RootState } from 'types';

const { Option } = Select;

interface Props {
  selectedSaleRowKeys: any;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function TransferRoom({ selectedSaleRowKeys, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [roomTotalForm, setRoomTotalForm] = useState<any>([]);
  const [folio, setFolio] = useState('');
  const [selectedReservationDetailRowKeys, setsSlectedReservationDetailRowKeys] = useState<
    React.Key[]
  >([]);
  const [storageId, setStorageId] = useState('1');

  const onChangeSelectDisk = (value: string) => {
    setStorageId(value);
  };

  const reservationByFolioSelector: any = useAppSelector(selectReservationByFolio);
  const reservationByFolioData = reservationByFolioSelector.data;
  const reservationRedux: any = useSelector<RootState>(
    ({ getReservation: getReservationTemporary }) => getReservationTemporary.data,
  );

  const { roomingListColumns } = useColumns();

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setsSlectedReservationDetailRowKeys(selectedRowKeys);
    },
  };

  useEffect(() => {
    if (!_.isEmpty(reservationRedux)) {
      const roomsTemporary: any = [];

      reservationRedux.rooms.forEach((item: any) => {
        const itemTemporary = {
          key: item.id,
          reservation_id: reservationRedux.id,
          reservation_detail_id: item.id,
          status: item.status,
          name: item.main_guest_name ? item.main_guest_name : '-',
          room_type: item.equipment_type_id,
          room_type_text: item.room_type_text,
          room_no: item.room_no ?? '-',
          ci: moment(item.arrival_date).format('DD/MM/YYYY'),
          co: moment(item.departure_date).format('DD/MM/YYYY'),
          nights: moment
            .duration(moment(item.departure_date).diff(moment(item.arrival_date)))
            .asDays(),
          adl: item.person_number ?? '-',
          child: item.children_number && item.children_number > 0 ? item.children_number : '-',
          baby: item.infant_number && item.infant_number > 0 ? item.infant_number : '-',
          rate: item.rate_name,
          subtotal: formatNumber(item.total_price),
          deposit: item.deposit_amount === 0 ? '-' : formatNumber(item.deposit_amount),
          actual_amount: item.total_price,
        };

        if (item.canceled) {
          roomsTemporary.push({
            ...itemTemporary,
            cancelInfo: {
              opinion_content: item.opinion_content,
              receptionist: item.receptionist,
              cancel_type: item.cancel_type,
            },
          });
        } else {
          roomsTemporary.push(itemTemporary);
        }
      });

      setRoomTotalForm(roomsTemporary);
    }
  }, [reservationRedux]);

  useEffect(() => {
    dispatch(resetReservationByFolio());

    return () => {
      dispatch(resetReservationByFolio());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(reservationByFolioData)) {
      const roomsTemporary: any = [];

      reservationByFolioData.rooms.forEach((item: any) => {
        const itemTemporary = {
          key: item.id,
          reservation_id: reservationByFolioData.id,
          reservation_detail_id: item.id,
          status: item.status,
          name: item.main_guest_name ? item.main_guest_name : '-',
          room_type: item.equipment_type_id,
          room_type_text: item.room_type_text,
          room_no: item.room_no ?? '-',
          ci: moment(item.arrival_date).format('DD/MM/YYYY'),
          co: moment(item.departure_date).format('DD/MM/YYYY'),
          nights: moment
            .duration(moment(item.departure_date).diff(moment(item.arrival_date)))
            .asDays(),
          adl: item.person_number ?? '-',
          child: item.children_number && item.children_number > 0 ? item.children_number : '-',
          baby: item.infant_number && item.infant_number > 0 ? item.infant_number : '-',
          rate: item.rate_name,
          subtotal: formatNumber(item.total_price),
          deposit: item.deposit_amount === 0 ? '-' : formatNumber(item.deposit_amount),
          actual_amount: item.total_price,
        };

        if (item.canceled) {
          roomsTemporary.push({
            ...itemTemporary,
            cancelInfo: {
              opinion_content: item.opinion_content,
              receptionist: item.receptionist,
              cancel_type: item.cancel_type,
            },
          });
        } else {
          roomsTemporary.push(itemTemporary);
        }
      });

      setRoomTotalForm(roomsTemporary);
    }
  }, [reservationByFolioData]);

  const handleTransferRoom = () => {
    setIsModalOpen(false);

    dispatch(
      changeRoomAction({
        payload: {
          sale_detail_ids: selectedSaleRowKeys,
          storage_id: storageId,
          reservation_id: roomTotalForm[0].reservation_id,
          reservation_detail_id: selectedReservationDetailRowKeys[0],
        },
      }),
    );
  };

  const handleSearchReservationByFolio = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch(
        getReservationByFolio({
          folio,
        }),
      );
    }
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleTransferRoom}
      title={<b>{t('transaction.Transfer to Folio ID')}</b>}
      visible={visible}
      width={1400}
    >
      <Form layout="vertical" wrapperCol={{ span: 23 }}>
        <Row>
          <Col span={6}>
            <Form.Item
              label={t('transaction.Target Folio ID')}
              rules={[
                { required: true, message: 'FolioID do not exist. Please input another ID!' },
              ]}
            >
              <Input
                onChange={event => setFolio(event.target.value)}
                onKeyUp={handleSearchReservationByFolio}
                placeholder="Input Folio ID"
                value={folio}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={t('transaction.Select Disk Target')} name="storage_id">
              <Select
                defaultValue="1"
                onChange={onChangeSelectDisk}
                style={{ borderRadius: 2, width: '100%', height: 32 }}
                value={storageId}
              >
                <Option value="1">A</Option>
                <Option value="2">B</Option>
                <Option value="3">C</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} style={{ paddingLeft: 15 }}>
            <Form.Item label={t('transaction.Total Amount')}>
              <Input.Group>
                <Row gutter={12}>
                  <Col span={8}>
                    <Input defaultValue="40.000" />
                  </Col>
                  <Col span={4}>
                    <Input defaultValue="VND" />
                  </Col>
                </Row>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={roomingListColumns}
        dataSource={roomTotalForm}
        pagination={false}
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        size="small"
      />
    </Modal>
  );
}

export default TransferRoom;
