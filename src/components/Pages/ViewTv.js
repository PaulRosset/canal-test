import React, { Fragment } from "react";
import Header from "../Commons/Header";
import { ContainerBody } from "../Commons/Styles";
import { withRouter } from "react-router-dom";
import Body from "./../ViewTv/Body";

function ViewTv({ match }) {
  return (
    <Fragment>
      <Header />
      <ContainerBody>
        <Body id={match.params.id} />
      </ContainerBody>
    </Fragment>
  );
}

export default withRouter(ViewTv);
