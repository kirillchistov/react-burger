//  Cоздаю корневой редьюсер и комбинируем в нем остальные  //
import { combineReducers } from 'redux';
//  Добавил редюсер состояния авторизации юзера  //
import { authReducer } from './auth-reducer';
import { ingredientsReducer, ingredientDetailsReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer
});
