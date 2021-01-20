import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Page,
  ContainerLeft,
  ContainerRight,
  ProjectLineChart,
  ProjectBudgetExpChart,
  ProjectProgressChart,
  ProjectContractorTypeChart,
  Loader
} from "components/layouts";
import { Heading, Text, media } from "components/styled";
import {
  Map,
  DashboardProjects,
  Legend,
  BarChart
} from "../../components/visualization";
import { setFilters } from "details/actions";
import { Transition } from "react-transition-group";
import { images } from "config/index";
import DashboardService from "api/dashboardService";

import {
  getProjectsStatsSuccess
} from "details/projects-stats/actions";
import {
  dashboardLocalization,
  formattedCurrency,
  helpTextLocalization,
  number
} from "localization";

const municipalities = [{name: "road", title_en: "Road City", title_ne: "", no_of_roads: 19}];

const fiscalYear = "2075-76";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDropDown: "count",
      isOpen: false
    };

    this.municipality = props.municipality;
  }

  componentDidMount() {
    const { dispatchProjectsStats } = this.props;

    dispatchProjectsStats(
      {
        "fiscal-year": fiscalYear,
        road: "",
        status: "",
        "budget-range": "",
        page: 1,
        search: "",
        sort_by: "",
        order_by: ""
      },
      this.municipality
    );
  }

  getMapData = data => {
    const { road_wise } = data;
    if (!Object.keys(data).length) return null;

    let newData = [];
    if (this.state.selectedDropDown === "budget") {
      newData = Object.keys(road_wise).map(key => ({
        road: key,
        value: road_wise[key].total.budget.value
      }));
    } else {
      newData = Object.keys(road_wise).map(key => ({
        road: key,
        value: road_wise[key].total.count
      }));
    }

    return newData;
  };
  getProjectsData = (data, type) => {
    const { overall, road_wise } = data;
    const { selectedroad } = this.props;
    const initial = {
      total_projects: 0,
      worth_of_projects: 0,
      completion: 0,
      implementation: 0,
      pipeline: 0
    };

    const data2 = selectedroad === "all" ? overall : road_wise[selectedroad];
    if (type === "budget") {
      initial.worth_of_projects =
        data2 && Object.keys(data2).length
          ? formattedCurrency(data2.total.budget.value)
          : 0;
      delete initial.total_projects;
    } else {
      initial.total_projects =
        data2 && Object.keys(data2).length ? data2.total.count : 0;
      delete initial.worth_of_projects;
    }

    if (!data2 || !Object.keys(data2).length) return initial;

    Object.keys(data2.status).forEach(key => {
      if (type === "budget") {
        initial[key] = formattedCurrency(data2.status[key].budget.value);
      } else {
        initial[key] = data2.status[key].count;
      }
    });

    return initial;
  };
  getBarData = data => {
    const { overall, road_wise } = data;
    let newData = [];

    if (!Object.keys(overall).length) return [];

    if (this.state.selectedDropDown === "budget") {
      newData = Object.keys(road_wise).map(key => ({
        road: key,
        value: road_wise[key].total.budget.value,
        formatted: road_wise[key].total.budget.formatted
      }));
    } else {
      newData = Object.keys(road_wise).map(key => ({
        road: key,
        value: road_wise[key].total.count
      }));
    }

    return newData;
  };

  getLegendData(data, totalroads) {
    if (!data.overall.total) return ["", "", "", ""];

    if (this.state.selectedDropDown === "budget") {
      const highest = Math.max(
        ...Object.keys(data.road_wise)
          .filter(d => d <= totalroads)
          .map(key => data.road_wise[key].total.budget.value)
      );

      const value = Math.floor(highest / 4);
      if (value === 0) return ["", "", "", ""];
      const x = formattedCurrency(value);
      const x2 = formattedCurrency(value * 2);
      const x3 = formattedCurrency(value * 3);

      return [`<${x}`, `${x}-${x2}`, `${x2}-${x3}`, `>${x3}`];
    }

    const highest = Math.max(
      ...Object.keys(data.road_wise)
        .filter(d => d <= totalroads)
        .map(key => data.road_wise[key].total.count)
    );

    const x = number(Math.floor(highest * 0.25));
    const x2 = number(Math.floor(highest * 0.5));
    const x3 = number(Math.floor(highest * 0.75));

    return [`<${x}`, `${x}-${x2}`, `${x2}-${x3}`, `>${x3}`];
  }

  handleDropdownMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleProjects = value => {
    this.setState({
      selectedDropDown: value,
      isOpen: false
    });
  };

  handleClickOutside = () => {
    if (this.state.isroadOpen) {
      this.setState({
        isroadOpen: false
      });
    }
  };

  getTotalroads = () => {
    const { municipality  } = this.props;
    const currentMunicipality = municipalities.find(
      val => val.name === municipality.title_en
    );
    return currentMunicipality.no_of_roads;
  };

  render() {
    const {
      data: { data: projectsStats },
      fetching
    } = this.props.projectsStats;

    const {
      barChartLabel,
      title: {
        label: projectDistributionTitle,
        projects: projectDistributionProjects,
        budget: projectDistributionBudget
      }
    } = dashboardLocalization.en;
    const {
      map: mapHelpText,
      barChart: barChartHelpText
    } = helpTextLocalization.en;

    const totalroads = this.getTotalroads();

    const mapData = this.getMapData(projectsStats);

    const projectsData = this.getProjectsData(
      projectsStats,
      this.state.selectedDropDown
    );
    const barData = this.getBarData(projectsStats);

    const legendData = this.getLegendData(projectsStats, totalroads);

    const selectedLanguage = "en";
    return (
      <React.Fragment>
        {fetching && <Loader />}
        <Page lang={selectedLanguage}>
          <ContainerLeft>
            <LeftSection className="left-section" lang={selectedLanguage}>
              <Heading.h2 uppercase className="project-distribution">
                {projectDistributionTitle}
                <div className="selection-wrap">
                  <Dropdown>
                    <DropdownButton
                      isOpen={this.state.isOpen}
                      onClick={this.handleDropdownMenu}
                    >
                      <Title
                        className="title"
                        isOpen={this.state.isOpen}
                        lang={selectedLanguage}
                      >
                        {this.state.selectedDropDown === "count"
                          ? projectDistributionProjects
                          : projectDistributionBudget}
                      </Title>
                      <DropdownIcon isOpen={this.state.isOpen} />
                    </DropdownButton>

                    <Transition
                      in={this.state.isOpen}
                      timeout={100}
                      mountOnEnter
                    >
                      {state => (
                        <DropdownMenu
                          style={{
                            ...transitionStyles[state]
                          }}
                        >
                          <ul className="dropdown-list">
                            <li onClick={() => this.handleProjects("count")}>
                              {projectDistributionProjects}
                            </li>
                            <li onClick={() => this.handleProjects("budget")}>
                              {projectDistributionBudget}
                            </li>
                          </ul>
                        </DropdownMenu>
                      )}
                    </Transition>
                  </Dropdown>
                </div>
                {this.state.selectedDropDown !== "count" && (
                  <Text.span style={{ textTransform: "none", marginLeft: 9 }}>
                    (in $)
                  </Text.span>
                )}
              </Heading.h2>
              <Heading.h3>
                <Text.span className="help-text">
                  <Text.span className="help-text__icon">icon</Text.span>
                  <Text.span className="help-text__content tooltip">
                    <Text.span className="tooltip-arrow">arrow</Text.span>
                    {this.state.selectedDropDown === "count"
                      ? mapHelpText.projects
                      : mapHelpText.budget}
                  </Text.span>
                </Text.span>
                <Text.span>{`(${mapHelpText.title})`}</Text.span>
              </Heading.h3>
              <div className="upper-chart-section">
                <div className="map-section">
                  {mapData && (
                    <Map
                      data={mapData}
                      selectedDropDown={this.state.selectedDropDown}
                      municipality={this.municipality}
                    />
                  )}
                  <Legend legendData={legendData} />
                </div>
                <div className="project-section">
                  {projectsData && (
                    <DashboardProjects
                      selectedDropDown={this.state.selectedDropDown}
                      data={projectsData}
                      selectedroad={this.props.selectedroad}
                    />
                  )}
                </div>
              </div>
              <BarChartWrap>
                <Heading.h3>
                  <Text.span className="help-text">
                    <Text.span className="help-text__icon">icon</Text.span>
                    <Text.span className="help-text__content tooltip">
                      <Text.span className="tooltip-arrow">arrow</Text.span>
                      {this.state.selectedDropDown === "count"
                        ? barChartHelpText.projects
                        : barChartHelpText.budget}
                    </Text.span>
                  </Text.span>
                  <Text.span>{`(${barChartHelpText.title})`}</Text.span>
                </Heading.h3>
                <div className="bar-chart-label vertical">
                  <Text.span>
                    <Text.span light uppercase>
                      {this.state.selectedDropDown === "budget"
                        ? projectDistributionBudget
                        : projectDistributionProjects}
                    </Text.span>
                  </Text.span>
                </div>
                {barData.length && (
                  <BarChart
                    data={barData}
                    selectedDropDown={this.state.selectedDropDown}
                    totalroads={totalroads}
                  />
                )}
                <div className="bar-chart-label">
                  <Text.span light uppercase>
                    {barChartLabel}
                  </Text.span>
                </div>
              </BarChartWrap>
            </LeftSection>
          </ContainerLeft>
          <ContainerRight>
            <ContainerInner lang={selectedLanguage} ref={this.rightSectionRef}>
              <ProjectLineChart />
              <ProjectBudgetExpChart />
              <ProjectProgressChart />
              <ProjectContractorTypeChart />
            </ContainerInner>
          </ContainerRight>
        </Page>
      </React.Fragment>
    );
  }
}

