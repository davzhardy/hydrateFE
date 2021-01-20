import { combineReducers } from "redux";
import drinkReducer from "./drink";
import mealReducer from "./meal";
import dialogReducer from './dialog' 

export default combineReducers({ 
  drink: drinkReducer, 
  meal: mealReducer,
  dialog: dialogReducer,
});
