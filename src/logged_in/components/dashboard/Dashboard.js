import React, { Fragment } from "react";
import { Box, withStyles } from '@material-ui/core'
import { useSelector } from 'react-redux'
import AddDrinkArea from "../drink/AddDrinkArea"
import AddMealArea from "../meal/AddMealArea"
import DrinkDataArea from "../datavisualisation/drink/DrinkDataArea"
import MealDataArea from "../datavisualisation/meal/MealDataArea"
import { useQuery } from "react-query";
import { endpoint, queries, getOptions } from '../../../api'

const styles = theme => ({
  box: {
    display: 'flex',
    flexDirection: 'row',
  },
});


function Dashboard(props) {

  const { classes } = props;

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
      <Box className={classes.box}>
        <AddDrinkArea UserId={UserId}/>
        <AddMealArea UserId={UserId}/>
      </Box>
      <DrinkDataArea 
        data={data.data.getAllDrinks}
      />
      <MealDataArea 
        data={data1.data.getAllMeals}
      />
    </Fragment>
  )
}

export default  withStyles(styles, { withTheme: true })(Dashboard);
