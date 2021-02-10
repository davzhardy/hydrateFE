import React, { useState } from "react";
import { 
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import DrinkTable from './drink/PaginationTable'
import MealTable from './meal/PaginationTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from 'react-redux'

function AccordionTable (props) {

  const { 
    data,
    tablename,
    UserId,
  } = props;

  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false); 

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

  const clickHandler = () => (event, isExpanded) => {
    setExpanded(isExpanded ? !expanded : false)
    setDrinkSearchClosed();
    setMealSearchClosed();
  }
  const searchState = useSelector((state) => state.search.mealSearchState)

  return (
    <Accordion expanded={expanded} onChange={clickHandler()}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{tablename} History</Typography>
      </AccordionSummary>
        {tablename === 'Drink' ? <DrinkTable data = {data}/> : <MealTable data={data} UserId={UserId}/> }
    </Accordion>
  )
}

export default AccordionTable;
