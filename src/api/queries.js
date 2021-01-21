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

function GET_USER (details) { return {query:
  `query {
    getUser(
      email: "${details.email}",
      password: "${details.password}",
    ){
      emailExists,
      passwordMatches,
      userData {
        id,
        username
      }
    }
  }`
}}

export {
  GET_ALL_DRINKS,
  GET_ALL_MEALS,
  GET_USER
}