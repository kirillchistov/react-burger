//  Начальные actions для ингредиентов B-Ingredients и B-Constructor  //

import { fetchIngredients } from '../../utils/api';
//  Все константы экспортирую теперь из констант  //
import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_OK,
  GET_INGREDIENTS_API_FAIL,
} from '../../utils/constants';

//  Импортирую типы  //
import { TIngredient } from '../../utils/types';
import { AppDispatch } from '../../utils/types';
import { TIngredientResponse, TResponse } from '../../utils/types';

//  Создаю интерфейсы  //
export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS_API;
}
export interface IGetIngredientsOK {
  readonly type: typeof GET_INGREDIENTS_API_OK;
  readonly items: TIngredient[];
}
export interface IGetIngredientsFail {
  readonly type: typeof GET_INGREDIENTS_API_FAIL;
}

//  Создаю тип для actions с ингридиентами  //
export type TIngredientsActions = | IGetIngredients | IGetIngredientsOK | IGetIngredientsFail;

//  Типизирую функцию успеха при получении массива ингридиентов  //
export const getIngredientsOK = (
  items: TIngredient[]
): IGetIngredientsOK => ({
  type: GET_INGREDIENTS_API_OK,
  items,
});
//  Добавил dispatch для получения результата запроса ингредиентов в API  //
export const getIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_API
    });
    fetchIngredients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_API_OK,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_API_FAIL
        });
      }
    });
  };
};