//  Пока этот компонент не используем, все делаем внутри I-Item  //
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import {ingredientType} from '../../utils/types';

const IngredientFilter = ({ ingredients, type, openModal }) => {
  const filteredIngredients = ingredients.filter(
    (ingredient) => ingredient.type === type
  );

  return (
    <>
      {filteredIngredients.map((ingredient) => {
        return (
          <IngredientItem
            ingredient={ingredient}
            key={ingredient._id}
            openModal={openModal}
          />
        );
      })}
    </>
  );
}

IngredientFilter.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  type: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default IngredientFilter;
