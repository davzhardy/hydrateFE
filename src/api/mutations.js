function CREATE_USER(details) {
  return  {
    query: `mutation {
      createUser(
        username: "${details.username}", 
        password: "${details.password}", 
        email: "${details.email}", 
      ){
        message,
        token,
        status,
        userData {
          id
        },
      }
    }`
  }
};

function POST_DRINK(details) {
  let cups = null;
  let volume = null;
  if (details.cups) cups = details.cups
  if (details.volume) volume = details.volume
  return  {
    query: `mutation {
      postDrink(
        UserId: ${details.UserId}, 
        drink: "${details.drink}", 
        cups: ${cups}, 
        volume: ${volume}, 
        time: "${details.time}"
      ){
        drink,
        cups,
        volume,
        time,
      }
    }`
  }
};

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
};

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
}