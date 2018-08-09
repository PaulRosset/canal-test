import { INTROSEEN } from "./types";
import {
  GETQUERY,
  ERRORFETCHER,
  GETDETAILSTVSHOW,
  ERRORDETAILS,
  LOADING,
  STOPLOADING
} from "./types";

const defaultStateQuery = {
  loading: true,
  query: {
    lang: "en-US",
    fetcher: "discover",
    page: 1
  },
  result: {
    dataMovie: []
  }
};

const defaultStateDetails = {
  loading: true,
  result: {
    res: {}
  }
};

export const Intro = (state = { hasSeenIntro: false }, action) => {
  switch (action.type) {
    case INTROSEEN:
      return { ...state, hasSeenIntro: true };
    default:
      return state;
  }
};

export const Loader = (
  state = {
    loader: false
  },
  action
) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loader: true
      };
    case STOPLOADING:
      return {
        ...state,
        loader: false
      };
    default:
      return state;
  }
};

export const Query = (state = defaultStateQuery, action) => {
  switch (action.type) {
    case GETQUERY:
      return {
        ...state,
        loading: false,
        query: {
          lang: action.payload.lang,
          fetcher: action.payload.fetcher,
          page: action.payload.page
        },
        result: action.payload.results
      };
    case ERRORFETCHER:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export const Details = (state = defaultStateDetails, action) => {
  switch (action.type) {
    case GETDETAILSTVSHOW:
      return {
        ...state,
        loading: false,
        result: action.payload
      };
    case ERRORDETAILS:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
