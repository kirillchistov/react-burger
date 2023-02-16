import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';

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
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default IngredientFilter;
