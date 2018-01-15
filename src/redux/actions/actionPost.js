export const setPosts = (posts) => {
  return {
    type : 'SET_POSTS',
    payload : {
      posts
    }
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
