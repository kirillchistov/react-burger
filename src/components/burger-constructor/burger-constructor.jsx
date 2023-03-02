/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //

//  import React, { useState, useContext, useReducer, useMemo } from 'react';  //
import React, { useMemo } from 'react';
//  Добавил хуки для работы с Redux  //
import { useDispatch, useSelector } from "react-redux";
//  Добавил хуки для работы с DND  //
//  import { useDrag, useDrop } from "react-dnd";  //
import { useDrop } from "react-dnd";
//  { ingredientType } из '../../utils/types' больше не нужен  //
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
//  import { postOrder } from '../../utils/api';
import { dispatchOrder, ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from "../../services/actions/order-actions";
//  PropTypes пока больше не нужен  //
//  Использую общий контекст  //
//  import { IngredientContext, PriceContext, OrderContext } from '../../services/app-context';
//  Импортировал actions для работы с ингридиентами в конструкторе заказа  //
//  import { REMOVE_INGREDIENT, MOVE_INGREDIENT } from "../../services/actions/order-actions";  //
//  Добавил универсальный генератор уникальных идентификаторов для элементов без id  //
import { v4 as uuidv4 } from "uuid";

import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = () => {
  //  Теперь состояния храню в сторе redux, а не в пропсах или контексте  //
  //  Состояние [isOpen, setIsOpen] и IngredientContext не нужны  //
  //  Получаю из стора состояние для номера состава заказа  //
  
  const dispatch = useDispatch();
  const { orderData, orderNumber } = useSelector((state) => state.order);
  
  //  Редюсеры со свитчем и действия вынес в отдельные файлы  //
  


  //  Вместо первых встречных теперь нахожу выбранные элементы  //
  //  const bun = ingredientsData.find((element) => element.type === 'bun');
  //  const main = ingredientsData.find((element) => element.type === 'main');
  //  const sauce = ingredientsData.find((element) => element.type === 'sauce');
  const bun = orderData.find(function (element) {
    return element.type === "bun";
  });
  //  Пока что начинку и соус можно не разделять, т.к. логика едина  //
  const ingredientsMidStuff = orderData.filter(
    (element) => element.type !== "bun"
  );
  
  //  Начальный массив заказа с булками без начинки больше не нужен  //

  //  Считаю сумму заказа с мемоизацией  //
  //  Прибавляю к старой сумме заказа (если не пуст) цены элементов (булки * 2)  //
  const totalAmount = useMemo(() => {
    //  let orderTotal = 0; переделал на объект orderData и reduce  //
    if (orderData.length > 0) {
      return orderData
        .map((element) => element.price * (element.type === "bun" ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      //  Если в заказе нет данных, то возвращаем 0  //
      return 0;
    }
  }, [bun, ingredientsMidStuff]);
    
    const onDropIngredient = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientModal = () => {
    dispatch(dispatchOrder(orderData.map((ingredient) => ingredient._id)));
  };
  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };
  
  //  Функция findElementByID для поиска ингридиентов по id в заказе не нужна  //


  //  Ответ от сервера на заказ: success: true, name: строка, order: {number}  //
  //  Функция создания заказа в конструкторе  //
  //  Для каждого элемента берем его id и складываем в массив, передаем на сервер  //
  //  В ответ получаем название и номер заказа - пример ответа см. выше  //
  /* const createOrder = () => {
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
  */
  
  //  В конструкторе пока набор булок и по одному первому элементу начинки и соуса, не выбор  //
  //  Цены суммирую и вывожу в конструкторе, в попапе вывожу номер заказа  //
  //  Добавил ref, отключил контекст провайдер, теперь беру состояние из redux-стора  //
  //  Открытие окна с деталями ингридиента вынес в отдельную функцию handleOpenIngredientModal  //
  //  Открываю окно заказа при условии, что есть номер заказа, закрытие вынес в handleCloseOrderModal  //
  return (
    <>
      <section className={`mt-25 ml-4 ${burgerConstructorStyle.elements}`} ref={dropTarget}>
        <div className="ml-8">
          {bun && (
            <ConstructorElements 
              type={'top'} 
              isLocked={true} 
              text={`${bun.name} (верх)`} 
              price={bun.price}
              thumbnail={bun.image} 
            />
          )}
        </div>
        <div className={`pr-2 ${burgerConstructorStyle.elements_midstuff}`}> 
          {ingredientsMidStuff.map((element, index) => { 
            return (
              <ConstructorElements 
                elementData={element}
                index={index}
                bunType={''} 
                isLocked={false} 
                bunTypeName={''} 
                key={element._id} 
              />
            );
          })}
          {!ingredientsMidStuff.length && (
            <span className="text mt-30 ml-30 text_type_main-default">
              Добавьте ингредиенты для Вашего бургера!
            </span>
          )}
        </div>
          <ConstructorElements elementData={bun} bunType={'bottom'} isLocked={true} bunTypeName={' (низ)'} />
          <div className={`mt-10 ${burgerConstructorStyle.constructor_total}`}>
            <ConstructorTotal total={totalAmount} />
            <Button type='primary' size='large' htmlType='button' onClick={handleOpenIngredientModal}>Оформить заказ</Button>
          </div>
      </section>
      {orderNumber && 
        (
          <Modal handleClose={handleCloseOrderModal} title={'Детали заказа'}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )
      }
   </>
  )
}

export default BurgerConstructor;
