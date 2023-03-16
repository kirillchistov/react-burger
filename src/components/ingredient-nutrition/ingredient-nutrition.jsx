//  Вынес КБЖУ свойств ингредиента в отдельный компонент  //
//  import { ingredientType } from '../../utils/types';
import React from 'react';
import PropTypes from 'prop-types';
import IngredientNutritionStyle from './ingredient-nutrition.module.css';

export const IngredientNutrition = ({ type, amount }) => {
  return (
    <div className={IngredientNutritionStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{amount}</p>
    </div>
  )
}

//  Здесь есть пропсы, проверяю типизацию  //
IngredientNutrition.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

export default React.memo(IngredientNutrition);
