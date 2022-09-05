import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import commonEn from 'translations/en/common.json';
import guestEn from 'translations/en/guest.json';
import reservationEn from 'translations/en/reservation.json';
import commonJa from 'translations/ja/common.json';
import reservationJa from 'translations/ja/reservation.json';
import commonVi from 'translations/vi/common.json';
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
      },
    },
    ja: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonJa,
        reservation: reservationJa,
      },
    },
    vi: {
      translation: {
        'Welcome to React': 'Welcome to React and react-i18next',
        common: commonVi,
        reservation: reservationVi,
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
