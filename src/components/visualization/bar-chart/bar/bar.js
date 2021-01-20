import React from "react";
import { select, selectAll } from "d3-selection";
import { connect } from "react-redux";
import { setSelectedroad } from "details/projects-stats/actions";
import { transition } from "d3-transition";
import isEqual from "lodash.isequal";
import { colors } from "../../../../utils/colors";
import { withRouter } from "react-router-dom";

let debounce;


class Bar extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    // add a tooltip div
    const elem = document.createElement("div");
    elem.id = "tooltip-dashboard-barchart";
    document.body.appendChild(elem);

    this.init();
  }
  componentDidUpdate(prevProps) {
    const { barData, width } = prevProps;

    // handle project distribution across roads dropdown.
    if (!isEqual(barData, this.props.barData)) {
      this.barTransition();
    }
    // handle window resize
    if (width !== this.props.width) {
      this.barResponsive();
    }
  }
  barTransition() {
    const { yScale, height, barData } = this.props;

    const t = transition().duration(800);

    selectAll(".front-bar")
      .data(barData)
      .transition(t)
      .attr("y", d => yScale(d.value))
      .attr("height", d => height - yScale(d.value));
  }
  barResponsive() {
    const { barData, height, xScale, yScale } = this.props;

    selectAll(".front-bar")
      .data(barData)
      .attr("x", d => xScale(d.road))
      .attr("y", d => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.value));
  }
  init() {
    const { xScale, initialBarData, height } = this.props;

    selectAll(".front-bar")
      .data(initialBarData)
      .attr("x", d => xScale(d.road))
      .attr("y", height)
      .attr("width", xScale.bandwidth())
      .attr("height", 0);

    this.barTransition();
  }
  onMouseEnter = (e, datum) => {
    const { xScale, yScale, height } = this.props;
    select(e.target)
      .style("opacity", "0.6")
      .style("cursor", "pointer");
    const tooltipData = {
      left: xScale(datum.road),
      bottom: height - yScale(datum.value),
      data: datum
    };
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      this.props.dispatchSelectedroad(datum.road);
    }, 500);

    this.props.onMouseEnter(tooltipData);
  };
  onMouseLeave = e => {
    select(e.target).style("opacity", "1");
    const tooltipData = {
      left: 0,
      bottom: 0,
      data: ""
    };

    clearTimeout(debounce);
    debounce = setTimeout(() => {
      this.props.dispatchSelectedroad("all");
    }, 500);

    this.props.onMouseEnter(tooltipData);
  };
  render() {
    const { initialBarData, xScale, height, barData } = this.props;

    const backgroundBar = initialBarData.map(datum => (
      <rect
        key={datum.road}
        x={xScale(datum.road)}
        y="0"
        rx="2"
        ry="2"
        height={height}
        width={xScale.bandwidth()}
        fill={colors.primary.pissYellow}
        opacity="0.1"
      />
    ));

    const frontBar = barData.map(datum => (
      <rect
        key={datum.road}
        className="front-bar"
        fill={colors.primary.pissYellow}
        rx="2"
        ry="2"
        onMouseEnter={e => {
          this.onMouseEnter(e, datum);
        }}
        onMouseLeave={e => {
          this.onMouseLeave(e);
        }}
      />
    ));

    return (
      <g className="bar-group">
        <g className="background-bar-group">{backgroundBar}</g>
        <g ref={this.ref} className="front-bar-group">
          {frontBar}
        </g>
      </g>
    );
  }
}

const mapStateToProps = state => ({
  fiscalYear: state.fiscalYearReducers.selectedFiscalYear
});

const mapDispatchToProps = dispatch => ({
  dispatchSelectedroad: selectedroad => dispatch(setSelectedroad(selectedroad))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Bar)
);