const LeftSection = styled.div`
  .project-distribution {
    color: rgba(255, 255, 255, 0.7);
    font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
    line-height: 24px;
    margin: 0 0 20px;
    ${media.tabletWide`margin-top: 60px;`};
  }

  .selection-wrap {
    margin-left: ${props => (props.lang === "en" ? "5px" : "0")};
    margin-right: ${props => (props.lang === "en" ? "0" : "5px")};
  }

  .title {
    font-size: ${props => (props.lang === "en" ? "12px" : "15px")};
  }

  h3 {
    margin-bottom: 20px;
    > span:last-child {
      font-size: ${props => (props.lang === "en" ? "11px" : "14px")};
      opacity: 0.5;
    }
  }

  .stats-label {
    display: block;
    margin-bottom: -20px;
    /* ${media.tabletWide`margin-left:10px`}; */
  }

  .map-section {
    position: relative;
    @media all and (min-width: 600px) and (max-width: 991px), (min-width: 1200px) {
    width: 60%;
    }
  }

  .project-section {
    margin-top: 30px;
    ${media.tabletSmall`width:40%`};
    @media all and (min-width: 992px) and (max-width: 1199px) {
      margin-top: -40px;
      width: 100%;
    }
    @media all and (max-width: 768px) {
      > div {
        margin-bottom: 20px;
        width: 100% !important;
      }
    }
  }

  .upper-chart-section {
    @media all and (min-width: 600px) and (max-width: 991px), (min-width: 1200px) {
      display: flex;
    }
  }

  .bar-chart-label {
    /* width: ${props => `${props.width - 20}px`}; */
    margin-top: 10px;
    margin-left: 42px;
    text-align: center;
    fill: #fff;
    span {
      font-size: ${props => (props.lang === "en" ? "12px" : "14px")};
    }
    > span {
      display: block;
      position: relative;
      &:before {
        background-color: ${props => props.theme.dark.slateGrey};
        content: '';
        height: 1px;
        position: absolute;
        bottom: 7px;
        left: 0;
        width: 45%;
      }
      &:after {
        background-color: ${props => props.theme.dark.slateGrey};
        content: '';
        height: 1px;
        position: absolute;
        bottom: 7px;
        right: 0;
        width: 45%;
      }
    }
    &.vertical {
      transform: rotate(-90deg);
      position: absolute;
      left: -68px;
      top: 110px;xw
      width: 150px;
      margin: 0;
      /* width: initial; */
      > span {
        &:before {
          width: 30%;
        }
        &:after {
          width: 30%;
        }
        > span {
          background: #0e1724;
          position: relative;
          z-index: 1;
          padding-left: 4px;
          padding-right: 4px;
        }
      }
    }
  }
  .help-text__content {
    font-size: ${props => (props.lang === "en" ? "11px" : "13px")};
  }
`;

