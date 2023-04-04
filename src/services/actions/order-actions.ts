//  Начальные actions для обработки заказов O-DETAILS  //

import { postOrder } from '../../utils/api';
import { TIngredient } from '../../utils/types';
import { AppDispatch } from '../../utils/types';

//  Все константы экспортирую, потом, видимо, вынесу в отдельный файл  //
//  Действия с ингредиентами в конструкторе: CruD  //
//  Для булки только добавление - без булки нельзя собрать бургер, к сож  //
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

//  Действия с заказом бургера: Отправка, ОК или ошибка, удаление  //
export const POST_ORDER_API = 'POST_ORDER_API';
export const POST_ORDER_API_OK = 'POST_ORDER_API_OK';
export const POST_ORDER_API_FAIL = 'POST_ORDER_API_FAIL';
export const DELETE_ORDER = 'DELETE_ORDER';

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload: TIngredient;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {
    whichIngredientDroppedUid: string;
    onWhichIngredientDroppedUid: string;
  }
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  payload: string;
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  payload: TIngredient;
}
export interface IPostOrder {
  readonly type: typeof POST_ORDER_API;
}

export interface IPostOrderOK {
  readonly type: typeof POST_ORDER_API_OK;
  payload: number;
}

export interface IPostOrderFail {
  readonly type: typeof POST_ORDER_API_FAIL;
}

export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions = IAddIngredient
| IMoveIngredient
| IRemoveIngredient
| IAddBun
| IPostOrder
| IPostOrderOK
| IPostOrderFail
| IDeleteOrder;

export const dispatchOrderOK = (
  payload: number
): IPostOrderOK => ({
  type: POST_ORDER_API_OK,
  payload,
});

//  Получение и обновление номера заказа в модальном окне O-Details  //
export const dispatchOrder = (orderDataID: string[]) => {
  return function (dispatch:AppDispatch) {
    dispatch({
      type: POST_ORDER_API
    });
    postOrder(orderDataID).then((res) => {
      if (res && res.success) {
        /* https://github.com/vercel/next.js/issues/42292 */
        /* @ts-expect-error Server Component */             
        dispatch(dispatchOrderOK(res.order.number));
      } else {
        dispatch({
          type: POST_ORDER_API_FAIL,
        });
      }
    });
  };
};
