import React, {createElement} from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({render, exact, path}) => {
  const isUser = useSelector((state) => state.user.UserId) ? true : false
  const routeComponent = (props, ...children) =>
    isUser ? (
      createElement(render, props, ...children)
    ) : (
      <Redirect to={{ pathname: "/" }} />
    );
  return <Route path={path} exact={exact} render={routeComponent} />;
}


export default PrivateRoute