//  Компонент для отображения в модальном окне при клике на ингредиент  //
import PropTypes from 'prop-types';
//  import { ingredientType } from '../../utils/types';  //
import ingredientDetailsStyle from './ingredient-details.module.css';

//  Вложенный компонент КБЖУ свойства ингредиента - вынести в отдельный  //
const IngredientNutrition = ({ type, amount }) => {
  return (
    <div className={ingredientDetailsStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{amount}</p>
    </div>
  )
}

//  Типизация есть  //
IngredientNutrition.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired
};

//  Сводный компонент с гридом свойств  //
const IngredientDetails = ({ item }) => {
  return(
    <div className={ingredientDetailsStyle.general}>
      <img className={ingredientDetailsStyle.image} src={item.image} alt={item.name}></img>
      <p className='mt-4 mb-8 text text_type_main-medium'>{item.name}</p>
      <div className={ingredientDetailsStyle.details}>
        <IngredientNutrition type={'Калории, ккал'} amount={item.calories} />
        <IngredientNutrition type={'Белки, г'} amount={item.proteins} />
        <IngredientNutrition type={'Жиры, г'} amount={item.fat} />
        <IngredientNutrition type={'Углеводы, г'} amount={item.carbohydrates} />
      </div>
    </div>  
  )    
}

//  Здесь есть пропсы, проверяю типизацию, но не через ingredientType  //
IngredientDetails.propTypes = {
  item: PropTypes.object.isRequired,
};

export default IngredientDetails;
