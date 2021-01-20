import React from 'react';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { number } from 'localization';

export default class Axis extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.updateAxis();
  }
  updateAxis() {
    const {
      scale, orient, transition, ticks, monthsScale
    } = this.props;

    if (orient === 'left') {
      const axis = axisLeft(scale).ticks(ticks).tickFormat(d => number(d));
      select(`#${orient}-axis`)
        .transition(transition)
        .call(axis);
    }
    if (orient === 'bottom') {
      const axis = axisBottom(scale).tickFormat(d => monthsScale(d));
      select(`#${orient}-axis`)
        .call(axis);
    }
  }
  renderAxis() {
    const { scale, orient, ticks } = this.props;

    const node = this.ref.current;
    let axis;

    if (orient === 'left') {
      axis = axisLeft(scale).ticks(ticks);
    }
    if (orient === 'bottom') {
      axis = axisBottom(scale);
    }
    select(node).call(axis);
    this.updateAxis();
  }
  render() {
    const { transform, orient } = this.props;
    return (
      <g
        ref={this.ref}
        className={`${orient}-axis-group`}
        id={`${orient}-axis`}
        transform={transform}
      />
    );
  }
}
