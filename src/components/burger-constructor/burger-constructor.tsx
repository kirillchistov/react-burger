/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингредиентов  //

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//  Добавил хуки для работы с DND  - здесь не нужен useDrag  //
import { useDrop } from 'react-dnd';
import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import { Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from '../modal/modal';
import { dispatchOrder, ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from '../../services/actions/order-actions';
//  Импортировал actions для работы с ингредиентами в конструкторе заказа  //
//  Добавил универсальный генератор уникальных идентификаторов для элементов без id  //
import { v4 as uuidv4 } from 'uuid';
import { selectorOrders } from '../../utils/constants';
//  import { getUser, getBurgerData } from '../../utils/state';  //
import { TIngredient } from '../../utils/types';
import burgerConstructorStyle from './burger-constructor.module.css';

export const BurgerConstructor = () => {
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным о заказах. PROFIT!  //

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  Получаю из redux store данные заказа  //
  const { orderData, orderNumber } = useSelector(selectorOrders);
  //  Получаю из redux store состояние авторизации пользователя  //
  const user = useSelector((state) => state.auth.user);
  
  //  Редьюсеры со свитчем и действия вынес в отдельные файлы  //
  //  Вместо первых встречных теперь нахожу выбранные элементы  //
  const bun = orderData.find(function (element) {
    return element.type === 'bun';
  });
  //  Пока что начинку и соус можно не разделять, т.к. логика едина  //
  const ingredientsMidStuff = orderData.filter((element) => element.type !== 'bun');
  
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

  //  Если авторизован, открываю окно с деталями заказа, если нет -> логин  //
  const handleOpenIngredientModal = () => {
    (user) 
    ? dispatch(dispatchOrder(orderData.map((ingredient) => ingredient._id)))
    : navigate('/login')
  };

  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };
  
  //  Цены суммирую и вывожу в конструкторе, в попапе вывожу номер заказа  //
  //  Добавил ref, отключил контекст провайдер, теперь беру состояние из redux-стора  //
  //  Открытие окна с деталями ингредиента вынес в отдельную функцию handleOpenIngredientModal  //
  //  Открываю окно заказа при условии, что есть номер заказа, закрытие вынес в handleCloseOrderModal  //
  //  Показываю сумму заказа и кнопку, только если выбраны ингредиенты (кроме булок)  //
  return (
    <>
      <section className={`${burgerConstructorStyle.element__section}`} ref={dropTarget}>
        <div className={`${burgerConstructorStyle.element__container}`}>
          <ul className={`${burgerConstructorStyle.element__list}`}>
          {bun && (
            <li className={`${burgerConstructorStyle.element__bun}`}>
              <ConstructorElement 
                type={'top'}
                isLocked={true} 
                text={`${bun.name} (верх)`} 
                price={bun.price}
                thumbnail={bun.image} 
              />
            </li>
          )}

            <ul className={`${burgerConstructorStyle.element_midstuff}`}>
            {ingredientsMidStuff.map((element, index) => { 
              return (
                <li key={element._id} className={burgerConstructorStyle.element}>
                  <ConstructorElements 
                    elementData={element}
                    bunType={''} 
                    bunTypeName={''} 
                    isLocked={false} 
                    index={index}
                    key={element._id} 
                  />
                </li>
              );
            })}
            {ingredientsMidStuff.length === 0 && (
              <li className={burgerConstructorStyle.element}>
                <span className='text mt-30 ml-30 text_type_main-default'>
                  Добавьте ингредиенты для Вашего бургера!
                </span>
              </li>
            )}
            </ul>
          {bun && (
            <li className={`${burgerConstructorStyle.element__bun}`}>
              <ConstructorElement 
                type={'bottom'} 
                isLocked={true} 
                text={`${bun.name} (низ)`} 
                price={bun.price}
                thumbnail={bun.image} 
              />
            </li>
          )}
        </ul>
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

export default React.memo(BurgerConstructor);
