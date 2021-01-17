import React, { Fragment, useState, useEffect } from "react";
import { Card, withStyles } from "@material-ui/core"; 
import { useSelector } from "react-redux";
import DrinkChart from '../../../../shared/DrinkChart';
import PaginationTable from './PaginationTable'

const styles = theme => ({
  card: {
    borderRadius: 15,
    margin: 10,
    maxWidth: 450,
    display: 'flex',
    flexDirection: 'column',
  },
});

function DrinkDataArea (props) {

  const { classes } = props;
  const addDrinkEvent = useSelector((state) => state.drink.events);

  return (
    <Fragment>
      <Card className={classes.card}>
        <PaginationTable />
      </Card>
      <Card className={classes.card}>
        <DrinkChart width={200} height={400} data={addDrinkEvent} />
      </Card>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(DrinkDataArea);
