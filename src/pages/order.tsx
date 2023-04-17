//  Страница заказа по роуту /profile/orders/:id  //
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
//  Хуки  //
import { useSelector } from '../hooks/useSelector';
import { useDispatch } from '../hooks/useDispatch';
import { getOrders, getOrdersLogged } from '../utils/state';
import { useLocation } from 'react-router';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../utils/constants';

import { AppHeader } from '../components/app-header/app-header';
import { Order } from '../components/order/order';
import { TOrder } from '../services/types';
import orderStyles from './order.module.css';

export const OrderPage:FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const ordersList = useSelector(getOrders);
  const ordersListLogged = useSelector(getOrdersLogged);

  const orders: TOrder[] = location.pathname.startsWith('/feed')
    ? ordersList
    : ordersListLogged;

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  const order = useMemo(
    () => orders.find((order: TOrder) => order._id === id) || null,
    [orders, id]
  );
  //  Вывожу номер заказа и под ним компонент с контентом заказа  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={orderStyles.container}>
        {order && (
          <p className={`text text_type_digits-default ${orderStyles.order_number}`}>
            {`#${order.number}`}
          </p>
        )}
        <Order />
      </div>
    </div>
  );
}
