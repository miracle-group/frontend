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
    type: 'SET_LOGGEDIN_USER',
    payload : {
      user
    }
  }
}

export const setClientId = (clientId) => {
  return {
    type : 'SET_CLIENT_ID',
    payload : {
      clientId
    }
  }
}
