import React, { useState } from "react";
import { 
  Accordion,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import DrinkTable from './drink/PaginationTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MealTable from './meal/PaginationTable'
import { useDispatch, useSelector } from 'react-redux'

function AccordionTable (props) {

  const { 
    mealData,
    drinkData,
    tablename,
    UserId,
    mealColumns,
    drinkColumns,
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
        {tablename === 'Meal' ? <MealTable data={mealData} UserId={UserId} columns={mealColumns}/>
        :
        <DrinkTable data={drinkData} UserId={UserId} columns={drinkColumns} />
        }
    </Accordion>
  )
}

export default AccordionTable;
