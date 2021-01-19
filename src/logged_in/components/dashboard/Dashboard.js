import React, { Fragment } from "react";
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DrinkDataArea from "../datavisualisation/drink/DrinkDataArea"
import MealDataArea from "../datavisualisation/meal/MealDataArea"
import { GET_ALL_DRINKS } from '../../../ApiService'

function Dashboard() {


  return (
    <Fragment>
      <AddDrinkArea />
      <AddMealArea />
      <DrinkDataArea />
      <MealDataArea />
    </Fragment>
  )
}

export default Dashboard;
