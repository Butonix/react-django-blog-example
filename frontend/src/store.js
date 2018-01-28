import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./reducers/";
import refreshAuthToken from "./customMiddleware/refreshAuthTokenMw";

import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

export const history = createHistory();
const reduxRouterMiddleware = routerMiddleware(history);

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(reduxRouterMiddleware, refreshAuthToken, thunk, logger)
  )
);

//Email login
let auth_token = localStorage.getItem("token");
if (auth_token) {
  store.dispatch({ type: "AUTHENTICATED" });
}

//Google login
let goog_auth_token = localStorage.getItem("goog_access_token_conv");
if (goog_auth_token && goog_auth_token.length > 1) {
  store.dispatch({ type: "GOOG_AUTHENTICATE_ACTION" });
}
