import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuthState } from "./AuthState";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  //restricted means can no longer access after logged in
  //!restricted means can always be accessed (such as homepage on some website)
  return (
    <Route
      {...rest}
      render={(props) =>
        getAuthState() && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
