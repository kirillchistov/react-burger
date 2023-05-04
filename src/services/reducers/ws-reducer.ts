//  import { PayloadAction } from '@reduxjs/toolkit';

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../utils/constants';

import { TWSConnectionActions } from '../actions/ws-actions';

import { TOrder } from '../../services/types';

export type TWSState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  error?: Event | null,
  total: number | null;
  totalToday: number | null;
};

export const WSInitialState: TWSState = {
  wsConnected: false,
  orders: [],
  error: null,
  total: 0,
  totalToday: 0,
};

//  Создал редьюсер для WebSocket по аналогии с тренажером  //
const wsOrdersReducer = (
  state = WSInitialState,
  action: TWSConnectionActions
): TWSState => {

  switch (action.type) {
    // экшен типа WS_CONNECTION_SUCCESS: wsConnected = true  //
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    //  если типа WS_CONNECTION_ERROR: wsConnected = false, ошибку из payload  //
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    //  При WS_CONNECTION_CLOSED: wsConnected = false  //
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    //  Когда с сервера приходят данные WS_GET_MESSAGE, передаем их в orders, total, totalToday  //
    case WS_GET_MESSAGE:
      return {
        ...state,
        //  get: true,
        error: undefined,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: [...action.payload.orders],
      };
    default:
      return state;
  }
};

export { wsOrdersReducer };

