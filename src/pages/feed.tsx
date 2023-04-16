import React from 'react';
import { useDispatch } from '../hooks/useDispatch';
import { useSelector } from '../hooks/useSelector';
import { AppHeader } from '../components/app-header/app-header';
import { FeedOrder } from '../components/feed-item/feed-item';
import { getOrders } from '../utils/state';
import { TOrder } from '../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
} from '../utils/constants';
import feedStyles from './feed.module.css';


export function FeedPage() {
  const { total, totalToday } = useSelector((store) => store.ws);
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      return;
    };
  }, [dispatch]);

  const feedOrders = React.useMemo(
    () => orders.filter((order) => order),
    [orders]
  );

  const doneOrders = React.useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === 'done')
        .slice(0, 20)
        .map((order) => order.number),
    [feedOrders]
  );

  const pendingOrders = React.useMemo(
    () =>
      feedOrders
        .filter((order) => order.status === 'pending')
        .slice(0, 20)
        .map((order) => order.number),
    [feedOrders]
  );

  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={feedStyles.main_container}>
        <h1 className=' mb-5 text text_type_main-large'>Лента заказов</h1>
        <div className={feedStyles.section_container}>
          <section className={feedStyles.order_container}>
            {orders &&
              feedOrders.map((order) => (
                <FeedOrder
                  order={order}
                  key={order._id}
                  showOrderStatus={false}
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
