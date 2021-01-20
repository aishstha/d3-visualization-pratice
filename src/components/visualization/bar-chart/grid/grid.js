import React from 'react';
import { axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

class Grid extends React.Component {
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
    const { yScale, width } = this.props;

    const axis = axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat('');

    select(this.node).call(axis);
  }
  render() {
    return (
      <g
        ref={(node) => {
          this.node = node;
        }}
        className="grid-group"
      />
    );
  }
}

export default Grid;
