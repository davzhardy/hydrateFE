import { combineReducers } from "redux";
import drinkReducer from "./drink";
import mealReducer from "./meal";

export default combineReducers({ 
  drink: drinkReducer, 
  meal: mealReducer,
});
