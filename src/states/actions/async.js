import {
  getDataFromQuery,
  handleErrorQuery,
  getDetailsTvShow,
  handleErrorDetails,
  stopLoader
} from "./customQuery";
import axios from "axios";

export function getDataTvFromQuery({ lang, fetcher, page }, type) {
  const url =
    type === "base"
      ? `https://api.themoviedb.org/3/discover/tv?api_key=${
          process.env.REACT_APP_APIKEY
        }&language=${lang}&page=${page}`
      : `https://api.themoviedb.org/3/tv/${fetcher}?api_key=${
          process.env.REACT_APP_APIKEY
        }&language=${lang}&page=${page}`;
  return dispatch => {
    // I'm not using async/await cause of weak support for few browsers such as IE11.
    return axios
      .get(url)
      .then(res => {
        dispatch(
          getDataFromQuery({
            lang,
            fetcher,
            page,
            results: {
              dataMovie: res.data.results,
              pages: res.data.page,
              total_pages: res.data.total_pages,
              total_results: res.data.total_results
            }
          })
        );
        dispatch(stopLoader());
      })
      .catch(err => {
        dispatch(handleErrorQuery(err.response.data.status_message));
        dispatch(stopLoader());
      });
  };
}

export function getDetailsAboutTvShow(id, lang) {
  const url = ` https://api.themoviedb.org/3/tv/${id}?api_key=${
    process.env.REACT_APP_APIKEY
  }&language=${lang}`;
  return dispatch => {
    return axios
      .get(url)
      .then(res => {
        dispatch(getDetailsTvShow(id, res.data));
        dispatch(stopLoader());
      })
      .catch(err => {
        dispatch(handleErrorDetails(err.response.data.status_message));
        dispatch(stopLoader());
      });
  };
}
