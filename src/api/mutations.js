const CREATE_USER  = { mutation: 
  `createUser {
    createUser(username: ${username}, password: ${password}, email: ${email}) {
      message,
      token,
      status,
      userData {
        id
      },
    }
  }`
};

const POST_DRINK = { query: 
  `query {
    getAllMeals(UserId: ${UserId}) {
      description,
      meal,
      time,
    }
  }`
};

const POST_MEAL = { query: 
  `query {
    getAllMeals(UserId: ${UserId}) {
      description,
      meal,
      time,
    }
  }`
};

export {
  CREATE_USER,
  POST_DRINK,
  POST_MEAL,
}