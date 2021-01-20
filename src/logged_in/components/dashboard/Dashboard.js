import React, { Fragment } from "react";
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DrinkDataArea from "../datavisualisation/drink/DrinkDataArea"
import MealDataArea from "../datavisualisation/meal/MealDataArea"
import ApiService from '../../../ApiService'
import { useQuery, useQueryClient } from "react-query";
import { endpoint, queries, mutations, getOptions, mutateOptions } from '../../../api'


function Dashboard() {

  // need to make this dynamic
  const UserId = 2;

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
      <ApiService />
      {/* <AddDrinkArea />
      <AddMealArea /> */}
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
