//  Создаю redux store и переношу сюда усилители  //
import { applyMiddleware, compose, createStore } from 'redux';
import { rootReducer } from "../reducers/root-reducer";
import thunk from 'redux-thunk';

//  Подключаю Redux DevTools  //

//  Типизирую глобальный интерфейс Window  //
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//  Композиция усилителей с новой типизацией  //
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
