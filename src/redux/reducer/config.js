const host = "http://localhost:3001";

const initialState = {
  loginStatus : false,
  user : null,
  graphqlApi : `${host}/graphql`,
  expressApi : `${host}/api`,
  host : host,
  clientId : null
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'CHANGE_LOGIN_STATUS':
      return {...state,loginStatus : action.payload.status}
    case 'SET_LOGGEDIN_USER':
      return {...state,user : action.payload.user}
    case 'SET_CLIENT_ID':
      return {...state,clientId : action.payload.clientId}
    default:
      return state
  }
}

export default reducer;
