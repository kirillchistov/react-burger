/* eslint-disable array-callback-return */
//  Блок (левый) с выбором ингридиентов по типам  //
//  Для табов (типы ингридиентов) делаем состояние выбора таба  //
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингридиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингридиентов по типам  //
//  Убрать все инлайн стили, добавить отступы, убрать SelectTab в отд.компонент  //

import React, { useState, useEffect, useMemo } from 'react';
//  Добавил хуки для работы с Redux  //
import { useSelector, useDispatch } from 'react-redux';
//  Modal, IngredientDetails и IngredientPrice теперь в IngredientItem  //
//  IngredientItem теперь вложен в IngredientCategory для навигации  //
import { IngredientCategory } from '../ingredient-category/ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { getIngredients } from '../../services/actions/ingredient-actions';
//  PropTypes и { ingredientType } пока не нужны  //
//  { IngredientContext } больше не нужен  //
import BurgerIngredientsStyle from './burger-ingredients.module.css';
     
const BurgerIngredients = () => {

  //  Теперь получаю состояние из redux, а не из контекста  //
  //  Включаю хуки для получения и отправки данные в redux  //
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();
  //  По умолчанию мой ингридиент = булка  //
  const [current, setCurrent] = useState('bun');
  
  //  При монтировании получаем список ингридиентов  //
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  //  Фильтрую массив по типу нужного ингридиента  //
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === 'main'),
    [ingredients]
  );

  //  Здесь по тренажеру  //
  //  Нахожу по id ближайший контейнер, привязываюсь к координатам
  const scrollToCategory = () => {
    const topTop = document
      .getElementById('typeContainer')
      .getBoundingClientRect().top;
    const bunTop = document.getElementById('bun').getBoundingClientRect().top;
    const sauceTop = document
      .getElementById('sauce')
      .getBoundingClientRect().top;

    if (bunTop + topTop > topTop + 60) {
      setCurrent('bun');
    } else if (sauceTop + topTop > 110) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  //  Теперь берем данные не из props, а из контекста  //
  
  return (
    <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}> 
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={BurgerIngredientsStyle.navbar}>
        <Tab active={current === 'bun'}>Булки</Tab>
        <Tab active={current === 'sauce'}>Соусы</Tab>
        <Tab active={current === 'main'}>Начинки</Tab>
      </nav>
      <div className={BurgerIngredientsStyle.ingredient_types} id='typeContainer' onScroll={scrollToCategory}>
        {/* <h2 className='mt-10 mb-6 text text_type_main-medium'>Булки</h2>
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
        </div> */}
        <IngredientCategory id='bun' type={'Булки'} typeList={buns} />
        <IngredientCategory id='sauce' type={'Соусы'} typeList={sauces} />
        <IngredientCategory id='main' type={'Начинки'} typeList={mains} />
      </div>
    </section>
  );
}

//  propTypes ingredientsData больше не нужен, беру из контекста?  //

export default BurgerIngredients;