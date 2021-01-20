import React from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/PropsRoutes";
import Home from "./home/Home";


function Routing() {
  return (
    <Switch>
      <PropsRoute path="/" component={Home} />
    </Switch>
  );
}

export default Routing;
