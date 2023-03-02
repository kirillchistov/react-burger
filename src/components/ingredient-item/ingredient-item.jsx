//  Карточка ингридиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientPrice from '../ingredient-price/ingredient-price';
import Modal from '../modal/modal';
import { Counter } 
  from '@ya.praktikum/react-developer-burger-ui-components';
// импортирую redux actions для модульного окна ингридиентов  //
import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../../services/actions/ingredient-actions';

//  import { ingredientType } from '../../utils/types';  //
import IngredientItemStyle from './ingredient-item.module.css';

export const IngredientItem = ( { ingredientData } ) => {
  //  состояния [isOpen, setIsOpen] больше не нужны  //
  //  Активирую хуки для работы с redux  //
  const dispatch = useDispatch();
  const ingredientDetails = useSelector(
    (state) => state.ingredientDetails.ingredientDetails
  );
  //  Получаем состояние (содержание) заказа из стора redux  //
  const orderData = useSelector((state) => state.order.orderData);

  //  Считаю сколько ингридиентов в заказе  //
  const orderCount = useCallback(
    (ingredientData) => {
      const { _id, type } = ingredientData;
      const ingredientsCount = orderData.filter(
        (element) => element._id === _id
      ).length;
      return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
    },
    [orderData]
  );

  const handleOpenIngredientModal = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, payload: ingredientData });
  };

  const handleCloseIngredientModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  };

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredientData,
  });

  return (
    <div>
      <div className={IngredientItemStyle.ingredient} onClick={handleOpenIngredientModal} ref={dragRef}>
        <Counter className={IngredientItemStyle.counter} count={orderCount(ingredientData)} size='default' />
        <img src={ingredientData.image} alt={ingredientData.name}></img>
        <IngredientPrice price={ingredientData.price} />
        <p className={`mb-6 text text_type_main-default ${IngredientItemStyle.name}`}>{ingredientData.name}</p>
      </div>
      {ingredientDetails && (
        <Modal handleClose={handleCloseIngredientModal} title={'Детали ингредиента'}>
          <IngredientDetails item={ingredientDetails} />
        </Modal>
      )}
    </div>
  );
};

/* 
IngredientItem.propTypes = {
  ingredientData: ingredientType.isRequired
};
*/
