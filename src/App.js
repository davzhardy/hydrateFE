import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Suspense fallback={<div>Loading...</div>}>
        <LoggedInComponent />
      </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
