import React, { useState, useEffect, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routesDefined from "./routes";

const Router = () => {
  const LoggedInComponent = lazy(() => import("../logged_in/components/Main"));
  const LoggedOutComponent = lazy(() => import("../logged_out/components/Main"));

  return (
    <Switch>
      <Route path="/loggedIn">
        <LoggedInComponent />
      </Route>
      <Route >
        <LoggedOutComponent />
      </Route>
    </Switch>
  );
};

export { Router };
