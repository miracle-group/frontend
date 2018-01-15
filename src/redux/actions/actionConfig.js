export const setLoginStatus = (status) => {
  return{
    type : 'CHANGE_LOGIN_STATUS',
    payload : {
      status
    }
  }
}
