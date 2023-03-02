//  Cоздаю корневой редюсер и комбинируем в нем остальные  //
import { combineReducers } from 'redux';
import { ingredientsReducer, ingredientDetailsReducer } from './ingredient-reducer';
import { orderReducer } from './order-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});
