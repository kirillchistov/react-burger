//  Редьюсер для взаимодействия с сервером (авторизация и токены)  //
//  Импортирую actions: рега, логин, профайл, токен, пароль, логаут  //
import {
  REGISTER_USER_API,
  REGISTER_USER_API_OK,
  REGISTER_USER_API_FAIL,
  LOGIN_USER_API,
  LOGIN_USER_API_OK,
  LOGIN_USER_API_FAIL,
  GET_USER_PROFILE_API,
  GET_USER_PROFILE_API_OK,
  GET_USER_PROFILE_API_FAIL,
  UPDATE_USER_PROFILE_API,
  UPDATE_USER_PROFILE_API_OK,
  UPDATE_USER_PROFILE_API_FAIL,
  REFRESH_TOKEN_API,
  REFRESH_TOKEN_API_OK,
  REFRESH_TOKEN_API_FAIL,
  PASSWORD_RESET_API,
  PASSWORD_RESET_API_OK,
  PASSWORD_RESET_API_FAIL,
  PASSWORD_RESET_CODE_API,
  PASSWORD_RESET_CODE_API_OK,
  PASSWORD_RESET_CODE_API_FAIL,
  LOGOUT_USER_API,
  LOGOUT_USER_API_OK,
  LOGOUT_USER_API_FAIL,
} from '../../utils/constants';
import { TAuthActions } from '../actions/auth-actions';
import { TUser } from '../../services/types';

//  Типизирую состояние для данных о пользователе  //
//  Здесь вероятно надо типизировать все состояния запроса на reset/forgot  //
//  Распутать это, чтобы не было ошибочных статусов по умолчанию  //
export type TAuthState = {
  user: TUser | null;
  request?: boolean;
  requestFailed?: boolean;
  requestOK?: boolean;
  
  loginApi: boolean;
  loginApiOK: boolean;
  loginApiFail: boolean;
  
  registerApi: boolean;
  registerApiOK: boolean;
  registerApiFail: boolean;
  
  codeRequestApi: boolean;
  resetPasswordApi: boolean;
  hasResetCode: boolean;
};

//  Описываю начальное состояние для данных о пользователе  //
const initialState: TAuthState = {
  user: null,

  request: false,
  requestFailed: false,
  requestOK: false,

  registerApi: false,
  registerApiOK: false,
  registerApiFail: false,
  
  loginApi: false,
  loginApiOK: false,
  loginApiFail: false,
  
  codeRequestApi: false,
  resetPasswordApi: false,
  hasResetCode: false,
};

//  функциональность регистрации, авторизации, смены пароля, профиля, выхода  //
//  смотрю, какой прилетел action и решаю, какое состояние изменить и вернуть  //
export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case REGISTER_USER_API:
      return {
        ...state,
        request: true,
        registerApi: true,
        registerApiOK: false,
        registerApiFail: false,
      };
    case REGISTER_USER_API_OK:
      return {
        ...state,
        user: action.user,
        request: false,
        registerApi: false,
        registerApiOK: true,
        registerApiFail: false,
      };
    case REGISTER_USER_API_FAIL:
      return {
        ...state,
        request: false,
        registerApi: false,
        registerApiOK: false,
        registerApiFail: true,
      };
    case LOGIN_USER_API:
      return {
        ...state,
        request: true,
        loginApi: true,
        loginApiOK: false,
        loginApiFail: false,
      };
    case LOGIN_USER_API_OK:
      return {
        ...state,
        user: action.user,
        request: false,
        loginApi: false,
        loginApiOK: true,
        loginApiFail: false,
      };
    case LOGIN_USER_API_FAIL:
      return {
        ...state,
        request: false,
        loginApi: false,
        loginApiOK: false,
        loginApiFail: true,
      };
    case PASSWORD_RESET_CODE_API:
      return {
        ...state,
        request: true,
        codeRequestApi: true,
        hasResetCode: false,

      };
    case PASSWORD_RESET_CODE_API_OK:
      return {
        ...state,
        request: false,
        requestFailed: false,
        codeRequestApi: false,
        hasResetCode: true,
      };
    case PASSWORD_RESET_CODE_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
        codeRequestApi: false,
        hasResetCode: false,
      };
    case PASSWORD_RESET_API:
      return {
        ...state,
        request: true,
        resetPasswordApi: true,
      };
    case PASSWORD_RESET_API_OK:
      return {
        ...state,
        request: false,
        requestOK: true,
        requestFailed: false,
        hasResetCode: false,
      };
    case PASSWORD_RESET_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
        hasResetCode: false,
      };
    case LOGOUT_USER_API:
      return {
        ...state,
        user: null,
        loginApiOK: false,
      };
    case LOGOUT_USER_API_OK:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: null,
        loginApiOK: false,
      };
    case LOGOUT_USER_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case GET_USER_PROFILE_API:
      return {
        ...state,
        request: true,
      };
    case GET_USER_PROFILE_API_OK:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: action.user,
      };
    case GET_USER_PROFILE_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case UPDATE_USER_PROFILE_API:
      return {
        ...state,
        request: true,
      };
    case UPDATE_USER_PROFILE_API_OK:
      return {
        ...state,
        request: false,
        requestFailed: false,
        user: action.user,
      };
    case UPDATE_USER_PROFILE_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    case REFRESH_TOKEN_API:
      return {
        ...state,
        request: true,
      };
    case REFRESH_TOKEN_API_OK:
      return {
        ...state,
        request: false,
        requestFailed: false,
      };
    case REFRESH_TOKEN_API_FAIL:
      return {
        ...state,
        request: false,
        requestFailed: true,
      };
    default:
      return state;
  }
};
