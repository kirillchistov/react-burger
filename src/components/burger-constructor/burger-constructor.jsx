/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //

import React, { useState, useContext, useReducer, useMemo } from 'react';
import { ingredientType } from '../../utils/types';
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import { postOrder } from '../../utils/api';
import PropTypes from 'prop-types';
//  Использую общий контекст  //
import { IngredientContext, PriceContext, OrderContext } from '../../services/app-context';

import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = () => {
  //  Создаем состояние для модальных окон  //
  const [isOpen, setIsOpen] = useState(false);
  //  Теперь берем данные не из props, а из контекста  //
  const ingredientsData = useContext(IngredientContext);
  //  Создаем состояние для номера и редюсер для суммы заказа  //
  const [orderNumber, setOrderNumber] = useState(null);
  
  
  const reducer = (state, action) => {
  switch (action.type) {
    case "setTotalAmount":
      return { price: action.payload };
    case "delete":
      return { price: state.price - action.payload };
    default:
      throw new Error(`Некорректный тип action: ${action.type}`);
  }
} 

//  Объявляем начальное нулевое значение суммы заказа  //
const initialTotal = { price: 0 };

const [totalState, priceDispatcher] = useReducer(reducer, initialTotal);

  //  Нахожу в ингридиентах первую встречную булку  //
  const bun = ingredientsData.find((element) => element.type === 'bun');
  
  //  Создаю начальный массив закааа с булками без начинки  //
    const arrIngredients = [];

  // Считаю сумму заказа с мемоизацией, не понятно, как прописать зависимости...  //
  const totalAmount = useMemo(() => {
    let orderTotal = 0;
    //  const arrIngredients = [bun, bun];
    arrIngredients.forEach(element => orderTotal += element.price);    
    priceDispatcher({type: 'setTotalAmount', payload: orderTotal});
  },[ingredientsData]);
  console.log(totalAmount);

  //  Функция ищет ингридиенты по id в заказе и возвращаем данные для начинки бурера в конструкторе  //
  const findElementByID = (elementID) => {
    const burgerElementData = ingredientsData.find((element) => element._id === elementID);
    return burgerElementData;        
  }

  //  Функция создания заказа в конструкторе  //
  //  Пример ответа:
  /*
  {
    "success": true,
    "name": "Бессмертный экзо-плантаго традиционный-галактический краторный бургер",
    "order": {
        "number": 7414
    }
  }
  */

  const createOrder = () => {
    const arrIngredientsId = arrIngredients.map((element) => {
      return element._id;
    })
    postOrder(arrIngredientsId)
    .then((result) => {
      setOrderNumber(result.order.number);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      setIsOpen(true);             
    });
  }
  
  // Отображаем часть компонентов, а не выбранные. Стоимость пока суммируем  //

  return (
    <div>
      <section className={`mt-25 ml-4 ${burgerConstructorStyle.elements}`}>
        <PriceContext.Provider value={priceDispatcher}>
          <ConstructorElements elementData={bun} bunType={'top'} isLocked={true} bunTypeName={' (верх)'} />
          <div className={`pr-2 ${burgerConstructorStyle.elements_midstuff}`}> 
            {arrIngredients.map((element) => { 
              if (element.type !== 'bun') {
                return (<ConstructorElements elementData={findElementByID(element._id)} bunType={''} isLocked={false} bunTypeName={''} key={element._id} />);
              }
            })}
          </div>
          <ConstructorElements elementData={bun} bunType={'bottom'} isLocked={true} bunTypeName={' (низ)'} />
          <div className={`mt-10 ${burgerConstructorStyle.constructor_total}`}>
            <ConstructorTotal total={totalState.price} />
            <Button type='primary' size='large' htmlType='button' onClick={createOrder}>Оформить заказ</Button>
          </div>
        </PriceContext.Provider>
      </section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={'Детали заказа'}>
        <OrderContext.Provider value={orderNumber}>
            <OrderDetails orderNum={orderNumber} />
        </OrderContext.Provider>
      </Modal>
   </div>
  )
}

BurgerConstructor.propTypes = { 
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;
