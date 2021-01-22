import React, { Fragment } from "react";
import { Card, withStyles, Accordion } from "@material-ui/core";
import DrinkChart from '../../../shared/d3/DrinkChart';
import DrinkTable from './drink/PaginationTable'
import MealTable from './meal/PaginationTable'

const styles = theme => ({
  card: {
    borderRadius: 15,
    margin: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

function DataArea (props) {

  const { 
    data,
    tablename,
    classes } = props;

  return (
    <Fragment>
      <Card className={classes.card}>
        {tablename === 'drink' ? <DrinkTable data = {data}/> : <MealTable data = {data}/> }
      </Card>
      <Card className={classes.card}>
        <DrinkChart width={200} height={400} data={data} />
      </Card>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(DataArea);
