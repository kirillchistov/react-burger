import React from 'react';
import ReactDOM from 'react-dom/client';
//  Поддержка redux  //
import { createStore } from 'redux';
import { Provider } from 'react-redux';
//  import App from './components/app/app';
import App from './app';

//  Добавил поддержку роутера  // 
import { BrowserRouter } from "react-router-dom";
//  Корневой редьюсер и усилитель  //
import { rootReducer } from './services/reducers/root-reducer';
import { enhancer } from './services/store/store';
import './index.css';

//  Создал подключение к redux store с усилителем  //
const store = createStore(rootReducer, enhancer); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//  обернул App в провайдер redux для доступа к store  //
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
