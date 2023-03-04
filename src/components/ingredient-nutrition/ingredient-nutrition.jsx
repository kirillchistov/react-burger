//  Вложенный компонент КБЖУ свойств ингредиента  //
import { ingredientType } from '../../utils/types';
import IngredientNutritionStyle from './ingredient-nutrition.module.css';

const IngredientNutrition = ({ type, amount }) => {
  return (
    <div className={IngredientNutritionStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{amount}</p>
    </div>
  )
}

//  Здесь есть пропсы, проверяю типизацию  //
IngredientNutrition.propTypes = {
  type: ingredientType.string.isRequired,
  amount: ingredientType.number.isRequired
};

export default IngredientNutrition;
 