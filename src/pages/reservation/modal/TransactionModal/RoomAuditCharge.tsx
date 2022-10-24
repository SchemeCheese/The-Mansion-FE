import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, Modal, Row, Table } from 'antd';
import { formatNumber } from 'helpers';
import { selectGetReservationDetail } from 'selectors';
import _ from 'underscore';

import { useAppSelector } from 'modules/hooks';

import { addItemAction } from 'actions';

interface Props {
  reservationDetailId: string;
  reservationId: string;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function RoomAuditCharge({ reservationDetailId, reservationId, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);

  const data = reservationDetailInfo.data.charges.map((item: any, index: number) => {
    return {
      key: index,
      date: item.use_date,
      room_type: item.room_type_text,
      rate_name: item.rate_name,
      rate_detail: item.rate_detail,
      unit_price: formatNumber(item.unit_price),
      normal_price: item.unit_price,
      updated_price: item.actual_amount,
      description_id: item.description_id,
    };
  });

  const totalAmount = _.reduce(
    data,
    function (memo: any, number_: any) {
      return memo + parseInt(number_.updated_price, 10);
    },
    0,
  );

  const columns = [
    {
      title: t('common.Date'),
      dataIndex: 'date',
    },
    {
      title: t('auditRoomCharge.Room Type'),
      dataIndex: 'room_type',
    },
    {
      title: t('auditRoomCharge.Rate Name'),
      dataIndex: 'rate_name',
    },

    {
      title: t('auditRoomCharge.Rate Detail'),
      dataIndex: 'rate_detail',
    },

    {
      title: t('common.Unit price'),
      dataIndex: 'unit_price',
    },

    {
      title: t('common.Updated price'),
      dataIndex: 'updated_price',
      render: (value: any) => <Input disabled value={formatNumber(value)} />,
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], newSelectedRows: any) => {
      setSelectedRows(newSelectedRows);
    },
  };

  const handleAddRoomCharges = () => {
    const roomCharges = selectedRows.map((item: any) => {
      return {
        description_id: item.description_id,
        quantity: 1,
        normal_price: item.normal_price,
        sales_price: item.updated_price,
        storage_id: 1, // Disk A
      };
    });

    dispatch(
      addItemAction({
        payload: {
          items: roomCharges,
          reservation_id: reservationId,
          reservation_detail_id: reservationDetailId,
        },
      }),
    );

    setIsModalOpen(false);
  };

  return (
    <Modal
      bodyStyle={{ backgroundColor: '#F0F2F5' }}
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      okText={t('common.Save')}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleAddRoomCharges}
      title={<b>{t('auditRoomCharge.Add Pre Audit Room Charge')}</b>}
      visible={visible}
      width={1000}
    >
      <Form>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowSelection={{
            ...rowSelection,
          }}
          size="small"
        />
        <Row style={{ paddingTop: 30 }}>
          <Col span={16} />
          <Col span={8}>
            <span>{t('common.Total Amount')}</span>
            <span style={{ fontSize: 16, float: 'right' }}>{formatNumber(totalAmount)}</span>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default RoomAuditCharge;
