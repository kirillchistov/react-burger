import { TUser, TIngredient, TOrder  } from './types';

export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getItems = (state: { ingredients: { items: TIngredient[]; }; }) => state.ingredients.items;
//  export const getItems = (state: { ingredients: TIngredient[]; }) => state.ingredients;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getOrders = (state: { order: { orderData: TOrder[]; }; }) => state.order.orderData;
export const getBurgerData = (state: { order: { burgerData: TIngredient[]; }; }) => state.order.burgerData;
