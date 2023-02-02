import React from 'react';

export interface Props {
  label: React.ReactNode;
  value: React.ReactNode;
}

function Field({ label, value }: Props) {
  return (
    <div
      style={{
        margin: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      <span
        style={{
          lineHeight: '22px',
          color: 'rgba(0, 0, 0, 0.85)',
          fontSize: '14px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          lineHeight: '22px',
          marginLeft: '8px',
          color: 'rgba(0, 0, 0, 0.85)',
          fontSize: '14px',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Field;
