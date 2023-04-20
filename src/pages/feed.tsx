//  Страница с лентой заказов  //
import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
//  import { AppHeader } from '../components/app-header/app-header';
import { FeedOrder } from '../components/feed-item/feed-item';
//  import { getOrders } from '../utils/state';
//  import { TOrder } from '../services/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from '../utils/constants';
import feedStyles from './feed.module.css';

export const FeedPage:FC = () => {
  //  Пока забираю из стора по старинке, надо доделать getOrders  //
  //  const orders: TOrder[] = useSelector(getOrders);
  const { total, totalToday, orders } = useSelector(store => store.ws);
  const dispatch = useDispatch();

  //  При монтировании / размонтировании открываю / закрываю WS подключение  //
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      return;
    };
  }, [dispatch]);

  //  Получаю массив для ленты заказов  //
  const feedOrders = useMemo(
    () => orders.filter((order) => order),
    [orders]
  );

  //  Собираю ленту из 10 номеров готовых заказов  //
  const doneOrders = useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === 'done')
        .slice(0, 10)
        .map((order) => order.number),
    [feedOrders]
  );

  //  Собираю ленту из 20 номеров готовящихся заказов  //
  //  Надо переделать на 10 номеров  //
  const pendingOrders = useMemo(() =>
      feedOrders
        .filter((order) => order.status === 'pending')
        .slice(0, 20)
        .map((order) => order.number),
    [feedOrders]
  );

  //  Надо переделать верстку - показывать не более 10 номеров по 5 в 2 колонках  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <div className={feedStyles.main_container}>
        <h1 className=' mb-5 text text_type_main-large'>Лента заказов</h1>
        <div className={feedStyles.section_container}>
          <section className={feedStyles.order_container}>
            {orders &&
              feedOrders?.map((order) => (
                <FeedOrder
                  order={order}
                  key={order._id}
                  isStatusVisible={false}
                />
              ))}
          </section>
          <section className='ml-15'>
            <div className={feedStyles.section_container}>
              <div>
                <p className='mb-6 text text_type_main-medium'>Готовы:</p>
                <div
                  className={`text text_type_digits-default ${feedStyles.orders_list} ${feedStyles.orders_done}`}
                >
                  {doneOrders.map((orderNumber) => (
                    <div
                      className={`mb-2 text text_type_digits-default ${feedStyles.order_ready}`}
                      key={orderNumber}
                    >
                      {orderNumber}
                    </div>
                  ))}
                </div>
              </div>
              <div className='ml-9'>
                <p className='mb-6 text text_type_main-medium'>В работе:</p>
                <div
                  className={`${feedStyles.orders_list} text text_type_digits-default`}
                >
                  {pendingOrders.map((orderNumber) => (
                    <div
                      className='mb-2 text text_type_digits-default'
                      key={orderNumber}
                    >
                      {orderNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={` mt-15`}>
              <p className='text text_type_main-medium'>
                Выполнено за всё время:
              </p>
              <p className='text text_type_digits-large'>{total}</p>
            </div>
            <div className={`mt-15`}>
              <p className='text text_type_main-medium'>
                Выполнено за сегодня:
              </p>
              <p className='text text_type_digits-large'>{totalToday}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}