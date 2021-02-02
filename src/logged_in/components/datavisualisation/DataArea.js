import React from "react";
import { 
  Card, 
  withStyles, 
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import DrinkTable from './drink/PaginationTable'
import MealTable from './meal/PaginationTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function DataArea (props) {

  const { 
    data,
    tablename,
    UserId,
  } = props;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{tablename} History</Typography>
      </AccordionSummary>
        {tablename === 'Drink' ? <DrinkTable data = {data}/> : <MealTable data={data} UserId={UserId}/> }
    </Accordion>
  )
}

export default DataArea;
