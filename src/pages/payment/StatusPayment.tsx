import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

function StatusPayment() {
  const { t } = useTranslation();
  const params = useLocation();
  const { type } = useParams();
  const searchParam = new URLSearchParams(params.search);

  if (type === 'vn-pay') {
    const vnpPayDateParam = searchParam.get('vnp_PayDate')?.toString();
    const vnpPayDate = `${vnpPayDateParam?.slice(0, 4)}/${vnpPayDateParam?.slice(
      4,
      6,
    )}/${vnpPayDateParam?.slice(6, 8)} ${vnpPayDateParam?.slice(8, 10)}:${vnpPayDateParam?.slice(
      10,
      12,
    )}:${vnpPayDateParam?.slice(12, 14)}`;

    return (
      <div className="container">
        <div className="header clearfix" style={{ textAlign: 'center' }}>
          <h3 className="text-muted">VNPAY RESPONSE</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div> Mã đơn hàng: {searchParam.get('vnp_TxnRef')}</div>
          <div> Số tiền: {searchParam.get('vnp_Amount')}</div>
          <div> Nội dung thanh toán: {searchParam.get('vnp_OrderInfo')}</div>
          <div> Mã phản hồi (vnp_ResponseCode): {searchParam.get('vnp_ResponseCode')}</div>
          <div> Mã GD Tại VNPAY: {searchParam.get('vnp_TransactionNo')}</div>
          <div> Mã Ngân hàng: {searchParam.get('vnp_BankCode')}</div>
          <div> Thời gian thanh toán: {vnpPayDate}</div>
          <div>
            {' '}
            Kết quả:
            {searchParam.get('vnp_ResponseCode') === '00' ? (
              <span style={{ color: 'blue' }}> Giao dịch thành công</span>
            ) : (
              <span style={{ color: 'red' }}> Giao dịch không thành công</span>
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === 'momo-pay') {
    return (
      <div className="container">
        <div className="header clearfix" style={{ textAlign: 'center' }}>
          <h3 className="text-muted">MomoPay RESPONSE</h3>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div> Mã đơn hàng: {searchParam.get('orderId')}</div>
          <div> Số tiền: {searchParam.get('amount')}</div>
          <div> Nội dung thanh toán: {searchParam.get('orderInfo')}</div>
          <div> Mã phản hồi: {searchParam.get('resultCode')}</div>
          <div> Mã giao dịch của MoMo: {searchParam.get('transId')}</div>
          <div>
            Kết quả:
            {searchParam.get('resultCode') === '0' ? (
              <span style={{ color: 'blue' }}> Giao dịch thành công</span>
            ) : (
              <span style={{ color: 'red' }}> Giao dịch không thành công</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default StatusPayment;
