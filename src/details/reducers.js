import types from "./types";
import initialState from "./initialState";

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST:
      return { ...state, ...{ fetching: true } };

    case types.GET_LIST_SUCCESS:
      return {
        ...state,
        ...{
          projects: action.payload.projects,
          stats: action.payload.stats,
          fetching: false,
          error: null
        }
      };

    case types.SET_FILTERS:
      return {
        ...state,
        ...{ filters: action.payload }
      };

    case types.GET_LIST_ERROR:
      return { ...state, ...{ error: action.payload, loading: false } };
    default:
      return state;
  }
};
