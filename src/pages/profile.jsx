/*
Экран маршрута /profile. Пользователь попадает сюда по кнопке «Личный кабинет». Роутинг:
1) При попадании на страницу профиля сначала открывается маршрут /profile. 
2) Ссылка «Профиль» становится активной.
3 позже) Клик по «История заказов» открывает /profile/orders => активная ссылка «История заказов»
4 позже) Клик по заказу в «Истории заказов» открывает экран /profile/orders/:id.
5 позже) Ссылка «Выход» пока ничего не делает. Потом logout наверное
*/
//  здесь нужны useState, useSelector, useDispatch и useForm //
//  нужна шапка
import { AppHeader } from '../components/app-header/app-header';
import { ProfileNav } from '../components/profile-nav/profile-nav';
//  беру кнопку, поля ввода и пароля из библиотеки  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//  нужен action для обновления профиля через redux  //

import ProfileStyle from './profile.module.css';

export const ProfilePage = () => {
  //  по ТЗ пока не делаем реальный пароль и валидацию  //
  //  const passwordValue = '******';
 
  const onChange = (e) => {
    e.preventDefault();
    //  здесь будут функции dispatch? или локальное управление состянием, пока хз  //
  };

  const submitForm = (e) => {
    e.preventDefault();
    //  здесь будет dispatch и др, пока хз  //
  };

  let isDataChanged = false;

  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <AppHeader />
      <div className={ProfileStyle.profile__container}>
        <ProfileNav
          navTip={'В этом разделе вы можете изменить свои персональные данные'}
        />
        <div className='ml-15'>
          <form className={ProfileStyle.profile__form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={'name'}
              name={'name'}
              icon='EditIcon'
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={onChange}
              value={'e@mail.ru'}
              name={'email'}
              icon='EditIcon'
            />
            <PasswordInput
              type={'password'}
              onChange={onChange}
              value={'abc123pass'}
              name={'password'}
              icon='EditIcon'
            />
            {isDataChanged && (
              <div className={ProfileStyle.profile__button_container}>
                <Button
                  type='secondary'
                  size='medium'
                  htmlType='button'
                  onClick={() => console.log('какое-то действие')}
                >
                  Отмена
                </Button>
                <Button
                  type='primary'
                  size='medium'
                  htmlType='submit'
                  onClick={submitForm}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
