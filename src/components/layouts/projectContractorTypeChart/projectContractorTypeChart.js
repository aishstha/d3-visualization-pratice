import React, { Component, Fragment } from "react";
import { Heading, Text } from "components/styled";
import { DottedPlot } from "../../visualization";
import styled from "styled-components";
import { connect } from "react-redux";
import { getProjectsByContractorType } from "../../../details/filters";
import {
  dashboardLocalization,
  number,
  helpTextLocalization
} from "localization";

class ProjectContractorTypeChart extends Component {
  state = {};
  filterData(projectsByContractorType, road) {
    if (road === "all") {
      return projectsByContractorType;
    }
    const filteredData = {};
    Object.keys(projectsByContractorType).forEach(key => {
      filteredData[key] = projectsByContractorType[key].filter(
        d => d.roads && d.roads.includes(String(road))
      );
    });
    return filteredData;
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
  render() {
    const {
      projectsByContractorType,
      selectedroad,
      selectedLanguage,
      overall
    } = this.props;
    const types = this.filterData(projectsByContractorType, selectedroad);
    const { dotChartTitle } = dashboardLocalization[selectedLanguage];
    const { dotChart: dotChartHelpText } = helpTextLocalization[
      selectedLanguage
    ];

    if (!overall.contractor_type) {
      return null;
    }

    return (
      <ChartsBlock className="charts-block" lang={selectedLanguage}>
        <Heading.h2 uppercase>
          <Text.span className="help-text">
            <Text.span className="help-text__icon">icon</Text.span>
            <Text.span className="help-text__content tooltip">
              <Text.span className="tooltip-arrow">arrow</Text.span>
              {dotChartHelpText}
            </Text.span>
          </Text.span>
          <Text.span>
            {dotChartTitle}
            {this.getFragment(selectedroad, selectedLanguage)}
          </Text.span>
        </Heading.h2>
        <Wrapper>
          <div id="dot-tooltip" />
          <DottedPlot types={types} />
        </Wrapper>
      </ChartsBlock>
    );
  }
}

const Wrapper = styled.div`
  min-height: 173px;
`;

const ChartsBlock = styled.div`
  h2 {
    font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
    > span:last-child {
      font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
      opacity: 0.7;
    }
  }
`;

const mapStateToProps = state => ({
  projectsByContractorType: getProjectsByContractorType(
    state.details.projects
  ),
  // abc: state.details.projects,
  selectedroad: state.projectsStatsReducers.selectedroad,
  selectedLanguage: state.localizationReducers.selectedLanguage,
  overall: state.projectsStatsReducers.data.data.overall
});

export default connect(mapStateToProps)(ProjectContractorTypeChart);
