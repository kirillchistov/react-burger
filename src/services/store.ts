//  Создаю redux store и переношу сюда усилители  //
import { applyMiddleware, compose, createStore } from 'redux';
//  import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers';
import thunk from 'redux-thunk';
import { wsMiddleware } from './middlewares/wsMiddlewares';

//  Статусы WS-соединения  //
import {
  WSURL, 
  WSURLAUTH,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSE_AUTH,
  WS_SEND_MESSAGE_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
} from '../utils/constants';

//  Типизирую глобальный интерфейс Window  //
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//  Композиция усилителей с новой типизацией  //
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//  Типизирую actions для WS-соединений  //
export type TWsMiddlewareActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly wsClose: typeof  WS_CONNECTION_CLOSE;
  readonly wsSendMessage: typeof WS_SEND_MESSAGE;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onMessage: typeof WS_GET_MESSAGE;
};

export const wsActions: TWsMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export type TWsMiddlewareAuthActions = {
  readonly wsInit: typeof WS_CONNECTION_START_AUTH;
  readonly wsClose: typeof  WS_CONNECTION_CLOSE_AUTH;
  readonly wsSendMessage: typeof WS_SEND_MESSAGE_AUTH;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS_AUTH;
  readonly onClose: typeof WS_CONNECTION_CLOSED_AUTH;
  readonly onError: typeof WS_CONNECTION_ERROR_AUTH;
  readonly onMessage: typeof WS_GET_MESSAGE_AUTH;
};
export const wsActionsAuth:TWsMiddlewareAuthActions = {
  wsInit: WS_CONNECTION_START_AUTH,
  wsClose: WS_CONNECTION_CLOSE_AUTH,
  wsSendMessage: WS_SEND_MESSAGE_AUTH,
  onOpen: WS_CONNECTION_SUCCESS_AUTH,
  onClose: WS_CONNECTION_CLOSED_AUTH,
  onError: WS_CONNECTION_ERROR_AUTH,
  onMessage: WS_GET_MESSAGE_AUTH,
};

export const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(wsMiddleware(WSURL, wsActions, false)),
  applyMiddleware(wsMiddleware(WSURLAUTH, wsActionsAuth, true))
);

export const store = createStore(rootReducer, enhancer);
