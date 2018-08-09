import React from "react";
import styled from "styled-components";
import { Icon, Image } from "semantic-ui-react";
import { Rehover } from "rehover";
import { Link } from "react-router-dom";
import CanalLogo from "./../../images/canalLogo.png";

const HeaderContainer = styled.div`
  background-color: #000;
  height: 5em;
`;

const HeaderItems = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin: 0 20px;
`;

const HeaderSubMenuContainer = styled.div`
  position: absolute;
  width: 80px;
  background-color: #f7f9fa;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 2px 4px;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  right: 10px;
  margin-top: 5px;
  z-index: 9999;
`;

const LinkWrapper = styled(Link)`
  margin: 5px 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderItems>
        <Image src={CanalLogo} size="small" link href="/" />
        <div>
          <Rehover delay={150}>
            <Icon
              name="ellipsis vertical"
              bordered
              circular
              inverted
              link
              source="true"
            />
            <HeaderSubMenuContainer destination="true">
              <LinkWrapper to="/">Home</LinkWrapper>
            </HeaderSubMenuContainer>
          </Rehover>
        </div>
      </HeaderItems>
    </HeaderContainer>
  );
}

export default Header;
