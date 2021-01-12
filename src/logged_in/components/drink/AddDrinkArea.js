import React, { useCallback } from "react";
import {
  Card,
  Typography,
  withStyles
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DrinkInput from './DrinkInput';
import TimeInput from './TimeInput';
import TextFieldInput from './TextFieldInput';

const styles = theme => ({
  card: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
});

function AddDrinkArea(props) {

  const { classes } = props;

  const addHydrationEvent = useCallback(() => {
    console.log('OK')
  })

  return (
    <Card className={classes.card}>
      <AddIcon 
        onClick={addHydrationEvent}
        color="primary"
      />      
      <Typography 
        variant="subtitle1"
        color="primary"
      >
        Add Hydration Event
      </Typography>
      <DrinkInput />
      <TextFieldInput 
        id={'cups-drunk'}
        label={'Cups'}
        defaultValue={'1'}
        helperText={'How many cups you drank'}
        variant={'filled'}
      />
      <TextFieldInput 
        id={'volume-drunk'}
        label={'Volume'}
        defaultValue={'150'}
        helperText={'How many ml you drank'}
        variant={'filled'}
      />
      <TimeInput />



    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddDrinkArea);