import React, { Fragment } from "react";
import { 
  FormControlLabel,
  Box,
  Switch,
  Typography,
  Fade,
  withStyles
} from '@material-ui/core'


const styles = (theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(['background-color']),
  },
})

function SwitchElement( props ) {

  const { 
    name1,
    name2,
    fadeTrigger,
    handleSwitchChange,
    classes
  } = props;

  return (
    <Fragment>
      <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
        <Fade in={!fadeTrigger} timeout={500}>
          <Typography
            color="primary"  
          >
            {name1}
          </Typography>
        </Fade>
        <FormControlLabel
          ml={15}
          control={
            <Switch checked={fadeTrigger} onChange={handleSwitchChange} name="graphsSwitch" 
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
              }}
            />
          }
          color='primary'
        />
        <Fade in={fadeTrigger} timeout={500}>
          <Typography
            color="secondary"
          >
            {name2}
          </Typography>
        </Fade>
      </Box>
    </Fragment>
  )  
}

export default withStyles(styles, { withTheme: true })(SwitchElement);