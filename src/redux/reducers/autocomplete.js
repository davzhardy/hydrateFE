const initialState = {
  potentialMeals: [
    { meal: 'Breakfast' },
    { meal: 'Lunch' },
    { meal: 'Dinner' },
    { meal: 'Snack' },
  ],
  potentialDrinks: [
    { drink: 'Water' },
    { drink: 'Black Tea' },
    { drink: 'Herbal Tea' },
    { drink: 'Fruit Juice' },
    { drink: 'Coffee' },
    { drink: 'Fizzy Drink' },
    { drink: 'Ginger & Lemon Tea' },
  ],
}

const autocompleteReducer = (state = initialState, action) => {
  switch (action.type){
    case "UPDATE_POTENTIALMEALS":
      return {
        ...state,
        potentialMeals: [...state.potentialMeals, action.payload]
      }
    case "UPDATE_POTENTIALDRINKS":
      return {
        ...state,
        potentialDrinks: [...state.potentialDrinks, action.payload]
      }
    default:
      return state;
  }
}

export default autocompleteReducer;