const Dropdown = styled.span`
  cursor: pointer;
  position: relative;
  .filter-label {
    color: ${props => props.theme.primary.white};
    cursor: pointer;
    display: block;
    font-size: ${props => props.theme.fontSize.sm}px;
    margin: 11px 0;
    padding: 0 11px 0 21px;
    position: relative;
    text-transform: uppercase;
    &:before {
      background: url(${images.icons.sprite}) no-repeat -55px -38px;
      content: "";
      height: 14px;
      left: 0;
      position: absolute;
      top: 13px;
      width: 16px;
    }
    &:after {
      border-top: 4px solid ${props => props.theme.dark.slateGrey};
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      content: "";
      right: -1px;
      position: absolute;
      top: 18px;
    }
  }
  .dropdown-list {
    background: ${props => props.theme.primary.darkGrey};
    padding: 10px;
    border-radius: 4px;
    li {
      cursor: pointer;
      & + li {
        border-top: 1px solid ${props => props.theme.dark.slateGrey};
        margin-top: 5px;
        padding-top: 5px;
      }
    }
  }
`;

const DropdownMenu = styled.div`
  padding-top: 6px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  min-width: 184px;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.3s ease-in-out;
`;

const DropdownButton = styled.div`
  align-items: center;
  display: flex;
`;

