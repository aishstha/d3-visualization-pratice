import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { media } from "components/styled";

class Chart extends React.Component {
  constructor() {
    super();
    this.state = {
      parentWidth: 0
    };
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.fitParentContainer();
    window.addEventListener("resize", this.fitParentContainer);
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
    const { legendData, selectedLanguage } = this.props;
    const rectColor = ["#1b2738", "#253a59", "#204884", "#1b60c8"];

    const { parentWidth } = this.state;

    const legendWidth = parentWidth * 0.58;
    const rectWidth = legendWidth * 0.25;

    return (
      <div ref={this.ref}>
        <LegendWrapper
          // innerRef={this.ref}
          className="legend"
          lang={selectedLanguage}
          legendWidth={legendWidth}
          rectWidth={rectWidth}
        >
          <ul className="legend-labels">
            {legendData.map((d, key) => (
              <li key={key}>
                <span style={{ background: rectColor[key] }} />
                {d}
              </li>
            ))}
          </ul>
        </LegendWrapper>
      </div>
    );
  }
}

const LegendWrapper = styled.div`
  margin-bottom: 24px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }

  @media all and (max-width: 600px) {
    width: 100% !important;
    .legend-labels {
      width: 100% !important;
      li {
        width: 25% !important;
        span {
          width: 100% !important;
        }
      }
    }
  }

  ${media.desktop`bottom: 82px`};
  */ ul {
    padding: 0;
    margin: 0;
    float: left;
    list-style: none;
  }
  li {
    display: block;
    float: left;
    width: ${props => `${props.rectWidth}px`};
    margin-bottom: 6px;
    text-align: center;
    color: "rgba(255,255,255,0.7)";
    /* font-size: 80%; */
    font-size: ${props => (props.lang === "en" ? "12px" : "13px")};
    list-style: none;
  }
  span {
    display: block;
    float: left;
    height: 15px;
    width: ${props => `${props.rectWidth}px`};
  }
`;

export default connect(state => ({
  selectedLanguage: "en"
}))(Chart);
