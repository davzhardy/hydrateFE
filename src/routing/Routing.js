import React, { useState, useEffect, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routesDefined from "./routes";

const Router = () => {
  const LoggedInComponent = lazy(() => import("../logged_in/components/Main"));
  const LoggedOutComponent = lazy(() => import("../logged_out/components/Main"));

  const [routes, setRoutes] = useState([]);

  // useEffect(() => {
  //   importRoutes();
  // },[]);

  // const importRoutes = async () => {
  //   const importPromises = routesDefined.map((item) =>
  //     import(`../../containers/${item.component}`).then((module) =>
  //       setRoutes((routes) => [
  //         ...routes,
  //         {
  //           to: item.to,
  //           title: item.title,
  //           isPrivate: item.isPrivate,
  //           exact: item.exact,
  //           Component: module.default,
  //         },
  //       ])
  //     )
  //   );
  //   await Promise.all(importPromises);
  // };
  

  return (
    <Switch>
      <Route path="/loggedIn">
        <LoggedInComponent />
      </Route>
      <Route >
        <LoggedOutComponent />
      </Route>
    </Switch>
    // <Switch>
    //   {routes?.map((route) => {
    //     if (route.isPrivate) {
    //       return (
    //         <PrivateRoute
    //           key={`${route.to}-${route.title}`}
    //           path={route.to}
    //           exact={route.exact}
    //           render={() => (
    //             <route.Component />
    //           )}
    //         />
    //       );
    //     } else if (!route.isPrivate) {
    //       return (
    //         <Route
    //           key={`${route.to}-${route.title}`}
    //           path={route.to}
    //           render={() => (
    //             <Layout >
    //               <route.Component />
    //             </Layout>
    //           )}
    //         />
    //       );
    //     }
    //   })
    // }
    // </Switch>
  );
};

export { Router };
