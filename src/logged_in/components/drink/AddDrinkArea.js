import React, { useState } from "react";
import {
  Card,
  Typography,
  withStyles
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DrinkInput from './DrinkInput';
import TextFieldInput from '../../../shared/TextFieldInput';
import currentTime from '../../functions/currentTime'
import { useMutation, useQueryClient } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../api'

const styles = theme => ({
  card: {
    borderRadius: 15,
    margin: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

function AddDrinkArea(props) {

  const { UserId, classes } = props;
  const date = currentTime();

  const [drinkType, setDrinkType] = useState('');
  const [cupsValue, setCupsValue] = useState('');
  const [volumeValue, setVolumeValue] = useState('');
  const [time, setTime] = useState(date);

  const payload = {
    UserId: UserId,
    drink: drinkType,
    cups: +cupsValue,
    volume: +volumeValue,
    time: time,
  }

  const queryClient = useQueryClient()
  
  // should this function be moved to the api index?
  const drinkMutation = useMutation((newDrink) => 
    fetch(endpoint, mutateOptions(newDrink))
      .then(res => res.json())
      ,
    {
      onSuccess: () => queryClient.invalidateQueries('drinks') // note this needs to be consistent with the useQuery 
    }
  )

  const addHydrationEvent = () => {
    drinkMutation.mutate(mutations.POST_DRINK(payload))
    setDrinkType('')
    setCupsValue('')
    setVolumeValue('')
    setTime(date)
  }

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
      <DrinkInput 
        defaultValue={drinkType}
        stateSetting = {setDrinkType}
      />
      <TextFieldInput 
        id={'cups-drunk'}
        label={'Cups'}
        defaultValue={cupsValue}
        stateSetting = {setCupsValue}
        helperText={'How many cups you drank'}
        variant={'filled'}
      />
      <TextFieldInput
        id={'volume-drunk'}
        label={'Volume'}
        defaultValue={volumeValue}
        stateSetting = {setVolumeValue}
        helperText={'How many mililitres you drank'}
        variant={'filled'}
      />
      <TextFieldInput
        id={'time-of-drink'}
        label={'Time'}
        defaultValue={time}
        stateSetting = {setTime}
        type={'datetime-local'}
        variant={'filled'}
      />
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddDrinkArea);