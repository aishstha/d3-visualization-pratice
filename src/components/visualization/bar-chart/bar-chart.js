import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { commonLocalization, formattedCurrency, number } from "localization";
import { scaleBand, scaleLinear } from "d3-scale";
import XYAxis from "./axis/xy-axis";
import Grid from "./grid/grid";
import Bar from "./bar/bar";

const getData = (totalroads, data) => {
  const initialBarData = [];
  const barData = [];

  for (let i = 1; i <= totalroads; i += 1) {
    // for bar transition, initial road value needs to be 0.
    initialBarData.push({
      road: i,
      value: 0
    });
    // check if data contains all roads from 1 to totalroads, if not then assign 0
    const x = data.find(d => i === parseInt(d.road, 10));
    if (x) {
      barData.push({
        road: parseInt(x.road, 10),
        value: x.value
        // formatted: x.formatted,
      });
    } else {
      barData.push({
        road: i,
        value: 0
      });
    }
  }
  return {
    barData,
    initialBarData
  };
};
class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      tooltipData: {
        left: 0,
        bottom: 0,
        data: {}
      },
      parentWidth: 0
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener("resize", this.fitParentContainer);
  }
  fitParentContainer = () => {
    const { parentWidth } = this.state;

    const currentParentWidth =
      this.ref.current && this.ref.current.getBoundingClientRect().width;

    const shouldResize = parentWidth !== currentParentWidth;
    if (shouldResize) {
      this.setState({
        parentWidth: currentParentWidth
      });
    }
  };
  handleTooltip = tooltipData => {
    this.setState({ tooltipData });
  };


  render() {
    const { data, selectedLanguage, selectedDropDown, totalroads } = this.props;
    const { tooltipData, parentWidth } = this.state;

    if (parentWidth === 0) {
      return <div ref={this.ref} />;
    }

    const { dollor, projects } = commonLocalization[selectedLanguage];

    // set the dimensions and margins of the graph
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 62
    };

    const { barData, initialBarData } = getData(totalroads, data);

    const width = parentWidth - margin.left - margin.right;
    const height = parentWidth * 0.3 - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(barData.map(d => d.road))
      .range([0, width])
      .padding(0.26);

    const yScale = scaleLinear()
      .domain([0, Math.max(...barData.map(d => d.value))])
      .range([height, 0])
      .nice();

    return (
      <BarWrapper
        innerRef={this.ref}
        className="lower-chart"
        margin={margin}
        xScale={xScale}
        tooltipData={tooltipData}
      >
        <div className="tooltip">
          <div className="tooltip-arrow bottom" />
          <div>
            <span className="total-count">
              {selectedDropDown === "budget"
                ? formattedCurrency(tooltipData.data.value)
                : number(tooltipData.data.value)}
            </span>
            <span className="title">
              {selectedDropDown === "budget" ? dollor : projects}
            </span>
           
          </div>
        </div>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height }} />
            <Grid {...{ xScale, yScale, width }} />
            <Bar
              {...{
                xScale,
                yScale,
                width,
                height,
                barData,
                initialBarData,
                onMouseEnter: this.handleTooltip
              }}
            />
          </g>
        </svg>
      </BarWrapper>
    );
  }
}

const BarWrapper = styled.div`
  position: relative;
  .tooltip {
    position: absolute;
    visibility: ${props =>
      props.tooltipData.left === 0 ? "hidden" : "visible"};
    left: ${props => `${props.tooltipData.left + props.margin.left}px`};
    bottom: ${props =>
      `${props.tooltipData.bottom + props.margin.bottom + 15}px`};
    transform: ${props =>
      `translateX(calc(-50% + ${props.xScale.bandwidth() * 0.5}px))`};
  }
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
  .left-axis text {
    fill: #ffffff;
    opacity: 0.2;
    font-size: 12px;
  }
  .bottom-axis text {
    fill: #ffffff;
    opacity: 0.5;
    font-size: 14px;
  }
`;

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(BarChart);
