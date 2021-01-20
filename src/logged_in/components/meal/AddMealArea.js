import React, { useState } from "react";
import {
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
    maxWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
  },
});

function AddMealArea(props) {

  const { classes } = props;
  const date = currentTime();

  const [description, setDescription] = useState('');
  const [mealValue, setMealValue] = useState('');
  const [time, setTime] = useState(date);

  const regex = /(,|\n)/g

  const payload = {
    UserId: 2,
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
      <AddIcon 
        onClick={addEvent}
        color="primary"
      />      
      <Typography 
        variant="subtitle1"
        color="primary"
      >
        Add Meal
      </Typography>
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
        variant={'filled'}
      />
      <TextFieldInput
        id={'time-of-meal'}
        label={'Time'}
        defaultValue={time}
        stateSetting = {setTime}
        type={'datetime-local'}
        variant={'filled'}
      />
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddMealArea);