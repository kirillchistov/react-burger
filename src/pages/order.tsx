//  Страница заказа по роуту /profile/orders/:id  //
import React, { FC, useEffect } from 'react';
//  Хуки  //
import { useDispatch } from '../hooks/useDispatch';

import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../utils/constants';
import { Order } from '../components/order/order';

export const OrderPage:FC = () => {
  const dispatch = useDispatch();    

  //  При монтировании/размонтировании открываю/закрываю ws-соединение  //
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  //  Вывожу номер заказа и под ним компонент с контентом заказа  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <Order />
    </div>
  );
}
