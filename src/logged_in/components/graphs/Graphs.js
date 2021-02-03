import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { 
  FormControlLabel,
  Box,
  Switch,
  Typography,
  Fade,
  Paper,
  withStyles
} from '@material-ui/core'
import CircleGraph from './CircleGraph'
import ScatterGraph from './ScatterGraph'
import { useQueryClient } from "react-query";
import graphDataConverter from '../../functions/graphDataConverter'
import CustomCheckbox from './CustomCheckbox'

const styles = (theme) => ({
  switchBase: {
    color: theme.palette.primary.main,
  },
  track: {
    backgroundColor: theme.palette.primary.main,
    transition: theme.transitions.create(['background-color']),
  },
})

function Graphs( props ) {

  const { selectGraphs, classes } = props;

  useEffect(selectGraphs, [selectGraphs]);
  const [switchChecked, setSwitchChecked] = useState(false)

  // should be migrated onto db and saved in user preferences to persist selections between sessions
  const [mealsChecked, setMealsChecked] = useState({
    mealA: true,
    mealB: false,
  })
  const [drinksChecked, setDrinksChecked] = useState({
    drinkA: true,
    drinkB: false,
  })

  // const drinksData = queryClient.getQueryData('drinks')
  const UserId = useSelector((state) => state.user.UserId);

  const handleSwitchChange = () => {
    setSwitchChecked(!switchChecked)
  }
  const handleMealsChange = (e) => {
    setMealsChecked({...mealsChecked, [e.target.name]: e.target.checked})
  }
  const handleDrinksChange = (e) => {
    setDrinksChecked({...drinksChecked, [e.target.name]: e.target.checked})
  }

  const potentialMeals = [
    { meal: 'Breakfast', value: 1 },
    { meal: 'Lunch', value: 2 },
    { meal: 'Dinner', value: 4 },
    { meal: 'Snack', value: 3 },
  ];

  const circleOutputFormat = {
    name: "flare",
    children: ''
  }

  const queryClient = useQueryClient();
  const mealsData = queryClient.getQueryData('meals');

  const CreateCircleGraph = React.memo(function({dataInput}) {
    graphDataConverter(mealsData, potentialMeals, circleOutputFormat);
    return <CircleGraph data={dataInput}/>;
  })

  const CreateScatterGraph = React.memo(function({dataInput}) {
    graphDataConverter(mealsData, potentialMeals, circleOutputFormat);
    return <ScatterGraph data={dataInput}/>;
  })

  const scatterDataConverter = (dataInput) => {
    const data = dataInput.data.getAllMeals.slice();
    const dataWithValueAndConvertedTime = data.map(mapEl => {
      const identifier = potentialMeals.filter(filterEl => {
        return filterEl.meal === mapEl.description
      })
      mapEl.value = identifier[0].value

      const timeRegex = /^(\d{4}-\d{2}-\d{2}T)/gm
      mapEl.time = mapEl.time.replace(timeRegex,'')

      return mapEl
    })
    return dataWithValueAndConvertedTime
  }

  scatterDataConverter(mealsData)

  return (
    <Fragment>
      <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
        <Fade in={!switchChecked} timeout={500}>
          <Typography
            color="primary"  
          >
            Drinks
          </Typography>
        </Fade>
        <FormControlLabel
          ml={15}
          control={
            <Switch checked={switchChecked} onChange={handleSwitchChange} name="graphsSwitch" 
              classes={{
                switchBase: classes.switchBase,
                track: classes.track,
              }}
            />
          }
          color='primary'
        />
        <Fade in={switchChecked} timeout={500}>
          <Typography
            color="secondary"
          >
            Meals
          </Typography>
        </Fade>
      </Box>
      <Box display="grid" mt={2} mb={4}>
        <Fade in={!switchChecked} timeout={500} disableStrictModeCompat>
          <Box gridRow="1" gridColumn="1" display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkA'}
              color={'primary'}
              label={'Placeholder'}
            />
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkB'}
              color={'primary'}
              label={'Placeholder'}
            />
          </Box>
        </Fade>
        <Fade in={switchChecked} timeout={500} disableStrictModeCompat>
          <Box gridRow="1" gridColumn="1" display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <CustomCheckbox
              checked={mealsChecked}
              handleChange={handleMealsChange}
              name={'mealA'}
              color={'secondary'}
              label={'Circles Graph'}
            />
            <CustomCheckbox
              checked={mealsChecked}
              handleChange={handleMealsChange}
              name={'mealB'}
              color={'secondary'}
              label={'Scatter Graph'}
            />
          </Box>
        </Fade>
      </Box>
      <Paper>
        {mealsChecked.mealA && mealsData ? <CreateCircleGraph dataInput={circleOutputFormat}/> : null }
        {mealsChecked.mealB && mealsData ? <CreateScatterGraph dataInput={circleOutputFormat}/> : null }
      </Paper>
    </Fragment>
  )  
}

export default withStyles(styles, { withTheme: true })(Graphs);