import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';

import IngredientPriceStyle from './ingredient-price.module.css';
//  Вложенный компонент для показа цены - вынести в отдельный  //
const IngredientPrice = ( {price} ) => {
  return (
    <div className={IngredientPriceStyle.flex}>
      <p className='mr-2 text text_type_digits-default'>{price}</p>
      <div>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  )
}

//  Проверяем пропсы  //
IngredientPrice.propTypes = {
  price: PropTypes.number.isRequired
}; 

export default IngredientPrice;