import React from "react";
import { connect } from "react-redux";
import { scaleLinear } from "d3-scale";
import FrontBar from "./front-bar";
import { commonLocalization, currency } from "localization";

class App extends React.Component {
  componentDidMount() {}
  render() {
    const {
      width,
      height,
      margin,
      data,
      selectedLanguage,
      onMouseMove
    } = this.props;
    const { budget, dollor } = commonLocalization[selectedLanguage];

    const barHeight = 37;

    const xScale = scaleLinear()
      .domain([0, data[0].budget])
      .range([0, width]);

    return (
      <svg
        width={width + margin.left + margin.right}
        height={height}
        style={{ filter: "drop-shadow( 0 2px 4px rgba(0, 0, 0, 0.5))" }}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g className="budget-bar-group">
            <rect x="0" y="0" width={width} height={barHeight} rx="4" ry="4" />
            <text x={width} y="0" dy="-12" dx="-110">
              {dollor} {currency(data[0].budget.toFixed(0))}
            </text>
            <text x={width} y="0" dy="-30" dx="-55">
              {`(${budget})`}
            </text>
          </g>
          <FrontBar
            {...{
              xScale,
              barHeight,
              data,
              onMouseMove
            }}
          />
        </g>
      </svg>
    );
  }
}

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(App);
