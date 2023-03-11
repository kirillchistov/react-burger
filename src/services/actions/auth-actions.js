//  Здесь описал все виды событий авторизации и работы с токеном  //
//  Логин, рега, получение и обновление профиля, токен, код, пароль, логаут  //
import {
  loginApi,
  registrationApi,
  getUserProfileApi,
  updateUserProfileApi,
  accessTokenApi,
  codeRequestApi,
  resetPasswordApi,
  logoutApi,
} from '../../utils/api';
import { setCookies, deleteCookie } from '../../utils/auth';

export const LOGIN_USER_API = 'LOGIN_USER_API';
export const LOGIN_USER_API_OK = 'LOGIN_USER_API_OK';
export const LOGIN_USER_API_FAIL = 'LOGIN_USER_API_FAIL';

export const REGISTER_USER_API = 'REGISTER_USER_API';
export const REGISTER_USER_API_OK = 'REGISTER_USER_API_OK';
export const REGISTER_USER_API_FAIL = 'REGISTER_USER_API_FAIL';

export const GET_USER_PROFILE_API = 'GET_USER_PROFILE_API';
export const GET_USER_PROFILE_API_OK = 'GET_USER_PROFILE_API_OK';
export const GET_USER_PROFILE_API_FAIL = 'GET_USER_PROFILE_API_FAIL';

export const UPDATE_USER_PROFILE_API = 'UPDATE_USER_PROFILE_API';
export const UPDATE_USER_PROFILE_API_OK = 'UPDATE_USER_PROFILE_API_OK';
export const UPDATE_USER_PROFILE_API_FAIL = 'UPDATE_USER_PROFILE_API_FAIL';

export const ACCESS_TOKEN_API = 'ACCESS_TOKEN_API';
export const ACCESS_TOKEN_API_OK = 'ACCESS_TOKEN_API_OK';
export const ACCESS_TOKEN_API_FAIL = 'ACCESS_TOKEN_API_FAIL';

export const REFRESH_TOKEN_API = 'REFRESH_TOKEN_API';
export const REFRESH_TOKEN_API_OK = 'REFRESH_TOKEN_API_OK';
export const REFRESH_TOKEN_API_FAIL = 'REFRESH_TOKEN_API_FAIL';

export const PASSWORD_RESET_API = 'PASSWORD_RESET_API';
export const PASSWORD_RESET_API_OK = 'PASSWORD_RESET_API_OK';
export const PASSWORD_RESET_API_FAIL = 'PASSWORD_RESET_API_FAIL';

export const PASSWORD_RESET_CODE_API = 'PASSWORD_RESET_CODE_API';
export const PASSWORD_RESET_CODE_API_OK = 'PASSWORD_RESET_CODE_API_OK';
export const PASSWORD_RESET_CODE_API_FAIL = 'PASSWORD_RESET_CODE_API_FAIL';

export const LOGOUT_USER_API = 'LOGOUT_USER_API';
export const LOGOUT_USER_API_OK = 'LOGOUT_USER_API_OK';
export const LOGOUT_USER_API_FAIL = 'LOGOUT_USER_API_FAIL';

//  Action логина нового пользователя - добавить propTypes? //
export const loginUser = ({ email, password }) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_USER_API,
    });
    loginApi({ email, password }).then((res) => {
      if (res && res.success) {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: LOGIN_USER_API_OK,
          payload: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_USER_API_FAIL,
        });
      }
    });
  };
};

//  Action регистрации нового пользователя - добавить propTypes? //
export const registerUser = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_API,
    });
    registrationApi({ email, password, name }).then((res) => {
      if (res && res.success) {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: REGISTER_USER_API_OK,
          payload: res.user,
        });
      } else {
        dispatch({
          type: REGISTER_USER_API_FAIL,
        });
      }
    });
  };
};

//  Action запроса на получение профиля  //
export const getUserProfile = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_PROFILE_API,
    });
    getUserProfileApi().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_USER_PROFILE_API_OK,
          payload: res.user,
        });
      } else {
        dispatch({
          type: GET_USER_PROFILE_API_FAIL,
        });
      }
    });
  };
};

//  Action запроса на обновление профиля - добавить propTypes?  //
export const updateUserProfile = ({ email, password, name }) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_PROFILE_API,
    });
    updateUserProfileApi({ email, password, name }).then((res) => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_PROFILE_API_OK,
          payload: res.user,
        });
      } else {
        dispatch({
          type: UPDATE_USER_PROFILE_API_FAIL,
        });
      }
    });
  };
};

//  Action доступа к токену / рефреш - добавить propTypes? //
export const getAccessToken = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_API,
    });
    accessTokenApi(refreshToken).then((res) => {
      if (res && res.success) {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: REFRESH_TOKEN_API_OK,
        });
      } else {
        dispatch({
          type: REFRESH_TOKEN_API_FAIL,
        });
      }
    });
  };
};

//  Action запроса на код для смены пароля - добавить propTypes? //
export const requestCode = (email) => {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_CODE_API,
    });
    codeRequestApi(email).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_CODE_API_OK,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_CODE_API_FAIL,
        });
      }
    });
  };
};

//  Action запроса на смену пароля - добавить propTypes?  //
export const changePassword = ({ password, token }) => {
  return function (dispatch) {
    dispatch({
      type: PASSWORD_RESET_API,
    });
    resetPasswordApi({ password, token }).then((res) => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_API_OK,
        });
      } else {
        dispatch({
          type: PASSWORD_RESET_API_FAIL,
        });
      }
    });
  };
};

//  Action запроса на выход из системы - добавить propTypes?  //
export const logoutUser = (refreshToken) => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_USER_API,
    });
    logoutApi(refreshToken).then((res) => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_USER_API_OK,
        });
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
      } else {
        dispatch({
          type: LOGOUT_USER_API_FAIL,
        });
      }
    });
  };
};
