import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { 
  Box,
  Fade,
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
import drinksConverter from '../../functions/drinksConverter'
import scatterDataConverter from '../../functions/scatterDataConverter'

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
    return <ScatterGraph data={dataInput}/>;
  })

  const CreatePackingGraph = React.memo(function({dataInput}) {
    return <PackingGraph data={dataInput}/>;
  })

  const CreateWaffleGraph = React.memo(function({dataInput}) {
    return <WaffleGraph data={dataInput}/>;
  })
 
  const CreateBarchartHorizontalGraph = React.memo(function({dataInput}) {
    return <BarchartHorizontalGraph data={dataInput}/>;
  })

  const packingData = packingDataConverter(mealsData.data.getAllMeals, 30)
  const barchartData = drinksConverter(drinksData.data.getAllDrinks, 200)

  const mealsComponent = [ 
    ['mealA', <CreatePackingGraph dataInput={packingData}/>],
    ['mealB', <CreateScatterGraph dataInput={mealsData.data.getAllMeals}/>],
  ]

  const drinksComponent = [
    ['drinkA', <CreateWaffleGraph dataInput={barchartData}/>],
    ['drinkB', <CreateBarchartHorizontalGraph dataInput={barchartData}/>]
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