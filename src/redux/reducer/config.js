const initialState = {
  graphqlApi : "http://repod.ga:8000/graphql",
  expressApi : "http://repod.ga:8000/api"
}

const reducer = (state = initialState,action) => {
  switch(action.type){
    default:
      return state;
  }
}

export default reducer;
