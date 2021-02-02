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
    <div>
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
