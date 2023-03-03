//  Карточка ингредиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';

import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientPrice from '../ingredient-price/ingredient-price';
import Modal from '../modal/modal';
import { Counter } 
  from '@ya.praktikum/react-developer-burger-ui-components';
// импортирую redux actions для модульного окна ингредиентов  //
import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from '../../services/actions/ingredient-actions';

//  import { ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';
import IngredientItemStyle from './ingredient-item.module.css';

export const IngredientItem = ( { ingredientData } ) => {
  //  состояния [isOpen, setIsOpen] больше не нужны  //
  //  Активирую хуки для работы с redux  //
  const dispatch = useDispatch();
  const ingredientDetails = useSelector(
    (state) => state.ingredientDetails.ingredientDetails
  );
  //  Получаю состояние (содержание) заказа из стора redux  //
  const orderData = useSelector((state) => state.order.orderData);

  //  Считаю сколько ингредиентов в заказе, булки на 2 //
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

  //  Перенес обработку клика по модальному окну в функцию с отправкой состава заказа в стор  //
  const handleOpenIngredientModal = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, payload: ingredientData });
  };

  //  Заркытие модального окна с ингредиентами  //
  const handleCloseIngredientModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  };

  //  Делаем ингредиенты перетаскиваемыми  //
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredientData,
  });

  //  Модальное окно открывается только когда массив ингредиентов не пуст  //
  //  Показываю счетчик ингредиента (сколько в конструкторе), если он > 0  //
  return (
    <div>
      <div className={IngredientItemStyle.ingredient} onClick={handleOpenIngredientModal} ref={dragRef}>
        {orderCount(ingredientData) > 0 &&
          <Counter className={IngredientItemStyle.counter} count={orderCount(ingredientData)} size='default' />
        }
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

//  Здесь есть пропсы, проверяю типизацию  //
IngredientItem.propTypes = {
  elementData: PropTypes.object
};
