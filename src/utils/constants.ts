//  Вынес все типы в отдельную функцию /services/types  //

export const BASEURL = 'https://norma.nomoreparties.space/api';
export const WSURL = 'wss://norma.nomoreparties.space/orders/all';
export const WSURLAUTH = 'wss://norma.nomoreparties.space/orders';

//  Здесь защищаюсь от null значения через прокси-переменную  //
export const modalsRoot = document.getElementById('modals');
export const modalRoot = modalsRoot!;

//  экспериментирую с enum, пока не использую в таком виде  //
export enum pageUrls {
  home = '/',
  reg = '/register',
  login = '/login',
  profile = '/profile',
  forgot = '/forgot-password',
  reset = '/reset-password',
  ingred = '/ingredients',
  ingdetails = '/ingredients/:id',
  feed = '/feed',
  orders = '/orders',
  proforders = '/profile/orders',
  notfound = '/*',
};

//  Константы роутов  //
export const HOMEURL = '/';
export const REGURL = '/register';
export const LOGINURL = '/login';
export const PROFILEURL = '/profile';
export const FORGOTURL = '/forgot-password';
export const RESETPASSURL = '/reset-password';
export const INGREDIENTSURL = '/ingredients';
export const FEEDURL = '/feed';
export const FEEDID = '/feed/:id';
export const ORDERSURL = '/orders';
export const PROFILEORDERSURL = '/profile/orders';
export const ORDERSID = '/profile/orders/:id';
export const INGREDIENTSID = '/ingredients/:id';
export const NOTFOUNDURL = '/*';

//  Константы для API ингредиентов  //
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
export const GET_INGREDIENTS_API_OK = 'GET_INGREDIENTS_API_OK';
export const GET_INGREDIENTS_API_FAIL = 'GET_INGREDIENTS_API_FAIL';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

//  Константы для просмотра данных об ингредиенте (попап и страница)  //
export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

//  Действия с заказом бургера: Отправка, ОК или ошибка, удаление  //
export const POST_ORDER_API = 'POST_ORDER_API';
export const POST_ORDER_API_OK = 'POST_ORDER_API_OK';
export const POST_ORDER_API_FAIL = 'POST_ORDER_API_FAIL';
export const DELETE_ORDER = 'DELETE_ORDER';

//  Константы для API авторизации, регистрации, профиля, токена  //
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

//  Константы для WebSockets по 7 для состояний LoggedIn и LoggedOut //
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = 'WS_CONNECTION_CLOSE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

export const WS_CONNECTION_START_AUTH: 'WS_CONNECTION_START_AUTH' = 'WS_CONNECTION_START_AUTH';
export const WS_CONNECTION_SUCCESS_AUTH: 'WS_CONNECTION_SUCCESS_AUTH' = 'WS_CONNECTION_SUCCESS_AUTH';
export const WS_CONNECTION_ERROR_AUTH: 'WS_CONNECTION_ERROR_AUTH' = 'WS_CONNECTION_ERROR_AUTH';
export const WS_CONNECTION_CLOSE_AUTH: 'WS_CONNECTION_CLOSE_AUTH' = 'WS_CONNECTION_CLOSE_AUTH';
export const WS_CONNECTION_CLOSED_AUTH: 'WS_CONNECTION_CLOSED_AUTH' = 'WS_CONNECTION_CLOSED_AUTH';
export const WS_GET_MESSAGE_AUTH: 'WS_GET_MESSAGE_AUTH' = 'WS_GET_MESSAGE_AUTH';
export const WS_SEND_MESSAGE_AUTH: 'WS_SEND_MESSAGE_AUTH' = 'WS_SEND_MESSAGE_AUTH';
