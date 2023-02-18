//  Точка входа. Первый спринт  //
//  Шапка, список ингридиентов и конструктор заказа, футера нет  //
//  В пропсы списку и конструктору передаем массив-заглушку data.js  //
//  Медиа-запросы под мобильные разрешения сделаем позже  //

import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {getIngredients} from '../../utils/api';

import AppStyle from './app.module.css';

const App = () => {
//  Заводим состояние для хранения списка ингридиентов  //
  const [ingredients, setIngredients] = React.useState([]);

//  Заводим состояние загрузки для показа и отключения загрузчка  //
//  const [isLoading, setIsLoading] = React.useState(true);  //

//  Вместо заглушки делаем запрос к серверу из api в useEffect //
  React.useEffect(() => {
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
        <BurgerIngredients ingredientsData={ingredients.data} />
        <BurgerConstructor ingredientsData={ingredients.data}/>
      </main>
    </div>
  );
}

//  пока нет пропсов, типизация не нужна  //

export default App;