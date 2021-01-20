import types from "./types";
import initialState from "./initialState";

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTS_STATS_SUCCESS:
      return {
        ...state,
        ...{
          data: action.payload,
          fetching: false,
          error: null
        }
      };
    case types.SET_SELECTED_road:
      return { ...state, selectedroad: action.payload };
    default:
      return state;
  }
};
