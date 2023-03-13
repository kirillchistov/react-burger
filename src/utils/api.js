//  Добавляю в API методы для авторизации, профиля и пароля  //
//  BASEURL = 'https://norma.nomoreparties.space/api' убрать в .env  //
import {BASEURL} from './constants';
//  Беру методы для получения токена и рефреш из куки
import { authTokens } from './auth';

//  Обрабатываю ответ сервера - возвращаю json или ошибку  //
export const checkResponse = async (res) => {
  try {
    if (res.ok) {
      return await res.json();
    }
    return Promise.reject({statusCode: res.status, message: res.message});
  } catch (err) {
    console.log(`Ошибка запроса к серверу: ${err}`);
  }
};

//  Получаю ингредиенты с сервера и записываю в массив  //
export const fetchIngredients = async (setIngredients) => {
  try {
    return await fetch(`${BASEURL}/ingredients`)
      .then(checkResponse)
      .then(setIngredients)
  } catch (err) {
    console.log(`Ошибка получения ингредиентов: ${err}`);
  }
}

//  Отправляю заказ на сервер, post fetch в /orders  //
//  преобразую JSON с id ингредиентов в строку  //
export const postOrder = async (ingredientsID) => {
  try {
    return await fetch(`${BASEURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify({
        ingredients: ingredientsID
      })   
    })
    .then(checkResponse)
    //  Возвращаем номер заказа в createOrder в конструкторе  //
  } catch (err) {
    console.log(`Ошибка отправки заказа: ${err}`);
  }
};

//  Блок методов для авторизации и обработки токенов - как в тренажере  //
//  Отправляю пост-запрос с данными для регистрации на сервер с учетом cookie  //
export const registrationApi = async ({ email, password, name }) => {
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
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка regApi: ${err}`);
  }
};

//  Отправляю пост-запрос с данными для авторизации на сервер с учетом cookie  //
export const loginApi = async ({ email, password }) => {
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
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка loginApi: ${err}`);
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
        Authorization: 'Bearer ' + accessToken,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка getUserProfileApi: ${err}`);
  }
};

//  Отправляю patch-запрос с данными для обновления профиля юзера  //
export const updateUserProfileApi = async ({ email, password, name }) => {
  try {
    const { accessToken } = authTokens();
    return await fetch(`${BASEURL}/auth/user`, {
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
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка updateUserProfileApi: ${err}`);
  }
};

//  Отправляю пост-запрос на получение / рефреш токена  //
export const accessTokenApi = async (refreshToken) => {
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
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка accessTokenApi: ${err}`);
  }
};

//  Отправляю пост-запрос на получение кода для смены пароля на email  //
export const codeRequestApi = async (email) => {
  try {
    return await fetch(`${BASEURL}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(email),
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка codeRequestApi: ${err}`);
  }
};

//  Отправляю пост-запрос с данными для смены пароля - новый пароль и токен  //
export const resetPasswordApi = async ({ password, token }) => {
  try {
    return await fetch(`${BASEURL}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ password, token }),
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка resetPasswordApi: ${err}`);
  }
};

//  Отправляю пост-запрос на выход из системы - очистку лок.хранилища и пр.  //
/*  
    Выход из системы - в теле запроса refreshToken: { 'token': 'значение refreshToken' }
    Для выхода или обновления токена используется именно refreshToken, 
    который можно получить после успешной регистрации или авторизации.
    Тело ответа при выходе: { 'success': true, 'message': 'Successful logout' }
*/
export const logoutApi = async (refreshToken) => {
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
    }).then(checkResponse);
  } catch (err) {
    console.log(`Ошибка logoutApi: ${err}`);
  }
};
