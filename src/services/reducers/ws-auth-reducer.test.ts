import { expect } from '@jest/globals';
import { wsAuthOrdersReducer, WSInitialAuthState } from './ws-auth-reducer';
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  // WS_CONNECTION_CLOSE_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  // WS_SEND_MESSAGE_AUTH,
} from '../../utils/constants';

// import { TWSConnectionActions } from '../actions/ws-actions';
// import { TWSAction, TAppActions } from '../types';
// import { wsActions, wsActionsAuth } from '../store'

import { WSORDERDATA } from '../../utils/testdata';

describe('wsAuthOrdersReducer', () => {
  it("should return initial auth state", () => {
    expect(wsAuthOrdersReducer(undefined, {} as any)).toEqual(WSInitialAuthState);
  });

  it("should handle WS_CONNECTION_START_AUTH", () => {
    expect(
      wsAuthOrdersReducer(WSInitialAuthState, {
        type: WS_CONNECTION_START_AUTH,
        // payload: {} as any,
      })
    ).toEqual({ ...WSInitialAuthState, error: undefined });
  });

  it("should handle WS_CONNECTION_SUCCESS_AUTH", () => {
    expect(
      wsAuthOrdersReducer(WSInitialAuthState, {
        type: WS_CONNECTION_SUCCESS_AUTH,
      })
    ).toEqual({ ...WSInitialAuthState, error: undefined, wsConnected: true });
  });

  it("should handle WS_CONNECTION_ERROR_AUTH", () => {
    expect(
      wsAuthOrdersReducer(WSInitialAuthState, {
        type: WS_CONNECTION_ERROR_AUTH,
        payload: {} as any,
      })
    ).toEqual({ ...WSInitialAuthState, error: {}, wsConnected: false });
  });

  it("should handle WS_CONNECTION_CLOSED_AUTH", () => {
    expect(
      wsAuthOrdersReducer(WSInitialAuthState, {
        type: WS_CONNECTION_CLOSED_AUTH,
      })
    ).toEqual({ ...WSInitialAuthState, error: undefined, wsConnected: false, data: [] });
  });

  it("should handle WS_GET_MESSAGE_AUTH", () => {
    expect(
      wsAuthOrdersReducer(WSInitialAuthState, {
        type: WS_GET_MESSAGE_AUTH,
        payload: {} as any,
      })
    ).toEqual({ ...WSInitialAuthState, error: undefined, data: [WSORDERDATA] });
  });
});
