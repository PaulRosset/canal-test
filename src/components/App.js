import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import ViewTv from "./Pages/ViewTv";
import { Intro, Query, Details, Loader } from "./../states/reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persitConfigBasicIntro = {
  key: "Intro",
  storage
};

const persitConfigBasicQuery = {
  key: "Query",
  storage
};

const reducers = combineReducers({
  Intro: persistReducer(persitConfigBasicIntro, Intro),
  Query: persistReducer(persitConfigBasicQuery, Query),
  Details,
  Loader
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(Thunk)
);

// I'm using redux persist for the Intro, however it will not reappear, only if you clean the localStorage since I didn't set up an expiration time.
export const persistor = persistStore(store);

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/tvshow/:id" component={ViewTv} />
      </Switch>
    </Router>
  </Provider>
);
