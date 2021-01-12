import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 0,
    },
  },
  appBarToolbar: {
    display: "flex",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
});


function Navbar(props) {

  const { classes } = props;

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.appBarToolbar}>
        <IconButton> 
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" color="primary">
          Menu
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default (withStyles(styles, { withTheme: true })(Navbar));
