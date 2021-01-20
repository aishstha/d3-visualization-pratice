import React, { Component } from "react";
import styled from "styled-components";
import { Heading  } from "components/styled";


class Header extends Component {
  render() {
    return (
      <HeaderMain>
        <div className="header-inner">
          <Heading.h1 uppercase>
            D3 Data visualization Pratice
          </Heading.h1>
          <Heading.h4 uppercase>
            Mock data derived from Open data nepal 
          </Heading.h4>
        </div>
      </HeaderMain>
    );
  }
}

export default Header;

const HeaderMain = styled.div`
  margin-bottom: 36px;
  .btn-grey {
    color: ${(props) => props.theme.primary.white};
    font-size: ${(props) => (props.lang === "en" ? "17px" : "22px")};
    opacity: 0.7;
    padding: ${(props) =>
      props.lang === "en" ? "4px 12px 4px 10px" : "0 12px 0 10px"};
    text-transform: none;
    &:after {
      display: none;
    }
  }

  .header-inner {
    line-height: ${(props) => (props.lang === "en" ? "28px" : "32px")};
  }

  h1 {
    display: inline;
    font-size: ${(props) => (props.lang === "en" ? "17px" : "22px")};
    opacity: 0.4;
  }

  .fiscal-year-label {
    color: ${(props) => props.theme.primary.white};
    opacity: 0.4;
    margin: 0 12px;
  }
`;
