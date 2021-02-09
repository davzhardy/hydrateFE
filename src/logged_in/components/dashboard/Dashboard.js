import React, { Fragment, useEffect, useState } from "react";
import { Grid } from '@material-ui/core'
import Welcome from './Welcome'
import Summary from './Summary'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import AccordionTable from "../accordion/AccordionTable"
import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'
import mealsCalculation from '../../functions/mealsCalculation'
import drinksCalculation from '../../functions/drinksCalculation'

function Dashboard( { selectDashboard, userInfo }) {

  useEffect(selectDashboard, [selectDashboard]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const UserId = userInfo.UserId;

  const { data, status } = useQuery(
    "drinks", 
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_DRINKS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
    // {
    //   onSuccess: (data) => dataFunction(data)
    // }
  )

  const { data: data1, status: status1 } = useQuery(
    "meals",
    async () => 
      fetch(endpoint, getOptions(queries.GET_ALL_MEALS,UserId))
        .then(res => res.json())
        .catch((err) => {
          console.log('Error:', JSON.stringify(err)) //eslint-disable-line no-console
        }),
    // {
    //   onSuccess: (data) => dataFunction(data)
    // }
  )
    
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


  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>
  else { 

    const mealData = data1.data.getAllMeals;
    const drinkData = data.data.getAllDrinks;
    const summaryMealsData = mealsCalculation(mealData, timeFramesToDays[selectedTimeframe])
    const summaryDrinksData = drinksCalculation(drinkData, timeFramesToDays[selectedTimeframe])
    console.log(summaryDrinksData)

    return (
    
    <Fragment>
      <Welcome userInfo={userInfo}/>
      <Grid container>
        <Summary 
          summaryMealsData={summaryMealsData}
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
      <AccordionTable data={drinkData} tablename={'Drink'}/>  
      <AccordionTable 
        data={mealData} 
        UserId={UserId}
        tablename={'Meal'}
      />
    </Fragment>
  )}

  
}

export default Dashboard;
