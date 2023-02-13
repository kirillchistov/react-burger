//  Точка входа. Первый спринт  //
//  Шапка, список ингридиентов и конструктор заказа, футера нет  //
//  В пропсы списку и конструктору передаем массив-заглушку data.js  //
//  Из UI-библиотеки:  лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Медиа-запросы под мобильные разрешения сделаем позже  //

import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsData } from '../../utils/data'
import { BASEURL } from "../../utils/constants";
import AppStyle from './app.module.css';

const App = () => {
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getServerData = async () => {
    fetch(BASEURL)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } 
        return Promise.reject(`Ошибка получения данных ${response.status}`)
      })
      .then((result) => {
        setData(result.data)
        console.log(data)
      })
      .catch((error) => {
        setError(error.message)
        console.log(error)
      })
  }

  useEffect(() => {
    getServerData();
  },[])

  console.log(error);
  

  return (
    <div className={AppStyle.mainContainer}>
      <AppHeader />
      <BurgerIngredients ingredients={ ingredientsData } />
      <BurgerConstructor ingredients={ ingredientsData } />
    </div>
  )
}

/*
  return (
    {error ? (
    <div className={AppStyle.mainContainer}>
      <AppHeader />
      <h1>Ошибка получения данных</h1>
      <BurgerIngredients ingredients={ ingredientsData } />
      <BurgerConstructor ingredients={ ingredientsData } />
    </div>
    ) : (
    <div className={AppStyle.mainContainer}>
      <BurgerIngredients ingredients={ data } />
      <BurgerConstructor ingredients={ data } />
    )}
    </div>
  )
}
*/

export default App;
