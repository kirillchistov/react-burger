//  Шапка. Первый спринт  //
//  Из UI-библиотеки: лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Адаптив и бургер-меню под мобилку сделаем позже  //

import { Logo, BurgerIcon, ListIcon, ProfileIcon } 
  from "@ya.praktikum/react-developer-burger-ui-components";

import AppHeaderStyle from "./app-header.module.css";

const AppHeader = () => {
  return (
    <>
      <header className={`pt-4 pb-4 ${AppHeaderStyle.mainContainer}`}>
        <nav className={AppHeaderStyle.navbar}>
          <ul className={AppHeaderStyle.navContainer}>
            <li className={`text text_type_main-default ${AppHeaderStyle.navItem}`}>
              <BurgerIcon type="primary" />
              <a className={`text text_type_main-small ml-2 ${AppHeaderStyle.link}`} href="./index.html">
                Конструктор
              </a>
            </li>

            <li className={`${AppHeaderStyle.navItem}`}>
              <ListIcon type="secondary" />
              <a className={`text text_type_main-small ml-2 text_color_inactive ${AppHeaderStyle.link}`} href="./feed">
                Лента заказов
              </a>
            </li>
          </ul>

          <li className={`${AppHeaderStyle.navItem} ${AppHeaderStyle.navItem_logo}`}>
            <a className={`text text_type_main-small ml-2 text_color_inactive ${AppHeaderStyle.link}`} href="./index.html">
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
    </>
  );
}

export default AppHeader;