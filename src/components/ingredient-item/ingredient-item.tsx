//  Карточка ингредиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //
import React, { useCallback, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDrag } from 'react-dnd';

//  import { IngredientDetails } from '../ingredient-details/ingredient-details';
import IngredientPrice from '../ingredient-price/ingredient-price';
//  import { Modal } from '../modal/modal';
import { Counter } 
  from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types';
import { getBurgerData } from '../../utils/state';
import IngredientItemStyle from './ingredient-item.module.css';

//  Интерфейс объекта ингридиентов  //
interface IIngredientProps {
  ingredientData: TIngredient;
}

export const IngredientItem: FC<IIngredientProps> = ( { ingredientData } ) => {
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным об ингридиенте. PROFIT!  //
  const navigate = useNavigate();
  const location = useLocation();
  //  const dispatch = useDispatch();
  
  //  Получаю состояние (содержание) заказа из стора redux  //
  const burgerData: TIngredient[] = useSelector(getBurgerData);

  //  Считаю сколько ингредиентов в заказе, булки на 2 //
  const orderCount = useCallback(
    (ingredientData: TIngredient) => {
      const { _id, type } = ingredientData;
      const ingredientsCount = burgerData.filter(
        (el) => el._id === _id
      ).length;
      return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
    },
    [burgerData]
  );

  //  Перенес обработку клика по модальному окну в функцию с отправкой состава заказа в стор  //
  const handleOpenIngredientModal = () => {
    navigate(`/ingredients/${ingredientData._id}`, {
      state: { background: location },
    });
  };

  // Перенес dispatch({ type: OPEN_INGREDIENT_DETAILS, payload: ingredientData });

  //  Закрытие модального окна с ингредиентами перенес  //


  //  перетаскивание ингредиентов  //
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredientData
  });

  //  Модальное окно открывается только когда массив ингредиентов не пуст  //
  //  Показываю счетчик ингредиента (сколько в конструкторе), если он > 0  //
  return (
    <>
      <div className={IngredientItemStyle.ingredient} onClick={handleOpenIngredientModal} ref={dragRef}>
        {orderCount(ingredientData) > 0 &&
          <i className={IngredientItemStyle.counter}>
            <Counter count={orderCount(ingredientData)} size='default' />
          </i>
        }
        <img src={ingredientData.image} alt={ingredientData.name}></img>
        <IngredientPrice price={ingredientData.price} />
        <p className={`mb-6 text text_type_main-default ${IngredientItemStyle.name}`}>{ingredientData.name}</p>
      </div>
    </>
  );
};
//   Логику с модалкой перенес  //

export default React.memo(IngredientItem);