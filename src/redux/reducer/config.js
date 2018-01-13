const initialState = {
  graphqlApi : "http://localhost:3001/graphql",
  expressApi : "http://localhost:3001/api",
  loginStatus : false
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default reducer;
