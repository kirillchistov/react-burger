import { wsOrdersReducer, WSInitialState } from './ws-reducer';
// import {
//   WS_CONNECTION_START,
//   WS_CONNECTION_SUCCESS,
//   WS_CONNECTION_ERROR,
//   WS_CONNECTION_CLOSE,
//   WS_CONNECTION_CLOSED,
//   WS_GET_MESSAGE,
//   WS_SEND_MESSAGE,
// } from '../../utils/constants';

// import { TWSConnectionActions } from '../actions/ws-actions';
// import { TWSAction, TAppActions } from '../types';
// import { wsActions, wsActionsAuth } from '../store'

import { WSORDERDATA } from '../../utils/testdata';

describe('wsOrdersReducer', () => {
  it("should return the initial state", () => {
    expect(wsOrdersReducer(undefined, {} as any)).equal(WSInitialState);
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: 'WS_CONNECTION_START',
        // payload: {} as any,
      })
    ).equal({ ...WSInitialState, error: undefined });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: 'WS_CONNECTION_SUCCESS',
      })
    ).equal({ ...WSInitialState, error: undefined, wsConnected: true });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: 'WS_CONNECTION_ERROR',
        payload: {} as any,
      })
    ).equal({ ...WSInitialState, error: {}, wsConnected: false });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: 'WS_CONNECTION_CLOSED',
      })
    ).equal({ ...WSInitialState, error: undefined, wsConnected: false, data: [] });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: 'WS_GET_MESSAGE',
        payload: {} as any,
      })
    ).equal({ ...WSInitialState, error: undefined, data: [WSORDERDATA] });
  });
});
