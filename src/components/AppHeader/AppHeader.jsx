import React from 'react';
//  Из UI-библиотеки возьмите следующие:  //
//  логотип, иконки, типографику, систему отступов  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Медиа-запросы под мобильные разрешения сделаем позже  //
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHeader.module.css'

const AppHeader = () => {

  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.container}>
        <nav>
          <ul className={headerStyles.menu}>
            <li className={headerStyles.item}>
              <a href='#constructor' className={headerStyles.link + ' pt-4 pr-5 pb-4 pl-5 text text_type_main-default text_color_inactive'}>
                <BurgerIcon type="secondary"/>
                Конструктор
              </a>
            </li>
            <li className={headerStyles.item}>
              <a href='#feed' className={headerStyles.link + ' pt-4 pr-5 pb-4 pl-5 text text_type_main-default text_color_inactive'}>
                <ListIcon type="secondary"/>
                Лента заказов
              </a>
            </li>
          </ul>
        </nav>
        <Logo />
        <a href='#account' className={headerStyles.link + ' pt-4 pr-5 pb-4 pl-5 text text_type_main-default text_color_inactive'}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
