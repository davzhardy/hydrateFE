import React, { Fragment } from "react";
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DataArea from "../datavisualisation/DataArea"
import MealGraph from '../graphs/MealGraphs'
import Legend from '../graphs/Legend'
import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'

function Dashboard() {

  const UserId = useSelector((state) => state.user.UserId);

  const { data, status } = useQuery("drinks", () => 
    fetch(endpoint, getOptions(queries.GET_ALL_DRINKS,UserId))
      .then(res => res.json()))

  const { data: data1, status: status1 } = useQuery("meals", () => 
    fetch(endpoint, getOptions(queries.GET_ALL_MEALS,UserId))
      .then(res => res.json()))

  if ( [status, status1].includes("loading") ) return <p>Loading....</p>
  if ( [status, status1].includes("error") ) return <p>An error has been thrown</p>

  return (
    <Fragment>
      <Grid container spacing ={6}>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddDrinkArea UserId={UserId}/>
        </Grid>
        <Grid item xs={12} sm={6} style={{display: 'flex'}}>
          <AddMealArea UserId={UserId}/>
        </Grid>
      </Grid>
      <DataArea data={data.data.getAllDrinks} tablename={'Drink'}/>  
      <DataArea 
        data={data1.data.getAllMeals} 
        UserId={UserId}
        tablename={'Meal'}
      />
      <MealGraph/>
      <Legend/>
    </Fragment>
  )
}

export default Dashboard;
