import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import DashboardIcon from "@material-ui/icons/Dashboard";
import ImageIcon from "@material-ui/icons/Image";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

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
  menuWrapper: {
    display: "flex",
    flexDirection: 'row',
  },
  },
});

function Navbar(props) {

  const { 
    selectedTab,
    classes
  } = props;

  const menuItems = [
    {
      link: "/a/dashboard",
      name: "Dashboard",
      // onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: "/a/graphs",
      name: "Graphs",
      // onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <ImageIcon
            className={
              selectedTab === "Posts" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <ImageIcon className="text-white" />,
      },
    },
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];
  

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.appBarToolbar}>
        <div className={classes.menuWrapper}>
          <IconButton> 
            <MenuIcon/>
          </IconButton>
        </div>
        <div>
          <Typography variant="h6" color="primary">
            Graphs
          </Typography>
          <Typography variant="h6" color="primary">
            Add Event
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default (withStyles(styles, { withTheme: true })(Navbar));
