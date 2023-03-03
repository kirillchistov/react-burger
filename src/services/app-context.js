//  Контекст больше не нужен - можно удалить  //
import { createContext } from 'react';

export const AppContext = createContext([]);
//  Разделяем на несколько контекстов:  1) ингредиенты //
export const IngredientContext = createContext([]);
//  Разделяем на несколько контекстов:  2) цены //
export const PriceContext = createContext(null);
//  Разделяем на несколько контекстов:  3) заказы //
export const OrderContext = createContext(null);