const initialState = {
  events: [
    {drink:'Water',cups:1, volume:150, time:"2021-01-13T17:29"},
    {drink:'Fruit Juice',cups:2, volume:100, time:"2021-01-13T17:30"},
  ],
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