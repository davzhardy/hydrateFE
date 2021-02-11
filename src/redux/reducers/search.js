const initialState = {
  mealSearch: false,
  drinkSearch: false,
  mealSearchValue: '',
  drinkSearchValue: '',
}

const searchReducer = (state = initialState, action) => {
  switch (action.type){
    case "SET_DRINKSEARCH_STATE":
      return {
        ...state,
        drinkSearchState: action.payload
      }
    case "SET_MEALSEARCH_STATE":
      return {
        ...state,
        mealSearchState: action.payload
      }
    case "SET_MEALSEARCH_VALUE":
      return {
        ...state,
        mealSearchValue: action.payload
      }
    case "SET_DRINKSEARCH_VALUE":
      return {
        ...state,
        drinkSearchValue: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer;