//  Из UI-библиотеки UI: счётчики, иконки, переключатели, типографику, отступы  //
//  У компонента свой кастомизированный скроллбар!  // 
//  Подумайте над ограничением высоты блока на разных разрешениях экранов  //

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../IngredientCard/IngredientCard';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
//  Будем импортировать массив из data.js  //
//  import { INGREDIENTS } from '../../utils/data';  //

const BurgerIngredients = ({ data }) => {
  
  //  фильтруем выдачу по табам из массива;  //
  const buns = data.filter((item) => {
    console.log('фильтруем булки из массива');
    return item.type === 'bun';

  });
  const main = data.filter((item) => {
    return item.type === 'main';
  });

  const sauces = data.filter((item) => {
    return item.type === 'sauce';
  });

  return (
    <section className={burgerIngredientsStyles.section}>
      <h1 className={burgerIngredientsStyles.title + ' pt-10 pb-5 pl-15 text text_type_main-large'}>
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }} className='pb-10'>
        <Tab value='bun' active={true} onClick={() => {console.log('таб булки')}}>
          Булки
        </Tab>
        <Tab value='sauce' onClick={() => {console.log('таб соусы')}}>
          Соусы
        </Tab>
        <Tab value='main' onClick={() => {console.log('таб начинки')}}>
          Начинки
        </Tab>
      </div>
      <article id='bun' className={burgerIngredientsStyles.container}>
        <h2 className={burgerIngredientsStyles.title + ' text text_type_main-medium mb-6 mt-10'}>
          Булки
        </h2>
        {buns.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
          })}
      </article>
      <article id='main' className={burgerIngredientsStyles.container}>
        <h2 className={burgerIngredientsStyles.title}>
          Начинки
        </h2>
        {main.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
        })}
      </article>
      <article id='sauce' className={burgerIngredientsStyles.container}>
        <h2 className={burgerIngredientsStyles.title}>
          Соусы
        </h2>
        {sauces.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
        })}
      </article>
    </section>
  );
}

export default BurgerIngredients;