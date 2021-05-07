import * as actions from "../constants/LoginConstants"

const initialState = {
  loading: false,
  user: null,
  error: null,
}

const LoginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.USER_LOGIN_STARTED:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      }
    case actions.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      }
    case actions.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: payload,
      }
    default:
      return state
  }
}

export default LoginReducer
