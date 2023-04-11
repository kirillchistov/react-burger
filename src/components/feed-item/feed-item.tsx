import React, { useState, useEffect, FC, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { v4 as uuidv4 } from 'uuid';
import { getItems } from '../../utils/state';
import { TOrder, TIngredient } from '../../utils/types';
import feedItemStyles from './feed-item.module.css';

interface IFeedItemProps {
  order: TOrder;
  showOrderStatus: boolean;
}

export const FeedItem: FC<IFeedItemProps> = ({ order, showOrderStatus }) => {
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

  useEffect(() => {
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
      className={`mr-2 ${feedItemStyles.order_container}`}
      onClick={handleOpenOrderModal}
    >
      <div className={feedItemStyles.header}>
        <p className='text text_type_digits-default'>{`#${order.number}`}</p>
        <FormattedDate
          date={new Date(order.createdAt)}
          className='text text_type_main-default text_color_inactive'
        />
      </div>
      <p className={`text text_type_main-medium mt-6 ${feedItemStyles.order_name}`}>
        {order.name}
      </p>
      {showOrderStatus && (
        <p className='text text_type_main-default mt-2' style={doneOrderStyle}>
          {getOrderStatus()}
        </p>
      )}
      <div className={`mt-6 ${feedItemStyles.footer}`}>
        <ul className={feedItemStyles.ingredients}>
          {orderIngredients
            .slice(0, ingredientNumber)
            .map((ingredient, index) => {
              const isLast = index === ingredientNumber - 1;
              return (
                <li
                  className={feedItemStyles.ingredient_image_container}
                  key={uuidv4()}
                >
                  <div
                    className={`${feedItemStyles.ingredient_image} ${
                      isLast ? feedItemStyles.ingredient_image_opacity : ''
                    }`}
                    style={{ backgroundImage: `url(${ingredient.image})` }}
                  />
                  {isLast && orderIngredients.length > ingredientNumber - 1 && (
                    <span
                      className={`text text_type_main-default ${feedItemStyles.ingredient_image_overflow}`}
                    >
                      {`+${orderIngredients.length - ingredientNumber + 1}`}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
        <div className={`ml-6 ${feedItemStyles.order_total}`}>
          <p className='text text_type_digits-default mr-2'>{totalSum}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}
