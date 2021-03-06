import React, { useState } from "react";
import {
  Button,
  Box,
  Card,
  Typography,
  withStyles
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MealInputs from './MealInputs';
import InputDialog from './InputDialog';
import currentTime from '../../../functions/currentTime';
import { useMutation, useQueryClient } from "react-query";
import { endpoint, mutations, mutateOptions } from '../../../../api'
import ReactGA from 'react-ga';

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
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 'none',
    }
  }
});

function AddMealArea(props) {

  const { 
    UserId,
    potentialMeals,
    classes
  } = props;
  
  const date = currentTime();

  const [description, setDescription] = useState('');
  const [mealValue, setMealValue] = useState('');
  const [time, setTime] = useState(date);
  const [dialogOpen, setDialogOpen] = useState(false);

  const regex = /(,|\n)/g

  const payload = {
    UserId: UserId,
    description: description.meal,
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
    if (mealValue.length && description.meal.length) {
      payload.meal = payload.meal.map(el =>el.trim())
      mealMutation.mutate(mutations.POST_MEAL(payload))
      ReactGA.event({
        category: 'Add Meal',
        action: `User: ${payload.UserId}, Meal: ${payload.description}`,
        label: `${payload.time}`
      })
      setDescription('')
      setMealValue('')
      setTime(date)
    }
    else {
      setDialogOpen(true)
    }
  }

  const onDialogSubmit = () => {
    setDialogOpen(false)
  }

  return (
    <Card className={classes.card}>
      <Box className={classes.boxA}>
      {dialogOpen ?
      <InputDialog
        onClose={onDialogSubmit}
      />
      : null}
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={addEvent}
          className={classes.button}
        >
          <Typography>
            Add meal
          </Typography>
        </Button>
      </Box>
      <Box className={classes.boxB}>
        <MealInputs 
          potentialMeals={potentialMeals}
          description={description}
          setDescription={setDescription}
          mealValue={mealValue}
          setMealValue={setMealValue}
          time={time}
          setTime={setTime}
        />
      </Box>
    </Card>
  )
}

export default withStyles(styles, { withTheme: true })(AddMealArea);