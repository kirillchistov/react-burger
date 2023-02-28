/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //

import React, { useState, useContext, useReducer, useMemo } from 'react';
//  { ingredientType } из '../../utils/types' больше не нужен  //
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
import { postOrder } from '../../utils/api';
//  PropTypes пока больше не нужен  //
//  Использую общий контекст  //
import { IngredientContext, PriceContext, OrderContext } from '../../services/app-context';

import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = (props) => {
  //  Создаю состояние для модальных окон  //
  const [isOpen, setIsOpen] = useState(false);
    //  Теперь беру данные не из props, а из контекста  //
  const ingredientsData = useContext(IngredientContext);
  //  Создаю состояние для номера и редюсер для суммы заказа  //
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

//  Объявляю начальное нулевое значение суммы заказа  //
const initialTotal = { price: 0 };

const [totalState, priceDispatcher] = useReducer(reducer, initialTotal);

  //  Нахожу в ингридиентах первые встречные: булку, начинку, соус  //
  const bun = ingredientsData.find((element) => element.type === 'bun');
  const main = ingredientsData.find((element) => element.type === 'main');
  const sauce = ingredientsData.find((element) => element.type === 'sauce');
  
  //  Создаю начальный массив закааа с булками без начинки  //
    const arrIngredients = [bun, main, sauce, bun];

  // Считаю сумму заказа с мемоизацией, не понятно, как прописать зависимости...  //
  const totalAmount = useMemo(() => {
    let orderTotal = 0;
    arrIngredients.forEach(element => orderTotal += element.price);    
    priceDispatcher({type: 'setTotalAmount', payload: orderTotal});
    
  },[ingredientsData]);  //  Вот как сюда вписать arrIngredients?
  
  //  Функция ищет ингридиенты по id в заказе и возвращаем данные для начинки бурера в конструкторе  //
  const findElementByID = (elementID) => {
    const burgerElementData = ingredientsData.find((element) => element._id === elementID);
    return burgerElementData;        
  }

  //  Ответ от сервера на заказ: success: true, name: строка, order: {number}  //
  //  Функция создания заказа в конструкторе  //
  //  Для каждого элемента берем его id и складываем в массив, передаем на сервер  //
  //  В ответ получаем название и номер заказа - пример ответа см. выше  //
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
  
  // В конструкторе пока набор булок и по одному первому элементу начинки и соуса, не выбор  //
  // Цены суммируем и выводим в конструкторе, в попапе выводим номер заказа  //
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
// propTypes: ingredientsData не нужен, беру из контекста?  //

export default BurgerConstructor;
