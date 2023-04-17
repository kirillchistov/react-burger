import { TUser, TIngredient, TOrder  } from '../services/types';

export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getItems = (state: { ingredients: { ingredients: TIngredient[]; }; }) => state.ingredients.ingredients;
//  export const getItems = (state: { ingredients: TIngredient[]; }) => state.ingredients;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getOrders = (state: { ws: { orders: TOrder[]; }; }) => state.ws.orders;
export const getOrdersLogged = (state: { wsAuth: { orders: TOrder[]; }; }) => state.wsAuth.orders;
export const getBurgerData = (state: { order: { burgerData: TIngredient[]; }; }) => state.order.burgerData;
