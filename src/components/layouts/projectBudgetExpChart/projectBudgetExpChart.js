import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Heading, Text } from "components/styled";
import { ProgressBar } from "../../visualization";
import {
  commonLocalization,
  number,
  currency,
  helpTextLocalization
} from "localization";

const defaultData = [
  {
    budget: 0,
    expenditure: 0
  }
];

class ProjectBudgetExpChart extends Component {
  constructor() {
    super();
    this.state = {
      parentWidth: 0,
      mouseValue: 0
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener("resize", this.fitParentContainer);
  }

  getData = data => {
    if (!data || !Object.keys(data).length) return null;

    return [
      {
        budget: data.total.budget.value,
        expenditure: data.total.expenditure.value
      }
    ];
  };
  getFragment(selectedroad, selectedLanguage) {
    if (selectedroad === "all") return null;

    if (selectedLanguage === "en") {
      return (
        <Fragment>
          for <strong>road {number(selectedroad)}</strong>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <strong>वडा {number(selectedroad)}</strong> का लागि
      </Fragment>
    );
  }
  handleTooltipData = mouseValue => {
    this.setState({ mouseValue });
  };
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
  render() {
    const { parentWidth, mouseValue } = this.state;
    const margin = {
      top: 45,
      right: 0,
      bottom: 70,
      left: 0
    };
    const { selectedroad, overall, road_wise, selectedLanguage } = this.props;
    const { progressBarTitle, expenditure, dollor } = commonLocalization[
      selectedLanguage
    ];
    const { progressBar: progressBarHelpText } = helpTextLocalization[
      selectedLanguage
    ];

    let data = selectedroad === "all" ? overall : road_wise[selectedroad];

    data = this.getData(data) || defaultData;

    const height = 140;
    const width = parentWidth - margin.left - margin.right;

    const tooltipPosition = height - margin.top;

    return (
      <ChartsBlock
        className="charts-block"
        style={{ paddingBottom: 8 }}
        lang={selectedLanguage}
      >
        <Heading.h2 uppercase style={{ marginBottom: 0 }}>
          <Text.span className="help-text">
            <Text.span className="help-text__icon">icon</Text.span>
            <Text.span className="help-text__content tooltip">
              <Text.span className="tooltip-arrow">arrow</Text.span>
              {progressBarHelpText}
            </Text.span>
          </Text.span>
          <Text.span>
            {progressBarTitle}
            {this.getFragment(selectedroad, selectedLanguage)}
          </Text.span>
        </Heading.h2>
        <ChartSection
          innerRef={this.ref}
          mouseValue={mouseValue}
          tooltipPosition={tooltipPosition}
        >
          <div className="tooltip">
            <div className="tooltip-arrow bottom" />
            <div>
              <span>{dollor} </span>
              <span className="">
                <strong>{currency(data[0].expenditure.toFixed(0))}</strong>
              </span>
              <div className="">{`(${expenditure})`}</div>
            </div>
          </div>
          <ProgressBar
            {...{
              width,
              height,
              margin,
              data
            }}
            onMouseMove={this.handleTooltipData}
          />
        </ChartSection>
      </ChartsBlock>
    );
  }
}

const ChartsBlock = styled.div`
  h2 {
    font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
    > span:last-child {
      font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
      opacity: 0.7;
    }
  }
  text {
    font-size: ${props => (props.lang === "en" ? "12px" : "14px")};
  }
`;

const ChartSection = styled.div`
  font-size: 12px;
  position: relative;
  .tooltip {
    visibility: ${props => (props.mouseValue === 0 ? "hidden" : "visible")};
    position: absolute;
    left: ${props => `${props.mouseValue}px`};
    bottom: ${props => `${props.tooltipPosition + 15}px`};
    transform: translateX(-50%);
  }
  .budget-bar-group {
    rect {
      fill: #3b4555;
    }
    text {
      fill: #fff;
    }
    text:nth-of-type(2) {
      opacity: 0.5;
    }
  }
  .expenditure-bar-group {
    rect:first-of-type {
      fill: #ecc417;
    }
    rect:nth-of-type(2) {
      fill: #fff;
      opacity: 0.3;
    }
    text {
      fill: #fff;
    }
    text:nth-of-type(2) {
      opacity: 0.5;
    }
  }
`;

const mapStateToProps = state => ({
  selectedroad: state.projectsStatsReducers.selectedroad,
  overall: state.projectsStatsReducers.data.data.overall,
  road_wise: state.projectsStatsReducers.data.data.road_wise,
  selectedLanguage: state.localizationReducers.selectedLanguage
});
export default connect(mapStateToProps)(ProjectBudgetExpChart);
