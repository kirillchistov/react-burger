import { RootState } from '../services/types';

export const getUser = (state: RootState) => state.auth.user;
export const getItems = (state: RootState) => state.ingredients.items;
export const getResetCode = (state: RootState) => state.auth.hasResetCode;
export const getOrders = (state: RootState) => state.ws.orders;
export const getOrdersLogged = (state: RootState) => state.wsAuth.orders;
export const getBurgerData = (state: RootState) => state.order.burgerData;
