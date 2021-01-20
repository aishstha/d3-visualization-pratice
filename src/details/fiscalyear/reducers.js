import types from "./types";
import queryString from "querystring";

const { "fiscal-year": year } = queryString.parse(
  window.location.search.replace("?", "")
);

const initialState = {
  selectedFiscalYear: year || "2075-76"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FISCALYEAR:
      return { ...state, selectedFiscalYear: action.payload };
    default:
      return state;
  }
};
