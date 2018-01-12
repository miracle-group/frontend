export const getUserPreferences = (user) => {
  return (getState,dispatch) => {
    dispatch({
      type : 'GET_PREFERENCES',
    });
  }
}
