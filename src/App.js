import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";

import { Provider } from "react-redux";
import store from "./redux/store";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));


function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Suspense fallback={<div>Loading...</div>}>
          <LoggedInComponent />
        </Suspense>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
