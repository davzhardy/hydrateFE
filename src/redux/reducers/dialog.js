const initialState = {
  dialog: null
}

const dialogReducer = (state = initialState, action) => {
  switch (action.type){
    case "SET_OPEN_DIALOG":
      return {
        ...state,
        dialog: action.payload
      }
    default:
      return state;
  }
}

export default dialogReducer;