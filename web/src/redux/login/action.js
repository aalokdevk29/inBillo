import {
  LOGIN_SUCCESS,
  REGISTRATION,
  LOGIN_ERROR,
  ALL_USER,
  GET_USER,
  GET_USER_TRANSACTION,
} from "./types";

export const registration = () => ({
  type: REGISTRATION,
});

export const loginSuccess = (userDetails) => ({
  type: LOGIN_SUCCESS,
  payload: userDetails,
});

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error,
});

export const allUsers = (res) => ({
  type: ALL_USER,
  payload: res,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const userTransaction = (data) => ({
  type: GET_USER_TRANSACTION,
  payload: data,
});
