function CREATE_USER (username, password, email) { return { mutation: 
  `mutation {
    createUser(username: ${username}, password: ${password}, email: ${email}) {
      message,
      token,
      status,
      userData {
        id
      },
    }
  }`
}};

function POST_DRINK(details) {
  return  {
    query: `mutation {
      postDrink(
        UserId: ${details.UserId}, 
        drink: "${details.drink}", 
        cups: "${details.cups}", 
        volume: "${details.volume}", 
        time: "${details.time}"
      ){
        drink,
        cups,
        volume,
        time,
      }
    }`
  }
}
;

function POST_MEAL(details) {
  const meal = details.meal.map(item => `"${item}"`)
  return  {
    query: `mutation {
      postMeal(
        UserId: ${details.UserId}, 
        description: "${details.description}", 
        meal: [${meal}], 
        time: "${details.time}"
      ){
        description,
        meal,
        time,
      }
    }`
  }
}
;

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
}