//  Редьюсер для обработки действий с ингредиентами в redux store   //
//  Импортирую actions для ингредиентов  //
import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_OK,
  GET_INGREDIENTS_API_FAIL,
} from '../../utils/constants';

import { TIngredientActions } from '../actions/ingredient-actions'
import { TIngredient } from '../../services/types';

type TIngredientsState = {
  items: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
};

//  Начальное состояние стора ингредиентов: пустой массив, нет запроса, нет ошибок  //
export const initialIngredientsState:TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
};

//  Меняю состояние в сторе в зависимости от типа action: запрос, успех, ошибка  //
export const ingredientsReducer = (
  state = initialIngredientsState, 
  action: TIngredientActions):TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_API_OK: {
      return {
        ...state,
        items: action.items,
        itemsFailed: false,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_API_FAIL: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};

