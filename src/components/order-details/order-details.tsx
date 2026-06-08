//  Компонент для показа в модальном окне по нажатию кнопки 'Заказать' //
import React, { FC } from 'react';
import orderDetailsStyle from './order-details.module.css';
import orderStatusImage from '@/images/graphics.svg'

//  Интерфейс для КБЖУ свойств ингридиента  //
interface IOrderNumber {
  orderNumber: number;
}
const OrderDetails: FC<IOrderNumber> = ({ orderNumber }) => {
  
  //  Вставляю в разметку номер заказа из пропс  //
  return(
    <div className={orderDetailsStyle.container}>
      <p className={`mt-4 mb-8 text text_type_digits-large ${orderDetailsStyle.number}`}>{orderNumber}</p>
      <p className={`mb-15 text text_type_main-medium ${orderDetailsStyle.subtitle}`}>идентификатор заказа</p>
      <img className={orderDetailsStyle.image} src={orderStatusImage} alt='галочка подтверждения заказа'></img>
      <p className={`mt-15 mb-2 text text_type_main-default ${orderDetailsStyle.message}`}>Ваш заказ начали готовить</p>
      <p className={`mb-15 text text_type_main-default text_color_inactive ${orderDetailsStyle.message}`}>Дождитесь готовности на орбитальной станции</p>
    </div>  
  )    
}

//  Заменяю proptypes на TS-типизацию  //

export default React.memo(OrderDetails);