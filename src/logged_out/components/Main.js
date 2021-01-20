import React, {memo} from "react";
import Routing from "./Routing";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {

  const { classes } = props;

  return (
    <div className={classes.wrapper}>
      <p>Navbar Placeholder</p>
      <Routing />
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(memo(Main));
