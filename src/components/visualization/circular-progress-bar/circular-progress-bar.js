// source: http://bl.ocks.org/mbostock/5100636
import React from "react";
import { select } from "d3-selection";
import { arc } from "d3-shape";
import { interpolate } from "d3-interpolate";
import { number } from "localization";

const arcTween = (newAngle, arcGenerator) => d => {
  const customInterpolate = interpolate(d.endAngle, newAngle);
  return t => {
    d.endAngle = customInterpolate(t);
    return arcGenerator(d);
  };
};
class CircularBar extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
    this.foreground = null;
    this.arcGenerator = null;
  }
  componentDidMount() {
    const node = this.ref.current;

    const initialValue = 0;
    const svgWidth = 140;
    const svgHeight = svgWidth;
    const arcWidth = 12;
    const arcOuterRadius = svgWidth / 2;
    const arcInnerRadius = svgWidth / 2 - arcWidth;

    const tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

    const svg = select(node)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("filter", "drop-shadow( 0 2px 4px rgba(0, 0, 0, 0.5))");

    const arcGenerator = arc()
      .innerRadius(arcInnerRadius)
      .outerRadius(arcOuterRadius)
      .startAngle(0)
      .cornerRadius(5);

    const g = svg
      .append("g")
      .attr("class", "outer-radius-group")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight / 2})`);

    const foreground = g
      .append("path")
      .datum({ endAngle: (initialValue / 100) * tau })
      .style("fill", "#ecc417")
      .attr("d", arcGenerator);

    this.foreground = foreground;
    this.arcGenerator = arcGenerator;

    this.barTransition(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.barTransition(nextProps);
  }
  barTransition = props => {
    const { foreground, arcGenerator } = this;
    const { value } = props;

    const tau = 2 * Math.PI;

    foreground
      .transition()
      .duration(750)
      .attrTween("d", arcTween((value * tau) / 100, arcGenerator));
  };

  render() {
    const { value } = this.props;

    const style = {
      position: "absolute",
      fontSize: "34px",
      fontWeight: "bold"
    };

    return (
      <div ref={this.ref} className="circular-progress-bar">
        <span style={style}>{number(parseInt(value, 10))}%</span>
      </div>
    );
  }
}
export default CircularBar;
