import React, { Component } from "react";
import Slice from "./slice";

export default class PieChart extends Component {
  render() {
    let {
      colors,
      labels,
      hole,
      radius,
      data,
      stroke,
      strokeWidth
    } = this.props;
    let colorsLength = colors.length;
    let diameter = radius * 2;
    let startAngle;
    let sum = data.reduce((carry, current) => carry + current, 0);
    startAngle = 0;

    return (
      <svg
        width={diameter}
        height={diameter}
        viewBox={"0 0 " + diameter + " " + diameter}
      >
        {data.map(function(slice, sliceIndex) {
          if (slice !== 0) {
            let angle, nextAngle, percent;
            nextAngle = startAngle;
            /**
             * slice component path not closed
             * -0.0001 to fix the wired circle disappearing problem when circle is 360
             */
            angle = (slice / sum) * 360 - 0.0001 || 0;
            percent = (slice / sum) * 100 || 0;
            startAngle += angle;

            return (
              <Slice
                key={sliceIndex}
                value={slice}
                percent={percent}
                percentValue={percent.toFixed(1)}
                startAngle={nextAngle}
                angle={angle}
                radius={radius}
                hole={radius - hole}
                trueHole={hole}
                showLabel={labels}
                fill={colors[sliceIndex % colorsLength]}
                stroke={stroke}
                strokeWidth={strokeWidth}
              />
            );
          }
          return null;
        })}
      </svg>
    );
  }
}
