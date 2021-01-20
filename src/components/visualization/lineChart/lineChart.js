import React from 'react';
import styled from 'styled-components';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import XYAxis from './axis/xy-axis';
import Grid from './grid/grid';
import Line from './line/line';
import Area from './area/area';
import { line, area } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import { getAllMonths } from 'localization';

const margins = {
  top: 20,
  right: 20,
  bottom: 50,
  left: 30,
};

const LineChart = ({ data, parentWidth }) => {
  if (parentWidth === 0) return null;

  const width = parentWidth - margins.left - margins.right;
  const height = 250 - margins.top - margins.bottom;

  const ticks = 5;
  const t = transition().duration(1000);

  const initialData = data.map((d) => {
    const keys = Object.keys(d);
    const key0 = keys[0];
    const key1 = keys[1];

    return {
      [key0]: d[key0],
      [key1]: 0,
    };
  });

  const months = getAllMonths();

  const monthsScale = scaleOrdinal()
    .domain(data.map(d => d.year))
    .range(months);

  const xScale = scaleBand()
    .domain(data.map(d => d.year))
    .rangeRound([0, width])
    .paddingInner(1);

  const yScale = scaleLinear()
    .domain(extent(data, d => d.count))
    .range([height, 0])
    .nice();

  const lineGenerator = line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.count));

  const areaGenerator = area()
    .x(d => xScale(d.year))
    .y0(height)
    .y1(d => yScale(d.count));

  return (
    <MainWrapper>
      <svg
        className="lineChartSvg"
        width={width + margins.left + margins.right}
        height={height + margins.top + margins.bottom}
      >
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis
            {...{
              xScale,
              yScale,
              monthsScale,
              height,
              ticks,
              t,
            }}
          />
          <Grid
            {...{
              xScale,
              yScale,
              width,
              ticks,
              t,
            }}
          />
          <Area
            yScale={yScale}
            initialData={initialData}
            data={data}
            areaGenerator={areaGenerator}
            transition={t}
          />
          <Line
            scales={{ xScale, yScale }}
            initialData={initialData}
            data={data}
            lineGenerator={lineGenerator}
          />
        </g>
      </svg>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  /* ******** grid ************ */
  .grid-group line {
    stroke: #5d636d;
    stroke-opacity: 0.2;
    shape-rendering: crispEdges;
  }
  .grid-group path {
    stroke-width: 0;
  }
  /* *********** axis  *********** */
  .axis-group path,
  .axis-group line {
    stroke-width: 0;
  }
  .left-axis-group text {
    fill: #ffffff;
    opacity: 0.2;
  }
  .bottom-axis-group text {
    fill: #ffffff;
    opacity: 0.5;
    font-size: 15px;
    transform: rotate(-40deg);
  }
`;

export default LineChart;
