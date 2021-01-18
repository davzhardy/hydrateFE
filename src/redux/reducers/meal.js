const initialState = {
  events: [
    {description:'Breakfast', meal: ['Framboises', 'Myrtilles'], time:"2021-01-13T17:29"},
    {description:'Snack', meal: ['Biscuits sans gluten'], time:"2021-01-13T17:27"},
    {description:'Dinner', meal: ['Poulet roti en sauce', 'gratin dauphinois truffe', 'haricots verts'], time:"2021-01-13T17:28"},
  ]
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