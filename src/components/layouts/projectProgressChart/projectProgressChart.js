import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { CircularProgressBar } from '../../visualization';
import { Heading, Text } from 'components/styled';
import styled from 'styled-components';
import { commonLocalization, number, helpTextLocalization } from 'localization';

class ProjectProgressChart extends Component {
  state = {};
  getFragment(selectedroad, selectedLanguage) {
    if (selectedroad === 'all') return null;

    if (selectedLanguage === 'en') {
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
    const { selectedroad, overall, road_wise, selectedLanguage } = this.props;
    const {
      circularProgressBarTitle,
      physicalProgress,
      financialProgress
    } = commonLocalization[selectedLanguage];
    const {
      circularProgressBar: circularProgressBarHelpText
    } = helpTextLocalization[selectedLanguage];

    let physicalValue = 0;
    let financialValue = 0;

    const data = selectedroad === 'all' ? overall : road_wise[selectedroad];

    if (data && Object.keys(data).length) {
      physicalValue = data.total.progress.physical;
      financialValue = data.total.progress.financial;
    }

    return (
      <ChartsBlock className="charts-block" lang={selectedLanguage}>
        <Heading.h2 uppercase>
          <Text.span className="help-text">
            <Text.span className="help-text__icon">icon</Text.span>
            <Text.span className="help-text__content tooltip">
              <Text.span className="tooltip-arrow">arrow</Text.span>
              {circularProgressBarHelpText}
            </Text.span>
          </Text.span>
          <Text.span>
            {selectedLanguage === 'en' && `${circularProgressBarTitle} `}
            {this.getFragment(selectedroad, selectedLanguage)}
            {selectedLanguage === 'np' && ` ${circularProgressBarTitle}`}
          </Text.span>
        </Heading.h2>
        <ProjectsCircular>
          <div>
            <CircularProgressBar value={physicalValue} />
            <Text.span lighter uppercase>
              {physicalProgress}
            </Text.span>
          </div>
          <div>
            <CircularProgressBar value={financialValue} />
            <Text.span lighter uppercase>
              {financialProgress}
            </Text.span>
          </div>
        </ProjectsCircular>
      </ChartsBlock>
    );
  }
}

const mapStateToProps = state => ({
  selectedroad: state.projectsStatsReducers.selectedroad,
  overall: state.projectsStatsReducers.data.data.overall,
  road_wise: state.projectsStatsReducers.data.data.road_wise,
  selectedLanguage: state.localizationReducers.selectedLanguage
});

const ProjectsCircular = styled.div`
  display: flex;
  justify-content: space-around;
  > div {
    text-align: center;
    > div {
      margin-bottom: 10px;
    }
  }
`;

const ChartsBlock = styled.div`
  h2 {
    > span:last-child {
      font-size: ${props => (props.lang === 'en' ? '12px' : '15px')};
      opacity: 0.7;
    }
  }
  div span {
    font-size: ${props => (props.lang === 'en' ? '12px' : '15px')};
  }
`;

export default connect(mapStateToProps)(ProjectProgressChart);
