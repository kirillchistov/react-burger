import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWSConnectionActions,
} from '../actions/ws-actions';

import { getCookie } from '../../utils/auth';
import { MiddlewareAPI } from 'redux';
import { AppDispatch } from '../../utils/types';

const wsMiddleware = (wsUrl: string) => {
  return (store: MiddlewareAPI<AppDispatch>) => {
    let socket: WebSocket | null = null;

    return (next: (action: TWSConnectionActions) => {}) =>
      (action: TWSConnectionActions) => {
        const accessToken = getCookie('accessToken');
        const { dispatch } = store;
        const { type } = action;

        if (type === WS_CONNECTION_START) {
          socket = new WebSocket(`${wsUrl}/all`);
        }

        if (type === WS_CONNECTION_START_AUTH && accessToken) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        }

        if (socket) {
          socket.onopen = (event: Event) => {
            dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
          };

          socket.onerror = (event: Event) => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
          };

          socket.onmessage = (event: MessageEvent) => {
            const { data } = event;
            const parseData = JSON.parse(data);
            const { success, ...restParsedData } = parseData;

            dispatch({ type: WS_GET_MESSAGE, payload: restParsedData });
          };

          socket.onclose = (event: Event) => {
            dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
          };
        }
        next(action);
      };
  };
};

export { wsMiddleware };
