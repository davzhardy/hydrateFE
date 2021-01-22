import React, { useState } from "react";
import {
  Button,
  Box,
  Card,
  Typography,
  withStyles
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MealInput from './MealInput';
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
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-around',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
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

function AddMealArea(props) {

  const { UserId, classes } = props;
  const date = currentTime();

  const [description, setDescription] = useState('');
  const [mealValue, setMealValue] = useState('');
  const [time, setTime] = useState(date);

  const regex = /(,|\n)/g

  const payload = {
    UserId: UserId,
    description: description,
    meal: mealValue.replace(regex,',').split(','),
    time: time,
  }

  const queryClient = useQueryClient()

  const mealMutation = useMutation((newMeal) => 
    fetch(endpoint, mutateOptions(newMeal))
      .then(res => res.json())
    ,
    {
      onSuccess: () => queryClient.invalidateQueries('meals')
    }
  )

  const addEvent = () => {
    payload.meal = payload.meal.map(el =>el.trim())
    mealMutation.mutate(mutations.POST_MEAL(payload))
    setDescription('')
    setMealValue('')
    setTime(date)
  }

  return (
    <Card className={classes.card}>
      <Box className={classes.boxA}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={addEvent}
          className={classes.button}
        >
          <Typography>
            Add Meal
          </Typography>
        </Button>
      </Box>
      <Box className={classes.boxB}>
        <MealInput 
          defaultValue={description}
          stateSetting = {setDescription}
        />
        <TextFieldInput
          id={'meals'}
          label={'Meal'}
          multiline={true}
          rows={2}
          defaultValue={mealValue}
          stateSetting = {setMealValue}
          helperText={'Separate each dish with a comma or an enter'}
          variant={'standard'}
        />
        <TextFieldInput
          id={'time-of-meal'}
          label={'Time'}
          defaultValue={time}
          stateSetting = {setTime}
          type={'datetime-local'}
          variant={'standard'}
      />
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddMealArea);