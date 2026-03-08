import React from 'react';
import { Card } from 'ui/antd';

interface Props {
  action?: React.ReactNode;
  children: React.ReactNode;
  contentHeight?: number;
  footer?: React.ReactNode;
  title: React.ReactNode;
  total?: number | string;
}

function ChartCard({ action, children, contentHeight, footer, title, total }: Props) {
  return (
    <Card bodyStyle={{ padding: '20px 24px 8px 24px' }}>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div style={{ float: 'left' }}>
            <div
              style={{
                height: '22px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: '14px',
                lineHeight: '22px',
              }}
            >
              <span>{title}</span>
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: 0,
                  lineHeight: 1,
                  cursor: 'pointer',
                }}
              >
                {action}
              </span>
            </div>
            <div
              style={{
                height: '38px',
                marginTop: '4px',
                marginBottom: 0,
                overflow: 'hidden',
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '30px',
                lineHeight: '38px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                wordBreak: 'break-all',
              }}
            >
              {total}
            </div>
          </div>
        </div>
        {children && (
          <div
            style={{
              height: contentHeight || 'auto',
              position: 'relative',
              width: '100%',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
              }}
            >
              {children}
            </div>
          </div>
        )}
        {footer && (
          <div
            style={{
              marginTop: '8px',
              paddingTop: '9px',
              borderTop: '1px solid #f0f0f0',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ChartCard;
