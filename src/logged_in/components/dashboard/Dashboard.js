import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux';
import Welcome from './Welcome'
import Summary from './Summary'
import AddDrinkArea from "../addEvent/drink/AddDrinkArea"
import AddMealArea from "../addEvent/meal/AddMealArea"
import AccordionTable from "../accordion/AccordionTable"
import mealsCalculation from '../../functions/mealsCalculation'
import drinksCalculation from '../../functions/drinksCalculation'
import drinksConverter from '../../functions/drinksConverter'
import { GetMeals, GetDrinks } from './useAsync'

function Dashboard( { selectDashboard, userInfo }) {

  useEffect(selectDashboard, [selectDashboard]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('allTime')
  const UserId = userInfo.UserId;

  const mealsRequest = GetMeals(UserId)
  const drinksRequest = GetDrinks(UserId)
    
  const timeFramesToDays = {
    'week': 7,
    'month': 31,
    'allTime': 0,
  }

  const potentialMeals = [
    { meal: 'Breakfast' },
    { meal: 'Lunch' },
    { meal: 'Dinner' },
    { meal: 'Snack' },
  ];

  const mealColumns = [
    { id: 'time', label: 'Date', minWidth: 50, numeric: false,
      format: (value) => `${new Date(value).getDate()} ${new Date(value).toLocaleString('default', { month: 'short' })} ${new Date(value).getFullYear()}`
    },
    { id: 'description', label: 'Type', numeric: false },
    {
      id: 'meal',
      label: 'Meal',
      minWidth: 50,
      numeric: false,
      format: (value) => value.join(',\n')
    },
    {
      id: "actions",
      label: '',
      numeric: false,
      minWidth: 50,
    }
  ];

  const drinkColumns = [
    { id: 'time', label: 'Date', minWidth: 50, 
      format: (value) => `${new Date(value).getDate()} ${new Date(value).toLocaleString('default', { month: 'short' })} ${new Date(value).getFullYear()}`
    },
    { id: 'drink', label: 'Drink', minWidth: 50 },
    {
      id: 'volume',
      label: 'Volume',
      minWidth: 50,
      align: 'left',
    },
    {
      id: 'cups',
      label: 'Cups',
      minWidth: 50,
      align: 'left',
    },
    {
      id: "actions",
      label: '',
      numeric: false,
      minWidth: 50,
    }
  ];


  if ( [drinksRequest.status, mealsRequest.status].includes("loading") ) return <p>Loading....</p>
  if ( [drinksRequest.status, mealsRequest.status].includes("error") ) return <p>An error has been thrown</p>
  else { 

    const mealData = mealsRequest.data.data.getAllMeals;
    const drinkData = drinksConverter(drinksRequest.data.data.getAllDrinks, 250);
    const summaryMealsData = mealsCalculation(mealData, timeFramesToDays[selectedTimeframe])
    const summaryDrinksData = drinksCalculation(drinkData, timeFramesToDays[selectedTimeframe])

    return (
    
    <Fragment>
      <Welcome userInfo={userInfo}/>
      <Grid container>
        <Summary 
          summaryMealsData={summaryMealsData}
          summaryDrinksData={summaryDrinksData}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          />
      </Grid>
      <Grid container spacing ={6} style={{marginBottom: 15}}>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddDrinkArea UserId={UserId}/>
        </Grid>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddMealArea UserId={UserId} potentialMeals={potentialMeals}/>
        </Grid>
      </Grid>
      <AccordionTable 
        drinkData={drinkData} 
        UserId={UserId}
        tablename={'Drink'}
        drinkColumns={drinkColumns}
      />
      <AccordionTable 
        mealData={mealData} 
        UserId={UserId}
        tablename={'Meal'}
        mealColumns={mealColumns}
      />
    </Fragment>
  )}
}

export default Dashboard;
