// import { PayloadAction } from '@reduxjs/toolkit';
//  import { TWSState } from '../reducers/ws-reducer';
//  Перенес константы в /utils/constants  //
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  WS_SEND_MESSAGE_AUTH,
} from '../../utils/constants';

// const WS_CONNECTION_START = 'WS_CONNECTION_START';
// const WS_CONNECTION_START_AUTH = 'WS_CONNECTION_START_AUTH';
// const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
// const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
// const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
// const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

import { TWsMessage } from '../types/';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: Event
}
export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TWsMessage;
}
export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export interface IWsConnectionStartAuthAction {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}
export interface IWsConnectionSuccessAuthAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_AUTH;
}
export interface IWsConnectionErrorAuthAction {
  readonly type: typeof WS_CONNECTION_ERROR_AUTH;
  payload: Event
}
export interface IWsConnectionCloseAuthAction {
  readonly type: typeof WS_CONNECTION_CLOSE_AUTH;
}
export interface IWsConnectionClosedAuthAction {
  readonly type: typeof WS_CONNECTION_CLOSED_AUTH;
}
export interface IWsGetMessageAuthAction {
  readonly type: typeof WS_GET_MESSAGE_AUTH;
  payload: TWsMessage;
}
export interface IWsSendMessageAuthAction {
  readonly type: typeof WS_SEND_MESSAGE_AUTH;
}

export type TWSConnectionActions =
| IWsConnectionStartAction
| IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsConnectionCloseAction
| IWsConnectionClosedAction
| IWsGetMessageAction
| IWsSendMessageAction;

export type TWSConnectionAuthActions =
| IWsConnectionStartAuthAction
| IWsConnectionSuccessAuthAction
| IWsConnectionErrorAuthAction
| IWsConnectionCloseAuthAction
| IWsConnectionClosedAuthAction
| IWsGetMessageAuthAction
| IWsSendMessageAuthAction;



