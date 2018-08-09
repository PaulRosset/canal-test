import React, { Fragment, Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Header from "../Commons/Header";
import { ContainerBody } from "../Commons/Styles";
import PreHeader from "../Home/PreHeader";
import Body from "../Home/Body";
import EncryptedCanal from "./../../images/canal.jpg";
import { INTROSEEN } from "./../../states/types";
import { Footer } from "../../components/Commons/Footer";

const ContainerIntro = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${EncryptedCanal});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
`;

const Button = styled.button`
  position: absolute;
  top: 75%;
  left: 40%;
  margin-left: -50px;
  margin-top: -25px;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: white none;
  color: black;
  padding: 0.78571429em 1.5em 0.78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  user-select: none;
  transition: opacity 0.1s ease, background-color 0.1s ease, color 0.1s ease,
    box-shadow 0.1s ease, background 0.1s ease;
  will-change: "";

  &:hover {
    transition: 0.3s;
    background: #ec3655 none;
    color: white;
  }
`;

const IntroPanel = ({ handleComeIn }) => (
  <ContainerIntro>
    <Button onClick={handleComeIn}>
      Pour décrypter, cliquer ici!{" "}
      <span role="img" aria-label="awesome">
        🤩
      </span>{" "}
    </Button>
  </ContainerIntro>
);

class Home extends Component {
  handleComeIn = () => {
    this.props.dispatch({
      type: INTROSEEN
    });
    //persistor.flush();
  };

  render() {
    const { Intro } = this.props;
    return (
      <Fragment>
        {!Intro.hasSeenIntro ? (
          <IntroPanel handleComeIn={this.handleComeIn} />
        ) : (
          <Fragment>
            <Header />
            <ContainerBody>
              <PreHeader />
              <Body />
            </ContainerBody>
            <Footer />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default connect(state => ({ Intro: state.Intro }))(Home);
