import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientPriceStyle from './ingredient-price.module.css';

//  Интерфейс для отображения цены ингридиента  //
interface IIngredientPriceProps {
  price: number
}

//  Вложенный компонент для показа цены - вынести в отдельный  //
export const IngredientPrice: FC<IIngredientPriceProps>  = ( {price} ) => {
  return (
    <div className={IngredientPriceStyle.flex}>
      <p className='mr-2 text text_type_digits-default'>{price}</p>
      <div>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  )
}

//  Заменил propTypes на TS  //

export default React.memo(IngredientPrice);