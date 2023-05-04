// Пока в процессе дописывания тестирование redux  //
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import { setRegisterSending, register, ActionTypes } from '../services/actions/auth-actions';
// import reducer from '../services/reducers/auth-reducer';
// import api from '../utils/api';
// import * as auth from '../utils/auth';

// const initialState = {
//   data: null,
//   authChecking: true,
//   registerSending: undefined,
//   registerError: "",
//   loginSending: false,
//   loginError: "",
// }

// describe("Redux auth store", () => {
//   beforeEach(() => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: jest.fn().mockResolvedValue({ result: 'OK' }),
//       ok: true,
//     })
//   })

//   afterEach(() => {
//     jest.restoreAllMocks()
//   })

//   test('Should call SET_REGISTER_SENDING action with payload', () => {
//     const action = setRegisterSending(true)

//     expect(action).toEqual({
//       type: ActionTypes.SET_REGISTER_SENDING,
//       payload: true,
//     })
//   })

//   test('Should return the initial state', () => {
//     expect(reducer(undefined, {})).toEqual(initialState)
//   })

//   test('Should return state with error after rising login error action', () => {
//     const error = 'Not found'

//     expect(reducer(initialState, {
//       type: ActionTypes.SET_LOGIN_SEND_ERROR,
//       payload: error
//     })).toEqual({
//       ...initialState,
//       loginError: error
//     })
//   })

//   test('Should fire 3 actions after register dispatched', () => {
//     const middlewares = [thunk.withExtraArgument({api, auth})]
//     const mockStore = configureMockStore(middlewares)
//     const expectedActions = [
//       { type: ActionTypes.SET_REGISTER_SENDING, payload: true },
//       { type: ActionTypes.SET_REGISTER_SEND_ERROR, payload: '' },
//       { type: ActionTypes.SET_REGISTER_SENDING, payload: false },
//     ]
//     const store = mockStore({})

//     return store
//       .dispatch(register({ email: 'email', password: 'password' }))
//       .then(() => {
//         expect(store.getActions()).toEqual(expectedActions)
//       })
//   })
// });
export {}
