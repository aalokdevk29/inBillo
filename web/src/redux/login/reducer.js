import { ALL_USER, GET_USER, GET_USER_TRANSACTION, LOGIN_SUCCESS, REGISTRATION } from './types';

const loginReducer = (state={}, action) => {
  switch (action.type) {
    case REGISTRATION: return {
      ...state
    }
    case LOGIN_SUCCESS: return {
      ...state,
      userDetails: action.payload,
    }
    case ALL_USER: return {
      ...state,
      allUsers: action.payload,
    }
    case GET_USER: return {
      ...state,
      currentUser: action.payload
    }
    case GET_USER_TRANSACTION: return {
      ...state,
      userTransaction: action.payload
    }
    default: return state
  }
}

export default loginReducer;