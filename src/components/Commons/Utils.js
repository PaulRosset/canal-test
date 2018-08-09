import React from "react";
import {
  Segment,
  Dimmer,
  Image,
  Loader,
  Card,
  Button,
  Flag,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";
import { trad } from "./../../utils/traductionsData";

const DisplayInfosMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Loading = () => (
  <Segment basic textAlign="center">
    <Dimmer active inverted>
      <Loader size="medium">Loading</Loader>
    </Dimmer>
    <Image
      centered
      src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
    />
  </Segment>
);

export const TvShow = ({
  name,
  popularity,
  id,
  firstAirDate,
  originalCountry,
  overview,
  poster,
  handleDetailCard,
  lang
}) => (
  <Card>
    <Card.Content>
      <Image
        floated="right"
        size="tiny"
        src={`https://image.tmdb.org/t/p/w185${poster}`}
      />
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{`${trad[lang].Card.airDate} ${firstAirDate}`}</Card.Meta>
      <Card.Meta>{`${trad[lang].Card.pop} ${popularity}`}</Card.Meta>
      <Card.Meta>
        {trad[lang].Card.originCountry}{" "}
        {originalCountry.map((country, index) => (
          <Flag key={index} className="vAlign" name={country.toLowerCase()} />
        ))}
      </Card.Meta>
      <Card.Description>{`${overview.substring(0, 200)}...`}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button
          basic
          color="green"
          onClick={handleDetailCard}
          id={id}
          className="test"
        >
          {trad[lang].Card.button}
        </Button>
      </div>
    </Card.Content>
  </Card>
);

const Delimiter = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 5px 0;
`;

const SeasonsContainer = styled.div`
  margin-bottom: 10px;
`;

export const DetailsTv = ({
  poster,
  name,
  createdBy,
  episodeRunTime,
  firstAirDate,
  genres,
  web,
  lastAirDate,
  countrys,
  overview,
  nbEpisodes,
  nbSeasons,
  lang
}) => (
  <Card fluid centered>
    <Image
      size="small"
      centered
      src={`https://image.tmdb.org/t/p/w185${poster}`}
    />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>
        {countrys.map((country, index) => (
          <Flag key={index} className="vAlign" name={country.toLowerCase()} />
        ))}
        <Delimiter />
        <h4 className="noMargin">{trad[lang].Details.createBy}</h4>
        {createdBy.map((author, index) => (
          <DisplayInfosMeta key={index}>{author.name}</DisplayInfosMeta>
        ))}
        <Delimiter />
        <h4 className="noMargin">{trad[lang].Details.avgTimeEpi}</h4>
        {episodeRunTime.map((epi, index) => (
          <DisplayInfosMeta key={index}>{epi} minutes</DisplayInfosMeta>
        ))}
        <Delimiter />
        <h4 className="noMargin">
          {trad[lang].Details.firstAirDate} {firstAirDate}
        </h4>
        <h4 className="noMargin">
          {trad[lang].Details.lastAirDate} {lastAirDate}
        </h4>
        <Delimiter />
        <h4 className="noMargin">Genres:</h4>
        {genres.map((genre, index) => (
          <DisplayInfosMeta key={index}>{genre.name}</DisplayInfosMeta>
        ))}
        <Delimiter />
      </Card.Meta>
      <Card.Description>{overview}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <SeasonsContainer>
        <h4 className="noMargin">
          {trad[lang].Details.nbSeasons} {nbSeasons}
        </h4>
        <h4 className="noMargin">
          {trad[lang].Details.nbEpi} {nbEpisodes}
        </h4>
      </SeasonsContainer>
      <Delimiter />
      <a href={web}>
        <Icon name="share" />
        {trad[lang].Details.webTitle}
      </a>
    </Card.Content>
  </Card>
);
