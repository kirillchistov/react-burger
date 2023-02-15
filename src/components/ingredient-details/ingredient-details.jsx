import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';

import IngredientDetailsStyle from "./ingredient-details.module.css";

const IngredientDetails = ({ ingredient }) => {
  return (
    <>
      <figure className={IngredientDetailsStyle.imageContainer}>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <figcaption className={`mt-4 text text_type_main-medium ${IngredientDetailsStyle.mainTitle}`}>
            {ingredient.name}
        </figcaption>
      </figure>
      <div className={IngredientDetailsStyle.boxContainer }>
        <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
        <p className={`text text_type_digits-default text_color_inactive ${IngredientDetailsStyle.nutritionInfo}`}>{ingredient.calories}</p>
        <p className={`text text_type_digits-default text_color_inactive ${IngredientDetailsStyle.nutritionInfo}`}>{ingredient.proteins}</p>
        <p className={`text text_type_digits-default text_color_inactive ${IngredientDetailsStyle.nutritionInfo}`}>{ingredient.fat}</p>
        <p className={`text text_type_digits-default text_color_inactive ${IngredientDetailsStyle.nutritionInfo}`}>{ingredient.carbohydrates}</p>
      </div>
    </>
  )
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientType),
};

export default IngredientDetails;
