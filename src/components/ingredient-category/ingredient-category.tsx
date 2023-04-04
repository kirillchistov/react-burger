//  Компонент категории ингредиентов для работы с навигацией по табам  //
import React, { FC } from 'react';
import { IngredientItem } from '../ingredient-item/ingredient-item';
import { TIngredient } from '../../utils/types';
import IngredientCategoryStyle from './ingredient-category.module.css';

interface IIngredientsCategory {
  id: string;
  type: string;
  typeList: TIngredient[],
}

//  В разметке div с заголовком и вложенным div-списком ингредиентов заданной категории  //
export const IngredientCategory:FC<IIngredientsCategory> = ({ id, type, typeList }) => {
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

export default React.memo(IngredientCategory);
