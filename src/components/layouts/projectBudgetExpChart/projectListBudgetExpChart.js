import React, { Component } from "react";
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

class ProjectListBudgetExpChart extends Component {
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
    const dataWithExpenses = [
      {
        budget: 0,
        expenditure: 0
      }
    ];
    data.forEach(row => {
      dataWithExpenses[0].expenditure +=
        Number(row.agreement_amount_without_vat) *
        Number(row.financial_progress / 100);
      dataWithExpenses[0].budget += Number(row.agreement_amount_without_vat);
    });
    return dataWithExpenses;
  };

  getStats = stats => {
    return [
      {
        budget: stats.budget.value,
        expenditure: stats.expenditure.value
      }
    ];
  };

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
  projectListBudgetTitle() {
    const { selectedLanguage } = this.props;
    const { progressBarTitle } = commonLocalization[selectedLanguage];

    const roadValue = number(this.props.roadValue);

    if (roadValue === "All") {
      return <Text.span>{progressBarTitle}</Text.span>;
    }

    if (selectedLanguage === "en") {
      return (
        <Text.span>
          {progressBarTitle} for <strong>road {roadValue}</strong>
        </Text.span>
      );
    }
    return (
      <Text.span>
        <strong>वार्ड {roadValue}</strong> का लागि {progressBarTitle}
      </Text.span>
    );
  }

  render() {
    const { parentWidth, mouseValue } = this.state;
    const margin = {
      top: 45,
      right: 0,
      bottom: 70,
      left: 0
    };
    const { selectedLanguage, stats } = this.props;
    const { expenditure, dollor } = commonLocalization[selectedLanguage];

    const { progressBar: progressBarHelpText } = helpTextLocalization[
      selectedLanguage
    ];

    // const data = this.getData(projects) || defaultData;

    const height = 140;
    const width = parentWidth - margin.left - margin.right;
    const tooltipPosition = height - margin.top;

    const data = this.getStats(stats);

    return (
      <ChartsBlock
        className="charts-block"
        style={{ paddingBottom: 12 }}
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
          {this.projectListBudgetTitle()}
          {/* <Text.span>{progressBarTitle}</Text.span> */}
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
  .help-text__content {
    font-size: ${props => (props.lang === "en" ? "11px" : "13px")};
  }
`;

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(ProjectListBudgetExpChart);
