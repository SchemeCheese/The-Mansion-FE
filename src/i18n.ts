import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import auditRoomChargeEn from 'translations/en/auditRoomCharge.json';
import commonEn from 'translations/en/common.json';
import guestEn from 'translations/en/guest.json';
import paySelectedEn from 'translations/en/paySelected.json';
import reservationEn from 'translations/en/reservation.json';
import auditRoomChargeJa from 'translations/ja/auditRoomCharge.json';
import commonJa from 'translations/ja/common.json';
import guestJa from 'translations/ja/guest.json';
import paySelectedJa from 'translations/ja/paySelected.json';
import reservationJa from 'translations/ja/reservation.json';
import auditRoomChargeVi from 'translations/vi/auditRoomCharge.json';
import commonVi from 'translations/vi/common.json';
import guestVi from 'translations/vi/guest.json';
import paySelectedVi from 'translations/vi/paySelected.json';
import reservationVi from 'translations/vi/reservation.json';

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
