import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      // since whatever is return from our api will simply
      // replace our state, we just return the courses
      return action.authors;
    default:
      return state;
  }
}
