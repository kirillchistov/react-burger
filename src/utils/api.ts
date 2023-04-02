//  Добавляю в API методы для авторизации, профиля и пароля  //
//  BASEURL = 'https://norma.nomoreparties.space/api' убрать в .env  //
import {BASEURL} from './constants';
//  Беру методы для получения токена и рефреш из куки
import { getCookie, setCookie, deleteCookie, authTokens } from './auth';

import { 
  TResponse, 
  TAuthResponse, 
  TTokenResponse, 
  TUserResponse,
  TIngredientResponse, 
  TOrderResponse,
  TFormValues,
 } from './types';

//  Делаю интерфейс для запроса с обновлением токена  //
/*
interface IFetchWithRefresh {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}
*/

//  Обрабатываю ответ сервера - возвращаю json или ошибку  //
//  Пока не получается через async try await catch типизировать  //
const checkResponse = <T>(res: Response) => {
  return res.ok 
    ? res.json().then((data) => data as TResponse<T>) 
    : Promise.reject(res.status);
};

//  Типизирую ответ сервера - буль-свойство + аргументом-дженериком  //
export type TServerResponse<T> = {
  success: boolean;
} & T;

//  Получаю ингредиенты с сервера и записываю в массив  //
export const fetchIngredients = async () => {
  return await fetch(`${BASEURL}/ingredients`)
  .then((res) => checkResponse<TIngredientResponse>(res));
}

//  Установка токенов - реализовали по месту в auth  //
export const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);
}

//  Удаление токенов  //
export const deleteTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

//  Получение токена и рефреш токена из куки  //
export const refreshToken = async ():Promise<TRefreshResponse> => {
  return await fetch(`${BASEURL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({'token': `${getCookie('accessToken')}`})
  })
  .then((res) => checkResponse<TRefreshResponse>(res))
  .then((refreshData) => {
    if (refreshData.success) {
      setTokens(refreshData.accessToken.split('Bearer ')[1], refreshData.refreshToken);
      return refreshData
    }
    return Promise.reject(refreshData);
  })
}

export const fetchWithRefresh = async <T>(url:string, options:RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (error) {
    /* const errorPayload = await error.json() */
    if ((error as {message: string}).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string}).Authorization = refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(error);
    }
  }
}

/*
export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch ({message, statusCode}) {
    if (message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      setCookie('accessToken', refreshData.accessToken.split('Bearer ')[1]);
      setCookie('refreshToken', refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(message);
    }
  }
};
*/

//  Блок методов для авторизации и обработки токенов - как в тренажере  //
//  Отправляю пост-запрос с данными для регистрации на сервер с учетом cookie  //
export const registrationApi = async ({ email, password, name }:TFormValues) => {
  try {
      return await fetch(`${BASEURL}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password, name }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка regApi: ${error}`);
  }
};

//  Отправляю пост-запрос с данными для авторизации на сервер с учетом cookie  //
export const loginApi = async ({ email, password }:TFormValues) => {
  try {
    return await fetch(`${BASEURL}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка loginApi: ${error}`);
  }
};

//  Отправляю get-запрос для получения данных профиля юзера (сначала токен)  //
export const getUserProfileApi = async () => {
  try {
    const { accessToken } = authTokens();
    return await fetch(`${BASEURL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка getUserProfileApi: ${error}`);
  }
};

//  Отправляю patch-запрос с данными для обновления профиля юзера  //
export const updateUserProfileApi = async ({ email, password, name }:TFormValues) => {
  try {
    const { accessToken } = authTokens();
    return await fetchWithRefresh(`${BASEURL}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password, name }),
    }).then((res) => checkResponse<TUserResponse>(res));
  } catch (error) {
    console.log(`Ошибка updateUserProfileApi: ${error}`);
  }
};

//  Отправляю пост-запрос на получение / рефреш токена  //
export const accessTokenApi = async (refreshToken:string|undefined) => {
  try {
    return await fetch(`${BASEURL}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => checkResponse<TTokenResponse>(res));
  } catch (error) {
    console.log(`Ошибка accessTokenApi: ${error}`);
  }
};

//  Отправляю заказ на сервер, post fetch в /orders  //
//  преобразую JSON с id ингредиентов в строку  //
export const postOrder = async (ingredientsID: string[]) => {
  try {
    const { accessToken } = authTokens();
    return await fetchWithRefresh(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },   
      body: JSON.stringify({
        ingredients: ingredientsID
      })   
    })
    //  Возвращаем номер заказа в createOrder в конструкторе  //
  } catch (error) {
    console.log(`Ошибка отправки заказа: ${error}`);
  }
};

//  Отправляю пост-запрос на получение кода для смены пароля на email  //
export const codeRequestApi = async ({ email }:TFormValues) => {
  try {
    return await fetch(`${BASEURL}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(email),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка codeRequestApi: ${error}`);
  }
};

//  Отправляю пост-запрос с данными для смены пароля - новый пароль и токен  //
export const resetPasswordApi = async ({ password, token }:TFormValues) => {
  try {
    return await fetch(`${BASEURL}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ password, token }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка resetPasswordApi: ${error}`);
  }
};

//  Отправляю пост-запрос на выход из системы c refresh токеном  //
export const logoutApi = async (refreshToken:string|undefined) => {
  try {
    return await fetch(`${BASEURL}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: refreshToken }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка logoutApi: ${error}`);
  }
};