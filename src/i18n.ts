import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import auditRoomChargeEn from 'translations/en/auditRoomCharge.json';
import branchManagerEn from 'translations/en/branchManager.json';
import commonEn from 'translations/en/common.json';
import customerEn from 'translations/en/customer.json';
import customerDetailEn from 'translations/en/customerDetail.json';
import frontDeskEn from 'translations/en/frontDesk.json';
import guestEn from 'translations/en/guest.json';
import guestCheckoutEn from 'translations/en/guestCheckout.json';
import houseKeepingEn from 'translations/en/houseKeeping.json';
import messageEn from 'translations/en/message.json';
import monthlyInvoiceEn from 'translations/en/monthlyInvoice.json';
import nightAuditEn from 'translations/en/nightAudit.json';
import payDetailEn from 'translations/en/payDetail.json';
import paySelectedEn from 'translations/en/paySelected.json';
import reportEn from 'translations/en/report.json';
import reservationEn from 'translations/en/reservation.json';
import selectedPayMethodEn from 'translations/en/selectedPayMethod.json';
import transactionEn from 'translations/en/transaction.json';
import auditRoomChargeJa from 'translations/ja/auditRoomCharge.json';
import branchManagerJa from 'translations/ja/branchManager.json';
import commonJa from 'translations/ja/common.json';
import customerJa from 'translations/ja/customer.json';
import customerDetailJa from 'translations/ja/customerDetail.json';
import frontDeskJa from 'translations/ja/frontDesk.json';
import guestJa from 'translations/ja/guest.json';
import guestCheckoutJa from 'translations/ja/guestCheckout.json';
import houseKeepingJa from 'translations/ja/houseKeeping.json';
import messageJa from 'translations/ja/message.json';
import monthlyInvoiceJa from 'translations/ja/monthlyInvoice.json';
import nightAuditJa from 'translations/ja/nightAudit.json';
import payDetailJA from 'translations/ja/payDetail.json';
import paySelectedJa from 'translations/ja/paySelected.json';
import reportJa from 'translations/ja/report.json';
import reservationJa from 'translations/ja/reservation.json';
import selectedPayMethodJA from 'translations/ja/selectedPayMethod.json';
import transactionJa from 'translations/ja/transaction.json';
import auditRoomChargeVi from 'translations/vi/auditRoomCharge.json';
import branchManagerVi from 'translations/vi/branchManager.json';
import commonVi from 'translations/vi/common.json';
import customerVi from 'translations/vi/customer.json';
import customerDetailVi from 'translations/vi/customerDetail.json';
import frontDeskVi from 'translations/vi/frontDesk.json';
import guestVi from 'translations/vi/guest.json';
import guestCheckoutVi from 'translations/vi/guestCheckout.json';
import houseKeepingVi from 'translations/vi/houseKeeping.json';
import messageVi from 'translations/vi/message.json';
import monthlyInvoiceVi from 'translations/vi/monthlyInvoice.json';
import nightAuditVi from 'translations/vi/nightAudit.json';
import payDetailVi from 'translations/vi/payDetail.json';
import paySelectedVi from 'translations/vi/paySelected.json';
import reportVi from 'translations/vi/report.json';
import reservationVi from 'translations/vi/reservation.json';
import selectedPayMethodVi from 'translations/vi/selectedPayMethod.json';
import transactionVi from 'translations/vi/transaction.json';

i18n.use(initReactI18next).init({
  // We init with resources
  resources: {
    en: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonEn,
        reservation: reservationEn,
        guest: guestEn,
        guestCheckout: guestCheckoutEn,
        message: messageEn,
        nightAudit: nightAuditEn,
        houseKeeping: houseKeepingEn,
        paySelected: paySelectedEn,
        auditRoomCharge: auditRoomChargeEn,
        transaction: transactionEn,
        monthlyInvoice: monthlyInvoiceEn,
        payDetail: payDetailEn,
        selectedPayMethod: selectedPayMethodEn,
        frontDesk: frontDeskEn,
        branchManager: branchManagerEn,
        customerDetail: customerDetailEn,
        customer: customerEn,
        report: reportEn,
      },
    },
    ja: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonJa,
        reservation: reservationJa,
        guest: guestJa,
        guestCheckout: guestCheckoutJa,
        message: messageJa,
        nightAudit: nightAuditJa,
        houseKeeping: houseKeepingJa,
        paySelected: paySelectedJa,
        auditRoomCharge: auditRoomChargeJa,
        transaction: transactionJa,
        monthlyInvoice: monthlyInvoiceJa,
        payDetail: payDetailJA,
        selectedPayMethod: selectedPayMethodJA,
        frontDesk: frontDeskJa,
        branchManager: branchManagerJa,
        customerDetail: customerDetailJa,
        customer: customerJa,
        report: reportJa,
      },
    },
    vi: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonVi,
        reservation: reservationVi,
        guest: guestVi,
        guestCheckout: guestCheckoutVi,
        message: messageVi,
        nightAudit: nightAuditVi,
        houseKeeping: houseKeepingVi,
        paySelected: paySelectedVi,
        auditRoomCharge: auditRoomChargeVi,
        transaction: transactionVi,
        monthlyInvoice: monthlyInvoiceVi,
        payDetail: payDetailVi,
        selectedPayMethod: selectedPayMethodVi,
        frontDesk: frontDeskVi,
        branchManager: branchManagerVi,
        customerDetail: customerDetailVi,
        customer: customerVi,
        report: reportVi,
      },
    },
  },
  fallbackLng: 'en',
  debug: true,

  // Have a common namespace used around the full app
  ns: ['translation'],
  defaultNS: 'translation',

  // keySeparator: false, // We use content as keys

  interpolation: {
    escapeValue: false,
  },
});
