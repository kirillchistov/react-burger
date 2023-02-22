//  Карточка ингридиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //

import React from 'react';

import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredientPrice from '../ingredient-price/ingredient-price';
import Modal from '../modal/modal';
import { Counter } 
  from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
//  import {ingredientType} from '../../utils/types';  //
import IngredientItemStyle from './ingredient-item.module.css';

const IngredientItem = ({item}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <div className={IngredientItemStyle.ingredient} onClick={() => setIsOpen(true)}>
        <Counter className={IngredientItemStyle.counter} count={1} size='default' />
        <img src={item.image} alt={item.name}></img>
        <IngredientPrice price={item.price} />
        <p className={`mb-6 text text_type_main-default ${IngredientItemStyle.name}`}>{item.name}</p>
      </div>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={'Детали ингредиента'}>
        <IngredientDetails item={item} />
      </Modal>
    </div>
  );
};

IngredientItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientItem;