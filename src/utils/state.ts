import { TUser, TIngredient  } from './types';

export const getItems = (state: { ingredients: { items: TIngredient[]; }; }) => state.ingredients.items;
export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getBurgerData = (state: { burger: { orderData: TIngredient[]; }; }) => state.burger.orderData;
