import { Route, Redirect } from "react-router-dom";

import React from "react";

const checkAuth = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("goog_access_token_conv");
  if (!token) {
    return false;
  }
  return true;
};

const PrivateRoute = ({ component: Component }, ...rest) => (
  <Route
    {...rest}
    render={props => {
      return checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      );
    }}
  />
);

const AuthenticatedRoute = ({ component: Component }, ...rest) => (
  <Route
    {...rest}
    render={props => {
      return checkAuth() ? (
        <Redirect to={{ pathname: "/secret" }} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);

export { PrivateRoute, AuthenticatedRoute };
