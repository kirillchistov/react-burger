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
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from "../modal/modal";

import { ingredientsData } from '../../utils/data';
//  import { getIngredients } from '../../utils/api';  //
import { BASEURL } from "../../utils/constants";
import AppStyle from './app.module.css';

const App = () => {

//  Состояния для работы с массивом ингридиентов  //
  const [ingredients, setIngredients] = useState([]);

//  Состояния для работы с выбором ингридиента  //
  const [currentIngredient, setCurrentIngredient] = useState({});

//  Состояния для открытия и закрытия модальных окон  //
  const [isIngredientDetailsModalOpen, setIsIngredientDetailsModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

//  Обработчики для закрытия модальных окон  //
  const closeModalIngredientDetails = () => {
    setIsIngredientDetailsModalOpen(false);
  };

  const closeModalOrderDetails = () => {
    setIsOrderDetailsModalOpen(false);
  };

//  Перепишу fetch на async await try и вынесу в /api  //
  const getServerData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  useEffect(() => {
    fetch(`${BASEURL}/ingredients`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => getServerData(res))
      .then((res) => setIngredients(res.data))
      .catch((res) => console.log(res))
  }, []);

  const handleClickIngredient = (ingredient) => {
    setCurrentIngredient(ingredient);
    isIngredientDetailsModalOpen(true);
  };

  const handleClickOrder = () => {
    setIsOrderDetailsModalOpen(true);
  };

  return (
    <>
      <AppHeader />
      <main className={AppStyle.mainContainer}>
        <div className={AppStyle.mainContent}>
          <section>
            <BurgerIngredients 
              ingredients={ ingredients } 
              openIngredientDetails={handleClickIngredient}
            />
          </section>
          <section className={'mt-25 ml-10'}>
            <BurgerConstructor ingredients={ ingredientsData } handleOrder={handleClickOrder} />
          </section>
        </div>
      </main>  
      {isIngredientDetailsModalOpen && (
        <Modal onClose={closeModalIngredientDetails} modalTitle={ "Детали ингредиента" }>
          <IngredientDetails ingredient={ currentIngredient } />
        </Modal>
      )}
      {isOrderDetailsModalOpen && (
        <Modal onClose={closeModalOrderDetails} modalTitle={ "Детали заказа" }>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

//  Валдидируем пропсы  //

export default App;
