import React, { Fragment } from "react";
import Header from "./../Commons/Header";
import { ContainerBody } from "./../Commons/Styles";
import styled from "styled-components";

const Text = styled.p``;

function Why(props) {
  return (
    <Fragment>
      <Header />
      <ContainerBody>
        <h2>Pourquoi ?</h2>
        <Text />
      </ContainerBody>
    </Fragment>
  );
}

export default Why;
