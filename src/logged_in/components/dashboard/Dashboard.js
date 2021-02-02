import React, { Fragment, useEffect } from "react";
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DataArea from "../datavisualisation/DataArea"

import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'

function Dashboard( { selectDashboard, userInfo }) {

  useEffect(selectDashboard, [selectDashboard]);
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

  const potentialMeals = [
    { meal: 'Breakfast' },
    { meal: 'Lunch' },
    { meal: 'Dinner' },
    { meal: 'Snack' },
  ];


  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>
  else { 
    return (
    
    <Fragment>
      <Grid container spacing ={6} style={{marginBottom: 15}}>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddDrinkArea UserId={UserId}/>
        </Grid>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddMealArea UserId={UserId} potentialMeals={potentialMeals}/>
        </Grid>
      </Grid>
      <DataArea data={data.data.getAllDrinks} tablename={'Drink'}/>  
      <DataArea 
        data={data1.data.getAllMeals} 
        UserId={UserId}
        tablename={'Meal'}
      />
    </Fragment>
  )}

  
}

export default Dashboard;
