import React from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/PropsRoutes";
import Home from "./home/Home";
import AboutMe from "./about/AboutMe";


function Routing() {
  return (
    <Switch>
      <PropsRoute path="/" component={Home} />
      <PropsRoute
        exact
        path="/about"
        component={AboutMe}
      />
    </Switch>
  );
}

export default Routing;
