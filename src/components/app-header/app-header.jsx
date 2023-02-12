//  Шапка. Первый спринт  //
//  Из UI-библиотеки: лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Адаптив и бургер-меню под мобилку сделаем позже  //

import { Logo, BurgerIcon, ListIcon, ProfileIcon, } 
  from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderStyle from "./app-header.module.css";

export default function AppHeader() {
  return (
    <header className={AppHeaderStyle.mainContainer}>
      <nav className={AppHeaderStyle.navbar}>
        <ul className={AppHeaderStyle.navContainer}>
          <li className={`${AppHeaderStyle.navItem} text text_type_main-default`}>
            <BurgerIcon type="primary" />
            <a className={AppHeaderStyle.link} href="./index.html">
              Конструктор
            </a>
          </li>

          <li className={`${AppHeaderStyle.navItem} text text_type_main-default text_color_inactive`}>
            <ListIcon type="secondary" />
            <a className={AppHeaderStyle.link} href="./feed">
              Лента заказов
            </a>
          </li>
        </ul>

        <li className={`${AppHeaderStyle.navItem} ${AppHeaderStyle.navItem_type_logo}`}>
          <a className={AppHeaderStyle.link} href="./index.html">
            <Logo />
          </a>
        </li>

        <li className={`${AppHeaderStyle.navItem} text text_type_main-default text_color_inactive`}>
          <ProfileIcon type="secondary" />
          <a className={AppHeaderStyle.link} href="./profile">
            Личный кабинет
          </a>
        </li>
      </nav>
    </header>
  );
}
