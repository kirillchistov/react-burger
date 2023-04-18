//  Здесь будет TSX  //
//  Эндпоинт для получения деталей конкретного заказа GET /orders/:number  //

import React, {useEffect, useState, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { useLocation } from 'react-router';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../utils/constants'
// Здесь переделать работу с состояниями, переназвать  //
import { getItems, getOrdersLogged, getOrders } from '../../utils/state';
//  import { getIngredients } from '../../services/actions/ingredient-actions';
import { TOrder, TIngredient, TIngredientCount } from '../../services/types';
//  Где-то здесь будет импорт для WS  //

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';

export const Order = () => {
  const { id } = useParams();
  //  const items:TIngredient[] = useSelector(getItems);
  const items:TIngredient[] = useSelector(state => state.ingredients.items);
  const [orderIngredients, /* setOrderIngredients */] = useState<TIngredient[]>([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const ordersList = useSelector(getOrders);
  const ordersListLogged = useSelector(getOrdersLogged);

  //  В зависимости от локейшена буду показывать общий список или по логину  //
  const orders: TOrder[] = location.pathname.startsWith('/feed')
    ? ordersList
    : ordersListLogged;

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    // dispatch(getIngredients());
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      return;
    };
  }, [dispatch]);

  const order = useMemo(
    () => orders?.find((order) => order._id === id) || null,
    [orders, id]
  );

  const doneOrderColor = order
    ? order.status === 'done'
      ? {
          color: '#00cccc',
        }
      : undefined
    : undefined;

  //  При монтировании проверяю, есть ли заказ в состоянии  //
  //  Если есть, создаю массив из сета ингридиентов  //
  //  Потом в полученный массив записываю непустых элементов и кол-во в заказе  //
  // useEffect(() => {
  //   if (order) {
  //     const { ingredients: orderIngredients } = order;
  //     const ingredientsList = Array.from(new Set(orderIngredients));

  //     setOrderIngredients(
  //       ingredientsList
  //         .map((orderIngredient: string) => {
  //           const ingredient = items?.find(
  //             (item) => item._id === orderIngredient
  //           );

  //           return ingredient === undefined
  //             ? undefined
  //             : {
  //                 ...ingredient,
  //                 quantity: orderIngredients.filter(
  //                   (ingredientId) => ingredientId === ingredient._id
  //                 ).length,
  //               };
  //         })
  //         .filter((ingredient) => ingredient !== undefined) as TIngredient[]
  //     );
  //   }
  // }, [items, order]);

  //  Поменять переменные  //
  const orderIngredientInfo = useMemo(() => {  
    console.log(`items: ${items}, order: ${order}`)
    if (!order || !items?.length) return null;
    // 
    const date = new Date(order.createdAt);
    // Здесь возвращаю объект с ключами в виде id ингредиента заказа  //
    // Значение ключа - данные ингредиента + количество в заказе  //
    const ingredientsInfo = order.ingredients.reduce(
      (prev: TIngredientCount, i) => {
        if (!prev[i]) {
          const ingredient = items?.find((ingredientItem) => ingredientItem._id === i);
          if (ingredient) {
            prev[i] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          prev[i].count += 1;
        }
        return prev;
      },
      //  начальное значение аккумулятора  //
      {}
    );

  const total = Object.values(ingredientsInfo).reduce(
      (prev, i) => prev + i.price * i.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total,
    };
  }, [order, items]);
  console.log(orderIngredientInfo);



  //  Возвращаю строку со статусом заказа  //
  const getOrderStatus = () => {
    if (order !== null) {
      if (order.status === 'created') {
        return 'Создан';
      } else if (order.status === 'pending') {
        return 'Готовится';
      } else if (order.status === 'done') {
        return 'Выполнен';
      }
    }
  };

  //  Возвращаю сумму заказа = суммирую стоимость ингридиентов редьюсом  //
  const totalSum = useMemo(() => {
    if (orderIngredients !== undefined && orderIngredients.length > 0) {
      return orderIngredients
        .map((element) => element.price)
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [orderIngredients]);

  return (
    <div className={orderStyles.container}>
      {order && (
        <>
          <p className='text text_type_main-medium mt-10' style={doneOrderColor}>{order.name}</p>
          <p className='text text_type_main-default mt-3'>
            {getOrderStatus()}
          </p>
          <p className='text text_type_main-medium mt-15'>Состав:</p>
          <div className={`mt-6 pr-6 ${orderStyles.ingredients}`}>
            {orderIngredients !== undefined && orderIngredients.map((ingredient) => (
              <div className={orderStyles.ingredient} key={ingredient._id}>
                <div className={`mr-4 ${orderStyles.ingredient_image_container}`}>
                  <div
                    className={orderStyles.ingredient_image}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                </div>
                <div className={`mr-4 ${orderStyles.ingredient_name}`}>
                  {ingredient.name}
                </div>
                <div className={orderStyles.ingredient_price}>
                  <p className='text text_type_digits-default mr-2'>
                    {`${ingredient.quantity} x ${ingredient.price}`}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-10 ${orderStyles.footer}`}>
            <FormattedDate
              date={new Date(order.createdAt)}
              className='text text_type_main-default text_color_inactive'
            />
            <div className={orderStyles.order_price}>
              <p className='text text_type_digits-default mr-2'>{totalSum}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
