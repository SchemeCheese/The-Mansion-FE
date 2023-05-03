/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 30/04/2023
Updated Date: 30/04/2023
Main functions: Guest Footer
************************************ */

import React from 'react';
import { useTranslation } from 'react-i18next';

function GuestFooter() {
  const { t } = useTranslation();

  return (
    <div
      style={{
        width: '100%',
        fontFamily: 'SF Pro Display',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '20px',
        textAlign: 'center',
        padding: '14px 0 14px 0',
        color: 'rgba(0, 0, 0, 0.45)',
      }}
    >
      {t('guest.Copyright©2020 The Mansions Hospitality')}
    </div>
  );
}

export default GuestFooter;
