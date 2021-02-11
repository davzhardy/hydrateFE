import React from "react";
import { useDispatch } from 'react-redux'
import {
  Grid,
  Typography,
  Button,
  Box,
  withStyles,
  Hidden,
  withWidth,
  isWidthUp,
} from "@material-ui/core";

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButtonTop: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  extraLargeButtonBottom: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  }
});

function HeadCard(props) {
  const { classes, width } = props;

  const dispatch = useDispatch();

  const setDialogOpen = (dialog) => {
    dispatch({
      type: "SET_OPEN_DIALOG",
      payload: dialog
    });
  }

  return (
    <Box justifyContent="space-between" className="row">
      <Box mb={4}>
        <Typography
          variant={isWidthUp("lg", width) ? "h3" : "h4"}
        >
          Welcome to your meal and hydration logging application
        </Typography>
      </Box>
      <Grid item xs={12} md={5}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          mb={2}
        >
          <div>
            <Box 
              mb={2}
            >
              <Typography
                variant={isWidthUp("lg", width) ? "h6" : "body1"}
                color="textSecondary"
                align="center"
              >
                Login to get started
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.extraLargeButtonTop}
              classes={{ label: classes.extraLargeButtonLabel }}
              onClick={()=>setDialogOpen('login')}
            >
              Login
            </Button>
            <Box 
              mb={2}
            >
            <Typography
                variant={isWidthUp("lg", width) ? "h6" : "body1"}
                color="textSecondary"
                align="center"
              >
                Or register here
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.extraLargeButtonBottom}
              classes={{ label: classes.extraLargeButtonLabel }}
              onClick={()=>setDialogOpen('login')}
            >
              Register
            </Button>
          </div>
        </Box>
      </Grid>
      <Hidden smDown>
      <Grid item xs={12} md={5}>
      <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          <div>
            <Box mb={2}>
              <Typography
                variant={isWidthUp("lg", width) ? "h6" : "body1"}
                color="textSecondary"
                align="center"
              >
                Or register here
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.extraLargeButton}
              classes={{ label: classes.extraLargeButtonLabel }}
              onClick={()=>setDialogOpen('register')}
            >
              Register
            </Button>
          </div>
        </Box>
      </Grid>
      </Hidden>
    </Box>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadCard)
);
