import React, { Fragment } from "react";
import { Header } from "components/layouts";

const ContainerLeft = ({ children }) => {
  return (
    <Fragment>
      <div className="container--left">
        <Header />
        {children}
      </div>
    </Fragment>
  );
};

export default ContainerLeft;
