import React, { memo } from "react";
import PropsRoute from "../../shared/PropsRoutes";
import { Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";

const styles = (theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    width: "auto",
    [theme.breakpoints.up("xs")]: {
      width: "95%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "90%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "82.5%",
      marginLeft: "auto",
      marginRight: "auto",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      width: "70%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});

function Routing(props) {
  const {
    classes
  } = props;

  return (
    <div className={classes.wrapper}>
      <Switch>
        {/* <PropsRoute
          path="/c/posts"
          component={Posts}
          EmojiTextArea={EmojiTextArea}
          ImageCropper={ImageCropper}
          Dropzone={Dropzone}
          DateTimePicker={DateTimePicker}
          pushMessageToSnackbar={pushMessageToSnackbar}
          posts={posts}
          setPosts={setPosts}
          selectPosts={selectPosts}
        />
        <PropsRoute
          path="/c/subscription"
          component={Subscription}
          transactions={transactions}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectSubscription={selectSubscription}
          openAddBalanceDialog={openAddBalanceDialog}
        /> */}
        <PropsRoute
          path=""
          component={Dashboard}
          // toggleAccountActivation={toggleAccountActivation}
          // pushMessageToSnackbar={pushMessageToSnackbar}
          // CardChart={CardChart}
          // statistics={statistics}
          // targets={targets}
          // setTargets={setTargets}
          // isAccountActivated={isAccountActivated}
          // selectDashboard={selectDashboard}
        />
      </Switch>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(memo(Routing));