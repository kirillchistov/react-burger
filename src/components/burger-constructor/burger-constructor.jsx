/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингредиентов  //

//  { useState, useContext, useReducer } больше не нужны //
import React, { useMemo } from 'react';
//  Добавил хуки для работы с Redux  //
import { useDispatch, useSelector } from 'react-redux';
//  Добавил хуки для работы с DND  - здесь не нужен useDrag  //
import { useDrop } from 'react-dnd';
//  { ingredientType } из '../../utils/types' больше не нужен  //
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal/modal';
//  вместо { postOrder } теперь берем actions из redux  //
import { dispatchOrder, ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from '../../services/actions/order-actions';
//  Контекст { IngredientContext, PriceContext, OrderContext } больше не нужен --> redux  //
//  Импортировал actions для работы с ингредиентами в конструкторе заказа  //
//  Добавил универсальный генератор уникальных идентификаторов для элементов без id  //
import { v4 as uuidv4 } from 'uuid';

import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = () => {
  //  Теперь состояния храню в сторе redux, а не в пропсах или контексте  //
  //  Состояние [isOpen, setIsOpen] и IngredientContext не нужны  //
  //  Получаю из стора состояние для номера состава заказа  //
  
  const dispatch = useDispatch();
  const { orderData, orderNumber } = useSelector((state) => state.order);
  
  //  Редюсеры со свитчем и действия вынес в отдельные файлы  //
  //  Вместо первых встречных теперь нахожу выбранные элементы  //
  const bun = orderData.find(function (element) {
    return element.type === 'bun';
  });
  //  Пока что начинку и соус можно не разделять, т.к. логика едина  //
  const ingredientsMidStuff = orderData.filter((element) => element.type !== 'bun');
  //  console.log(orderData);  //
  
  //  Начальный массив заказа с булками без начинки больше не нужен  //

  //  Считаю сумму заказа с мемоизацией  //
  //  Прибавляю к старой сумме заказа (если не пуст) цены элементов (булки * 2)  //
  const totalAmount = useMemo(() => {
    //  let orderTotal = 0; переделал на объект orderData и reduce  //
    if (orderData.length > 0) {
      return orderData
        .map((element) => element.price * (element.type === 'bun' ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      //  Если в заказе нет данных, то возвращаем 0  //
      return 0;
    }
  }, [orderData]);
    
    const onDropIngredient = (ingredient) => {
    if (ingredient.type === 'bun') {
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
    accept: 'ingredient',
    drop: (ingredientData) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientModal = () => {
    dispatch(dispatchOrder(orderData.map((ingredient) => ingredient._id)));
  };
  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };
  
  //  В конструкторе пока набор булок и по одному первому элементу начинки и соуса, не выбор  //
  //  Цены суммирую и вывожу в конструкторе, в попапе вывожу номер заказа  //
  //  Добавил ref, отключил контекст провайдер, теперь беру состояние из redux-стора  //
  //  Открытие окна с деталями ингредиента вынес в отдельную функцию handleOpenIngredientModal  //
  //  Открываю окно заказа при условии, что есть номер заказа, закрытие вынес в handleCloseOrderModal  //
  //  Показываю сумму заказа и кнопку, только если выбраны ингредиенты (кроме булок)  //
  return (
    <>
      <section className={`mt-25 ml-4 ${burgerConstructorStyle.elements}`} ref={dropTarget}>
        <div className='ml-8'>
          {bun && (
            <ConstructorElement 
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
                bunType={''} 
                bunTypeName={''} 
                isLocked={false} 
                index={index}
                key={element._id} 
              />
            );
          })}
          {ingredientsMidStuff.length === 0 && (
            <span className='text mt-30 ml-30 text_type_main-default'>
              Добавьте ингредиенты для Вашего бургера!
            </span>
          )}
        </div>
        <div className='ml-8'>
          {bun && (
            <ConstructorElement 
              type={'bottom'} 
              isLocked={true} 
              text={`${bun.name} (низ)`} 
              price={bun.price}
              thumbnail={bun.image} 
            />
          )}
        </div>
        {ingredientsMidStuff.length > 0 && 
          <div className={`mt-10 ${burgerConstructorStyle.constructor_total}`}>
            <ConstructorTotal total={totalAmount} />
          
            <Button type='primary' size='large' htmlType='button' onClick={handleOpenIngredientModal}>Оформить заказ</Button>
          </div>
        }
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

//  Типизация не нужна, нет пропсов  //

export default BurgerConstructor;
