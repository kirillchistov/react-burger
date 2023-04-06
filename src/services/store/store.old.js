//  Создаю redux store и переношу сюда усилители  //
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//  Подключаю Redux DevTools  //
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

export const enhancer = composeEnhancers(applyMiddleware(thunk));
