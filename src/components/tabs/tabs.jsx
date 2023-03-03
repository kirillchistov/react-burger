//  Этот компонент пока не используем - все делаем внутри B-Ingredients //
import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import TabsStyle from './tabs.module.css';

//  Надо дописать хуки и состояние перед выносом в отдельный компонент  //
const Tabs = () => {
  const [current, setCurrent] = useState('bun');
/*
  const buns = ingredients.filter((bun) => bun.type === 'bun');
  const sauces = ingredients.filter((sauce) => sauce.type === 'sauce');
  const main = ingredients.filter((main) => main.type === 'main');
*/

  return (
    <div className={TabsStyle.mainContainer}>
      <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='main' active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

//  пропсов пока нет, не надо валидировать  //

export default Tabs;