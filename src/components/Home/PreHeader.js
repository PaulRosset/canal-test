import React, { Component } from "react";
import styled from "styled-components";
import { Button, Icon, Modal, Select, Loader } from "semantic-ui-react";
import { countryOptions, tvOptions } from "../../utils/optionsData";
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
  state = { open: false, lang: "en-US", fetcher: "discover" };

  show = () => this.setState({ open: true });

  submit = () => {
    const { lang, fetcher } = this.state;
    if (lang === "en-US" && fetcher === "discover") {
      // If this is the same things, do nothings
      this.setState({ open: false });
    } else {
      // Launch the query
      this.props.dispatch(startLoader());
      this.props.dispatch(getDataTvFromQuery({ lang, fetcher, page: 1 }));
      this.setState({ open: false });
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
            Your query:{" "}
            {Query.error ? (
              <Message color="#db2828">{Query.error}</Message>
            ) : (
              <Message color="#21ba45">{`Lang: ${
                Query.query.lang
              } // Fetcher: ${Query.query.fetcher}`}</Message>
            )}
          </QueryResume>
        )}
        {Query.error ? null : (
          <Button basic size="mini" onClick={this.show}>
            <Icon name="plus" /> Personalize your query!
          </Button>
        )}
        <Modal open={open} onClose={this.close} dimmer="blurring">
          <Modal.Header>Fetcher Query</Modal.Header>
          <ContainerDescriptionModal>
            <Select
              placeholder="Select the language"
              options={countryOptions}
              onChange={this.handleLang}
            />
            <Select
              placeholder="What you want to fetch?"
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
              content="Fetch new content"
              onClick={this.submit}
            />
          </Modal.Actions>
        </Modal>
      </PreHeaderContainer>
    );
  }
}

export default connect(state => ({ Query: state.Query }))(PreHeader);
