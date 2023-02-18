//  Шапка. Первый спринт  //
//  Из UI-библиотеки: лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Адаптив и бургер-меню под мобилку сделаем позже  //
//  Надо переделать на Link для роутинга  //

import React from 'react';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={`mb-10 pt-4 pb-4 ${AppHeaderStyle.header}`}>  
      <nav className={AppHeaderStyle.navbar}>
        <a href='/' className={`mt-4 mr-7 mb-4 ${AppHeaderStyle.navitem}`}>  
          <BurgerIcon type='primary' />
          <p className='ml-2 text text_type_main-default'>Конструктор</p>
        </a>
        <a href='/feed' className={`mt-4 mr-5 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>  
          <ListIcon type='secondary' />
          <p className='ml-2 text text_type_main-default text_color_inactive'>Лента заказов</p>
        </a>
        <a href='/' className={AppHeaderStyle.logo}>  
          <Logo />
        </a>
        <a href='/profile' className={`mt-4 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>  
          <ProfileIcon type='secondary' />
          <p className='ml-2 text text_type_main-default text_color_inactive'>Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
}
  export default AppHeader;