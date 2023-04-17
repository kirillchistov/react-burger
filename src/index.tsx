import React from 'react';
import ReactDOM from 'react-dom/client';
//  Поддержка redux  //
//  import { createStore } from 'redux';  //
import { store } from './services/store';
import { Provider } from 'react-redux';
//  import App from './components/app/app';  //
//  Переключился на корневой App  //
import App from './app';

//  Добавил поддержку роутера  // 
import { BrowserRouter } from 'react-router-dom';
//  Корневой редьюсер и усилитель  //
//  import { rootReducer } from './services/reducers';
//  import { enhancer } from './services/store';
import './index.css';

//  Создал подключение к redux store с усилителем  //
//  const store = createStore(rootReducer, enhancer);  //

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//  обернул App в провайдер redux-стора  //
//  добавил обертку browser router  //
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
