import { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';  //
import { TWSAction } from '../../services/types';
import { authTokens } from '../../utils/auth';

export const wsMiddleware = (wsUrl: string, wsActions: TWSAction, auth: boolean): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | undefined;
  //  let connected = false;
  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    const { accessToken } = authTokens();
    const token = auth ? accessToken : null;
    //  объект класса WebSocket
    if (type === wsInit) {
      socket = token
        ? new WebSocket(`${wsUrl}?token=${token}`)
        : new WebSocket(`${wsUrl}`);
    }
    //  функция, которая вызывается при открытии сокета
    if (socket) {
      //  connected = true;
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };
      //  функция, которая вызывается при ошибке соединения
      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };
      //  функция, которая вызывается при получения события от сервера
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: onMessage, payload: restParsedData });
      };
      //  функция, которая вызывается при закрытии соединения
      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
        console.log('socket closed with code: ', event.code);
      };

      if (wsClose && type === wsClose && socket) {
        socket.close(1000, 'socket closed');
        //  connected = false;
      }
      //  функция для отправки сообщения на сервер
      if (wsSendMessage && type === wsSendMessage && socket) {
        const message = token ? { ...payload, token } : { ...payload };
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};