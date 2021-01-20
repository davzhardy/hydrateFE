import React, { Fragment, useState, useEffect } from "react";
import { Card, withStyles } from "@material-ui/core"; 
import { useSelector } from "react-redux";
import DrinkChart from '../../../../shared/d3/DrinkChart';
import PaginationTable from './PaginationTable'

const styles = theme => ({
  card: {
    borderRadius: 15,
    margin: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

function DrinkDataArea (props) {

  const { 
    data,
    classes } = props;

  return (
    <Fragment>
      <Card className={classes.card}>
        <PaginationTable data = {data}/>
      </Card>
      <Card className={classes.card}>
        <DrinkChart width={200} height={400} data={data} />
      </Card>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(DrinkDataArea);
