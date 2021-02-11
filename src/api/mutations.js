function CREATE_USER(details) {
  return  {
    query: `mutation {
      createUser(
        username: "${details.username}", 
        password: "${details.password}", 
        email: "${details.email}", 
      ){
        userSuccessfullyCreated,
        token,
        status,
        error {
          emailTaken,
          usernameTaken,
        }
        userData {
          id,
          username,
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

function MODIFY_MEAL(details) {
  const newMeal = details.meal.map(item => `"${item}"`)
  return  {
    query: `mutation {
      modifyMeal(
        UserId: ${details.UserId}, 
        meal: [${newMeal}], 
        time: "${details.time}"
      ){
        mealUpdated,
        meal {
          meal
        }
      }
    }`
  }
};

function DELETE_MEAL(details) {
  const oldMeal = details.meal.map(item => `"${item}"`)
  return  {
    query: `mutation {
      deleteMeal(
        UserId: ${details.UserId}, 
        meal: [${oldMeal}], 
        time: "${details.time}"
      ){
        mealDeleted,
      }
    }`
  }
}; 

function MODIFY_DRINK(details) {
  let cups = null;
  let volume = null;
  if (details.cups) cups = details.cups
  if (details.volume) volume = details.volume
  return  {
    query: `mutation {
      modifyDrink(
        UserId: ${details.UserId}, 
        drink: "${details.drink}", 
        cups: ${cups}, 
        volume: ${volume}, 
        time: "${details.time}"
      ){
        drinkUpdated,
        drink {
          drink
        }
      }
    }`
  }
};

function DELETE_DRINK(details) {
  return  {
    query: `mutation {
      deleteDrink(
        UserId: ${details.UserId}, 
        drink: "${details.drink}", 
        time: "${details.time}"
      ){
        drinkDeleted,
      }
    }`
  }
}; 

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
  MODIFY_MEAL,
  DELETE_MEAL,
  MODIFY_DRINK,
  DELETE_DRINK,
}