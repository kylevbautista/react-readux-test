/**
 * This is the root reducer that combines all our other reducers
 */

import { combineReducers } from "redux";
// Because courseReducer is export default we can rename it anything
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiStatusReducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  author: authorReducer,
  apiCallsInProgress: apiStatusReducer,
});

export default rootReducer;
