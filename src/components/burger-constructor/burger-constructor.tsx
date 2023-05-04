/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингредиентов  //

import React, { FC, useMemo } from 'react';

import { useNavigate } from 'react-router';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { useDrop } from 'react-dnd';
//  универсальный генератор уникальных id для элементов без id  //
import { v4 as uuidv4 } from 'uuid';

import ConstructorElements from '../constructor-elements/constructor-elements';
import OrderDetails from '../order-details/order-details';
import { Modal } from '../modal/modal';
import { dispatchOrder } from '../../services/actions/order-actions';
//  Импортировал actions для работы с ингредиентами в конструкторе заказа  //
import { ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from '../../utils/constants';  //
import { getUser, getBurgerData } from '../../utils/state';
import { TIngredient } from '../../services/types';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyle from './burger-constructor.module.css';

export const BurgerConstructor: FC = () => {
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным о заказах. PROFIT!  //

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const ref = useRef(null);
  //  Получаю из redux store данные заказа  //
  const { orderNumber } = useSelector((state) => state.order);
  const burgerData: TIngredient[] = useSelector(getBurgerData);
  //  Получаю из redux store состояние авторизации пользователя  //
  //  const user = useSelector((state) => state.auth.user);
  const user = useSelector(getUser);
  
  //  Редьюсеры со свитчем и действия вынес в отдельные файлы  //
  //  Вместо первых встречных теперь нахожу выбранные элементы  //
  const bun = burgerData.find(function (element) {
    return element.type === 'bun';
  });
  
  const ingredientsMidStuff = burgerData.filter((element) => element.type !== 'bun');
  
  //  Считаю сумму заказа с мемоизацией  //
  //  Прибавляю к старой сумме заказа (если не пуст) цены элементов (булки * 2)  //
  const totalAmount = useMemo(() => {
    //  let orderTotal = 0; переделал на объект burgerData и reduce  //
    if (burgerData.length > 0) {
      return burgerData
        .map((element) => element.price * (element.type === 'bun' ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      //  Если в заказе нет данных, то возвращаем 0  //
      return 0;
    }
  }, [burgerData]);
    
  const onDropIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === 'bun') {
      dispatch({
        type: ADD_BUN,
        payload: { ...ingredient, _uid: uuidv4() },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...ingredient, _uid: uuidv4() },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (ingredientData:TIngredient) => onDropIngredient(ingredientData),
  });

  //  Если авторизован, открываю окно с деталями заказа, если нет -> логин  //
  const handleOpenIngredientModal = () => {
    (user) 
    ? dispatch(dispatchOrder(burgerData.map((ingredient) => ingredient._id)))
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
                <li key={element._uid} className={burgerConstructorStyle.element}>
                  <ConstructorElements 
                    elementData={element}
                    bunTypeName={''} 
                    isLocked={false} 
                    index={index}
                    key={element._uid} 
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
          {/* <ConstructorTotal total={totalAmount} /> */}
          <div className={burgerConstructorStyle.containerTotal}>
            <p className='mr-2 text text_type_digits-medium'>{totalAmount}</p>
            <CurrencyIcon type='primary' />
          </div>    
          <Button id='orderButton' type='primary' size='large' htmlType='button' onClick={handleOpenIngredientModal}>Оформить заказ</Button>
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

export default React.memo(BurgerConstructor);
