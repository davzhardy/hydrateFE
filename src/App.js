import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClientProvider, QueryClient } from 'react-query'

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/a">
                  <LoggedInComponent />
                </Route>
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
