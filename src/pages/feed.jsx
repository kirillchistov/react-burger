
//  Страница ленты заказов  //
import { AppHeader } from '../components/app-header/app-header';
//  Стили как в профиле  //
import FeedStyles from './feed.module.css';

//  Пока в разметке шапка и заголовок страницы  //
export const FeedPage = () => {
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={FeedStyles.container}>
        <h1 className='text text_type_main-large'>Лента заказов</h1>
      </div>
    </div>
  );
}
