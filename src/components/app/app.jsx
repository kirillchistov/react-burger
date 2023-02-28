//  Точка входа. Первый спринт  //
//  Шапка, список ингридиентов и конструктор заказа, футера нет  //
//  В пропсы списку и конструктору передаем массив-заглушку data.js  //
//  Медиа-запросы под мобильные разрешения сделаем позже  //

import { useState, useEffect } from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/api';
//  Разбил { AppContext } на 3 разных  //
import { IngredientContext } from '../../services/app-context';

import AppStyle from './app.module.css';
//  Вынес { ConstructorElement } из UI-библиотки в B-Contructor  //

const App = () => {
//  Заводим состояние для хранения списка ингридиентов  //
  const [ingredients, setIngredients] = useState([]);

  //  Пока не заводим состояние заставки-загрузчка [isLoading, setIsLoading] //
  
  //   Код для расширения Redux Devtools  //
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  //   Корневой редюсер пока пуст  //
  let rootReducer = () => {};
  //   Композитный расширитель для Redux стора  //
  const enhancer = composeEnhancers();
  //   Стор пока пуст  //
  const store = createStore(rootReducer, enhancer);
  
  //  Вместо заглушки делаем запрос к серверу из api в useEffect //
  useEffect(() => {
    getIngredients(setIngredients);
  }, []);

  //  Если ингридиенты не вернулись (массив 0), ничего не возвращаем  //
  if (ingredients.length === 0) { 
    return null
  };

  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <main className={AppStyle.mainContainer}>
        <IngredientContext.Provider value={ingredients.data} >
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientContext.Provider>
      </main>
    </div>
  );
}

//  Здесь нет (и не будет) пропсов, типизация не нужна  //

export default App;