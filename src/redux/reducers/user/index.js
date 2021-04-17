import { CLEAR_LOGIN, EDIT_USER, LOGIN_ADMIN } from '../../actionTypes'

const initialUser = {
  isLogin: false,
  userInfo: {}
}

export const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    case LOGIN_ADMIN:
      return {
        isLogin: true,
        userInfo: action.data
      }
    case EDIT_USER:
      return {
        isLogin: true,
        userInfo: action.data
      }
    case CLEAR_LOGIN:
      return {
        isLogin: false,
        userInfo: {}
      }
    default:
      return state
  }
}