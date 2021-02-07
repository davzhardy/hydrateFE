import { combineReducers } from "redux";
import dialogReducer from './dialog' 
import userReducer from './user'
import searchReducer from './search'

export default combineReducers({ 
  dialog: dialogReducer,
  user: userReducer,
  search: searchReducer,
});
