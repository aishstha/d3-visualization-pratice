import React from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import {number,formattedCurrency} from 'localization';

class Axis extends React.Component {
  constructor() {
    super();
    this.node = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const { scale, orient } = this.props;
    let axis;

    if (orient === "bottom") {
      axis = axisBottom(scale)
      .tickFormat(d => number(d));
    }
    if (orient === "left") {
      axis = axisLeft(scale)
        .ticks(5)
        .tickFormat(d => formattedCurrency(d));
    }
    select(this.node).call(axis);
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g
        ref={node => {
          this.node = node;
        }}
        transform={transform}
        className={`${orient}-axis`}
      />
    );
  }
}

export default Axis;
