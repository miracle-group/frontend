const initialState = {
  graphqlApi : "http://repod.ga:8000/graphql",
  expressApi : "http://repod.ga:8000/api",
  loginStatus : false,
  user : null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'CHANGE_LOGIN_STATUS':
      return {...state,loginStatus : action.payload.status}
    case 'SET_USER_LOGIN':
      return {...state,user : action.user}
    default:
      return state
  }
}

export default reducer;
