const initialState = {
  posts : [],
  loading : false
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_POSTS':
      return {...state,posts : action.payload.posts}
    case 'ADD_NEW_POST':
      return {...state,posts : action.payload.articles}
    default:
      return state;
  }
}

export default reducer;
