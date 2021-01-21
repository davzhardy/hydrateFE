import { combineReducers } from "redux";
import dialogReducer from './dialog' 
import userReducer from './user'

export default combineReducers({ 
  dialog: dialogReducer,
  user: userReducer,
});
