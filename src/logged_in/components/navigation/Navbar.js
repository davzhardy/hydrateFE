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
import DashboardIcon from "@material-ui/icons/Dashboard";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import BarChartIcon from "@material-ui/icons/BarChart";

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
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    justifyContent: "space-between",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7),
    },
    [theme.breakpoints.up("md")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      marginLeft: theme.spacing(11),
      marginRight: theme.spacing(11),
    },
    [theme.breakpoints.up("lg")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginLeft: theme.spacing(15),
      marginRight: theme.spacing(15),
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

function Navbar(props) {

  const { 
    selectedTab,
    userInfo,
    classes
  } = props;

  const links = useRef([]);

  const menuItems = [
    {
      link: "/dashboard",
      name: "Dashboard",
      icon: {
        desktop: (
          <DashboardIcon
            color={
              selectedTab === "Dashboard" ? "secondary" : "primary"
            }
            fontSize={
              selectedTab === "Dashboard" ? "large" : "medium"
            }
          />
        ),
        mobile: (
          <DashboardIcon
            color={
              selectedTab === "Dashboard" ? "secondary" : "primary"
            }
            fontSize="medium"
          />
        ),
      },
    },
    {
      link: "/graphs",
      name: "Graphs",
      icon: {
        desktop: (
          <BarChartIcon
             color={
              selectedTab === "Graphs" ? "secondary" : "primary"
            }
            fontSize={
              selectedTab === "Graphs" ? "large" : "medium"
            }
          />
        ),
        mobile: (
          <BarChartIcon
             color={
              selectedTab === "Graphs" ? "secondary" : "primary"
            }
            fontSize="medium"
          />
        ),
      },
    },
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon color="primary" fontSize="medium" />
        ),
        mobile: <PowerSettingsNewIcon color="primary" fontSize="medium" />,
      },
    },
  ];
  

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <div>
          <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                Dr
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                Ink
              </Typography>
          </div>
          <Box
            display="flex"
            alignItems="center"
          >
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="bottom"
                  key={element.name}
                >
                  <IconButton
                    selected={selectedTab === element.name}
                    className={classes.menuButton}
                    color="secondary"
                    onClick={() => {
                      console.log(links)
                      links.current[index].click();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    {element.icon.desktop}
                  </IconButton>
                </Tooltip>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default (withStyles(styles, { withTheme: true })(Navbar));
