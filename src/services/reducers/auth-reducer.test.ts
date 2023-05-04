import { expect } from '@jest/globals';
import { authReducer, initialState } from './auth-reducer';
import {
//   REGISTER_USER_API,
  REGISTER_USER_API_OK,
//   REGISTER_USER_API_FAIL,
//   LOGIN_USER_API,
  LOGIN_USER_API_OK,
//   LOGIN_USER_API_FAIL,
  GET_USER_PROFILE_API,
  GET_USER_PROFILE_API_OK,
//   GET_USER_PROFILE_API_FAIL,
  UPDATE_USER_PROFILE_API,
  UPDATE_USER_PROFILE_API_OK,
  UPDATE_USER_PROFILE_API_FAIL,
//   REFRESH_TOKEN_API,
//   REFRESH_TOKEN_API_OK,
//   REFRESH_TOKEN_API_FAIL,
//   PASSWORD_RESET_API,
//   PASSWORD_RESET_API_OK,
//   PASSWORD_RESET_API_FAIL,
//   PASSWORD_RESET_CODE_API,
//   PASSWORD_RESET_CODE_API_OK,
//   PASSWORD_RESET_CODE_API_FAIL,
//   LOGOUT_USER_API,
  LOGOUT_USER_API_OK,
//   LOGOUT_USER_API_FAIL,
} from '../../utils/constants';
import { USER } from "../../utils/testdata";

describe("authReducer test", () => {
  it("should return initial state", () => {
    expect(authReducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should handle REGISTER_USER_API_OK", () => {
    expect(
      authReducer(initialState, {
        type: REGISTER_USER_API_OK,
        payload: USER
      })
    ).toEqual({ 
        ...initialState, 
        user: USER, 
        request: false,
        registerApi: false,
        registerApiOK: true,
        registerApiFail: false });
  }); 

  it("should handle LOGIN_USER_API_OK", () => {
    expect(
      authReducer(initialState, {
        type: LOGIN_USER_API_OK,
        payload: USER,
      })
    ).toEqual({ 
        ...initialState, 
        user: USER, 
        request: false,
        loginApi: false,
        loginApiOK: true,
        loginApiFail: false,
     });
  });

  it("should handle GET_USER_PROFILE_API", () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_PROFILE_API,
      })
    ).toEqual({ ...initialState, request: true });
  });

  it("should handle GET_USER_PROFILE_API_OK", () => {
    expect(
      authReducer(initialState, {
        type: GET_USER_PROFILE_API_OK,
        payload: USER,
      })
    ).toEqual({ 
        ...initialState, 
        user: USER, 
        request: false,
        requestFailed: false,
     });
  });

  it("should handle UPDATE_USER_PROFILE_API", () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_PROFILE_API,
      })
    ).toEqual({ ...initialState, request: true });
  });

  it("should handle UPDATE_USER_PROFILE_API_OK", () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_PROFILE_API_OK,
        payload: USER,
      })
    ).toEqual({ ...initialState, user: USER, request: false, requestFailed: false });
  });

  it("should handle UPDATE_USER_PROFILE_API_FAIL", () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_USER_PROFILE_API_FAIL,
      })
    ).toEqual({ ...initialState, request: false, requestFailed: true });
  });

  it("should handle LOGOUT_USER_API_OK", () => {
    expect(
      authReducer(initialState, {
        type: LOGOUT_USER_API_OK,
      })
    ).toEqual({ 
        ...initialState, 
        request: false,
        requestFailed: false,
        user: null,
        loginApiOK: false,
     });
  });
});

