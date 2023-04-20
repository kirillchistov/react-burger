import React, { FC, useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { getItems } from '../../utils/state';
import { TOrder, TIngredient } from '../../services/types';
import styles from './feed-status.module.css';

interface IFeedItemProps {
  order: TOrder;
  isStatusVisible: boolean;
}

export const FeedStatus: FC<IFeedItemProps> = ({ order, isStatusVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = useSelector(getItems);
  const [orderIngredients, setOrderIngredients] = useState<TIngredient[]>([]);
  const ingredientNumber = 6;

  const totalSum = useMemo(() => {
    if (orderIngredients.length > 0) {
      return orderIngredients
        .map((element) => element.price)
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [orderIngredients]);

  const doneOrderStyle = order
    ? order.status === 'done'
      ? {
          color: '#00cccc',
        }
      : undefined
    : undefined;

  const getOrderStatus = () => {
    if (order.status === 'created') {
      return 'Создан';
    } else if (order.status === 'pending') {
      return 'Готовится';
    } else if (order.status === 'done') {
      return 'Выполнен';
    }
  };

  const handleOrderModal = useCallback(() => {
    if (location.pathname === '/feed') {
      navigate(`/feed/${order._id}`, {
        state: { feedOrderModal: location },
      });
    } else if (location.pathname === '/profile/orders') {
      navigate(`/profile/orders/${order._id}`, {
        state: { profileOrderModal: location },
      });
    }
  }, [navigate, location, order._id]);

  useEffect(() => {
    if (order) {
      const { ingredients: orderIngredients } = order;
      const ingredientsList = Array.from(new Set(orderIngredients));

      setOrderIngredients(
        ingredientsList
          .map((orderIngredient: string) => {
            const ingredient = items.find(
              (item) => item._id === orderIngredient
            );

            return ingredient === undefined
              ? undefined
              : ingredient;
          })
          .filter((ingredient) => ingredient !== undefined) as TIngredient[]
      );
    }
  }, [items, order]);

  return (
    <div
      className={`${styles.order_container} mr-2`}
      onClick={handleOrderModal}
    >
      <div className={styles.header}>
        <p className='text text_type_digits-default'>{`#${order.number}`}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className='text text_type_main-default text_color_inactive'
        />
      </div>
      <p className={`${styles.order_name} text text_type_main-medium mt-6`}>
        {order.name}
      </p>
      {isStatusVisible && (
        <p className='text text_type_main-default mt-2' style={doneOrderStyle}>
          {getOrderStatus()}
        </p>
      )}
      <div className={`${styles.footer} mt-6`}>
        <ul className={styles.ingredients}>
          {orderIngredients
            .slice(0, ingredientNumber)
            .map((ingredient, index) => {
              const isLast = index === ingredientNumber - 1;
              return (
                <li
                  className={styles.ingredient_image_container}
                  key={ingredient._id}
                >
                  <div
                    className={`${styles.ingredient_image} ${
                      isLast ? styles.ingredient_image_opacity : ''
                    }`}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                  {isLast && orderIngredients.length > ingredientNumber - 1 && (
                    <span
                      className={`${styles.ingredient_image_overflow} text text_type_main-default`}
                    >
                      {`+${orderIngredients.length - ingredientNumber + 1}`}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
        <div className={`${styles.order_total} ml-6`}>
          <p className='text text_type_digits-default mr-2'>{totalSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}
