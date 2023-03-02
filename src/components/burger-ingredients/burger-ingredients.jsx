/* eslint-disable array-callback-return */
//  Блок (левый) с выбором ингридиентов по типам  //
//  Для табов (типы ингридиентов) делаем состояние выбора таба  //
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингридиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингридиентов по типам  //
//  Убрать все инлайн стили, добавить отступы, убрать SelectTab в отд.компонент  //

import React, { useContext } from 'react';
//  Добавил хуки для работы с Redux  //
//  import { useSelector, useDispatch } from "react-redux";  //
//  Modal, IngredientDetails и IngredientPrice теперь в IngredientItem  //
import IngredientItem from '../ingredient-item/ingredient-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
//  PropTypes и { ingredientType } пока не нужны  //
import { IngredientContext } from '../../services/app-context';

import BurgerIngredientsStyle from './burger-ingredients.module.css';
     
const BurgerIngredients = () => {

  //  Теперь берем данные не из props, а из контекста  //
  const ingredientsData = useContext(IngredientContext);

  return (
    <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}> 
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={BurgerIngredientsStyle.navbar}>
        <Tab>Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </nav>
      <div className={BurgerIngredientsStyle.ingredient_types}>
        <h2 className='mt-10 mb-6 text text_type_main-medium'>Булки</h2>
        <div className={BurgerIngredientsStyle.ingredient_type}>
          {ingredientsData.map((element) => { 
            if (element.type === 'bun') {
              return (<IngredientItem item={element}  key={element._id} />);
            }
          })}
        </div>
        <h2 className='mt-10 mb-6 text text_type_main-medium'>Соусы</h2>
        <div className={BurgerIngredientsStyle.ingredient_type}>
          {ingredientsData.map((element) => { 
            if (element.type === 'sauce') {
              return (<IngredientItem item={element}  key={element._id} />);
            }
          })}
        </div>
        <h2 className='mt-10 mb-6 text text_type_main-medium'>Начинки</h2>
        <div className={BurgerIngredientsStyle.ingredient_type}>
          {ingredientsData.map((element) => { 
            if (element.type === 'main') {
              return (<IngredientItem item={element}  key={element._id} />);
            }
          })}
        </div>
      </div>
    </section>
  );
}

//  propTypes ingredientsData больше не нужен, беру из контекста?  //

export default BurgerIngredients;