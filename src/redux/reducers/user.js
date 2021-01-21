const initialState = {
  UserId: null,
  username: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return {
        ...state,
        UserId: action.payload.UserId,
        username: action.payload.username,
      }
    default:
      return state;
  }
}

export default userReducer;