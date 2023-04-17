import { TUser, TIngredient, TOrder  } from '../services/types';

export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getItems = (state: { ingredients: { ingredients: TIngredient[]; }; }) => state.ingredients.ingredients;
//  export const getItems = (state: { ingredients: TIngredient[]; }) => state.ingredients;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getOrders = (state: { order: { orderData: TOrder[]; }; }) => state.order.orderData;
export const getOrdersLogged = (state: { order: { orderData: TOrder[]; }; }) => state.order.orderData;

export const getBurgerData = (state: { order: { burgerData: TIngredient[]; }; }) => state.order.burgerData;
