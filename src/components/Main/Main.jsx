import React from 'react';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import mainStyles from './Main.module.css'

export const Main = () => {

  return (
    <main className={mainStyles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};
