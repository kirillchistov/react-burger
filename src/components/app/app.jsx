//  Точка входа. Второй спринт  //
//  Шапка, список ингредиентов и конструктор заказа, футера нет  //
//  Медиа-запросы под мобильные разрешения сделаю позже  //

import { useState, useEffect } from 'react';
//  import { compose, createStore, applyMiddleware } from 'redux';  //
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { fetchIngredients } from '../../utils/api';
//  Контекст IngredientContext не нужен  //
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppStyle from './app.module.css';
//  Вынес { ConstructorElement } из UI-библиотки в B-Contructor  //

const App = () => {
//  Завожу состояние для хранения списка ингредиентов  //
  const [ingredients, setIngredients] = useState([]);

  //  Пока не завожу состояние заставки-загрузчика [isLoading, setIsLoading] //
  
  //   Код для расширения Redux Devtools (composeEnhancers) вынес в отдельный файл в utils  //

  //   Корневой редюсер (rootReducer) вынес в папку /services/reducers //
  
  //   Стор Redux (store) вынес в /services/store  //
  
  //  Вместо заглушки делаю запрос к серверу из api в useEffect //
  useEffect(() => {
    fetchIngredients(setIngredients);
  }, []);

  //  Если ингредиенты не вернулись (массив 0), ничего не возвращаю  //
  if (ingredients.length === 0) { 
    return null
  };

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