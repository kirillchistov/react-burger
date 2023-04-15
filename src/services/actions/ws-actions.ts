import { TWSState } from '../reducers/ws-reducer';

const WS_CONNECTION_START = 'WS_CONNECTION_START';
const WS_CONNECTION_START_AUTH = 'WS_CONNECTION_START_AUTH';
const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
const WS_GET_MESSAGE = 'WS_GET_MESSAGE';

export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionStartAuthAction {
  readonly type: typeof WS_CONNECTION_START_AUTH;
}

export interface IWSConnectionSuccesAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: any;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  payload: TWSState;
}

export type TWSConnectionActions =
  | IWSConnectionStartAction
  | IWSConnectionStartAuthAction
  | IWSConnectionSuccesAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction;

export {
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
};
