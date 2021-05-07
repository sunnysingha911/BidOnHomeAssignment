import * as actions from "../constants/LoginConstants"

export const login = (userName, email, password) => {
  return (dispatch) => {
    dispatch({
      type: actions.USER_LOGIN_STARTED,
    })

    try {
      dispatch({
        type: actions.USER_LOGIN_SUCCESS,
        payload: {
          userName,
          email,
          password,
        },
      })
    } catch (error) {
      dispatch({
        type: actions.USER_LOGIN_FAILURE,
        payload: "Error in login",
      })
    }
  }
}

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: actions.USER_LOGOUT_STARTED,
    })
    try {
      dispatch({
        type: actions.USER_LOGIN_SUCCESS,
        payload: null,
      })
    } catch (error) {
      dispatch({
        type: actions.USER_LOGIN_FAILURE,
        payload: "Error in logout",
      })
    }
  }
}
