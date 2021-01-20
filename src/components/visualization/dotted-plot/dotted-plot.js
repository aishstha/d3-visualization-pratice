import React, { Component } from "react";
import styled from "styled-components";
import { Text, media } from "components/styled";
import { connect } from "react-redux";
import { dashboardLocalization } from "localization";
import { withRouter } from "react-router-dom";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Transition from "react-transition-group/Transition";

function FadeAndSlideTransition({ children, duration, in: inProp }) {
  const defaultStyle = {
    transition: `${duration}ms ease-in`,
    transitionProperty: "opacity, transform"
  };
  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: "translateY(-10%)"
    },
    entered: {
      opacity: 1,
      transform: "translateY(0)"
    },
    exiting: {
      opacity: 1,
      transform: "translateY(-10%)"
    }
  };

  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        exit: duration
      }}
    >
      {status => {
        if (status === "exited") {
          return null;
        }

        const currentStyles = transitionStyles[status];

        return React.cloneElement(children, {
          style: Object.assign({}, defaultStyle, currentStyles)
        });
      }}
    </Transition>
  );
}

class DottedPlot extends Component {
  render() {
    const { selectedLanguage, selectedroad, overall, road_wise } = this.props;
    const localization = dashboardLocalization[selectedLanguage];

    let data = selectedroad === "all" ? overall : road_wise[selectedroad];

    return (
      <Container id="container" lang={selectedLanguage}>
        {Object.keys(data.contractor_type).length > 0 &&
          Object.keys(data.contractor_type).map((key, index) => (
            <div className="column" key={index}>
              <div className="dots">
                <TransitionGroup>
                  {[...Array(data.contractor_type[key].count)].map((e, i) => (
                    <FadeAndSlideTransition duration={10} key={i}>
                      <span className="circle" />
                    </FadeAndSlideTransition>
                  ))}
                </TransitionGroup>
              </div>
              <Text.span lighter uppercase>
                {localization[key]}
              </Text.span>
            </div>
          ))}
      </Container>
    );
  }
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 173px;
  position: relative;
  border-radius: 4px;
  background-color: #3b4555;
  display: flex;
  padding: 10px 0;

  .circle {
    content: '';
    width: 3px;
    height: 3px;
    float: left;
    border-radius: 50%;
    background-color: #ecc417;
    margin: 0 4px 4px 0;
    cursor: pointer;
  }

  .column {
    margin: 0 10px;
    width: 50%;
    position: relative;
    flex-wrap: wrap;

    .dots {
      bottom: ${props => (props.lang === "en" ? "36px" : "42px")};
      height: 72%;
      float: left;
      overflow: hidden;
      position: absolute;
      transform: rotateX(-180deg);
      & + span {
        position: absolute;
        bottom: 4px;
      font-size: ${props => (props.lang === "en" ? "12px" : "14px")};
        /* ${media.tabletWide`font-size: 12px`}; */
      }
    }
    &:last-child {
      .dots span {
        background-color: ${props => props.theme.primary.white};
      }
    }
  }
`;

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage,
  selectedroad: state.projectsStatsReducers.selectedroad,
  overall: state.projectsStatsReducers.data.data.overall,
  road_wise: state.projectsStatsReducers.data.data.road_wise
}))(withRouter(DottedPlot));
