import { combineReducers } from "redux";
import dialogReducer from './dialog' 
import userReducer from './user'
import searchReducer from './search'
import autocompleteReducer from './autocomplete'

export default combineReducers({ 
  dialog: dialogReducer,
  user: userReducer,
  search: searchReducer,
  autocomplete: autocompleteReducer,
});
