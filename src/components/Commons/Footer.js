import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const ContainerFooter = styled.div`
  width: 100%;
  text-align: center;
  margin: 15px 0;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

export function Footer() {
  return (
    <ContainerFooter>
      Made By <a href="https://github.com/PaulRosset">Paul Rosset</a> for{" "}
      <a href="https://www.mycanal.fr/">Canal+</a> with{" "}
      <Icon name="heart" color="red" />
    </ContainerFooter>
  );
}
