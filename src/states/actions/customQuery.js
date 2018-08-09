import {
  GETQUERY,
  ERRORFETCHER,
  GETDETAILSTVSHOW,
  ERRORDETAILS,
  LOADING,
  STOPLOADING
} from "../types";

export function getDataFromQuery(dataQuery) {
  return {
    type: GETQUERY,
    payload: dataQuery
  };
}

export function handleErrorQuery(message) {
  return {
    type: ERRORFETCHER,
    payload: message
  };
}

export function getDetailsTvShow(id, res) {
  return {
    type: GETDETAILSTVSHOW,
    payload: {
      id,
      res
    }
  };
}

export function handleErrorDetails(message) {
  return {
    type: ERRORDETAILS,
    payload: message
  };
}

export function startLoader() {
  return {
    type: LOADING
  };
}

export function stopLoader() {
  return {
    type: STOPLOADING
  };
}
