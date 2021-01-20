import React, {memo} from "react";
import { withStyles } from "@material-ui/core";
import Routing from "./Routing";
import Footer from './footer/Footer'
import NavBar from './navigation/NavBar'

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
      <NavBar />
      <Routing />
      <p>Registration Placeholder</p>
      <p>Otherwise please register here</p>
      <Footer />
    </div>
  )

}

export default withStyles(styles, { withTheme: true })(memo(Main));
