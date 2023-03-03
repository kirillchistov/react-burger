import React from 'react';
import ReactDOM from 'react-dom/client';
//  Добавляю поддержку redux  //
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app/app';
//  Подключаем корневой редьюсер и усилитель  //
import { rootReducer } from './services/reducers/root-reducer';
import { enhancer } from './services/store/store';
import './index.css';

//  Создал подключение к redux store с усилителем  //
const store = createStore(rootReducer, enhancer); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
//  обернул App в провайдер redux для доступа к store  //
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
