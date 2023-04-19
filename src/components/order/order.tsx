//  Здесь будет TSX  //
//  Эндпоинт для получения деталей конкретного заказа GET /orders/:number  //

import React, {useEffect, useMemo} from 'react';
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
  const items:TIngredient[] = useSelector(getItems);
  //  const items:TIngredient[] = useSelector(state => state.ingredients.items);
  //  const [orderIngredients, /* setOrderIngredients */] = useState<TIngredient[]>([]);
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

  //  Формирую состав заказа - вначале проверяю есть ли закза и ингридиенты в массиве  //
  const orderIngredientInfo = useMemo(() => {  
    //  console.log(`items: ${items}, order: ${order}`)
    if (!order || !items?.length) return null;
    // Получаю дату заказа  //
    const date = new Date(order.createdAt);
    // Возвращаю объект с ключами в виде id ингредиента заказа  //
    // Значение ключа - данные ингредиента + количество в заказе  //
    // В редьюсе итерациями добавляю в объект ингридиенты и их count в заказе  //
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
  //  Здесь же считаю общую сумму заказа  //
  const total = Object.values(ingredientsInfo).reduce(
      (prev, i) => prev + i.price * i.count, 0
    );
    return {
      ...order,
      ingredientsInfo,
      date,
      total,
    };
  }, [order, items]);
  //  console.log(orderIngredientInfo);

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

  //  в зависимости от статуса подсвечиваю готовый заказ  //
  const doneOrderColor = order
    ? order.status === 'done'
      ? {
          color: '#00cccc',
        }
      : undefined
    : undefined;

  //  Возвращаю сумму заказа = суммирую стоимость ингридиентов редьюсом  //
  // const totalSum = useMemo(() => {
  //   if (orderIngredients !== undefined && orderIngredients.length > 0) {
  //     return orderIngredients
  //       .map((element) => element.price)
  //       .reduce((sum, price) => sum + price, 0);
  //   } else {
  //     return 0;
  //   }
  // }, [orderIngredients]);

  //  Здесь с сервера приезжает шляпа с булками: число булок = 1, а не 2  //
  return (
    <div className={orderStyles.container}>
      {order && (
        <>
          <p className={`text text_type_digits-default ${orderStyles.order_number}`}>
            {`#${order.number}`}
          </p>
          <p className='mt-10 text text_type_main-medium' style={doneOrderColor}>{order.name}</p>
          <p className='mt-3 text text_type_main-default'>{getOrderStatus()}</p>
          <p className='mt-15 text text_type_main-medium'>Состав:</p>
          <div className={`mt-6 pr-6 ${orderStyles.ingredients}`}>
            {orderIngredientInfo && Object.keys(orderIngredientInfo.ingredientsInfo).map((ingredient) => (
              <div className={orderStyles.ingredient} key={orderIngredientInfo.ingredientsInfo[ingredient]._id}>
                <div className={`mr-4 ${orderStyles.image_container}`}>
                  <div
                    className={orderStyles.ingredient_image}
                    style={{ backgroundImage: `url(${orderIngredientInfo.ingredientsInfo[ingredient].image})` }}
                  />
                </div>
                <div className={`mr-4 ${orderStyles.ingredient_name}`}>
                  {orderIngredientInfo.ingredientsInfo[ingredient].name}
                </div>
                <div className={orderStyles.ingredient_price}>
                  <p className='mr-2 text text_type_digits-default'>
                    {`${orderIngredientInfo.ingredientsInfo[ingredient].count} x ${orderIngredientInfo.ingredientsInfo[ingredient].price}`}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-10 ${orderStyles.order_footer}`}>
            <FormattedDate
              date={new Date(order.createdAt)}
              className='text text_type_main-default text_color_inactive'
            />
            <div className={orderStyles.order_total}>
              <p className='text text_type_digits-default mr-2'>{orderIngredientInfo?.total}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
