import React from "react";
import { connect } from "react-redux";
import { select, mouse } from "d3-selection";
import { transition } from "d3-transition";
import { scaleLinear } from "d3-scale";
import { commonLocalization, currency } from "localization";

class ExpenditureBar extends React.Component {
  constructor() {
    super();
    this.node = React.createRef();
  }
  componentDidMount() {
    this.init(this.props);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.init(nextProps);
  }
  init(props) {
    const { xScale, data, barHeight, selectedLanguage } = props;
    const { node } = this;
    const self = this;
    const t = transition().duration(800);
    const barMarkerWidth = 2;
    const barMarkerHeight = barHeight + 15;

    const dxScale = scaleLinear()
      .domain([0, data[0].budget])
      .range([0, -80]);

    // prepare the field
    const bar = select(node)
      .selectAll(".bar")
      .data(data);

    const barMarker = select(node)
      .selectAll(".bar-marker")
      .data(data);

    const amount = select(node)
      .selectAll(".amount")
      .data(data);

    const amountLabel = select(node)
      .selectAll(".amount-label")
      .data(data);

    // update data
    bar.transition(t).attr("width", d => xScale(d.expenditure));

    barMarker
      .transition(t)
      .attr("x", d => xScale(d.expenditure) - barMarkerWidth);

    amount
      .transition(t)
      .attr("x", d => xScale(d.expenditure))
      .attr("dx", d => dxScale(d.expenditure))
      .text(
        `${commonLocalization[selectedLanguage].dollor} ${currency(
          data[0].expenditure.toFixed(0)
        )}`
      );

    amountLabel
      .transition(t)
      .attr("x", d => xScale(d.expenditure))
      .attr("dx", d => dxScale(d.expenditure))
      .text(`(${commonLocalization[selectedLanguage].expenditure})`);

    // add rect and text to svg (invoke only on first render)
    bar
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", 0)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", d => xScale(d.expenditure))
      .attr("height", barHeight)
      .on("mousemove", (d, index, nodes) => {
        const x = mouse(nodes[index])[0];
        self.props.onMouseMove(x);
      })
      .on("mouseleave", () => {
        self.props.onMouseMove(0);
      });

    barMarker
      .enter()
      .append("rect")
      .attr("class", "bar-marker")
      .attr("x", d => xScale(d.expenditure))
      .attr("y", -(barMarkerHeight - barHeight) / 2)
      .attr("width", barMarkerWidth)
      .attr("height", barMarkerHeight);

    amount
      .enter()
      .append("text")
      .attr("class", "amount")
      .attr("x", d => xScale(d.expenditure))
      .attr("y", barHeight)
      .attr("dx", d => -dxScale(d.expenditure))
      .attr("dy", 24);

    amountLabel
      .enter()
      .append("text")
      .attr("class", "amount-label")
      .attr("x", d => xScale(d.expenditure))
      .attr("y", barHeight)
      .attr("dx", 0)
      .attr("dy", 41);
  }
  render() {
    return (
      <g
        ref={node => {
          this.node = node;
        }}
        className="expenditure-bar-group"
      />
    );
  }
}

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(ExpenditureBar);
