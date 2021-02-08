import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { 
  Box,
  Fade,
  Paper,
  Divider,
} from '@material-ui/core'
import CircleGraph from './CircleGraph'
import ScatterGraph from './ScatterGraph'
import PackingGraph from './PackingGraph'
import { useQueryClient } from "react-query";
import graphDataConverter from '../../functions/graphDataConverter'
import CustomCheckbox from './CustomCheckbox'
import GraphCard from './GraphCard'
import SwitchElement from './SwitchElement'
import packingDataConverter from '../../functions/packingDataConverter'

function Graphs( props ) {

  const { selectGraphs } = props;

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
  const drinksData = queryClient.getQueryData('drinks');

  const CreateCircleGraph = React.memo(function({dataInput}) {
    graphDataConverter(mealsData, potentialMeals, circleOutputFormat);
    return <CircleGraph data={dataInput}/>;
  })

  const CreateScatterGraph = React.memo(function({dataInput}) {
    scatterDataConverter(mealsData);
    return <ScatterGraph data={dataInput}/>;
  })

  const scatterDataConverter = (dataInput) => {
    const data = dataInput.data.getAllMeals.slice();
    const dataWithValueAndConvertedTime = data.map(mapEl => {
      const identifier = potentialMeals.filter(filterEl => {
        return filterEl.meal === mapEl.description
      })
      mapEl.value = identifier[0].value

      // const timeRegex = /^(\d{4}-\d{2}-\d{2}T)/gm
      // mapEl.time = mapEl.time.replace(timeRegex,'')

      return mapEl
    })
    return dataWithValueAndConvertedTime
  }

  const scatterData = scatterDataConverter(mealsData)

  const mealsComponent = [ 
    // ['mealA', <CreateCircleGraph dataInput={circleOutputFormat}/>],
    // ['mealA', <PackingGraph data={mealsData.data.getAllMeals}/>]
    ['mealB', <CreateScatterGraph dataInput={scatterData}/>],
  ]

  const packingData = packingDataConverter(mealsData.data.getAllMeals, 30)

  return (
    <Fragment>
      <SwitchElement 
        name1={'Drinks'}
        name2={'Meals'}
        fadeTrigger={switchChecked}
        handleSwitchChange={handleSwitchChange}
      />
      <PackingGraph data={packingData}/>
      <Box display="grid" mt={2} mb={4}>
        <Fade in={!switchChecked} timeout={500} disableStrictModeCompat>
          <Box gridRow="1" gridColumn="1" display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkA'}
              color={'primary'}
              label={'Placeholder1'}
            />
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkB'}
              color={'primary'}
              label={'Placeholder2'}
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
      { switchChecked ?
        <GraphCard checked={mealsChecked} data={mealsData.data.getAllMeals} components={mealsComponent} />  
        : null
      }
      { !switchChecked ?
        <Paper>
          {drinksChecked.drinkA && drinksData ? 'Placeholder1' : null }
          {drinksChecked.drinkA && drinksChecked.drinkB ? <Divider/> : null}
          {mealsChecked.drinkB && drinksData ? 'Placeholder2' : null }
        </Paper>
        : null
      }
      
    </Fragment>
  )  
}

export default Graphs;