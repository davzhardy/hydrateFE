function GET_ALL_DRINKS (UserId) { return {query: 
  `query {
    getAllDrinks(UserId: ${UserId}) {
      drink,
      cups,
      volume,
      time,
    }
  }`
}};

function GET_ALL_MEALS (UserId) { return {query: 
  `query {
    getAllMeals(UserId: ${UserId}) {
      description,
      meal,
      time,
    }
  }`
}};

export {
  GET_ALL_DRINKS,
  GET_ALL_MEALS
}