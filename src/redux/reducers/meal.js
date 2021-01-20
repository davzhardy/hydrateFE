const initialState = {
  events: []
}

const mealReducer = (state = initialState, action) => {
  switch (action.type){
    case "ADD_MEAL_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    default:
      return state;
  }
}

export default mealReducer;