/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import React from "react";
import { Redirect } from "react-router-dom";
import authToken from "@my-monorepo/shared/src/utils/auth";
import Spinner from "../spinner";

const PrivateRoute = (Component: React.ElementType, loginPage: string) => {
  return class extends React.Component<any> {
    state = { token: "init" };
    async componentDidMount() {
      const token = await authToken.getToken();
      console.log("set token to ", token);
      this.setState({
        token,
      });
    }
    render() {
      const {
        props,
        state: { token },
      } = this;

      if (token === "init") return <Spinner />;
      return token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: loginPage, state: { from: props.location } }}
          push={false} // replace
        />
      );
    }
  };
};

export default PrivateRoute;
