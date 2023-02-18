//  Вложенный компонент КБЖУ свойств ингридиента  //

//  import PropTypes from 'prop-types';  //
import {ingredientType} from '../../utils/types';
import IngredientNutritionStyle from './ingredient-nutrition.module.css';

const IngredientNutrition = ({type, price}) => {
  return (
    <div className={IngredientNutritionStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{price}</p>
    </div>
  )
}

IngredientNutrition.propTypes = {
  type: ingredientType.string.isRequired,
  amount: ingredientType.number.isRequired
};

export default IngredientNutrition;
 