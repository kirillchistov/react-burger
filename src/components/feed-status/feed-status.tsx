import React, { useState, FC, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { getItems } from '../../utils/state';
import { TOrder, TIngredient } from '../../utils/types';
import styles from './feed-status.module.css';

interface IFeedItemProps {
  order: TOrder;
  showOrderStatus: boolean;
}

export const FeedStatus: FC<IFeedItemProps> = ({ order, showOrderStatus }) => {
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

  const handleOpenOrderModal = useCallback(() => {
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

  React.useEffect(() => {
    if (order) {
      const { ingredients: orderIngredients } = order;
      const ingredientsArr = Array.from(new Set(orderIngredients));

      setOrderIngredients(
        ingredientsArr
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
      onClick={handleOpenOrderModal}
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
      {showOrderStatus && (
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
                  key={uuidv4()}
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
