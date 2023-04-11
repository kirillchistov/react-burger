//  Здесь будет TSX  //

// import React, {useEffect, useState, useMemo} from 'react';
import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from '../../hooks/useDispatch';
// import { useSelector } from '../../hooks/useSelector';
// Здесь переделать работу с состояниями, переназвать  //
// import { getItems, getOrdersLogged, getOrders } from '../../utils/state';
// import { useLocation } from 'react-router';
// import { TOrder, TIngredient } from '../../utils/types';
// import { getIngredients } from '../../services/actions/ingredient-actions';
//  Где-то здесь будет импорт для WS  //

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';


export const Order = () => {
  // const { id } = useParams();
  // const items:TIngredient[] = useSelector(getItems);
  // const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
  // const dispatch = useDispatch();
  // const location = useLocation();
  //  const ordersList = useSelector(getOrders);
  // const ordersListLogged = useSelector(getOrdersLogged);

  // const orders: TOrder[] = location.pathname.startsWith('/feed')
  //   ? ordersList
  //   : ordersListLogged;

  // useEffect(() => {
  //   // dispatch({ type: WS_CONNECTION_START });
  //   dispatch(getIngredients());
  //   return () => {
  //     // dispatch({ type: WS_CONNECTION_CLOSE });
  //     return;
  //   };
  // }, [dispatch]);

  // const order = useMemo(
  //   () => orders.find((order) => order._id === id) || null,
  //   [orders, id]
  // );

  // const doneOrderStyle = order
  //   ? order.status === 'done'
  //     ? {
  //         color: '#00cccc',
  //       }
  //     : undefined
  //   : undefined;

  // useEffect(() => {
  //   if (order) {
  //     const { ingredients: orderIngredients } = order;
  //     const ingredientsArr = Array.from(new Set(orderIngredients));

  //     setOrderIngredients(
  //       ingredientsArr
  //         .map((orderIngredient: string) => {
  //           const ingredient = items.find(
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

  // const getOrderStatus = () => {
  //   if (order !== null) {
  //     if (order.status === 'created') {
  //       return 'Создан';
  //     } else if (order.status === 'pending') {
  //       return 'Готовится';
  //     } else if (order.status === 'done') {
  //       return 'Выполнен';
  //     }
  //   }
  // };

  // const totalSum = useMemo(() => {
  //   if (orderIngredients !== undefined && orderIngredients.length > 0) {
  //     return orderIngredients
  //       .map((element) => element.price)
  //       .reduce((sum, price) => sum + price, 0);
  //   } else {
  //     return 0;
  //   }
  // }, [orderIngredients]);

  return (
    <div className={orderStyles.container}>
      {/*{order && ( */}
        <>
          <p className='text text_type_main-medium mt-10'>Название заказа</p>
          <p
            className='text text_type_main-default mt-3'
          >
            Статус заказа
          </p>
          <p className='text text_type_main-medium mt-15'>Состав:</p>
          <div className={`mt-6 pr-6 ${orderStyles.ingredients}`}>
            {/* {orderIngredients !== undefined && orderIngredients.map((ingredient) => ( */}
              <div className={orderStyles.ingredient} key='id'>
                <div className={`mr-4 ${orderStyles.ingredient_image_container}`}>
                  <div
                    className={orderStyles.ingredient_image}
                    style={{ backgroundImage: `url(bg_img.jpg)` }}
                  />
                </div>
                <div className={`mr-4 ${orderStyles.ingredient_name}`}>
                  Название ингредиента
                </div>
                <div className={orderStyles.ingredient_price}>
                  <p className='text text_type_digits-default mr-2'>1000</p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            {/* )))} */}
          </div>
          <div className={`mt-10 ${orderStyles.footer}`}>
            <FormattedDate
              date={new Date()}
              className='text text_type_main-default text_color_inactive'
            />
            <div className={orderStyles.order_price}>
              <p className='text text_type_digits-default mr-2'>000 000</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
    </div>
  );
}
