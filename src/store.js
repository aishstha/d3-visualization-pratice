import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import reducer from "./reducer";

const initialStore = {};

const enhancers = [];
const middleWare = [thunk];
// middleWare.push(logger);

const composedEnhancers = compose(
  applyMiddleware(...middleWare),
  ...enhancers
);

const store = createStore(reducer, initialStore, composedEnhancers);

export default store;
