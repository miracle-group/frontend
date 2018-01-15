const host = "http://repod.ga:8000";

const initialState = {
  graphqlApi : `${host}/graphql`,
  expressApi : `${host}/api`,
  host : host,
  loginStatus : false
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    case 'CHANGE_LOGIN_STATUS':
      return {...state,loginStatus : action.payload.status}
    default:
      return state;
  }
}

export default reducer;
