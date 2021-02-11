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
import currentTime from '../../functions/currentTime'
import { useMutation, useQueryClient } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../api'

const styles = theme => ({
  card: {
    borderRadius: 5,
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
            Add Drink
          </Typography>
        </Button>
      </Box>
      <Box className={classes.boxB}>
        <DrinkInput 
          drinkType={drinkType}
          setDrink = {setDrinkType}
          cupsValue={cupsValue}
          setCupsValue={setCupsValue}
          volumeValue={volumeValue}
          setVolumeValue={setVolumeValue}
          time={time}
          setTime={setTime}
        />
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddDrinkArea);