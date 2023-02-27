import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
//  import { ingredientType } from '../../utils/types';
import ConstructorTotalStyle from './constructor-total.module.css';

export const ConstructorTotal = ( {total} ) => {
  return (
    <div className={ConstructorTotalStyle.container}>
      <p className='mr-2 text text_type_digits-medium'>{total}</p>
      <CurrencyIcon type='primary' />
    </div>
  )
}

ConstructorTotal.propTypes = {
  total: PropTypes.number.isRequired
};

export default ConstructorTotal;