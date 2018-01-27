import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers/";
import jwt from "./customMiddleware/jwtMiddleware";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(jwt, thunk, logger))
);

let auth_token = localStorage.getItem("token");

if (auth_token) {
  store.dispatch({ type: "AUTHENTICATED" });
}
