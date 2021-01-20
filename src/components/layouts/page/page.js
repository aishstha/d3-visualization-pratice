import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import theme from "utils/theme";
import { Box, Flex } from "grid-styled";
import { connect } from "react-redux";

class Page extends Component {

  render() {
    // window.scrollTo(0, 0);

    const { children, selectedLanguage } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <Content lang={selectedLanguage} className="page">
            <Flex className="wrapper">
              {React.Children.map(children, (child, i) => {
                if (i < 2) {
                  return <Box>{child}</Box>;
                }
              })}
            </Flex>
          </Content>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: state.localizationReducers.selectedLanguage
});

const Content = styled.div`
  font-family: ${props =>
    props.lang === "en"
      ? '"Work Sans", sans-serif'
      : '"Noto Sans", sans-serif'};

  div,
  span,
  p,
  text,
  input,
  textarea {
    font-family: ${props =>
      props.lang === "en"
        ? "Work Sans, sans-serif"
        : "Noto Sans, sans-serif"}!important;
  }

  .tooltip {
    .title {
      font-size: ${props => (props.lang === "en" ? "14px" : "15px")};
    }
    .total-count {
      font-size: ${props => (props.lang === "en" ? "18px" : "20px")};
    }
    .view-map-detail {
      font-size: ${props => (props.lang === "en" ? "12px" : "14px")};
      margin-top: 2px;
    }
  }

  .contact-wrap p {
    font-size: ${props => (props.lang === "en" ? "14px" : "15px")};
  }
`;

export default connect(mapStateToProps)(withRouter(Page));
