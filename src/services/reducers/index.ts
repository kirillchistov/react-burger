//  Cоздаю корневой редьюсер и комбинируем в нем остальные  //
import { combineReducers } from 'redux';
//  Добавил редюсер состояния авторизации юзера  //
import { wsAuthOrdersReducer } from './ws-auth-reducer';
import { wsOrdersReducer } from './ws-reducer';
import { ingredientsReducer /*, ingredientDetailsReducer */ } from './ingredient-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
//   ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  ws: wsOrdersReducer,
  wsAuth: wsAuthOrdersReducer,
});
