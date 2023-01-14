import React from 'react';
import { Chart, Interval, Tooltip } from 'bizcharts';

interface BarProps {
  data: any;
}

function Bar({ data }: BarProps) {
  const scale = {
    x: {
      type: 'cat',
    },
    y: {
      min: 0,
    },
  };

  return (
    <Chart
      autoFit
      data={data}
      height={200}
      interactions={['active-region']}
      padding="auto"
      scale={scale}
    >
      <Interval position="x*y" />
      <Tooltip shared />
    </Chart>
  );
}

export default Bar;
