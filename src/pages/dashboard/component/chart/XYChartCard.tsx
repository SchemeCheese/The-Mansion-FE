import React, { useEffect, useLayoutEffect, useState } from 'react';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Card } from 'ui/antd';

am4core.useTheme(am4themes_animated);

interface ActualPowerProps {
  electricPower?: string[] | any[];
}

function XYChartCard({ electricPower }: ActualPowerProps) {
  const [electricPowerData, setElectricPowerData] = useState([]);

  useEffect(() => {
    setElectricPowerData(electricPower as any);
  }, [electricPower]);

  useLayoutEffect(() => {
    const chart = am4core.create('chart-xy', am4charts.XYChart);

    chart.maskBullets = false;
    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    const yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    const heatColor1 = am4core.color('rgba(31, 153, 46, 0)');
    // const heatColor2 = am4core.color('rgb(31, 153, 46)');
    const heatColor3 = am4core.color('rgba(255,251,143,1)');
    const heatColor4 = am4core.color('rgba(250,84,28,1)');

    xAxis.dataFields.category = 'day';
    yAxis.dataFields.category = 'hour';
    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.inversed = false;
    xAxis.renderer.minGridDistance = 40;
    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = false;
    yAxis.renderer.minGridDistance = 30;
    const series = chart.series.push(new am4charts.ColumnSeries());

    series.dataFields.categoryX = 'day';
    series.dataFields.categoryY = 'hour';
    series.dataFields.value = 'value';
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 3000;
    // const bgColor = new am4core.InterfaceColorSet().getFor('background');
    const columnTemplate = series.columns.template;

    columnTemplate.strokeWidth = 0;
    columnTemplate.strokeOpacity = 0;
    columnTemplate.stroke = heatColor1;
    columnTemplate.tooltipText = "{day}, {hour}: {value.workingValue.formatNumber('#.')}";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);
    series.heatRules.push({
      target: columnTemplate,
      property: 'fill',
      min: heatColor3,
      max: heatColor4,
    }); // heat legend

    const heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);

    heatLegend.width = am4core.percent(20);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;
    heatLegend.minColor = heatColor3;
    heatLegend.maxColor = heatColor4;
    heatLegend.valueAxis.logarithmic = true; // heat legend behavior

    series.columns.template.events.on('over', function (event) {
      handleHover(event.target);
    });
    series.columns.template.events.on('hit', function (event) {
      handleHover(event.target);
    });

    function handleHover(column: any) {
      if (!Number.isNaN(Number(column.dataItem.value))) {
        heatLegend.valueAxis.showTooltipAt(column.dataItem.value);
      } else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    series.columns.template.events.on('out', function (event) {
      heatLegend.valueAxis.hideTooltip();
    });
    chart.logo.disabled = true;
    chart.data = electricPowerData;
  }, [electricPowerData]);

  if (electricPowerData.length <= 0) {
    return <div />;
  }

  return (
    <Card>
      <div className="donut">
        {/* <ReactApexChart options={options} series={series} type="bar" height={350} /> */}
        <div
          id="chart-xy"
          style={{
            width: '100%',
            height: '500px',
          }}
        />
      </div>
    </Card>
  );
}

export default XYChartCard;
