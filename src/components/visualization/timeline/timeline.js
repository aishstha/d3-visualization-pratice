import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { date, detailLocalization } from "localization";
import { scaleTime } from "d3-scale";
import moment from "moment";

class Timeline extends React.Component {
  componentDidMount() {}
  render() {
    const { data, selectedLanguage } = this.props;

    const { agreement_date, work_start_date, completion_date } = data;
    const localizationDetail = detailLocalization[selectedLanguage];

    if (agreement_date.length === 0) {
      return null;
    }
    if (work_start_date.length === 0) {
      return null;
    }

    const agreementDate = new Date(agreement_date);
    const completionDate = new Date(completion_date);
    const workStartDate = new Date(work_start_date);

    const scale = scaleTime()
      .domain([agreementDate, completionDate])
      .range([0, 100]);

    const actualStartPosition = scale(workStartDate);
    const daysLateStart = moment(workStartDate).diff(
      moment(agreementDate),
      "days"
    );

    return (
      <Wrapper actualStartPosition={actualStartPosition}>
        <div className="upper">
          <div className="main_line" />
          <div className="selected_line" />
          {daysLateStart !== 0 ? (
            <div className="days_late_start">
              <span className="circle">{daysLateStart}</span>
              <span className="text">days late start</span>
            </div>
          ) : (
            ""
          )}
          <div className="actual_start_date has_indicator">
            <div className="date_label">
              {localizationDetail.actualStartDate}
            </div>
            <div>{date(workStartDate)}</div>
          </div>
        </div>
        <div className="lower">
          <div className="agreement_date has_indicator">
            <div className="date_label">{localizationDetail.agreementDate}</div>
            <div>{date(agreementDate)}</div>
          </div>
          <div className="completion_date has_indicator">
            <div className="date_label">
              {localizationDetail.completionDate}
            </div>
            <div>{date(completionDate)}</div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  margin-top: 15px;
  padding-bottom: 40px;

  .date_label {
    opacity: 0.7;
  }
  /* upper style */
  .upper {
    height: 85px;
    /* background-color: #333; */
    position: relative;
  }
  .main_line {
    height: 4px;
    width: 100%;
    background: #3b4555;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .selected_line {
    height: 4px;
    width: ${props => `${props.actualStartPosition}%`};
    background: ${props => props.theme.sec.pink};
    position: absolute;
    bottom: 0;
  }
  .days_late_start {
    position: absolute;
    top: 0;
    left: calc(${props => `${props.actualStartPosition * 0.5}%`} - 12px);
    font-size: 14px;
    font-weight: bold;
    .circle {
      display: inline-block;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background-color: ${props => props.theme.sec.pink};
      color: white;
      position: absolute;
      text-align: center;
      line-height: 24px;
      &:before {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        height: 75px;
        width: 2px;
        display: inline-block;
        background: ${props => props.theme.sec.pink};
      }
    }
    .text {
      margin-left: 30px;
      line-height: 24px;
      color: ${props => props.theme.sec.pink};
    }
  }
  .actual_start_date.has_indicator {
    position: absolute;
    bottom: 24px;
    left: ${props => `${props.actualStartPosition}%`};

    &:before {
      background-color: #344f29;
      top: auto;
      bottom: 12px;
    }
    &:after {
      background-color: #344f29;
      bottom: -28px;
      top: auto;
    }
  }

  /* lower style */
  .lower {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
  .has_indicator {
    position: relative;
    padding-left: 10px;

    &:before {
      content: "";
      display: inline-block;
      height: 6px;
      width: 6px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      left: -2px;
      top: 8px;
    }
    &:after {
      content: "";
      display: inline-block;
      height: 40px;
      width: 2px;
      /* border-radius: 50%; */
      background-color: #fff;
      position: absolute;
      left: 0px;
      top: -32px;
    }
  }
  .completion_date.has_indicator {
    padding-right: 10px;
    padding-left: 0;
    text-align: right;

    &:before {
      background-color: #408a4b;
      right: -2px;
      left: auto;
    }
    &:after {
      background-color: #408a4b;
      left: auto;
      right: 0;
    }
  }
`;

export default connect(state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
}))(Timeline);
