import React, { Fragment } from "react";
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DrinkDataArea from "../datavisualisation/drink/DrinkDataArea"
import MealDataArea from "../datavisualisation/meal/MealDataArea"
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
      <Grid container spacing ={1}>
        <Grid item xs={12} sm={6}>
          <AddDrinkArea UserId={UserId}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AddMealArea UserId={UserId}/>
        </Grid>
      </Grid>
      <DrinkDataArea 
        data={data.data.getAllDrinks}
      />
      <MealDataArea 
        data={data1.data.getAllMeals}
      />
    </Fragment>
  )
}

export default Dashboard;
