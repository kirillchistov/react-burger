//  Здесь описал все виды событий авторизации и работы с токеном  //
import {
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  refreshTokenRequest,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi,
} from '@/utils/burger-api';
import { setCookies, deleteCookie } from '@/utils/auth';
import { devLog } from '@/utils/devLog';
import { TFormValues, TUser, AppThunk } from '@/services/types';
import {
  LOGIN_USER_API,
  LOGIN_USER_API_OK,
  LOGIN_USER_API_FAIL,
  REGISTER_USER_API,
  REGISTER_USER_API_OK,
  REGISTER_USER_API_FAIL,
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
  LOGOUT_USER_API_FAIL
} from '@/utils/constants';

export interface IRegisterUser {
  readonly type: typeof REGISTER_USER_API;
}
export interface IRegisterUserOK {
  readonly type: typeof REGISTER_USER_API_OK;
  readonly payload: TUser;
}
export interface IRegisterUserFail {
  readonly type: typeof REGISTER_USER_API_FAIL;
}
export interface ILoginUser {
  readonly type: typeof LOGIN_USER_API;
}
export interface ILoginUserOK {
  readonly type: typeof LOGIN_USER_API_OK;
  readonly payload: TUser;
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
  readonly payload: TUser;
}
export interface IGetUserProfileFail {
  readonly type: typeof GET_USER_PROFILE_API_FAIL;
}
export interface IUpdateUserProfile {
  readonly type: typeof UPDATE_USER_PROFILE_API;
}
export interface IUpdateUserProfileOK {
  readonly type: typeof UPDATE_USER_PROFILE_API_OK;
  readonly payload: TUser;
}
export interface IUpdateUserProfileFail {
  readonly type: typeof UPDATE_USER_PROFILE_API_FAIL;
}

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

const clearAuthTokens = () => {
  deleteCookie('refreshToken');
  deleteCookie('accessToken');
};

export const loginUser: AppThunk = ({ email, password }: TFormValues) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_USER_API });
    loginUserApi({ email: email!, password: password! })
      .then((res) => {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: LOGIN_USER_API_OK,
          payload: res.user,
        });
      })
      .catch((err: { message?: string }) => {
        devLog(err.message);
        dispatch({ type: LOGIN_USER_API_FAIL });
      });
  };
};

export const registerUser: AppThunk = ({ email, password, name }: TFormValues) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_USER_API });
    registerUserApi({ email: email!, password: password!, name: name! })
      .then((res) => {
        setCookies(res.accessToken, res.refreshToken);
        dispatch({
          type: REGISTER_USER_API_OK,
          payload: res.user,
        });
      })
      .catch(() => {
        dispatch({ type: REGISTER_USER_API_FAIL });
      });
  };
};

export const getUserProfile: AppThunk = () => {
  return function (dispatch) {
    dispatch({ type: GET_USER_PROFILE_API });
    getUserApi()
      .then((res) => {
        if (res?.success) {
          dispatch({
            type: GET_USER_PROFILE_API_OK,
            payload: res.user,
          });
        }
      })
      .catch(() => {
        clearAuthTokens();
        dispatch({ type: GET_USER_PROFILE_API_FAIL });
      });
  };
};

export const updateUserProfile: AppThunk = ({ email, password, name }: TFormValues) => {
  return function (dispatch) {
    dispatch({ type: UPDATE_USER_PROFILE_API });
    updateUserApi({ email, password, name })
      .then((res) => {
        if (res?.success) {
          dispatch({
            type: UPDATE_USER_PROFILE_API_OK,
            payload: res.user,
          });
        }
      })
      .catch(() => {
        dispatch({ type: UPDATE_USER_PROFILE_API_FAIL });
      });
  };
};

export const getAccessToken: AppThunk = () => {
  return function (dispatch) {
    dispatch({ type: REFRESH_TOKEN_API });
    refreshTokenRequest()
      .then(() => {
        dispatch({ type: REFRESH_TOKEN_API_OK });
        dispatch(getUserProfile());
      })
      .catch(() => {
        clearAuthTokens();
        dispatch({ type: REFRESH_TOKEN_API_FAIL });
      });
  };
};

export const requestResetCode: AppThunk = ({ email }: TFormValues) => {
  return function (dispatch) {
    dispatch({ type: PASSWORD_RESET_CODE_API });
    forgotPasswordApi({ email: email! })
      .then((res) => {
        if (res?.success) {
          dispatch({ type: PASSWORD_RESET_CODE_API_OK });
        }
      })
      .catch(() => {
        dispatch({ type: PASSWORD_RESET_CODE_API_FAIL });
      });
  };
};

export const changePassword: AppThunk = ({ password, token }: TFormValues) => {
  return function (dispatch) {
    dispatch({ type: PASSWORD_RESET_API });
    resetPasswordApi({ password: password!, token: token! })
      .then((res) => {
        if (res?.success) {
          dispatch({ type: PASSWORD_RESET_API_OK });
        }
      })
      .catch(() => {
        dispatch({ type: PASSWORD_RESET_API_FAIL });
      });
  };
};

export const logoutUser: AppThunk = () => {
  return function (dispatch) {
    dispatch({ type: LOGOUT_USER_API });
    logoutApi()
      .then((res) => {
        if (res?.success) {
          clearAuthTokens();
          dispatch({ type: LOGOUT_USER_API_OK });
        }
      })
      .catch(() => {
        clearAuthTokens();
        dispatch({ type: LOGOUT_USER_API_FAIL });
      });
  };
};
