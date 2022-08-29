import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import commonEn from 'translations/en/common.json';
import reservationEn from 'translations/en/reservation.json';
import commonJa from 'translations/ja/common.json';
import reservationJa from 'translations/ja/reservation.json';
import commonVi from 'translations/vi/common.json';
import reservationVi from 'translations/vi/reservation.json';

i18n.use(initReactI18next).init({
  // We init with resources
  resources: {
    en: {
      common: commonEn,
      reservation: reservationEn,
    },
    vi: {
      common: commonVi,
      reservation: reservationJa,
    },
    ja: {
      common: commonJa,
      reservation: reservationVi,
    },
  },
  fallbackLng: 'en',
  debug: true,

  // Have a common namespace used around the full app
  ns: ['common'],
  defaultNS: 'common',

  keySeparator: false, // We use content as keys

  interpolation: {
    escapeValue: false,
  },
});
