import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <LoggedInComponent />
            </Switch>
          </Suspense>
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
