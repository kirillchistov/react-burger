//  Начальные actions для обработки заказов O-DETAILS  //

import { postOrder } from '../../utils/api';

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

//  Получение и обновление номера заказа в модальном окне O-Details  //
export const dispatchOrder = (orderDataID) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_API,
    });
    postOrder(orderDataID).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_API_OK,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: POST_ORDER_API_FAIL,
        });
      }
    });
  };
};
