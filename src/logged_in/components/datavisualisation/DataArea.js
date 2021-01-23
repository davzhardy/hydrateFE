import React from "react";
import { 
  Card, 
  withStyles, 
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import DrinkChart from '../../../shared/d3/DrinkChart';
import DrinkTable from './drink/PaginationTable'
import MealTable from './meal/PaginationTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  card: {
    borderRadius: 15,
    margin: 10,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  accordionSummary : {
    backgroundColor: 'green'
  },
});

function DataArea (props) {

  const { 
    data,
    tablename,
    classes } = props;

  return (
    <Accordion>
      <AccordionSummary backgroundColor={'green'} expandIcon={<ExpandMoreIcon />}>
        <Typography>{tablename} Information</Typography>
      </AccordionSummary>
      {/* <Card className={classes.card}> */}
        {tablename === 'Drink' ? <DrinkTable data = {data}/> : <MealTable data = {data}/> }
      {/* </Card> */}
      <Card className={classes.card}>
        <DrinkChart width={200} height={400} data={data} />
      </Card>
    </Accordion>
  )
}

export default withStyles(styles, { withTheme: true })(DataArea);
