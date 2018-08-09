import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon, Modal, Select, Loader } from "semantic-ui-react";
import { countryOptions, tvOptions } from "../../utils/optionsData";
import { trad } from "./../../utils/traductionsData";
import { connect } from "react-redux";
import { getDataTvFromQuery } from "./../../states/actions/async";
import { startLoader } from "./../../states/actions/customQuery";
import { Message } from "../Commons/Styles";

const PreHeaderContainer = styled.div`
  padding: 5px 0;
  border-bottom: 1px solid #1f2126;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerDescriptionModal = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const QueryResume = styled.div`
  align-self: end;
`;

class PreHeader extends Component {
  state = { open: false, lang: "fr-FR", fetcher: "discover" };

  show = () => this.setState({ open: true });

  submit = () => {
    const { lang, fetcher } = this.state;
    if (lang === "fr-FR" && fetcher === "discover") {
      // If this is the same things, do nothings
      this.setState({ open: false });
    } else {
      // Launch the query
      this.props.dispatch(startLoader());
      this.props.dispatch(getDataTvFromQuery({ lang, fetcher, page: 1 }));
      this.setState({ open: false });
      localStorage.removeItem("persist:Query");
    }
  };

  close = () => this.setState({ open: false });

  handleLang = (_, { value }) => {
    this.setState({ lang: value });
  };

  handleWhatToFetch = (_, { value }) => {
    this.setState({ fetcher: value });
  };

  render() {
    const { open } = this.state;
    const { Query } = this.props;
    return (
      <PreHeaderContainer>
        {Query.loading ? (
          <Loader active inline="centered" />
        ) : (
          <QueryResume>
            {trad[Query.query.lang].PreHeader.query}{" "}
            {Query.error ? (
              <Message color="#db2828">{Query.error}</Message>
            ) : (
              <Message color="#21ba45">{`${
                trad[Query.query.lang].PreHeader.lang
              } ${Query.query.lang} // ${
                trad[Query.query.lang].PreHeader.fetcher
              } ${Query.query.fetcher}`}</Message>
            )}
          </QueryResume>
        )}
        {Query.error ? null : (
          <Button basic size="mini" onClick={this.show}>
            <Icon name="plus" /> {trad[Query.query.lang].PreHeader.personalize}
          </Button>
        )}
        <Modal open={open} onClose={this.close} dimmer="blurring">
          <Modal.Header>{trad[Query.query.lang].Fetcher.header}</Modal.Header>
          <ContainerDescriptionModal>
            <Select
              placeholder={trad[Query.query.lang].Fetcher.lang}
              options={countryOptions}
              onChange={this.handleLang}
            />
            <Select
              placeholder={trad[Query.query.lang].Fetcher.fetcher}
              options={tvOptions}
              onChange={this.handleWhatToFetch}
            />
          </ContainerDescriptionModal>
          <Modal.Actions>
            <Button color="black" onClick={this.close} size="tiny">
              Nope
            </Button>
            <Button
              size="tiny"
              positive
              icon="checkmark"
              labelPosition="left"
              content={trad[Query.query.lang].Fetcher.buttonFetch}
              onClick={this.submit}
            />
          </Modal.Actions>
        </Modal>
      </PreHeaderContainer>
    );
  }
}

export default connect(state => ({ Query: state.Query }))(PreHeader);
