import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
//  { ingredientType } from '../../utils/types' пока не нужен?;
import ConstructorTotalStyle from './constructor-total.module.css';

export const ConstructorTotal = ( {total} ) => {
  return (
    <div className={ConstructorTotalStyle.container}>
      <p className='mr-2 text text_type_digits-medium'>{total}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

//  Типизация есть  //
ConstructorTotal.propTypes = {
  total: PropTypes.number.isRequired
};

export default ConstructorTotal;