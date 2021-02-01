import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  withStyles,
} from "@material-ui/core";
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
    brandText: {
      fontFamily: "'Baloo Bhaijaan', cursive",
      fontWeight: 400
    },
    menuLink: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
  },
});

function Navbar(props) {

  const { 
    selectedTab,
    classes
  } = props;


  const links = useRef([]);

  const menuItems = [
    {
      link: "/a/dashboard",
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
      link: "/a/graphs",
      name: "Graphs",
      icon: {
        desktop: (
          <ImageIcon
             color={
              selectedTab === "Graphs" ? "secondary" : "primary"
            }
            fontSize={
              selectedTab === "Graphs" ? "large" : "medium"
            }
          />
        ),
        mobile: (
          <ImageIcon
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
          <div>
          Hello
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
                      button
                      onClick={() => {
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
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default (withStyles(styles, { withTheme: true })(Navbar));
