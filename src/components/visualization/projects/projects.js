import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Text, media } from "components/styled";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { commonLocalization, number } from "localization";

class Projects extends Component {
  constructor() {
    super();
    this.state = {};
  }

  fragment = (selectedroad, localization) => {
    if (selectedroad === "all") return null;

    return localization.stats;
  };
  toolip = (key, localization) => {
    const { selectedLanguage } = this.props;
    let projects = localization.projects;

    if (key === "total_projects" || key === "worth_of_projects") {
      projects = "";
    }

    if (selectedLanguage === "en") {
      return (
        <span>
          Click to view{" "}
          <strong style={{ textTransform: "uppercase" }}>
            {localization[key]} {projects}{" "}
          </strong>
        </span>
      );
    }
    return (
      <span>
        <strong>
          {localization[key]} {projects}{" "}
        </strong>
      </span>
    );
  };
  render() {
    const {
      data,
      selectedDropDown,
      selectedLanguage,
      selectedroad,
      total,
      navigateToProject
    } = this.props;

    const { status_wise: status } = data;

    const result = { total_projects: { count: total }, ...status };

    const localization = commonLocalization[selectedLanguage];

    return (
      <ProjectsWrap lang={selectedLanguage}>
        <Text.span light className="stats-label">
          {localization.stats}
          {selectedroad !== "all" && (
              <Fragment>
                &nbsp;for <strong>road {selectedroad}</strong>
              </Fragment>
          )}
        </Text.span>
        <div>
          {Object.keys(result).length &&
            Object.keys(result).map(key => (
              <ProjectsMain
                onClick={() => navigateToProject(key)}
                status={key}
                key={key}
                className="projects-block"
              >
                <div>
                  <div className="tooltip">
                    <div className="tooltip-arrow" />
                    {this.toolip(key, localization)}
                    {}
                  </div>
                  {selectedDropDown === "budget" && (
                    <small>
                      "$ "
                    </small>
                  )}
                  {selectedDropDown === "budget" ? (
                    <span>
                      <Text.span bold className="projects-value">
                        {result[key] && result[key].split(" ")[0]}
                      </Text.span>
                      <small>
                        {" "}
                        {result[key] ? result[key].split(" ")[1] : ""}
                      </small>
                    </span>
                  ) : (
                    <Text.span bold className="projects-value">
                      {number(result[key].count)}
                    </Text.span>
                  )}

                  <Text.span uppercase className="projects-title">
                    {localization[key]}
                  </Text.span>
                </div>
              </ProjectsMain>
            ))}
        </div>
      </ProjectsWrap>
    );
  }
}

export default withRouter(
  connect(state => ({
    selectedLanguage: state.localizationReducers.selectedLanguage
  }))(Projects)
);

const getStatusColor = (theme, type) => {
  switch (type) {
    case "implementation":
      return theme.sec.blue;

    case "not_started":
      return theme.dark.charcoalGrey;

    case "pipeline":
      return theme.sec.pink;

    case "completion":
      return theme.sec.green;

    default:
      return theme.dark.charcoalGrey;
  }
};

const ProjectsWrap = styled.div`
  .projects-title {
    display: block;
    font-size: "11px";
    margin-top: 3px;
  }
  .stats-label {
    font-size: "12px"
  }
  .projects-block {
    > div {
      float: left;
      position: relative;
      .tooltip {
        font-size: "12px";
        padding: 10px 15px;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        top: 50px;
        left: -73px;
        width: 174px;
        white-space: initial;
      }
      &:hover .tooltip {
        opacity: 1;
        visibility: visible;
      }
    }
    &:first-child > div {
      .tooltip {
        left: -60px;
      }
    }
    &.total {
      white-space: nowrap;

      .projects-value {
        font-size: ${props => props.theme.fontSize.hg}px;
        font-weight: 700;
        margin-bottom: 12px;
        &:before {
          display: none;
        }
      }
    }
  }
`;

const ProjectsMain = styled.div`
  cursor: pointer;
  margin-bottom: 30px;
  /* padding-left: 10px; */
  float: left;
  width: 46%;
  @media all and (min-width: 992px) and (max-width: 1199px) {
    clear: none!important;
    padding-right: 10px;
    width: 23%!important;
    &:nth-child(2) {
      clear: both!important;
    }
    &:nth-child(3) {
      width: 28%!important;
    }
  }
  &:nth-child(even) {
  margin-bottom: 20px;
  float: left;
  &:nth-child(2) {
    clear: both;
  }
  &:last-child {
    margin-right: 0;
  }
  ${media.tabletWide`
    &:nth-child(even) {
    clear: both;
    float: left;
  }
  }
  `};

  &:first-child {
    margin-top: 30px;
    white-space: nowrap;
    .projects-value {
      font-size: ${props => props.theme.fontSize.hg}px;
      &:before {
        display: none;
      }
    }
  }

  .projects-value {
    font-size: 20px;
    position: relative;
    &:before {
      background-color: ${props => getStatusColor(props.theme, props.status)};
      border-radius: 50%;
      box-shadow: 0 2px 4px 0 #0e1724;
      content: '';
      display: none;
      height: 7px;
      left: -8px
      position: absolute;
      width: 7px;
      top: 4px;
    }
  }
`;
