import 'styles/reservation_message.css';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Col, Form, Row, Space, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';

import MButton from 'components/MButton';
import PattonButton from 'components/PattonButton';

function Message() {
  const { t } = useTranslation();

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChangeUploadFile: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }

    console.log('info', info);

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, url => {
        console.log('handleChangeUploadFile url', url);
      });
    }
  };

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
            <div className="message-guest" style={{ display: 'flex', gap: 9, marginBottom: 25 }}>
              <div style={{ width: 24, height: 24 }}>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{ borderRadius: '50%', width: '100%%' }}
                />
              </div>
              <div>
                <div style={{ color: '#979797', lineHeight: '17px' }}>Tue 4 Jul 2023 11:15</div>
                <div style={{ color: '#000', whiteSpace: 'pre-wrap' }}>
                  {'Daer Yueh ting yu ! \nPremium Alex room has its own pool area!'}
                </div>
              </div>
            </div>

            <div className="message-you" style={{ display: 'flex', gap: 9, marginBottom: 25 }}>
              <div style={{ width: 24, height: 24 }}>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{ borderRadius: '50%', width: '100%%' }}
                />
              </div>
              <div>
                <div style={{ color: '#979797', lineHeight: '17px' }}>Tue 4 Jul 2023 11:15</div>
                <div style={{ color: '#000', whiteSpace: 'pre-wrap' }}>
                  {'Daer Yueh ting yu ! \nPremium Alex room has its own pool area!'}
                </div>
              </div>
            </div>

            <div className="message-guest" style={{ display: 'flex', gap: 9, marginBottom: 25 }}>
              <div style={{ width: 24, height: 24 }}>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{ borderRadius: '50%', width: '100%%' }}
                />
              </div>
              <div>
                <div style={{ color: '#979797', lineHeight: '17px' }}>Tue 4 Jul 2023 11:15</div>
                <div style={{ color: '#000', whiteSpace: 'pre-wrap' }}>
                  {'Daer Yueh ting yu ! \nPremium Alex room has its own pool area!'}
                </div>
              </div>
            </div>

            <div className="message-guest" style={{ display: 'flex', gap: 9, marginBottom: 25 }}>
              <div style={{ width: 24, height: 24 }}>
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  style={{ borderRadius: '50%', width: '100%%' }}
                />
              </div>
              <div>
                <div style={{ color: '#979797', lineHeight: '17px' }}>Tue 4 Jul 2023 11:15</div>
                <div style={{ color: '#000', whiteSpace: 'pre-wrap' }}>
                  {'Daer Yueh ting yu ! \nPremium Alex room has its own pool area!'}
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Form.Item className="customer-textarea" name="message" style={{ width: '100%' }}>
            <TextArea placeholder={t('reservation.Input message')} rows={5} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Space size="middle">
            <MButton onClick={() => console.log('Delete')}>{t('reservation.Delete')}</MButton>
            <MButton onClick={() => console.log('Reload Message')}>
              {t('reservation.Reload Message')}
            </MButton>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              name="avatar"
              onChange={handleChangeUploadFile}
              showUploadList={false}
            >
              <MButton>{t('reservation.Select file')}</MButton>
            </Upload>
            <PattonButton onClick={e => console.log('sent message')}>
              {t('reservation.Send to Guest')}
            </PattonButton>
          </Space>
        </Col>
      </Row>
    </Card>
  );
}

export default Message;
