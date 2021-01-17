import React, { Fragment } from "react";
import AddDrinkArea from "../drink/AddDrinkArea"
import DrinkDataArea from "../datavisualisation/drink/DrinkDataArea"

function Dashboard() {

  return (
    <Fragment>
      <AddDrinkArea />
      <DrinkDataArea />
    </Fragment>
  )
}

export default Dashboard;
