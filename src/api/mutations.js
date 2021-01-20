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

function POST_DRINK (UserId, drink, cups, volume, time) { return { mutation: 
  `mutation {
    postDrink(
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

function POST_MEAL(details) { return  {query: `mutation {
  postMeal(
    UserId: ${details.UserId}, 
    description: "${details.description}", 
    meal: ["joop","ccccsada"], 
    time: "2021-01-13T17:27"
  ){
    description,
    meal,
    time,
  }
}`
}}
;

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
}