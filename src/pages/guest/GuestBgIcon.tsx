/** ***********************************
Module Name: Payment
Developer Name: MinhNV
Created Date: 30/04/2023
Updated Date: 30/04/2023
Main functions: Guest BgIcon
************************************ */

import React from 'react';
import SVG from 'react-inlinesvg';

function GuestBgIcon() {
  return (
    <>
      <SVG
        className="bg-icon-1"
        src="/media/images/bg-icon-1.svg"
        style={{
          position: 'fixed',
          left: '10%',
          top: '2%',
          width: '220px',
          height: '177px',
        }}
      />
      <SVG
        className="bg-icon-2"
        src="/media/images/bg-icon-2.svg"
        style={{
          position: 'fixed',
          right: '10%',
          top: '12%',
          width: '55px',
          height: '64px',
        }}
      />
      <SVG
        className="bg-icon-3"
        src="/media/images/bg-icon-3.svg"
        style={{
          position: 'fixed',
          top: '31%',
          left: '14%',
          width: '40px',
          height: '40px',
        }}
      />
      <SVG
        className="bg-icon-4"
        src="/media/images/bg-icon-4.svg"
        style={{
          position: 'fixed',
          bottom: '10%',
          left: '10%',
          width: '138px',
          height: '87px',
        }}
      />
    </>
  );
}

export default GuestBgIcon;
