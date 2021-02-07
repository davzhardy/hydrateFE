import React from "react";
import { 
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import DrinkTable from './drink/PaginationTable'
import MealTable from './meal/PaginationTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch } from 'react-redux'

function DataArea (props) {

  const { 
    data,
    tablename,
    UserId,
  } = props;

  const dispatch = useDispatch();

  const setDrinkSearchClosed = () => {
    dispatch({
      type: "SET_DRINKSEARCH_STATE",
      payload: false
    });
  }

  const setMealSearchClosed = () => {
    dispatch({
      type: "SET_MEALSEARCH_STATE",
      payload: false
    });
  }

  const clickHandler = () => {
    setDrinkSearchClosed();
    setMealSearchClosed();
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon onClick={clickHandler()}/>}>
        <Typography>{tablename} History</Typography>
      </AccordionSummary>
        {tablename === 'Drink' ? <DrinkTable data = {data}/> : <MealTable data={data} UserId={UserId}/> }
    </Accordion>
  )
}

export default DataArea;
