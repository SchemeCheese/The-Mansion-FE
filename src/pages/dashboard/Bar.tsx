import React from 'react';
import { Column } from '@ant-design/plots';

interface BarProps {
  data: any;
}

function Bar({ data }: BarProps) {
  const chartData = Array.isArray(data) ? data : [];

  const config: any = {
    data: chartData,
    height: 200,
    xField: 'x',
    yField: 'y',
    xAxis: {
      type: 'cat',
    },
    yAxis: {
      min: 0,
    },
    tooltip: {
      shared: true,
    },
    interactions: [{ type: 'element-active' }],
    autoFit: true,
    padding: 'auto',
  };

  return <Column {...config} />;
}

export default Bar;
