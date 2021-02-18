const initialState = {
  potentialMeals: false,
  potentialDrinks: false,
}

const autocompleteReducer = (state = initialState, action) => {
  switch (action.type){
    case "UPDATE_POTENTIALMEALS":
      return {
        ...state,
        potentialMeals: action.payload
      }
    case "UPDATE_POTENTIALDRINKS":
      return {
        ...state,
        potentialDrinks: action.payload
      }
    default:
      return state;
  }
}

export default autocompleteReducer;