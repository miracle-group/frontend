export const setPosts = (posts) => {
  return {
    type : 'SET_POSTS',
    payload : {
      posts
    }
  }
}

export const setNewPost = (newPost) => {
  return (dispatch,getState) => {
    let articles = getState().postReducer.posts;
    articles.unshift(newPost);
    dispatch({
      type : 'ADD_NEW_POST',
      payload : {
        articles
      }
    });
  }
}

export const setLoading = (status) => {
  return {
    type : 'SET_LOADING',
    payload : {
      status
    }
  }
}
