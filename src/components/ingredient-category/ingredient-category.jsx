//  Компонент категории ингредиентов для работы с навигацией по табам  //

import PropTypes from 'prop-types';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import IngredientCategoryStyle from './ingredient-category.module.css';

//  В разметке div с заголовком и вложенным div-списком ингредиентов заданной категории  //
export function IngredientCategory({ id, type, typeList }) {
  return (
    <div id={id}>
      <h2 className='text mt-10 mb-6 text_type_main-medium'>{type}</h2>
      <div className={IngredientCategoryStyle.ingredient_category}>
        {typeList.map((element) => {
          return <IngredientItem ingredientData={element} key={element._id} />;
        })}
      </div>
    </div>
  );
}

//  Добавил типизацию для id  //
IngredientCategory.propTypes = {
  type: PropTypes.string.isRequired,
  typeList: PropTypes.array.isRequired,
  id: PropTypes.string
};
