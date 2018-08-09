import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Card, Icon, Popup } from "semantic-ui-react";
import { getDataTvFromQuery } from "../../states/actions/async";
import { Message } from "../Commons/Styles";
import { Loading, TvShow } from "../Commons/Utils";
import { withRouter } from "react-router-dom";
import { startLoader } from "./../../states/actions/customQuery";

const BodyContainer = styled.div`
  margin: 20px 0;
`;

const HeaderMetrics = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 15px;
`;

const ActionsPage = styled.div`
  margin-top: 10px;
`;

class Body extends Component {
  state = { didMount: false };

  componentDidMount() {
    const { Query } = this.props;
    this.props.dispatch(startLoader());
    this.props.dispatch(
      getDataTvFromQuery(
        {
          lang: Query.query.lang,
          fetcher: Query.query.fetcher,
          page: Query.query.page
        },
        Query.query.fetcher === "discover" ? "base" : "nobase"
      )
    );
    this.setState({ didMount: true });
  }

  handleDetailCard = (e, { id }) => {
    this.props.dispatch(startLoader());
    this.props.history.push(`/tvshow/${id}`);
  };

  handlePreviousPage = e => {
    const { Query } = this.props;
    this.props.dispatch(startLoader());
    this.props.dispatch(
      getDataTvFromQuery(
        {
          lang: Query.query.lang,
          fetcher: Query.query.fetcher,
          page: Query.query.page - 1
        },
        Query.query.fetcher !== "discover" ? "nobase" : "base"
      )
    );
  };

  handleNextPage = e => {
    const { Query } = this.props;
    this.props.dispatch(startLoader());
    this.props.dispatch(
      getDataTvFromQuery(
        {
          lang: Query.query.lang,
          fetcher: Query.query.fetcher,
          page: Query.query.page + 1
        },
        Query.query.fetcher !== "discover" ? "nobase" : "base"
      )
    );
  };

  render() {
    const { Query, Loader } = this.props;
    if (Query.loading || Loader.loader) {
      return <Loading />;
    } else if (Query.error) {
      return <h5 align="center">An Error has occured :(</h5>;
    }
    return (
      <BodyContainer>
        <HeaderMetrics>
          <h5 className="noMargin">
            Current Page:{" "}
            <Message color="#21ba45">
              {Query.result.pages}/{Query.result.total_pages}
            </Message>
          </h5>
          <h5 className="noMargin">
            Total Results:{" "}
            <Message color="#21ba45">{Query.result.total_results}</Message>
          </h5>
          <h5 className="noMargin">
            Elements retrieves per page:{" "}
            <Message color="#21ba45">{Query.result.dataMovie.length}</Message>
          </h5>
          <ActionsPage>
            {Query.result.pages === 1 ? null : (
              <Popup
                trigger={
                  <Icon
                    name="arrow alternate circle left"
                    link
                    size="big"
                    onClick={this.handlePreviousPage}
                  />
                }
                content="Go to the previous page"
              />
            )}
            {Query.result.pages === Query.result.total_pages ? null : (
              <Popup
                trigger={
                  <Icon
                    name="arrow alternate circle right"
                    link
                    size="big"
                    onClick={this.handleNextPage}
                  />
                }
                content="Go to the next page"
              />
            )}
          </ActionsPage>
        </HeaderMetrics>
        <Card.Group centered>
          {Query.result.dataMovie.map((tvShow, index) => (
            <TvShow
              key={index}
              name={tvShow.original_name}
              popularity={tvShow.popularity}
              id={tvShow.id}
              firstAirDate={tvShow.first_air_date}
              originalCountry={tvShow.origin_country}
              overview={tvShow.overview}
              poster={tvShow.poster_path}
              handleDetailCard={this.handleDetailCard}
            />
          ))}
        </Card.Group>
      </BodyContainer>
    );
  }
}

export default withRouter(
  connect(state => ({ Query: state.Query, Loader: state.Loader }))(Body)
);
