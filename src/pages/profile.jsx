/*
Экран маршрута /profile. Пользователь попадает сюда по кнопке «Личный кабинет». Роутинг:
1) При попадании на страницу профиля сначала открывается маршрут /profile. 
2) Ссылка «Профиль» становится активной.
3 позже) Клик по «История заказов» открывает /profile/orders => активная ссылка «История заказов»
4 позже) Клик по заказу в «Истории заказов» открывает экран /profile/orders/:id.
5 позже) Ссылка «Выход» пока ничего не делает. Потом logout наверное
*/
//  хуки для состояний и обновления полей ввода формы  //
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
//  шапка и левая навигация профиля  //
import { AppHeader } from '../components/app-header/app-header';
import { ProfileNav } from '../components/profile-nav/profile-nav';
//  кнопка, поле ввода и поле пароля из библиотеки  //
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
//  нужен action для обновления профиля через redux  //
import { updateUserProfile } from '../services/actions/auth-actions';
import ProfileStyle from './profile.module.css';

export const ProfilePage = () => {
  //  по ТЗ пока не делаю реальный пароль и валидацию  //
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным об пользователе. PROFIT!  //
  //  Примерно как в тренажере  //
  const dispatch = useDispatch(); 
  const passwordValue = '******';
  const user = useSelector((state) => state.auth.user);
  const [isChanged, setIsChanged] = useState(false);
  
  //  Задаю начальные значения для профиля  //
  const { data, setData } = useForm({
    email: user.email,
    password: passwordValue,
    name: user.name,
  });

  //  Обрабатываю изменения в поле ввода  //
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  //  Обрабатываю отправку формы  //
  const submitForm = (e) => {
    dispatch(
      updateUserProfile({
        email: data.email,
        name: data.name,
        password:
        data.password !== passwordValue ? data.password : 'abc123pass',
      })
    );
    setIsChanged(false);
  };

  //  Обрабатываю отмену отправку формы  //
  const cancelSubmit = () => {
    setData({
      email: user.email,
      name: user.name,
      password: passwordValue,
    });
    setIsChanged(false);
  };

  //  Разметка: контейнер, шапка, навменю, форма с полями ввода, кнопка  //
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
              value={data.name}
              name={'name'}
              icon='EditIcon'
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={onChange}
              value={data.email}
              name={'email'}
              icon='EditIcon'
            />
            <PasswordInput
              type={'password'}
              onChange={onChange}
              value={data.password}
              name={'password'}
              icon='EditIcon'
            />
            {isChanged && (
              <div className={ProfileStyle.profile__button_container}>
                <Button
                  type='secondary'
                  size='medium'
                  htmlType='button'
                  onClick={cancelSubmit}
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
