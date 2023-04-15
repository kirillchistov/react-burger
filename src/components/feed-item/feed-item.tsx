import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import feedItemStyles from './feed-item.module.css';

export const FeedOrder = () => {

  return (
    <div
    className={`mr-2 ${feedItemStyles.order_container}`}
  >
    <div className={feedItemStyles.header}>
      <p className='text text_type_digits-default'>
        #123123
      </p>
      <p className={`text text_type_main-default text_color_inactive ${feedItemStyles.order_date}`}>
      Вчера, 23:55 i-GMT+3
      </p>
    </div>
    <p className='mt-6 text text_type_main-medium'>
    Falcon of the Millenium бургер
    </p>
    <div className={`mt-6 ${feedItemStyles.footer}`}>
      <ul className={feedItemStyles.ingredients}>
      </ul>
      <div className={`ml-6 ${feedItemStyles.order_price}`}>
        <p className='mr-2 text text_type_digits-default'>
          345
        </p>
        <CurrencyIcon type='primary' />
      </div>
    </div>
  </div>

  );
}