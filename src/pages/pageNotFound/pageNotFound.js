import React from "react";
import { colors } from "utils";
import { number } from "localization";
import { images } from "config/index";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Page } from "components/layouts";
import {  Text } from "components/styled";
const { primary } = colors;

const pageNotFoundLocalization = {
  en: {
    error: "error",
    msg: "The page you’re looking for doesn’t exist.",
    goHome: "go home"
  }
};

const PageNotFound = ({ isMainPage }) => {
  const localization = pageNotFoundLocalization.en;

  if (!isMainPage) {
    return (
      <Page>
        <NoPageFound>
          <h1>
            {number(404)} {localization.error}
          </h1>
          <Text.span>{localization.msg}</Text.span>
          <Link to="/" className="go-home">
            {localization.goHome}
          </Link>
          <img src={images.pageNotFound} alt="Page not found" />
        </NoPageFound>
      </Page>
    );
  }
  return (
    <NoPageFound>
      <h1>
        {number(404)} {localization.error}
      </h1>
      <span>{localization.msg}</span>
      <img src={images.pageNotFound} alt="Page not found" />
    </NoPageFound>
  );
};

const NoPageFound = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  h1,
  span {
    color: #fff;
  }
  h1 {
    font-size: 64px;
  }
  span {
    display: block;
    margin-bottom: 40px;
    font-size: 18px;
  }
  .go-home {
    border-radius: 24px;
    background-color: ${props => primary.pissYellow};
    color: ${props => primary.dark};
    display: inline-block;
    font-size: 15px;
    margin-bottom: 60px;
    padding: 15px 46px;
    text-decoration: none;
    text-transform: uppercase;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #d6b00f;
    }
  }
  img {
    display: block;
  }
`;

export default PageNotFound;