import 'styles/chart_pie.css';

import React, { useMemo, useState } from 'react';
import { Pie as AntPie } from '@ant-design/plots';
import { Divider } from 'antd';
import numeral from 'numeral';

interface PieDataItem {
  x: string;
  y: number;
}

interface PieProps {
  animate?: boolean;
  data?: Array<Record<string, any>>;
  height?: number;
  lineWidth?: number;
  subTitle?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  valueFormat?: (value: string) => string | React.ReactNode;
}

const PIE_COLORS = [
  '#1890ff',
  '#13c2c2',
  '#2fc25b',
  '#facc14',
  '#f04864',
  '#8543e0',
  '#3436c7',
  '#223273',
];

function Pie({
  animate = true,
  data = [],
  height = 248,
  lineWidth = 4,
  subTitle,
  total,
  valueFormat,
}: PieProps) {
  const normalizedData = useMemo(
    () =>
      (Array.isArray(data) ? data : [])
        .filter(item => item && item.x !== undefined && item.x !== null)
        .map(item => ({
          x: `${item.x}`,
          y: Number(item.y) || 0,
        })),
    [data],
  );

  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

  const colorByKey = useMemo(() => {
    const map = new Map<string, string>();

    normalizedData.forEach((item, index) => {
      if (!map.has(item.x)) {
        map.set(item.x, PIE_COLORS[index % PIE_COLORS.length]);
      }
    });

    return map;
  }, [normalizedData]);

  const totalValue = useMemo(
    () => normalizedData.reduce((sum, item) => sum + item.y, 0),
    [normalizedData],
  );

  const activeData = useMemo(
    () => normalizedData.filter(item => !hiddenKeys.includes(item.x)),
    [hiddenKeys, normalizedData],
  );

  const legendData = useMemo(
    () =>
      normalizedData.map(item => ({
        ...item,
        color: colorByKey.get(item.x) ?? PIE_COLORS[0],
        checked: !hiddenKeys.includes(item.x),
        percent: totalValue > 0 ? item.y / totalValue : 0,
      })),
    [colorByKey, hiddenKeys, normalizedData, totalValue],
  );

  const handleLegendClick = (key: string) => {
    setHiddenKeys(prev =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key],
    );
  };

  if (normalizedData.length <= 0) {
    return <div />;
  }

  const chartConfig: any = {
    data: activeData.map(item => ({
      type: item.x,
      value: item.y,
    })),
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.75,
    autoFit: true,
    animation: animate,
    legend: false,
    color: ({ type }: { type: string }) => colorByKey.get(type) ?? PIE_COLORS[0],
    appendPadding: [12, 0, 12, 0],
    tooltip: {
      formatter: (datum: { type: string; value: number }) => ({
        name: datum.type,
        value: `${totalValue > 0 ? ((datum.value / totalValue) * 100).toFixed(2) : '0.00'}%`,
      }),
    },
    pieStyle: {
      lineWidth,
      stroke: '#fff',
    },
    interactions: [{ type: 'element-active' }],
    height,
  };

  return (
    <div className="chart-pie">
      <br />
      <div className="chart">
        <AntPie {...chartConfig} />
        {(subTitle || total) && (
          <div className="total">
            {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
            {total && (
              <div className="pie-stat">
                {typeof total === 'function' ? total() : numeral(total).format('0,0')}
              </div>
            )}
          </div>
        )}
      </div>

      <ul className="legend">
        {legendData.map(item => (
          <li key={item.x}>
            <div
              aria-hidden="true"
              onClick={() => handleLegendClick(item.x)}
              onKeyDown={() => handleLegendClick(item.x)}
            >
              <span
                className="dot"
                style={{
                  backgroundColor: !item.checked ? '#aaa' : item.color,
                }}
              />
              <span className="legendTitle">{item.x}</span>
              <Divider type="vertical" />
              <span className="percent">{`${(Number.isNaN(item.percent)
                ? 0
                : item.percent * 100
              ).toFixed(2)}%`}</span>
              <span className="value">{valueFormat ? valueFormat(`${item.y}`) : item.y}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pie;
