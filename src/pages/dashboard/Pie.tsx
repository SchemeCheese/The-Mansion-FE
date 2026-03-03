import 'styles/chart_pie.css';

import React, { useState } from 'react';
import DataSet from '@antv/data-set';
import { Divider } from 'antd';
import { Chart, Coord, G2, Geom, Legend, Tooltip } from 'bizcharts';
import numeral from 'numeral';

let chart1: G2.Chart | undefined;

interface PieProps {
  animate?: boolean;
  data?: any;
  height?: number;
  lineWidth?: number;
  subTitle?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  valueFormat?: (value: string) => string | React.ReactNode;
}

function Pie({ animate, data, height, lineWidth, subTitle, total, valueFormat }: PieProps) {
  const [legendData, setLegendData] = useState<any>([]);
  const scale = {
    x: {
      type: 'cat',
      range: [0, 1],
    },
    y: {
      min: 0,
    },
  };
  const forceFit = true;
  const tooltip = true;
  const padding = [12, 0, 12, 0] as [number, number, number, number];
  const { DataView } = DataSet;
  const dv = new DataView();

  dv.source(data).transform({
    type: 'percent',
    field: 'y',
    dimension: 'x',
    as: 'percent',
  });

  const getG2Instance = (chart: G2.Chart) => {
    chart1 = chart;
    requestAnimationFrame(() => {
      getLegendData();
      // this.resize();
    });
  };

  const tooltipFormat: [string, (...arguments_: any[]) => { name?: string; value: string }] = [
    'x*percent',
    (x: string, p: number) => ({
      name: x,
      value: `${(p * 100).toFixed(2)}%`,
    }),
  ];

  const handleLegendClick = (item: any, index: any) => {
    const newItem = item;
    const newLegendData = [...legendData];

    newItem.checked = !newItem.checked;
    newLegendData[index] = newItem;

    const filteredLegendData = newLegendData.filter((l: any) => l.checked).map((l: any) => l.x);

    if (chart1) {
      chart1.filter('x', value => filteredLegendData.includes(`${value}`));
    }

    setLegendData(newLegendData);
  };

  // for custom lengend view
  const getLegendData = () => {
    if (!chart1) {
      return;
    }

    const geom = chart1.getGeometries()[0]; // 获取所有的图形

    if (!geom.dataArray) {
      return;
    }

    const items = geom.dataArray; // 获取图形对应的

    const newLegendData = items.map((item: any) => {
      /* eslint no-underscore-dangle:0 */
      const origin = item[0]._origin;

      origin.color = item[0].color;
      origin.checked = true;

      return origin;
    });

    setLegendData(newLegendData);
  };

  if (data.length <= 0) {
    return <div />;
  }

  return (
    <div className="chart-pie">
      <br />
      <div className="chart">
        <Chart
          animate={animate}
          className="chart-content-pie"
          data={dv}
          forceFit={forceFit}
          height={height}
          onGetG2Instance={getG2Instance}
          padding={padding}
          scale={scale}
          width={415}
        >
          {tooltip && <Tooltip showTitle={false} />}
          <Coord innerRadius={0.75} type="theta" />
          <Legend visible={false} />
          <Geom
            adjust={{ type: 'stack' }}
            color="x"
            position="percent"
            selected
            style={{ lineWidth, stroke: '#fff' }}
            tooltip={tooltip ? tooltipFormat : undefined}
            type="interval"
          />
          {(subTitle || total) && (
            <div className="total">
              {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
              {/* eslint-disable-next-line */}
              {total && (
                <div className="pie-stat">
                  {typeof total === 'function' ? total() : numeral(total).format('0,0')}
                </div>
              )}
            </div>
          )}
        </Chart>
      </div>

      <ul className="legend">
        {legendData.map((item: any, index: any) => (
          <li key={item.x}>
            <div
              aria-hidden="true"
              onClick={() => handleLegendClick(item, index)}
              onKeyDown={() => handleLegendClick(item, index)}
            >
              <span
                className="dot"
                style={{
                  backgroundColor: !item.checked ? '#aaa' : item.color,
                }}
              />
              <span className="legendTitle">{item.x}</span>
              <Divider type="vertical" />
              <span className="percent">
                {`${(Number.isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
              </span>
              <span className="value">{valueFormat ? valueFormat(item.y) : item.y}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pie;
