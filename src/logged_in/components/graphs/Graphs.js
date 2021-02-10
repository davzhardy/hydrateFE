import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { 
  Box,
  Fade,
  Paper,
  Divider,
} from '@material-ui/core'
import ScatterGraph from './meals/ScatterGraph'
import PackingGraph from './meals/PackingGraph'
import WaffleGraph from './drinks/WaffleGraph'
import BarchartHorizontalGraph from './drinks/BarchartHorizontalGraph'
import { useQueryClient } from "react-query";
import CustomCheckbox from './CustomCheckbox'
import GraphCard from './GraphCard'
import SwitchElement from './SwitchElement'
import packingDataConverter from '../../functions/packingDataConverter'

// https://juba.github.io/scatterD3/articles/introduction.html
// https://github.com/juba/scatterD3/blob/master/inst/htmlwidgets/scatterD3-dots.js

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

  const queryClient = useQueryClient();
  const mealsData = queryClient.getQueryData('meals');
  const drinksData = queryClient.getQueryData('drinks');

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
      return mapEl
    })
    return dataWithValueAndConvertedTime
  }

  const scatterData = scatterDataConverter(mealsData)
  const packingData = packingDataConverter(mealsData.data.getAllMeals, 30)
  const barchartData = drinksData.data.getAllDrinks

  const mealsComponent = [ 
    ['mealA', <PackingGraph data={packingData}/>],
    ['mealB', <CreateScatterGraph dataInput={scatterData}/>],
  ]

  const drinksComponent = [
    ['drinkA', <WaffleGraph data={barchartData}/>],
    ['drinkB', <BarchartHorizontalGraph data={barchartData}/>]
  ]


  return (
    <Fragment>
      <SwitchElement 
        name1={'Drinks'}
        name2={'Meals'}
        fadeTrigger={switchChecked}
        handleSwitchChange={handleSwitchChange}
      />
      <Box display="grid" mt={2} mb={4}>
        <Fade in={!switchChecked} timeout={500} disableStrictModeCompat>
          <Box gridRow="1" gridColumn="1" display='flex' flexDirection='row' justifyContent='center' alignItems='center' >
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkA'}
              color={'primary'}
              label={'Waffle Graph'}
            />
            <CustomCheckbox
              checked={drinksChecked}
              handleChange={handleDrinksChange}
              name={'drinkB'}
              color={'primary'}
              label={'Horizontal Barchart'}
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
              label={'Packing Graph'}
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
        <GraphCard checked={drinksChecked} data={barchartData} components={drinksComponent} />
        : null
      }
      
    </Fragment>
  )  
}

export default Graphs;