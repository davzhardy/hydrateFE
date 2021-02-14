import React from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/PropsRoutes";
import Home from "./home/Home";
import AboutMe from "./about/AboutMe";


function Routing() {
  return (
    <Switch>
      <PropsRoute
        exact
        path="/about"
        component={AboutMe}
      />
      <PropsRoute path="/" component={Home} />
    </Switch>
  );
}

export default Routing;
