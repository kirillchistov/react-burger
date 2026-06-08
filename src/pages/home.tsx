//  Главная страница - пока что полная копия /components/app  //
import React, { FC } from 'react';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useSelector } from '@/hooks/useSelector';
import { getBurgerData } from '@/utils/state';
import HomeStyle from './home.module.css';

export const HomePage:FC = () => {
  const burgerData = useSelector(getBurgerData);
  const bun = burgerData.find((ingredient) => ingredient.type === 'bun');
  const previewIngredient = bun || burgerData[0];
  const selectedCount = burgerData.reduce((count, ingredient) => (
    count + (ingredient.type === 'bun' ? 2 : 1)
  ), 0);

  const scrollToConstructor = () => {
    document
      .getElementById('burger-constructor')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`pt-10 pr-10 pb-10 pl-10 ${HomeStyle.page}`}>
      <main className={HomeStyle.mainContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <div className={HomeStyle.mobileDivider} aria-hidden='true'>
            <span className={HomeStyle.mobileDividerText}>Ваш бургер</span>
          </div>
          <BurgerConstructor />
        </DndProvider>
      </main>
      {selectedCount > 0 && (
        <button
          className={HomeStyle.burgerPreview}
          type='button'
          onClick={scrollToConstructor}
          aria-label='Перейти к собранному бургеру'
        >
          {previewIngredient && (
            <img
              className={HomeStyle.burgerPreviewImage}
              src={previewIngredient.image}
              alt=''
            />
          )}
          <span className='text text_type_main-default'>Бургер</span>
          <span className='text text_type_digits-default'>{selectedCount}</span>
        </button>
      )}
    </div>
  );
}
