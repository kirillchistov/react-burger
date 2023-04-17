import { PayloadAction } from '@reduxjs/toolkit';
import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from '../../utils/constants';

import { TWSConnectionAuthActions } from '../actions/ws-actions';

import { TOrder } from '../types';

export type TWSAuthState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  error?: PayloadAction | null,
  total: number | null;
  totalToday: number | null;
  //  get: boolean;
};

const WSInitialAuthState: TWSAuthState = {
  wsConnected: false,
  orders: [],
  error: null,
  total: null,
  totalToday: null,
  //  get: false,
};

//  Создал редьюсер для WebSocket по аналогии с тренажером  //
export const wsAuthOrdersReducer = (
  state = WSInitialAuthState,
  action: TWSConnectionAuthActions
  ): TWSAuthState => {

  //  console.log(action.payload);
  switch (action.type) {
    // экшен типа WS_CONNECTION_SUCCESS_AUTH: wsConnected = true  //
    case WS_CONNECTION_SUCCESS_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    //  если типа WS_CONNECTION_ERROR: wsConnected = false, ошибку из payload  //
    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    //  При WS_CONNECTION_CLOSED_AUTH: wsConnected = false  //
    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        //  get: false,
      };
    //  Когда с сервера приходят данные WS_GET_MESSAGE_AUTH, передаем  //
    case WS_GET_MESSAGE_AUTH:
      return {
        ...state,
        error: undefined,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: [...action.payload.orders],
        //  get: true,
      };
    default:
      return state;
  }
};
