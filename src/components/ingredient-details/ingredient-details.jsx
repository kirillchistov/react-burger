import { ingredientType } from "../../utils/types";
import PropTypes from 'prop-types';
import IngredientDetailsStyle from "./ingredient-details.module.css";

const IngredientDetails = ({ingredient}) => {
  return (
    <div className={IngredientDetailsStyle.mainContainer}>
      <h2 className={`${IngredientDetailsStyle.mainTitle} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <figure className={IngredientDetailsStyle.imageContainer}>
        <img
          className={IngredientDetailsStyle.image}
          src={ingredient.image_large}
          alt={ingredient.name}
        />
        <figcaption
          className={`${IngredientDetailsStyle.caption} text text_type_main-medium`}
        >
          {ingredient.name}
        </figcaption>
      </figure>

      <table
        className={`${IngredientDetailsStyle.nutritionTable} text text_type_main-small text_color_inactive`}
      >
        <thead>
          <tr>
            <td className={IngredientDetailsStyle.nutritionCell}>Калории,ккал</td>
            <td>Белки, г</td>
            <td>Жиры, г</td>
            <td>Углеводы, г</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ingredient.calories}</td>
            <td>{ingredient.proteins}</td>
            <td>{ingredient.fat}</td>
            <td>{ingredient.carbohydrates}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape(ingredientType),
};

export default IngredientDetails;
