import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClientProvider, QueryClient } from 'react-query'
import LoadingScreen from './shared/LoadingScreen'
import PrivateRoute from './shared/PrivateRoute'

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Suspense fallback={<LoadingScreen />}>
              <Switch>
                <PrivateRoute component={<LoggedInComponent />} path="/a"/>
                <Route>
                  <LoggedOutComponent />
                </Route>
              </Switch>
            </Suspense>
          </MuiThemeProvider>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
