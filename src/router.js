import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, PageNotFound } from "pages";
import { baseStyles } from "./components/styled/global/index";
import {  getMunData } from "utils";

class Router extends Component {
  render() {
    baseStyles();
    return (
      <BrowserRouter>
        <div>
          <Switch>
          <Route
              exact
              path="/"
              render={props => <Home {...props} municipality={getMunData()} />}
            />
            <Route
              path="*"
              render={props => <PageNotFound isMainPage {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
