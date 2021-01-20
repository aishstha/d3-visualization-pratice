import { createAction } from 'redux-actions';
import types from './types';

export const getProjectsStatsSuccess = createAction(types.GET_PROJECTS_STATS_SUCCESS);

export const setSelectedroad = createAction(types.SET_SELECTED_road);
