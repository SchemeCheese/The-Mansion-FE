import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import auditRoomChargeEn from 'translations/en/auditRoomCharge.json';
import commonEn from 'translations/en/common.json';
import guestEn from 'translations/en/guest.json';
import payDetailEn from 'translations/en/payDetail.json';
import paySelectedEn from 'translations/en/paySelected.json';
import reservationEn from 'translations/en/reservation.json';
import selectedPayMethodEn from 'translations/en/selectedPayMethod.json';
import transactionEn from 'translations/en/transaction.json';
import auditRoomChargeJa from 'translations/ja/auditRoomCharge.json';
import commonJa from 'translations/ja/common.json';
import guestJa from 'translations/ja/guest.json';
import payDetailJA from 'translations/ja/payDetail.json';
import paySelectedJa from 'translations/ja/paySelected.json';
import reservationJa from 'translations/ja/reservation.json';
import selectedPayMethodJA from 'translations/ja/selectedPayMethod.json';
import transactionJa from 'translations/ja/transaction.json';
import auditRoomChargeVi from 'translations/vi/auditRoomCharge.json';
import commonVi from 'translations/vi/common.json';
import guestVi from 'translations/vi/guest.json';
import payDetailVi from 'translations/vi/payDetail.json';
import paySelectedVi from 'translations/vi/paySelected.json';
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
        paySelected: paySelectedEn,
        auditRoomCharge: auditRoomChargeEn,
        transaction: transactionEn,
        payDetail: payDetailEn,
        selectedPayMethod: selectedPayMethodEn,
      },
    },
    ja: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonJa,
        reservation: reservationJa,
        guest: guestJa,
        paySelected: paySelectedJa,
        auditRoomCharge: auditRoomChargeJa,
        transaction: transactionJa,
        payDetail: payDetailJA,
        selectedPayMethod: selectedPayMethodJA,
      },
    },
    vi: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonVi,
        reservation: reservationVi,
        guest: guestVi,
        paySelected: paySelectedVi,
        auditRoomCharge: auditRoomChargeVi,
        transaction: transactionVi,
        payDetail: payDetailVi,
        selectedPayMethod: selectedPayMethodVi,
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