const transitionStyles = {
  entered: {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)"
  }
};

const Title = styled.span`
  background: transparent;
  border: 0;
  color: ${props => props.theme.primary.white};
  display: block;
  font: ${props => props.theme.fontWeight.bold}
    ${props => props.theme.fontSize.sm}px
    ${props => props.theme.fontFamily.sansSerif};
  padding: ${props =>
    props.lang === "en" ? "7px 8px 7px 10px" : "4px 8px 4px 10px"};
  text-transform: uppercase;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const DropdownIcon = styled.span`
  border-color: ${props =>
    props.isOpen
      ? "transparent transparent #5D636D"
      : "#5D636D transparent transparent;"};
  border-width: ${props => (props.isOpen ? "0 4px 4px" : "4px 4px 0")};
  border-style: solid;
  display: inline-block;
  margin-right: 10px;
  vertical-align: middle;
`;

const BarChartWrap = styled.div`
  clear: both;
  width: 100%;
  ${media.desktop`width: 80%;`};
  position: relative;
`;

const ContainerInner = styled.div`
  .help-text__content {
    font-size: ${props => (props.lang === "en" ? "11px" : "13px")};
  }
  .left-axis-group,
  .bottom-axis-group {
    text {
      font-size: ${props => (props.lang === "en" ? "12px" : "13px")};
    }
  }
`;

const mapStateToProps = state => ({
  projectsStats: state.projectsStatsReducers,
  selectedroad: state.projectsStatsReducers.selectedroad,
  filters: state.details.filters
});

const mapDispatchToProps = dispatch => ({
  dispatchProjectsStats: (filters, municipality) => {
    dispatch(setFilters(filters));
    DashboardService
      .getProjectsStatsFiltered(
        { "fiscal-year": filters["fiscal-year"] },
        municipality.title_en
      )
      .then(response => {
        dispatch(getProjectsStatsSuccess(response));
      });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
