//  Компонент для отображения в модальном окне при клике на ингридиент  //

//  import PropTypes from 'prop-types';  //
import {ingredientType} from '../../utils/types';
import ingredientDetailsStyle from './ingredient-details.module.css';

//  Вложенный компонент КБЖУ свойства ингридиента - вынести в отдельный  //
const IngredientNutrition = (props) => {
  return (
    <div className={ingredientDetailsStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{props.type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{props.amount}</p>
    </div>
  )
}  

//  Сводный компонент с гридом свойств  //
const IngredientDetails = (props) => {
  return(
    <div className={ingredientDetailsStyle.general}>
      <img className={ingredientDetailsStyle.image} src={props.item.image} alt={props.item.name}></img>
      <p className='mt-4 mb-8 text text_type_main-medium'>{props.item.name}</p>
      <div className={ingredientDetailsStyle.details}>
        <IngredientNutrition type={'Калории, ккал'} amount={props.item.calories} />
        <IngredientNutrition type={'Белки, г'} amount={props.item.proteins} />
        <IngredientNutrition type={'Жиры, г'} amount={props.item.fat} />
        <IngredientNutrition type={'Углеводы, г'} amount={props.item.carbohydrates} />
      </div>
    </div>  
  )    
}

IngredientDetails.propTypes = {
  item: ingredientType.isRequired,
};

export default IngredientDetails;
 