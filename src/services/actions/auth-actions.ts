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
import { TFormValues, TUser, AppDispatch } from '../../utils/types';

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

export interface IRegisterUser {
  readonly type: typeof REGISTER_USER_API;
}
export interface IRegisterUserOK {
  readonly type: typeof REGISTER_USER_API_OK;
  readonly user: TUser;
}
export interface IRegisterUserFail {
  readonly type: typeof REGISTER_USER_API_FAIL;
}
export interface ILoginUser {
  readonly type: typeof LOGIN_USER_API;
}
export interface ILoginUserOK {
  readonly type: typeof LOGIN_USER_API_OK;
  readonly user: TUser;
}
export interface ILoginUserFail {
  readonly type: typeof LOGIN_USER_API_FAIL;
}
export interface IGetRefreshToken {
  readonly type: typeof REFRESH_TOKEN_API;
}
export interface IGetRefreshTokenOK {
  readonly type: typeof REFRESH_TOKEN_API_OK;
}
export interface IGetRefreshTokenFail {
  readonly type: typeof REFRESH_TOKEN_API_FAIL;
}
export interface ILogoutUser {
  readonly type: typeof LOGOUT_USER_API;
}
export interface ILogoutUserOK {
  readonly type: typeof LOGOUT_USER_API_OK;
}
export interface ILogoutUserFail {
  readonly type: typeof LOGOUT_USER_API_FAIL;
}
export interface IResetPassword {
  readonly type: typeof PASSWORD_RESET_API;
}
export interface IResetPasswordOK {
  readonly type: typeof PASSWORD_RESET_API_OK;
}
export interface IResetPasswordFail {
  readonly type: typeof PASSWORD_RESET_API_FAIL;
}
export interface IGetPasswordResetCode {
  readonly type: typeof PASSWORD_RESET_CODE_API;
}
export interface IGetPasswordResetCodeOK {
  readonly type: typeof PASSWORD_RESET_CODE_API_OK;
}
export interface IGetPasswordResetCodeFail {
  readonly type: typeof PASSWORD_RESET_CODE_API_FAIL;
}
export interface IGetUserProfile {
  readonly type: typeof GET_USER_PROFILE_API;
}
export interface IGetUserProfileOK {
  readonly type: typeof GET_USER_PROFILE_API_OK;
  readonly user: TUser;
}
export interface IGetUserProfileFail {
  readonly type: typeof GET_USER_PROFILE_API_FAIL;
}
export interface IUpdateUserProfile {
  readonly type: typeof UPDATE_USER_PROFILE_API;
}
export interface IUpdateUserProfileOK {
  readonly type: typeof UPDATE_USER_PROFILE_API_OK;
  readonly user: TUser;
}
export interface IUpdateUserProfileFail {
  readonly type: typeof UPDATE_USER_PROFILE_API_FAIL;
}

//  Создаю множественный тип для actions с авторизацией и регой  //
export type TAuthActions =
| IRegisterUser
| IRegisterUserOK
| IRegisterUserFail
| ILoginUser
| ILoginUserOK
| ILoginUserFail
| IGetRefreshToken
| IGetRefreshTokenOK
| IGetRefreshTokenFail
| ILogoutUser
| ILogoutUserOK
| ILogoutUserFail
| IResetPassword
| IResetPasswordOK
| IResetPasswordFail
| IGetPasswordResetCode
| IGetPasswordResetCodeOK
| IGetPasswordResetCodeFail
| IGetUserProfile
| IGetUserProfileOK
| IGetUserProfileFail
| IUpdateUserProfile
| IUpdateUserProfileOK
| IUpdateUserProfileFail;


export const registerUserOK = (
  user: TUser
): IRegisterUserOK => ({
  type: REGISTER_USER_API_OK,
  user,
});

export const loginUserOK = (
  user: TUser
): ILoginUserOK => ({
  type: LOGIN_USER_API_OK,
  user,
});

export const getUserProfileOK = (
  user: TUser
): IGetUserProfileOK => ({
  type: GET_USER_PROFILE_API_OK,
  user,
});

export const updateUserProfileOK = (
  user: TUser
): IUpdateUserProfileOK => ({
  type: UPDATE_USER_PROFILE_API_OK,
  user,
});


//  Action логина нового пользователя - добавить propTypes? //
//  accessToken для внутренних запросов — получения / обновления данных о пользователе  //
//  Второй токен — refreshToken (если первый протух) — сохраняю в куки  //
//  Рефреш-токен для выхода из системы и для нового accessToken, если просрочился  //
export const loginUser = ({ email, password }: TFormValues) => {
  return function (dispatch: AppDispatch) {
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
//  Второй токен — refreshToken — сохраняю в куки  //
export const registerUser = ({ email, password, name }: TFormValues) => {
  return function (dispatch: AppDispatch) {
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
  return function (dispatch: AppDispatch) {
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
export const updateUserProfile = ({ email, password, name }: TFormValues) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_PROFILE_API,
    });
    updateUserProfileApi({ email, password, name }).then((res) => {
      if (res && res.success) {
        dispatch(updateUserProfileOK(res.user));
      } else {
        dispatch({
          type: UPDATE_USER_PROFILE_API_FAIL,
        });
      }
    });
  };
};

//  Action обновления токенов с помощью рефреш токена - добавить propTypes? //
//  Оба токена (access и refresh) сохраняю в куки  //
export const getAccessToken = (refreshToken: string | undefined ) => {
  return function (dispatch: AppDispatch) {
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
export const requestResetCode = ({email}: TFormValues) => {
  return function (dispatch: AppDispatch) {
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
export const changePassword = ({ password, token }: TFormValues) => {
  return function (dispatch: AppDispatch) {
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
//  Для выхода использую refreshToken — удаляю из куки оба токена  //
export const logoutUser = (refreshToken: string | undefined) => {
  return function (dispatch: AppDispatch) {
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
