import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import moxios from "moxios";
import * as actionsSync from "./../states/actions/customQuery";
import * as actionsAsync from "./../states/actions/async";
import * as types from "./../states/types";
import * as reducers from "./../states/reducers";

describe("Testing redux actions", () => {
  describe("Testing redux sync", () => {
    it("expect to trigger an action with the expected output (getDataFromQuery)", () => {
      const neededData = {
        lang: "en-US",
        fetcher: "discover",
        page: 1,
        results: {}
      };
      const expectedAction = {
        type: types.GETQUERY,
        payload: neededData
      };
      expect(actionsSync.getDataFromQuery(neededData)).toEqual(expectedAction);
    });

    it("expect to trigger an action with the expected output (handleErrorQuery)", () => {
      const neededData = "Error here.";
      const expectedAction = {
        type: types.ERRORFETCHER,
        payload: neededData
      };
      expect(actionsSync.handleErrorQuery(neededData)).toEqual(expectedAction);
    });

    it("expect to trigger an action with the expected output (getDetailsTvShow)", () => {
      const neededDataID = 20;
      const neededDataRes = {};
      const expectedAction = {
        type: types.GETDETAILSTVSHOW,
        payload: {
          id: neededDataID,
          res: neededDataRes
        }
      };
      expect(actionsSync.getDetailsTvShow(neededDataID, neededDataRes)).toEqual(
        expectedAction
      );
    });

    it("expect to trigger an action with the expected output (handleErrorDetails)", () => {
      const neededData = "Error here.";
      const expectedAction = {
        type: types.ERRORDETAILS,
        payload: neededData
      };
      expect(actionsSync.handleErrorDetails(neededData)).toEqual(
        expectedAction
      );
    });
  });

  const mockStore = configureMockStore([thunk]);
  describe("Testing async redux actions", () => {
    beforeEach(function() {
      moxios.install();
    });

    afterEach(function() {
      moxios.uninstall();
    });

    it("It should fetch new tv show (getDataTvFromQuery)", done => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { payload: [] }
        });
      });

      const store = mockStore({ Query: {} });

      const expectedActions = [
        {
          type: "getDataFromQuery",
          payload: {
            lang: "en-US",
            fetcher: "discover",
            page: 1,
            results: {
              dataMovie: undefined,
              pages: undefined,
              total_pages: undefined,
              total_results: undefined
            }
          }
        },
        { type: "stopLoader" }
      ];

      return store
        .dispatch(
          actionsAsync.getDataTvFromQuery(
            { lang: "en-US", fetcher: "discover", page: 1 },
            "base"
          )
        )
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    it("It should fetch new tv show (getDataTvFromQuery)", done => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: { payload: [] }
        });
      });

      const store = mockStore({ Details: {} });

      const expectedActions = [
        {
          type: "getDetailsAboutTvShow",
          payload: { id: 20, res: { payload: [] } }
        },
        { type: "stopLoader" }
      ];

      return store
        .dispatch(actionsAsync.getDetailsAboutTvShow(20, "en-US"))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe("Testing reducers Details, Query", () => {
    describe("Query Reducer", () => {
      it("should return the initial state", () => {
        expect(reducers.Query(undefined, {})).toEqual({
          loading: true,
          query: {
            lang: "en-US",
            fetcher: "discover",
            page: 1
          },
          result: {
            dataMovie: []
          }
        });
      });

      it("should return a new Query", () => {
        expect(
          reducers.Query(
            {},
            {
              type: types.GETQUERY,
              payload: {
                lang: "en-US",
                fetcher: "discover",
                page: 1,
                result: {}
              }
            }
          )
        ).toEqual({
          loading: false,
          query: {
            lang: "en-US",
            fetcher: "discover",
            page: 1
          },
          result: undefined
        });
      });

      it("should return a an error handler", () => {
        expect(
          reducers.Query(
            {},
            {
              type: types.ERRORFETCHER,
              payload: "error message"
            }
          )
        ).toEqual({
          error: "error message",
          loading: false
        });
      });
    });
    describe("Details reducer", () => {
      it("should return the initial state", () => {
        expect(reducers.Details(undefined, {})).toEqual({
          loading: true,
          result: {
            res: {}
          }
        });
      });
      it("Shoudl add a detailTvShow in the store", () => {
        expect(
          reducers.Details(
            {},
            {
              type: types.GETDETAILSTVSHOW,
              payload: {
                id: 20,
                res: {}
              }
            }
          )
        ).toEqual({
          loading: false,
          result: {
            id: 20,
            res: {}
          }
        });
      });
    });
  });
});
