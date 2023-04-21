import React from 'react';
import ReactDOM from 'react-dom/client';
//  Поддержка redux  //
import { store } from './services/store';
import { Provider } from 'react-redux';
//  Переключился на корневой App  //
import App from './app';

//  Добавил поддержку роутера  // 
import { BrowserRouter } from 'react-router-dom';
//  Корневой редьюсер и усилитель  //
import './index.css';

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
