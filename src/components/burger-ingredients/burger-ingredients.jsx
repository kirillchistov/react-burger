/* eslint-disable array-callback-return */
//  Блок (левый) с выбором ингридиентов по типам  //
//  Из UI-библиотеки: счётчики, иконки, переключатели, типо, отступы  //
//  https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/tab  //
//  Для табов (типы ингридиентов) делаем состояние выбора таба  //
//  У компонента свой кастомизированный скроллбар (берем из webkit)  // 
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингридиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингридиентов по типам  //
//  Убрать все инлайн стили,добавить отступы, убрать SelectTab в отд.компонент  //

import React from 'react';
//  import Modal from '../modal/modal';  //
//  import IngredientDetails from '../ingredient-details/ingredient-details';  //
//  import IngredientPrice from '../ingredient-price/ingredient-price';  //
import IngredientItem from '../ingredient-item/ingredient-item';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';
import BurgerIngredientsStyle from './burger-ingredients.module.css';

//  IngredientPrice вынесли в отдельный компонент  //
//  IngredientItem  Вынесли в отдельный компонент  //

     
const BurgerIngredients = ({ingredientsData}) => {
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

BurgerIngredients.propTypes = { 
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired, 
};

export default BurgerIngredients;