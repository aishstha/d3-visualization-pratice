import { createAction } from "redux-actions";
import types from "./types";

export const getList = createAction(types.GET_LIST);
export const getListSuccess = createAction(types.GET_LIST_SUCCESS);
export const setFilters = createAction(types.SET_FILTERS);
export const getListError = createAction(types.GET_LIST_ERROR);
