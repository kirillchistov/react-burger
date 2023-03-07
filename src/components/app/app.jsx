//  Точка входа. Второй спринт  //
//  Шапка, список ингредиентов и конструктор заказа, футера нет  //
//  Медиа-запросы под мобильные разрешения сделаю позже  //

import React from 'react';
//  import { compose, createStore, applyMiddleware } from 'redux';  //
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
//  { fetchIngredients } из utils/api больше не нужен (в redux)  //
//  Контекст не нужен  //
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppStyle from './app.module.css';
//  Вынес { ConstructorElement } из UI-библиотки в B-Contructor  //

const App = () => {
  //  Состояние для хранения списка ингредиентов теперь в Redux //
  //  Пока не завожу состояние заставки-загрузчика [isLoading, setIsLoading] //
  //  Код для расширения Redux Devtools (composeEnhancers) вынес в отдельный файл в utils  //
  //  Корневой редьюсер (rootReducer) вынес в папку /services/reducers // 
  //  Стор Redux (store) вынес в /services/store  // 
  //  useEffect для получения ингридиентов вынес в redux // 

  //  Добавил провайдер для DragNDrop  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <main className={AppStyle.mainContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;