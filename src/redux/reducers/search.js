const initialState = {
  mealSearch: false,
  drinkSearch: false
}

const searchReducer = (state = initialState, action) => {
  switch (action.type){
    case "SET_DRINKSEARCH_STATE":
      return {
        ...state,
        drinkSearch: action.payload
      }
    case "SET_MEALSEARCH_STATE":
      return {
        ...state,
        mealSearch: action.payload
      }
    default:
      return state;
  }
}

export default searchReducer;