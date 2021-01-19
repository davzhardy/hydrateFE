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

function POST_DRINK (username, UserId, drink, cups, volume, time) { return { mutation: 
  `mutation {
    postDrink(
      username: ${username}, 
      UserId: ${UserId}, 
      drink: ${drink}, 
      cups: ${cups}, 
      volume: ${volume},
      time: ${time}
    ){
      drink,
      cups,
      volume,
      time,
    }
  }`
}};

function POST_MEAL (username, UserId, description, meal, time) { return { mutation: 
  `mutation {
    postMeal(
      username: ${username}, 
      UserId: ${UserId}, 
      description: ${description}, 
      meal: ${meal}, 
      time: ${time}
    ){
      description,
      meal,
      time,
    }
  }`
}};

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
}