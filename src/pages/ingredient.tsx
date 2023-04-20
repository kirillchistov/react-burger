/* Страница для маршрута /ingredients/:id. 
К огда пользователь нажимает на конкретный ингредиент, происходит переход на динамический маршрут :id, 
но при этом появляется только модальное окно с информацией об ингредиенте. 
Если пользователь напрямую переходит по ссылке на маршрут конкретного ингредиента, то открывается отдельная страница. 
Если пользователь просто обновляет страницу с открытым модальным окном, то оно остаётся открытым.
Поведение для модального IngredientDetails: если пользователь нажимает на ингредиент, 
то открывается модальное окно IngredientDetails с маршрутом /ingredients/:id. 
При прямом попадании на этот маршрут, открывается детальная страница ингредиента - как в макете
Обратите внимание, что пользователь попадает на маршрут /ingredients/:id с маршрута конструктора бургера — /. 
*/
//  Импортирую шапку и детали ингридиента  //
import { FC } from 'react';
// import { AppHeader } from '../components/app-header/app-header';
import { IngredientDetails } from '../components/ingredient-details/ingredient-details';
//  Стили пока беру из логина  //
import IngredientStyle from './login.module.css';

export const IngredientPage:FC = () => {
  //  В разметке пока обертка + шапка + Див с заголовком, внутри I-Details  //
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <div className={IngredientStyle.container}>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <IngredientDetails />
      </div>
    </div>
  );
}

//  нет пропсов, нет типизации  //