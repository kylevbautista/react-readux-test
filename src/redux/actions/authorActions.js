import * as types from "./actionTypes";
import * as authorAPI from "../../api/authorApi";
import { beginApiCall } from "./apiStatusAction";

// action creator for async api call
// gets called only when it courses gets loaded correctly
export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

// thunks are fuctions return funcitons
// dont have to pass dispatch in ourselves
// our calling code looks the same for asyn and sync calls
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorAPI
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
