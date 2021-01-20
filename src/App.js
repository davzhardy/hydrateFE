import React, { Suspense, lazy } from "react";
import GlobalStyles from "./GlobalStyles";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./theme";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClientProvider, QueryClient } from 'react-query'

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
