import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PieChart from "../../visualization/pieChart/pieChart";
import { Projects } from "../../visualization";
import { Heading, Text, media } from "components/styled";
import {
  projectsLocalization,
  helpTextLocalization,
  number
} from "localization";

const colors = ["#408a4b", "#344f29", "#c54357", "#3AA84B"];
class ProjectStatusChart extends PureComponent {
  getProjectsStats = stats => {
    const newData = {};
    const { status, total } = stats.overall;

    newData["total_projects"] = total.count;
    Object.keys(status).map((val, index) => {
      newData[val] = status[val].count;
      return null;
    });

    return newData;
  };

  getPieData(d) {
    let data = JSON.parse(JSON.stringify(d));
    Object.keys(data).map(key => {
      data[key] = data[key].count;
      return null;
    });
    const pieData = data;
    return Object.values(pieData);
  }

  projectStatusTitle() {
    const { selectedLanguage } = this.props;
    const roadValue = number(this.props.roadValue);

    const { projectStatus } = projectsLocalization[selectedLanguage];

    if (roadValue === "All") {
      return <Text.span>{projectStatus}</Text.span>;
    }

    if (selectedLanguage === "en") {
      return (
        <Text.span>
          {projectStatus} for <strong>road {roadValue}</strong>
        </Text.span>
      );
    }
    return (
      <Text.span>
        <strong>वार्ड {roadValue}</strong> का लागि {projectStatus}
      </Text.span>
    );
  }
  render() {
    const { selectedLanguage, stats, total, navigateToProject } = this.props;

    const { projectStatus: projectStatusHelpText } = helpTextLocalization[
      selectedLanguage
    ];

    return (
      <ChartsBlock
        className="charts-block"
        style={{ paddingTop: 64, paddingBottom: 30 }}
        lang={selectedLanguage}
      >
        <Heading.h2 uppercase style={{ marginBottom: 0 }}>
          <Text.span className="help-text">
            <Text.span className="help-text__icon">icon</Text.span>
            <Text.span className="help-text__content tooltip">
              <Text.span className="tooltip-arrow">arrow</Text.span>
              {projectStatusHelpText}
            </Text.span>
          </Text.span>
          {this.projectStatusTitle()}
        </Heading.h2>
        <PieChartMain>
          <StatsWrapper>
            <Projects
              data={stats}
              total={total}
              navigateToProject={navigateToProject}
            />
          </StatsWrapper>
          <div className="pie-wrapper">
            <PieChart
              data={this.getPieData(stats.status_wise)}
              radius={100}
              hole={0}
              colors={colors}
              labels
              percent
              strokeWidth={0}
              stroke="#fff"
            />
          </div>
        </PieChartMain>
      </ChartsBlock>
    );
  }
}

const StatsWrapper = styled.div`
  /* width: 240px; */
  margin-bottom: 14px;
  ${media.tabletSmall`margin:0`};
  .stats-label {
    display: none;
  }
  .projects-block:first-child {
    padding: 0;
  }
  .projects-value {
    font-size: 30px;
  }
`;

const PieChartMain = styled.div`
  @media all and (min-width: 500px) and (max-width: 991px),
    (min-width: 1200px) {
    align-items: flex-end;
    display: flex;
    > div {
      width: 50%;
    }
    /* > div:first-child {
      margin-right: 20px;
    } */
    /* justify-content: space-between; */
  }
  .projects-block {
    margin-bottom: 12px;
    padding-left: 10px;
    width: 50% !important;
    /* width: 40%; */
    &:first-child {
      margin-top: 4px;
    }
    ${media.tabletWide`
    &:nth-child(2n+1) {
      padding: 0;
    }
    `};
  }
  .projects-value:before {
    display: block;
  }
  .pie-wrapper {
    margin-left: 6px;
    width: 40%;
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
  .help-text__content {
    font-size: ${props => (props.lang === "en" ? "11px" : "13px")};
  }
`;

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(ProjectStatusChart);
