import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function StatusPayment() {
  const { t } = useTranslation();
  const params = useLocation();
  const searchParam = new URLSearchParams(params.search);
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
}

export default StatusPayment;
