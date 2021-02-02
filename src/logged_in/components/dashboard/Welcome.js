import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import Emoji from '../../../shared/Emoji'

const styles = theme => ({
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
    justifyContent: "space-between",
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
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    cursor: 'default'
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  welcome: {
    cursor: 'default'
  }
});

function Welcome(props) {

  const { 
    userInfo,
    classes
  } = props;

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        flexDirection='row'
        justifyContent="flex-start"
        width='100%'
        alignItems="center"
        ml={2}
        mb={5}
      >
        <Typography
          color="textPrimary"
          variant="h4"
          className={classes.welcome}
        >
          Heya, {userInfo.username} &nbsp;
        </Typography>
        <Emoji 
          label={'wave'}
          symbol={'👋'}
        />
      </Box>
     </div>
  );
}

export default (withStyles(styles, { withTheme: true })(Welcome));
