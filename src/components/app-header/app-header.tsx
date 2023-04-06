//  Компонент шапка  //
//  Из UI-библиотеки: лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Адаптив и бургер-меню под мобилку сделаем позже  //
//  Переделал на NavLink для роутинга, нужны еще тоглы активного меню  //

import React, { FC } from 'react';
//  Позже сделаем импорт хуков для управления состоянием меню  //
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon,  ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { LOGINURL, REGURL, PROFILEURL, HOMEURL, FEEDURL, PROFILEORDERSURL,  } from '../../utils/constants';
import AppHeaderStyle from './app-header.module.css';

export const AppHeader: FC = () => {
  const location = useLocation();
  
  //  вынести URLы в контстанты  //
  const activeHome = matchPath(location.pathname, HOMEURL);
  const activeFeed = matchPath(location.pathname, FEEDURL);
  const activeProfileHome = matchPath(location.pathname, PROFILEURL);
  const activeOrders = matchPath(location.pathname, PROFILEORDERSURL);
  const activeLogin = matchPath(location.pathname, LOGINURL);
  const activeRegister = matchPath(location.pathname, REGURL);
  const activeProfile = activeProfileHome || activeOrders || activeLogin || activeRegister;


  return (
    <header className={`mb-10 pt-4 pb-4 ${AppHeaderStyle.header}`}>  
      <nav className={AppHeaderStyle.navbar}>
        <NavLink to={HOMEURL} className={`mt-4 mr-7 mb-4 ${AppHeaderStyle.navitem}`}>
          <BurgerIcon type={activeHome ? 'primary' : 'secondary'} />
          <p className={activeHome ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Конструктор</p>
        </NavLink>
        <NavLink to={FEEDURL} className={`mt-4 mr-5 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ListIcon type={activeFeed ? 'primary' : 'secondary'} />
          <p className={activeFeed ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Лента заказов</p>
        </NavLink>
        <NavLink to={HOMEURL} className={AppHeaderStyle.logo}>  
          <Logo />
        </NavLink>
        <NavLink to={PROFILEURL} className={`mt-4 mb-4 ml-5 ${AppHeaderStyle.navitem}`}>
          <ProfileIcon type={activeProfile ? 'primary' : 'secondary'} />
          <p className={activeProfile ? 'ml-2 text text_type_main-default' : 'ml-2 text text_type_main-default text_color_inactive'}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

//  Типизация не нужна, нет пропсов  //

export default React.memo(AppHeader);