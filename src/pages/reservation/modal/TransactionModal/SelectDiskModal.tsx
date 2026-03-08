/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 15/09/2022
Updated Date : 23/11/2022
Main functions : Select Disk Modal
************************************ */

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Select } from 'ui/antd';
import { getAPI } from 'helpers/apiService';
import { selectGetReservationDetail } from 'selectors';

import { useAppSelector } from 'modules/hooks';

import { changeDiskAction } from 'actions';

import { RootState } from 'types';

interface Props {
  saleDetailIds: any;
  setIsModalOpen: (visible: boolean) => void;
  visible: boolean;
}

function SelectDiskModal({ saleDetailIds, setIsModalOpen, visible }: Props) {
  const { t } = useTranslation();
  const { Option } = Select;
  const dispatch = useDispatch();

  const [diskSelected, setDiskSelected] = useState('1');
  const [disks, setDisks] = useState([]);

  const reservationDetailInfo: any = useAppSelector(selectGetReservationDetail);
  const reservationRedux: any = useSelector<RootState>(
    ({ getReservation: getReservationTemporary }) => getReservationTemporary.data,
  );

  const handleChange = (value: string) => {
    setDiskSelected(value);
  };

  const handleButtonSubmit = () => {
    setIsModalOpen(false);
    dispatch(
      changeDiskAction({
        payload: {
          reservation_detail_id: reservationDetailInfo.data.id,
          sale_detail_ids: saleDetailIds,
          storage_id: diskSelected,
        },
      }),
    );
  };

  useEffect(() => {
    async function getDisks() {
      const response = await getAPI(
        `api/v1/get-disk?operator_code=${reservationRedux.operator_code}&branch_code=${reservationRedux.branch_code}&facility_code=${reservationRedux.facility_code}`,
      );

      setDisks(response.data);
    }

    if (visible) {
      getDisks();
    }
  }, [visible]);

  return (
    <Modal
      cancelButtonProps={{ style: { borderRadius: 4 } }}
      okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleButtonSubmit}
      open={visible}
      styles={{ body: { backgroundColor: '#F0F2F5' } }}
      title={<b>{t('paySelected.Change Disk')}</b>}
    >
      <Form layout="vertical">
        <Form.Item label={t('paySelected.Select Disk')}>
          <Select defaultValue="A" onChange={handleChange}>
            {Object.keys(disks).map((key: any) => {
              return <Option value={key}>{disks[key]}</Option>;
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SelectDiskModal;
