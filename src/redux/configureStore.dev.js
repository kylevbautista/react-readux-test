import { createStore, applyMiddleware, compose } from "redux";
// since rootReducer's file is index.js no need to specify file, implied
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
// to handle async api calls and not worry about who to
// send dispatch to
import thunk from "redux-thunk";

// initialState is so we can initialize our store with some
// data when we create it
export default function configureStore(initialState) {
  // add support for redux dev tools
  const composeEhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    // warns if we try to mutate Redux state directly
    composeEhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
