//  Компонент шапка  //
//  Из UI-библиотеки: лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Адаптив и бургер-меню под мобилку сделаем позже  //
//  Переделал на NavLink для роутинга, нужны еще тоглы активного меню  //

import React from 'react';
//  Позже сделаем импорт хуков для управления состоянием меню  //
import { NavLink } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';

export const AppHeader = () => {
  //  Для управления меню нужен будет location и matchPath как в тренажере  //
  //  const location = useLocation();

  // Нужен массив или объект с урлами страниц, чтобы подсвечивать активное меню  // 
  // const pageUrls = {
  //   homePage: '/',
  //   registerPage: '/register',
  //   loginPage: '/login',
  //   profilePage: '/profile',
  //   forgotPassPage: '/forgot-password',
  //   resetPasswordPage: '/reset-password',
  //   ingredientsPage: '/ingredients',
  //   feedPage: '/feed',
  //   ordersPage: '/orders',
  //   profileOrdersPage: '/profile/orders',
  //   notFoundPage: '/*',
  // };

  // const activeMenu = 'AppHeaderStyle.activeMenu';

  return (
    <header className={`mb-10 pt-4 pb-4 ${AppHeaderStyle.header}`}>  
      <nav className={AppHeaderStyle.navbar}>
        <NavLink to='/' className={`mt-4 mr-7 mb-4 ${AppHeaderStyle.navitem}`}>
          <BurgerIcon type='primary' />
          <p className='ml-2 text text_type_main-default'>Конструктор</p>
        </NavLink>
        <NavLink to='/feed' className={`mt-4 mr-5 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ListIcon type='secondary' />
          <p className='ml-2 text text_type_main-default text_color_inactive'>Лента заказов</p>
        </NavLink>
        <NavLink to='/' className={AppHeaderStyle.logo}>  
          <Logo />
        </NavLink>
        <NavLink to='/profile' className={`mt-4 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ProfileIcon type='secondary' />
          <p className='ml-2 text text_type_main-default text_color_inactive'>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

//  Типизация не нужна, нет пропсов  //
