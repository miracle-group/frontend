export const setLoginStatus = (status) => {
  return {
    type : 'CHANGE_LOGIN_STATUS',
    payload : {
      status
    }
  }
}

export const setUserLogin = (user) => {
  return {
    type: 'SET_USER_LOGIN',
    user
  }
}
