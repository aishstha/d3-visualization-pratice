import React from 'react';
import Axis from './axis';

const XYAxis = ({
  xScale, yScale, monthsScale, height, ticks, t,
}) => {
  const xSettings = {
    orient: 'bottom',
    transform: `translate(0,${height + 10})`,
    scale: xScale,
    monthsScale,
  };
  const ySettings = {
    orient: 'left',
    transform: 'translate(0,0)',
    scale: yScale,
    ticks,
    transition: t,
  };

  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  );
};

export default XYAxis;
