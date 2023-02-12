//  Точка входа. Первый спринт  //
//  Шапка, список ингридиентов и конструктор заказа, футера нет  //
//  В пропсы списку и конструктору передаем массив-заглушку data.js  //
//  Из UI-библиотеки:  лого, иконки, типо, отступы  //
//  @ya.praktikum/react-developer-burger-ui-components  //
//  Медиа-запросы под мобильные разрешения сделаем позже  //

import AppHeader from '../app-header/app-header'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { ingredientsData } from '../../utils/data'
import AppStyle from './app.module.css';

const App = () => {
  return (
    <div className={ AppStyle.mainContainer }>
      <AppHeader />
      <BurgerIngredients ingredients={ ingredientsData } />
      <BurgerConstructor ingredients={ ingredientsData } />
    </div>
  );
}

export default App;
