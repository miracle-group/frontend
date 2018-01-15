const initialState = {
  graphqlApi : "http://repod.ga:8000/graphql",
  expressApi : "http://repod.ga:8000/api",
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
