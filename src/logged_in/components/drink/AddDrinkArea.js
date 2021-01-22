import React, { useState } from "react";
import {
  Card,
  Box,
  Button,
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
    width: '100%',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  boxA: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  boxB: {
    display: 'flex',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
  },
  button: {
    marginBottom: 15,
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    }
  }
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
      <Box className={classes.boxA}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={addHydrationEvent}
          className={classes.button}
        >
          <Typography>
            Add Hydration Event
          </Typography>
        </Button>
      </Box>
      <Box className={classes.boxB}>
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
          variant={'standard'}
        />
        <TextFieldInput
          id={'volume-drunk'}
          label={'Volume'}
          defaultValue={volumeValue}
          stateSetting = {setVolumeValue}
          helperText={'How many mililitres you drank'}
          variant={'standard'}
        />
        <TextFieldInput
          id={'time-of-drink'}
          label={'Time'}
          defaultValue={time}
          stateSetting = {setTime}
          type={'datetime-local'}
          variant={'standard'}
          // styles={{height:0}}
        />
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddDrinkArea);