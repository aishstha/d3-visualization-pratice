import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Heading, Text } from "components/styled";
import LineChart from "../../visualization/lineChart/lineChart";
import { dashboardLocalization, helpTextLocalization } from "localization";
import { number } from "localization";
import styled from "styled-components";

class ProjectTimelinessChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineChartData: [],
      parentWidth: 0
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener("resize", this.fitParentContainer);
  }

  getFYData(stats, year, road) {
    const initialFY = Array.from({ length: 12 }, (x, i) => ({
      year: i + 4 > 12 ? i - 8 : i + 4,
      count: 0
    }));

    if (!stats) {
      return initialFY;
    }

    return initialFY.map(data => {
      const selectedFYData = stats;
      if (selectedFYData) {
        const monthData = selectedFYData[("0" + data.year).slice(-2)];
        let countObj = 0;
        if (road && road !== "all" && monthData) {
          countObj = monthData.road_wise[road] ? monthData.road_wise[road] : {};
        } else if (monthData) {
          countObj = monthData.overall ? monthData.overall : {};
        }
        return {
          year: data.year,
          count: countObj.total ? countObj.total.count : 0
        };
      }
      return data;
    });
  }

  formatData(data) {
    const { selectedroad } = this.props;
    const selectedFY = "2074/75";

    return this.getFYData(data.month_wise, selectedFY, selectedroad);
  }

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
    const { selectedroad } = this.props;
    const { selectedLanguage, data } = this.props;
    const { lineChartTitle } = dashboardLocalization[selectedLanguage];
    const { lineChart: lineChartHelpText } = helpTextLocalization[
      selectedLanguage
    ];
    const lineChartData = this.formatData(data);

    return (
      <ChartsBlock className="charts-block" lang={selectedLanguage}>
        <Heading.h2 uppercase style={{ marginBottom: 0 }}>
          <Text.span className="help-text">
            <Text.span className="help-text__icon">icon</Text.span>
            <Text.span className="help-text__content tooltip">
              <Text.span className="tooltip-arrow">arrow</Text.span>
              {lineChartHelpText}
            </Text.span>
          </Text.span>
          <Text.span>
            {lineChartTitle}
            {this.getFragment(selectedroad, selectedLanguage)}
          </Text.span>
        </Heading.h2>
        <div className="chart">
          <div
            ref={this.ref}
            className="lineChart"
            style={{ position: "relative" }}
          >
            <div id="tooltip-line" />
            <LineChart
              parentWidth={this.state.parentWidth}
              data={lineChartData}
            />
          </div>
        </div>
      </ChartsBlock>
    );
  }
}

const mapStateToProps = state => ({
  data: state.projectsStatsReducers.data.data,
  selectedroad: state.projectsStatsReducers.selectedroad,
  selectedLanguage: state.localizationReducers.selectedLanguage
});

const ChartsBlock = styled.div`
  h2 {
    > span:last-child {
      font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
      opacity: 0.7;
    }
  }
`;

export default connect(mapStateToProps)(ProjectTimelinessChart);
