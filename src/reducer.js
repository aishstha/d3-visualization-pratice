import { combineReducers } from "redux";
import details from "details";
import projectsStatsReducers from "details/projects-stats";
import localizationReducers from "./details/localization";
import fiscalYearReducers from "./details/fiscalyear";

export default combineReducers({
  details,
  projectsStatsReducers,
  localizationReducers,
  fiscalYearReducers,
});
