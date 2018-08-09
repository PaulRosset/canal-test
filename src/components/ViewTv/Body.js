import React, { Component } from "react";
import { connect } from "react-redux";
import { getDetailsAboutTvShow } from "./../../states/actions/async";
import { Loader } from "semantic-ui-react";
import { DetailsTv } from "./../Commons/Utils";
import { persistor } from "../../components/App";

class BodyTvShow extends Component {
  state = {
    didMount: false
  };

  componentDidMount() {
    const { id, Query } = this.props;
    this.props.dispatch(getDetailsAboutTvShow(id, Query.query.lang));
    persistor.flush();
    this.setState({ didMount: true });
  }

  render() {
    const { Details, Query } = this.props;
    const {
      poster_path,
      original_name,
      created_by,
      episode_run_time,
      first_air_date,
      genres,
      homepage,
      overview,
      last_air_date,
      number_of_episodes,
      number_of_seasons,
      origin_country
    } = this.props.Details.result.res;
    if (!this.state.didMount || Details.loading || this.props.Loader.loader) {
      return <Loader active inline="centered" />;
    }
    return (
      <div>
        <DetailsTv
          poster={poster_path}
          name={original_name}
          createdBy={created_by}
          episodeRunTime={episode_run_time}
          firstAirDate={first_air_date}
          genres={genres}
          web={homepage}
          lastAirDate={last_air_date}
          countrys={origin_country}
          overview={overview}
          nbEpisodes={number_of_episodes}
          nbSeasons={number_of_seasons}
          lang={Query.query.lang}
        />
      </div>
    );
  }
}

export default connect(state => ({
  Query: state.Query,
  Details: state.Details,
  Loader: state.Loader
}))(BodyTvShow);
