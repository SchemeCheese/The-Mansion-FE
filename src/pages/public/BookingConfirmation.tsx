/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ReservationData {
  bank_transfer?: {
    account_holder: string;
    account_number: string;
    bank_name: string;
    branch: string;
    transfer_content: string;
  };
  property: {
    address: string;
    email: string;
    name: string;
    phone: string;
  };
  qrCodes?: {
    momo?: string;
    vnpay?: string;
  };
  reservation: {
    checkin: string;
    checkout: string;
    created_at: string;
    deposit_amount: number;
    guest_email: string;
    guest_name: string;
    guest_phone: string;
    nights: number;
    remaining_amount: number;
    reservation_number: string;
    room_number: string;
    room_type: string;
    status: string;
    total_amount: number;
  };
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'checked_in':
      return '#22c55e'; // green
    case 'checked_out':
      return '#64748b'; // gray
    case 'canceled':
      return '#ef4444'; // red
    case 'no_show':
      return '#f59e0b'; // orange
    default:
      return '#3b82f6'; // blue - reserved
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'checked_in':
      return 'Đã nhận phòng';
    case 'checked_out':
      return 'Đã trả phòng';
    case 'canceled':
      return 'Đã hủy';
    case 'no_show':
      return 'Không đến';
    default:
      return 'Chờ nhận phòng';
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  // Show temporary feedback instead of alert
  const feedback = document.createElement('div');

  feedback.textContent = `Đã sao chép: ${  text}`;
  feedback.style.cssText =
    'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#22c55e;color:white;padding:12px 24px;border-radius:8px;z-index:9999;animation:fadeIn 0.3s';
  document.body.appendChild(feedback);
  setTimeout(() => feedback.remove(), 2000);
};

