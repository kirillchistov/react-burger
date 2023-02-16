//  Вложенный компонент КБЖУ свойств ингридиента  //

//  import PropTypes from 'prop-types';  //
import IngredientNutritionStyle from './ingredient-nutrition.module.css';

const IngredientNutrition = (props) => {
  return (
    <div className={IngredientNutritionStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{props.type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{props.amount}</p>
    </div>
  )
}  

export default IngredientNutrition;
 