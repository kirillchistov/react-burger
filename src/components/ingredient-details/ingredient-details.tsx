//  Компонент для отображения в модальном окне при клике на ингредиент  //
//  Хуки react, router-dom и redux  //
import React, { useState, useEffect } from 'react';
//  import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { useNavigate, useParams } from 'react-router-dom';
//  Action для получения ингридиентов из redux store  //
//  import { getIngredients } from '../../services/actions/ingredient-actions';
//  Компонент КБЖУ свойства ингредиента - вынес в отдельный  //
import { IngredientNutrition } from '../ingredient-nutrition/ingredient-nutrition';
// import { getItems } from '../../utils/state';
import { TIngredient } from '../../services/types';

import ingredientDetailsStyle from './ingredient-details.module.css';

//  Сводный компонент с гридом свойств  //
export const IngredientDetails = () => {
  const navigate = useNavigate();
  //  const dispatch = useDispatch();
  const { id } = useParams();
  const { items } = useSelector((state: any) => state.ingredients);
  const [item, setItem] = useState<TIngredient>();
  // const items = useSelector(getItems);
  //  При монтировании проверяю, есть ли ингредиент с этим id  //
  //  Если нет, перевожу на главную. Если есть, беру из store  //
  //  Если нет вообще ингридиентов отправляю запрос в store  //
  useEffect(
    () => {
      if (items.length > 0) {
        const ingredient = items.find((el:TIngredient) => el._id === id);
        if (!ingredient) {
          setItem(undefined);
          navigate('/', { replace: true });
        } else {
          setItem(ingredient);
        }
      // } else {
      //   dispatch(getIngredients());
      }
    },
    [id, items, navigate]
  );
  //  если есть item, отображаю карточку КБЖУ  //
  if (item) {
    return (
      <>
        <div className={ingredientDetailsStyle.general}>
          <img className={ingredientDetailsStyle.image} src={item.image} alt={item.name} />
          <p className='mt-4 mb-8 text text_type_main-medium'>{item.name}</p>
          <div className={ingredientDetailsStyle.details}>
            <IngredientNutrition type={'Калории, ккал'} amount={item.calories} />
            <IngredientNutrition type={'Белки, г'} amount={item.proteins} />
            <IngredientNutrition type={'Жиры, г'} amount={item.fat} />
            <IngredientNutrition type={'Углеводы, г'} amount={item.carbohydrates} />
          </div>
        </div>
      </>
    );
  } else {
    return (<></>)
  }
};
//  export default IngredientDetails;
