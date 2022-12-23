/** ***********************************
Module Name : Reservation
Developer Name : MinhNV
Created Date : 22/12/2022
Updated Date : 22/12/2022
Main functions : DownloadFile Button
************************************ */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import { Col, Modal, Radio, Row, Space } from 'antd';
import moment from 'moment';
import _ from 'underscore';

import { downloadDocxReservationDetail, downloadPDFReservationDetail } from 'actions';

import MButton from 'components/MButton';

function DownloadFile() {
  const [isSelectDownloadModalOpen, setIsSelectDownloadModalOpen] = useState(false);
  const [formatFileDownload, setFormatFileDownload] = useState('pdf');

  const { id } = useParams();

  const handleDownloadReservationConfirmation = () => {
    const formattedDateNow = moment(new Date()).format('DD_MM_YYYY');

    setIsSelectDownloadModalOpen(false);

    if (formatFileDownload === 'pdf') {
      dispatch(
        downloadPDFReservationDetail({
          payload: {
            language,
            reservation_info_id: id ?? '',
            file_name: `the_mansion_${formattedDateNow}_detail_${id ?? ''}.${formatFileDownload}`,
          },
        }),
      );
    } else if (formatFileDownload === 'docx') {
      dispatch(
        downloadDocxReservationDetail({
          payload: {
            language,
            reservation_info_id: id ?? '',
            file_name: `the_mansion_${formattedDateNow}_detail_${id ?? ''}.${formatFileDownload}`,
          },
        }),
      );
    }
  };

  const onChangeDownloadFileFormat = (e: RadioChangeEvent) => {
    if (e.target.value !== formatFileDownload) {
      setFormatFileDownload(e.target.value);
    }
  };

  const { t } = useTranslation();
  const [language, setLanguage] = useState('en');

  const onChange = (e: RadioChangeEvent) => {
    setLanguage(e.target.value);
  };

  const dispatch = useDispatch();

  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: '#1D39C4', borderRadius: 4 } }}
        onCancel={() => setIsSelectDownloadModalOpen(false)}
        onOk={handleDownloadReservationConfirmation}
        title={t('common.Download File')}
        visible={isSelectDownloadModalOpen}
      >
        <Row>
          <Col span={12}>
            <p style={{ fontWeight: 'bold' }}>{t('common.Select format file')}:</p>
          </Col>
          <Col span={12}>
            <Radio.Group onChange={onChangeDownloadFileFormat} value={formatFileDownload}>
              <Space direction="vertical">
                <Radio value="pdf">PDF</Radio>
                <Radio value="docx">DOCX</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col span={12}>
            <p style={{ fontWeight: 'bold' }}>{t('common.Select language')}:</p>
          </Col>
          <Col span={12}>
            <Radio.Group onChange={onChange} value={language}>
              <Space direction="vertical">
                <Radio value="vi">{t('common.Vietnamese')}</Radio>
                <Radio value="en">{t('common.English')}</Radio>
                <Radio value="jp">{t('common.Japanese')}</Radio>
              </Space>
            </Radio.Group>
          </Col>
        </Row>
      </Modal>
      <MButton onClick={() => setIsSelectDownloadModalOpen(true)}>{t('common.Download')}</MButton>
    </>
  );
}

export default DownloadFile;
