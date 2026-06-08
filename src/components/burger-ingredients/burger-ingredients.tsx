/* eslint-disable array-callback-return */
//  Блок (левый) с выбором ингредиентов по типам  //
//  Для табов (типы ингредиентов) делаем состояние выбора таба  //
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингредиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингредиентов по типам  //
//  Убрать все инлайн стили, добавить отступы, убрать SelectTab в отд.компонент  //

import React, { useState, useMemo, useRef } from 'react';
//  Добавил хуки для навигации по каталогу ингридиентов и пр.  //
//  import { useInView } from 'react-intersection-observer';
//  Добавил хуки для работы с Redux  //
//  import { useDispatch  } from '@/hooks/useDispatch';
import { useSelector  } from '@/hooks/useSelector';
//  Modal, IngredientDetails и IngredientPrice теперь в IngredientItem  //
//  IngredientItem теперь вложен в IngredientCategory для навигации  //

import { IngredientCategory } from '../ingredient-category/ingredient-category';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
//  import { getIngredients } from '@/services/actions/ingredient-actions';
import { getItems } from '@/utils/state';
import { TIngredient } from '@/services/types';
import BurgerIngredientsStyle from './burger-ingredients.module.css';

type TIngredientTab = 'bun' | 'sauce' | 'main';

     
export const BurgerIngredients = () => {

  //  Теперь получаю состояние из redux, а не из контекста  //
  //  Включаю хуки для получения и отправки данные в redux  //
  //  Отправляю экшен, после успешного запроса, записываю данные в Redux  //
  //  С помощью useSelector получаю доступ к данным об ингридиентах. PROFIT!  //

  const ingredients: TIngredient[] = useSelector(getItems);
  
  //  По умолчанию мой ингредиент = булка, без булки нельзя  //
  const [current, setCurrent] = useState<TIngredientTab>('bun');
  const typeContainerRef = useRef<HTMLDivElement>(null);
  
  //  При монтировании получаем список ингредиентов -> в App //

  //  Фильтрую массив по типу нужного ингредиента  //
  const buns = useMemo(
    () => ingredients?.filter((item: TIngredient) => item.type === 'bun'),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients?.filter((item: TIngredient) => item.type === 'sauce'),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients?.filter((item: TIngredient) => item.type === 'main'),
    [ingredients]
  );

  const handleTabClick = (value: string) => {
    const nextTab = value as TIngredientTab;
    const container = typeContainerRef.current;
    const category = document.getElementById(nextTab);

    setCurrent(nextTab);

    if (!container || !category) {
      return;
    }

    container.scrollTo({
      top: category.offsetTop - container.offsetTop,
      behavior: 'smooth',
    });
  };

  const scrollToCategory = () => {
    const container = typeContainerRef.current;

    if (!container) {
      return;
    }

    const categories = (['bun', 'sauce', 'main'] as TIngredientTab[])
      .map((id) => ({
        id,
        element: document.getElementById(id),
      }))
      .filter((category): category is { id: TIngredientTab; element: HTMLElement } =>
        Boolean(category.element)
      );

    const closestCategory = categories.reduce((closest, category) => {
      const closestDistance = Math.abs(closest.element.offsetTop - container.offsetTop - container.scrollTop);
      const categoryDistance = Math.abs(category.element.offsetTop - container.offsetTop - container.scrollTop);

      return categoryDistance < closestDistance ? category : closest;
    }, categories[0]);

    if (closestCategory) {
      setCurrent(closestCategory.id);
    }
  };

  //  Переключатели по типам ингредиентов использую как панель навигации  //
  //  Когда пользователь скроллит ингредиенты, выделяю активным нужный переключатель  //
  //  Считаю, какой заголовок в контейнере ближе к его верхней левой границе //
  //  Заголовок не обязательно в поле зрения, но находится ближе всего к html-элементу с ингредиентами  //
  //  Только в этом случае переключатель становится активным  //
  //  Нажатие на переключатель пока не делал  //
  return (
    <section className={`mr-10 ${BurgerIngredientsStyle.ingredients}`}> 
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={BurgerIngredientsStyle.navbar}>
        <Tab active={current === 'bun'} value='bun' onClick={handleTabClick}>Булки</Tab>
        <Tab active={current === 'sauce'} value='sauce' onClick={handleTabClick}>Соусы</Tab>
        <Tab active={current === 'main'} value='main' onClick={handleTabClick}>Начинки</Tab>
      </nav>
      <div
        className={BurgerIngredientsStyle.ingredient_types}
        id='typeContainer'
        onScroll={scrollToCategory}
        ref={typeContainerRef}
      >
        <IngredientCategory type={'Булки'} typeList={buns} id='bun' />
        <IngredientCategory type={'Соусы'} typeList={sauces} id='sauce' />
        <IngredientCategory type={'Начинки'} typeList={mains} id='main' />
      </div>
    </section>
  );
}

export default React.memo(BurgerIngredients);