//  Редьюсер для обработки заказов в redux store   //
//  Импортирую actions для заказов  //
import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  POST_ORDER_API,
  POST_ORDER_API_OK,
  POST_ORDER_API_FAIL,
  DELETE_ORDER
} from '../../utils/constants';
import { TAppActions, TIngredient, TOrder } from '../types/index'

export type TOrderState = {
  burgerData: TIngredient[],
  orderNumber: number|null,
  orderRequest: boolean,
  orderRequestFailed: boolean,
  orderData: TOrder[],
  total: number,
  totalToday: number, 
};

//  Начальное состояние заказа: пустой массив, null номер, нет запроса и ошибок  //
const initialOrderState: TOrderState = {
  burgerData: [],
  orderNumber: null,
  orderRequest: false,
  orderRequestFailed: false,
  orderData: [],
  total: 0,
  totalToday: 0, 
};

//  Меняю состояние в сторе в зависимости от типа action  //
export const orderReducer = (state = initialOrderState, action: TAppActions) => {
  switch (action.type) {
    //  Для добавления булки нахожу ее индекс в заказе по типу элемента 'bun'  //
    case ADD_BUN: {
      //  Задаю текущую позицию булки для сортировки заказа  //
      const bunIndex = state.burgerData.findIndex(
        (elem: TIngredient) => elem.type === 'bun'
      );
      //  Запоминаю контент action с добавлением булки  //
      const bun: TIngredient = action.payload;
      
      //  Сначала создаю копию того, что есть в заказе сейчас  //
      const orderIngredients = [...state.burgerData];
      //  Если булка уже есть в заказе, заменяю ее на новую  //
      if (bunIndex >= 0) {
        orderIngredients.splice(bunIndex, 1, bun);
      } else {
        //  если еще нет, то добавляю в конец массива  //
        orderIngredients.push(bun);
      }
      //  возвращаю в состояние новый массив с содержанием заказа  //
      return {
        ...state,
        burgerData: orderIngredients
      };
    }
    //  Для добавления другого ингредиента просто добавляю состав (payload) в копию массива  //
    //  И возвращаю состояние с новым содержанием заказа  //
    case ADD_INGREDIENT:
      return {
        ...state,
        burgerData: [...state.burgerData, action.payload]
      };
    //  Для удаления ингредиента сокращаю массив фильтром по id удаленного ингредиента  //
    //  И возвращаю состояние с новым содержанием заказа  //
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        burgerData: state.burgerData.filter(
          (ingredient) => ingredient._uid !== action.payload
        ),
      };
    }
    case MOVE_INGREDIENT: {
      //  Здесь докрутил пример из тренажера  //
      const { whichIngredientDroppedUid, onWhichIngredientDroppedUid } =
        action.payload;

      const burgerData = [...state.burgerData];
      const draggedItemIndex = burgerData.findIndex(
        (ingredient) => ingredient._uid === whichIngredientDroppedUid
      );
      const hoveredItemIndex = burgerData.findIndex(
        (ingredient) => ingredient._uid === onWhichIngredientDroppedUid
      );

      const draggedItem = burgerData[draggedItemIndex];
      const hoveredItem = burgerData[hoveredItemIndex];

      burgerData[draggedItemIndex] = hoveredItem;
      burgerData[hoveredItemIndex] = draggedItem;

      return {
        ...state,
        burgerData,
      };
    }
    //  Для отправки заказа возвращаем новое состояние с содержанием и включаем запрос  //
    case POST_ORDER_API: {
      return {
        ...state,
        orderRequest: true
      };
    }
    //  В случае успешного ответа возвращаем новое состояние с номером, без ошибки, выключаем запрос  //
    case POST_ORDER_API_OK: {
      return {
        ...state,
        orderRequestFailed: false,
        orderNumber: action.payload,
        orderRequest: false
      };
    }
    //  В случае ошибки возвращаем новое состояние с ошибкой, выключаем запрос  //
    case POST_ORDER_API_FAIL: {
      return { ...state, orderRequestFailed: true, orderRequest: false };
    }
    //  В случае удаления заказа возвращаем новое состояние с обнуленным номером и составом заказа  //
    case DELETE_ORDER:
      return {
        ...state,
        orderNumber: null,
        burgerData: [],
        orderRequest: false
      };
    //  По умолчанию возвращаем текущее состояние без изменений  //    
    default:
      return state;
  }
};
