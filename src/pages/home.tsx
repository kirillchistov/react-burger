//  Главная страница - пока что полная копия /components/app  //
import React, { FC } from 'react';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import HomeStyle from './home.module.css';

export const HomePage:FC = () => {
  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <main className={HomeStyle.mainContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}
