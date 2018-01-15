const host = "http://localhost:3001";

const initialState = {
  loginStatus : false,
  user : null,
  graphqlApi : `${host}/graphql`,
  expressApi : `${host}/api`,
  host : host
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
