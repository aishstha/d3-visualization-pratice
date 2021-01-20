import React from 'react';
import { select } from 'd3-selection';

class Area extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.renderChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const { data, transition, areaGenerator } = this.props;

    select('#area')
      .datum(data)
      .transition(transition)
      .attr('d', areaGenerator);
  }
  renderChart() {
    const node = this.ref.current;
    const { initialData, areaGenerator } = this.props;

    select(node)
      .datum(initialData)
      .append('path')
      .attr('id', 'area')
      .attr('d', areaGenerator)
      .attr('fill', '#ECC417')
      .attr('opacity', '0.1');

    this.updateChart();
  }

  render() {
    // const {
    //   scales, data, svgDimensions, margins, months, yScale,
    // } = this.props;
    // const { xScale, yScale } = scales;
    // const areaGenerator = area()
    //   .x((d, key) => xScale(months[key]))
    //   .y0(svgDimensions.height - margins.bottom)
    //   .y1(d => yScale(d.count));
    // // .curve(d3.curveMonotoneX);

    // const areaGradient = (
    //   <linearGradient
    //     id="area-gradient"
    //     gradientUnits="userSpaceOnUse"
    //     x1="0"
    //     y1={yScale(0)}
    //     x2="0"
    //     y2={yScale(30)}
    //   >
    //     <stop offset="0%" stopColor="#333333" stopOpacity="0" />
    //     <stop offset="100%" stopColor="#F7E433" stopOpacity="1" />
    //   </linearGradient>
    // );

    // const path = (
    //   <path d={areaGenerator(data)} className="area" style={{ fill: 'url(#area-gradient)' }} />
    // );

    return (
      <g className="area-group" ref={this.ref}>
        {/* {areaGradient} */}
        {/* {path} */}
      </g>
    );
  }
}

export default Area;
