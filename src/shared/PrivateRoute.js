import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component, ...rest}) => {
    
  const isUser = useSelector((state) => state.user.UserId) ? true : false

  return (
    <Route {...rest} render={props => (
      isUser ?
      component
      : <Redirect to="/signin" />
    )} />
  );
};

export default PrivateRoute;