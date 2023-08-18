import 'styles/reservation_message.css';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Row, Space, Upload } from 'antd';
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
  const contentMessageRef: any = React.createRef();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChangeContentMessage = (value: string) => {
    setContentMessage(value);
  };

  const handleSendMessage = async () => {
    const formData = new FormData();

    fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    formData.append('content', contentMessage);

    const response = await postAPI('api/v1/reservations/1/send-message', formData, 'pms', true);

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
    contentMessageRef.current.value = '';
  };

  const props = {
    name: 'file',
    showUploadList: false,
    onChange(info: any) {
      // console.log('onChange file 1', info)
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: UploadFile) => {
      // console.log('beforeUpload file 1', file)
      setFileList([file]);

      return false;
    },
    fileList,
  };

  useEffect(() => {
    async function getMessages() {
      const data = await getAPI('api/v1/reservations/1/get-messages');

      setMessages(data?.data);
    }

    getMessages();
  }, []);

  return (
    <Card bordered={false} size="small" style={{ border: '1px solid #D9D9D9' }}>
      <Row className="reservation-message">
        <Col
          span={24}
          style={{
            height: 600,
            paddingTop: 13,
            paddingBottom: 25,
            overflowY: 'auto',
          }}
        >
          <div>
            {messages &&
              messages.map((item: any, index) => (
                <div
                  key={index}
                  className={item.author === 'host' ? 'message-you' : 'message-guest'}
                  style={{ display: 'flex', gap: 9, marginBottom: 25 }}
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
                  <div>
                    <div style={{ color: '#979797', lineHeight: '17px' }}>
                      {moment(item.time).format('ddd DD MMM YYYY HH:mm')}
                    </div>
                    <div style={{ color: '#000', whiteSpace: 'pre-wrap' }}>{item?.content}</div>
                  </div>
                </div>
              ))}
          </div>
        </Col>
        <Col span={24}>
          <Form.Item className="customer-textarea" name="message" style={{ width: '100%' }}>
            <TextArea
              ref={contentMessageRef}
              onChange={e => handleChangeContentMessage(e.target.value)}
              placeholder={t('reservation.Input message')}
              rows={5}
              value={contentMessage}
            />
          </Form.Item>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <MButton onClick={() => console.log('Delete')}>{t('reservation.Delete')}</MButton>
            <MButton onClick={() => console.log('Reload Message')}>
              {t('reservation.Reload Message')}
            </MButton>
            <Upload {...props}>
              <MButton>{t('reservation.Select file')}</MButton>
            </Upload>
            <PattonButton onClick={handleSendMessage}>
              {t('reservation.Send to Guest')}
            </PattonButton>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

export default Message;
