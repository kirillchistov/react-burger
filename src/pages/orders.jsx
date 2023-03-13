
//  Экран маршрута /profile/orders. Делаем в следующем спринте  //
//  здесь нужны useState, useSelector, useDispatch и useForm //
//  нужна шапка
import { AppHeader } from '../components/app-header/app-header';
import { ProfileNav } from '../components/profile-nav/profile-nav';
//  Стили пока берем из профиля  //
import OrdersPageStyle from './profile.module.css';
//  Здесь предстоит добавить функционал отображения заказов и подсветки меню  //
//  Пока в разметке просто шапка и див с табом и подписью  //
export const OrdersPage = () => {
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={OrdersPageStyle.profile__container}>
        <ProfileNav
          navTip={'В этом разделе вы можете просмотреть свою историю заказов'}
        />
        <h1 className='text text_type_main-large'>История заказов</h1>
      </div>
    </div>
  );
}

//  нет пропсов, нет типизации  //
