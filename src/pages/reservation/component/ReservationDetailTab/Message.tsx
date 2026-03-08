/** ***********************************
Module Name : Reservation
Developer Name : DungNT
Created Date : 15/08/2023
Updated Date : 15/08/2023
Main functions : Message Tab
************************************ */

import 'styles/reservation_message.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Card, Col, Row, Space } from 'ui/antd';
import TextArea from 'antd/lib/input/TextArea';
import { UploadFile } from 'antd/lib/upload';
import { getAPI, postAPI } from 'helpers/apiService';
import moment from 'moment';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function Message() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [contentMessage, setContentMessage] = useState('');
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { id } = useParams();
  const [uploadFile, setUploadFile] = useState<any>();

  const handleChangeContentMessage = (value: string) => {
    setContentMessage(value);
  };

  const handleSendMessage = async () => {
    const formData = new FormData();

    if (uploadFile) {
      formData.append('file', uploadFile);
    }

    formData.append('content', contentMessage);

    const response = await postAPI(`api/v1/reservations/${id}/send-message`, formData, 'pms', true);

    const messageNew = {
      id: '',
      content: contentMessage,
      author: 'host',
      avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const message: any = [...messages, messageNew];

    setMessages(message);
    setContentMessage('');
  };

  const fetchMessages = async () => {
    const data = await getAPI(`api/v1/reservations/${id}/get-messages`);

    setMessages(data?.data);
  };

  // const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   if (e.target.files && e.target.files?.length > 0) {
  //     setUploadFile(e.target.files[0])
  //   }
  // }

  useEffect(() => {
    async function getMessages() {
      fetchMessages();
    }

    getMessages();
  }, []);

  return (
    <Card size="small" style={{ border: '1px solid #D9D9D9' }} variant="borderless">
      <Row className="reservation-message">
        <Col
          span={24}
          style={{
            height: 410,
            paddingTop: 13,
            paddingBottom: 25,
            overflowY: 'auto',
            overflowX: 'scroll',
            paddingRight: 20,
            paddingLeft: 5,
          }}
        >
          <div>
            {messages &&
              messages.map((item: any, index) => (
                <div
                  key={index}
                  className={item.author === 'host' ? 'message-you' : 'message-guest'}
                  style={{ display: 'flex', gap: 9, marginBottom: 20 }}
                >
                  <div style={{ width: 24, height: 24 }}>
                    {item?.avatar ? (
                      <img
                        alt="example"
                        src={item?.avatar}
                        style={{ borderRadius: '50%', width: '100%%' }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div
                    style={{
                      border: '1px solid #F1F1F1',
                      borderRadius: 10,
                      paddingLeft: 13,
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingRight: 20,
                      width: '100%',
                      backgroundColor: item.author === 'host' ? '#f7f7f7' : '',
                    }}
                  >
                    <div style={{ color: '#979797', lineHeight: '17px', fontSize: 12 }}>
                      {moment(item.time).format('ddd DD MMM YYYY HH:mm')}
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', fontSize: 14 }}>{item?.content}</div>
                  </div>
                </div>
              ))}
          </div>
        </Col>
        <Col span={24}>
          <TextArea
            onChange={e => handleChangeContentMessage(e.target.value)}
            placeholder={t('reservation.Input message')}
            rows={3}
            style={{
              marginBottom: 20,
              borderRadius: 5,
            }}
            value={contentMessage}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <MButton onClick={() => setContentMessage('')}>{t('reservation.Delete')}</MButton>
            <MButton onClick={() => fetchMessages()}>{t('reservation.Reload Message')}</MButton>
            {/* <input type={'file'} onChange={handleChangeFile}></input> */}
            <PattonButton disabled={contentMessage.length === 0} onClick={handleSendMessage}>
              {t('reservation.Send to Guest')}
            </PattonButton>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

export default Message;
