const initialState = {
  events: [],
}

const drinkReducer = (state = initialState, action) => {
  switch (action.type){
    case "ADD_DRINK_EVENT":
      return {
        ...state,
        events: [...state.events, action.payload]
      }
    default:
      return state;
  }
}

export default drinkReducer;