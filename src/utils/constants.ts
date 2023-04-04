import { TIngredient, TOrder, TUser } from '../utils/types';

export const BASEURL = 'https://norma.nomoreparties.space/api';
export const modalsRoot = document.getElementById('modals');
export const modalRoot = modalsRoot!;
// export const selectorOrders = (store) => store.order;

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
export const ORDERSURL = '/orders';
export const PROFILEORDERSURL = '/profile/orders';
export const NOTFOUNDURL = '/*';

//  Получение списка ингредиентов от API используется в B-I и  //
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
export const GET_INGREDIENTS_API_OK = 'GET_INGREDIENTS_API_OK';
export const GET_INGREDIENTS_API_FAIL = 'GET_INGREDIENTS_API_FAIL';

//  Добавление, удаление данных о просматриваемом ингредиенте (попап с I-Details)  //
export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

//  Константы состояния  //
export const getItems = (state: { ingredients: { items: TIngredient[]; }; }) => state.ingredients.items;
export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getOrders = (state: { order: { orderData: TOrder[]; }; }) => state.order.orderData;
export const getBurgerData = (state: { order: { burgerData: TIngredient[]; }; }) => state.order.burgerData;