export default function BookingConfirmation() {
  const { reservationNumber } = useParams<{ reservationNumber: string }>();
  const [data, setData] = useState<ReservationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get branch_code from URL query params
        const urlParams = new URLSearchParams(window.location.search);
        const branchCode = urlParams.get('branch_code') || 'the_mansion';

        const response = await fetch(
          `https://pms-api.minova.vn/api/v1/public/booking/${reservationNumber}/confirmation?branch_code=${branchCode}`,
        );

        if (!response.ok) {
          throw new Error('Không tìm thấy thông tin đặt phòng');
        }

        const result = await response.json();

        setData(result);
      } catch (error_) {
        setError(error_ instanceof Error ? error_.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    };

    if (reservationNumber) {
      fetchData();
    }
  }, [reservationNumber]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Đang tải...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Không tìm thấy đặt phòng</h2>
          <p>{error || 'Vui lòng kiểm tra lại mã đặt phòng'}</p>
        </div>
      </div>
    );
  }

   
  const { bank_transfer, property, qrCodes, reservation } = data;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.propertyName}>{property.name}</h1>
          <p style={styles.propertyAddress}>{property.address}</p>
        </div>

        {/* Status Badge */}
        <div style={styles.statusRow}>
          <span
            style={{
              ...styles.statusBadge,
              backgroundColor: getStatusColor(reservation.status),
            }}
          >
            {getStatusLabel(reservation.status)}
          </span>
          <span style={styles.reservationNumber}>#{reservation.reservation_number}</span>
        </div>

        {/* Room Info */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>THÔNG TIN PHÒNG</h3>
          <div style={styles.infoRow}>
            <span style={styles.label}>Loại phòng:</span>
            <span style={styles.value}>{reservation.room_type}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Số phòng:</span>
            <span style={styles.value}>{reservation.room_number}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Ngày nhận phòng:</span>
            <span style={styles.value}>{formatDate(reservation.checkin)}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Ngày trả phòng:</span>
            <span style={styles.value}>{formatDate(reservation.checkout)}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Số đêm:</span>
            <span style={styles.value}>{reservation.nights} đêm</span>
          </div>
        </div>

        {/* Guest Info */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>THÔNG TIN KHÁCH HÀNG</h3>
          <div style={styles.infoRow}>
            <span style={styles.label}>Họ tên:</span>
            <span style={styles.value}>{reservation.guest_name}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Điện thoại:</span>
            <span style={styles.value}>{reservation.guest_phone}</span>
          </div>
          {reservation.guest_email && (
            <div style={styles.infoRow}>
              <span style={styles.label}>Email:</span>
              <span style={styles.value}>{reservation.guest_email}</span>
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>THANH TOÁN</h3>
          <div style={styles.infoRow}>
            <span style={styles.label}>Tổng tiền:</span>
            <span style={styles.valueLarge}>{formatCurrency(reservation.total_amount)}</span>
          </div>
          <div style={styles.infoRow}>
            <span style={styles.label}>Đã cọc:</span>
            <span style={styles.value}>{formatCurrency(reservation.deposit_amount)}</span>
          </div>
          <div
            style={{ ...styles.infoRow, borderTop: '1px dashed #ddd', paddingTop: 8, marginTop: 8 }}
          >
            <span style={{ ...styles.label, fontWeight: 600 }}>Còn lại:</span>
            <span style={{ ...styles.valueLarge, color: '#dc2626', fontWeight: 700 }}>
              {formatCurrency(reservation.remaining_amount)}
            </span>
          </div>
        </div>

        {/* Bank Transfer */}
        {bank_transfer && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>CHUYỂN KHOẢN</h3>
            <div style={styles.bankCard}>
              <div style={styles.bankRow}>
                <span style={styles.bankLabel}>Ngân hàng:</span>
                <div style={styles.bankValueContainer}>
                  <span style={styles.bankValue}>{bank_transfer.bank_name}</span>
                  <button
                    onClick={() => copyToClipboard(bank_transfer.bank_name)}
                    style={styles.copyButton}
                    type="button"
                  >
                    Sao chép
                  </button>
                </div>
              </div>
              <div style={styles.bankRow}>
                <span style={styles.bankLabel}>Số tài khoản:</span>
                <div style={styles.bankValueContainer}>
                  <span style={styles.bankValue}>{bank_transfer.account_number}</span>
                  <button
                    onClick={() => copyToClipboard(bank_transfer.account_number)}
                    style={styles.copyButton}
                    type="button"
                  >
                    Sao chép
                  </button>
                </div>
              </div>
              <div style={styles.bankRow}>
                <span style={styles.bankLabel}>Chủ tài khoản:</span>
                <div style={styles.bankValueContainer}>
                  <span style={styles.bankValue}>{bank_transfer.account_holder}</span>
                  <button
                    onClick={() => copyToClipboard(bank_transfer.account_holder)}
                    style={styles.copyButton}
                    type="button"
                  >
                    Sao chép
                  </button>
                </div>
              </div>
              {bank_transfer.branch && (
                <div style={styles.bankRow}>
                  <span style={styles.bankLabel}>Chi nhánh:</span>
                  <span style={styles.bankValue}>{bank_transfer.branch}</span>
                </div>
              )}
              <div
                style={{
                  ...styles.bankRow,
                  backgroundColor: '#fffbeb',
                  padding: 12,
                  borderRadius: 8,
                  marginTop: 12,
                }}
              >
                <span style={styles.bankLabel}>Nội dung chuyển khoản:</span>
                <div style={styles.bankValueContainer}>
                  <span style={{ ...styles.bankValue, fontWeight: 600, color: '#b45309' }}>
                    {bank_transfer.transfer_content}
                  </span>
                  <button
                    onClick={() => copyToClipboard(bank_transfer.transfer_content)}
                    style={styles.copyButton}
                    type="button"
                  >
                    Sao chép
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Codes */}
        {qrCodes && (qrCodes.vnpay || qrCodes.momo) && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>QUÉT QR THANH TOÁN</h3>
            <div style={styles.qrContainer}>
              {qrCodes.vnpay && (
                <div style={styles.qrItem}>
                  <img alt="VNPay QR" src={qrCodes.vnpay} style={styles.qrImage} />
                  <span style={styles.qrLabel}>VNPay</span>
                </div>
              )}
              {qrCodes.momo && (
                <div style={styles.qrItem}>
                  <img alt="MoMo QR" src={qrCodes.momo} style={styles.qrImage} />
                  <span style={styles.qrLabel}>MoMo</span>
                </div>
              )}
            </div>
            <p style={styles.qrNote}>
              Quét mã QR để thanh toán nhanh chóng qua ứng dụng ngân hàng hoặc ví điện tử
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <p>Cảm ơn quý khách đã lựa chọn {property.name}!</p>
          <p style={styles.contact}>
            Liên hệ: {property.phone} | {property.email}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '18px',
    color: '#6b7280',
  },
  error: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    color: '#6b7280',
  },
  card: {
    maxWidth: '480px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1a365d',
    color: 'white',
    padding: '24px',
    textAlign: 'center',
  },
  propertyName: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 700,
  },
  propertyAddress: {
    margin: '8px 0 0',
    fontSize: '13px',
    opacity: 0.9,
  },
  statusRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid #e5e7eb',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 600,
  },
  reservationNumber: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },
  section: {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
  },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: '12px',
    fontWeight: 700,
    color: '#6b7280',
    letterSpacing: '0.5px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
  },
  value: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
  },
  valueLarge: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#111827',
  },
  bankCard: {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '16px',
  },
  bankRow: {
    marginBottom: '12px',
  },
  bankLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px',
  },
  bankValueContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankValue: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#111827',
  },
  copyButton: {
    padding: '4px 10px',
    fontSize: '12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  qrContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginBottom: '12px',
  },
  qrItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  qrImage: {
    width: '140px',
    height: '140px',
    objectFit: 'contain',
  },
  qrLabel: {
    marginTop: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#111827',
  },
  qrNote: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },
  footer: {
    padding: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#6b7280',
  },
  contact: {
    marginTop: '8px',
    fontSize: '12px',
  },
};
