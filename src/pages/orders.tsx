//  Экран маршрута /profile/orders. Делаем в следующем спринте  //
import React, { FC, useEffect, useMemo } from 'react';
import { useSelector } from '../hooks/useSelector';
import { useDispatch } from '../hooks/useDispatch';
import { AppHeader } from '../components/app-header/app-header';
import { FeedOrder } from '../components/feed-item/feed-item';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../utils/constants';
import { getOrdersLogged } from '../utils/state';
import { TOrder } from '../services/types';

//  Стили пока берем из профиля  //
import OrdersPageStyle from './order.module.css';
//  Здесь предстоит добавить функционал отображения заказов и подсветки меню  //
//  Пока в разметке просто шапка и див с табом и подписью  //

export const OrdersPage:FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getOrdersLogged);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  const profileOrders = useMemo(
    () => orders?.filter((order:TOrder) => order),
    [orders]
  );

  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={OrdersPageStyle.profile__container}>
        <ProfileNav
          navTip={'В этом разделе вы можете просмотреть свою историю заказов'}
        />
        <section className={`ml-15 ${OrdersPageStyle.order_container}`}>
          {orders &&
            profileOrders
              .reverse()
              .map((order:TOrder) => (
                <FeedOrder order={order} key={order._id} isStatusVisible />
              ))}
        </section>
      </div>
    </div>
  );
}

//  нет пропсов, нет типизации  //
