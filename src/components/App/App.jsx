import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
//  import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";  //
import { INGREDIENTS } from '../../utils/data';
import appStyles from './App.module.css'  //

function App() {
  return (
    <div className={appStyles.container  + ' m-10'}>
      <AppHeader />
      <main>
        <BurgerIngredients data={INGREDIENTS} />
      </main>
    </div>
  );
}

export default App;