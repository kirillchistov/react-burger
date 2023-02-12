//  Блок (левый) с выбором ингридиентов по типам  //
//  Из UI-библиотеки: счётчики, иконки, переключатели, типо, отступы  //
//  Для табов (типы ингридиентов) делаем состояние выбора таба  //
//  https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/tab  //
//  У компонента свой кастомизированный скроллбар (берем из webkit)  // 
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингридиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингридиентов по типам  //
//  Убрать все инлайн стили  //

import React, { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from 'prop-types';
import BurgerIngredientsStyle from "./burger-ingredients.module.css";

const BurgerIngredients = ({ingredients}) => {
  const buns = ingredients.filter((bun) => bun.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const main = ingredients.filter((main) => main.type === "main");

  return (
    <section className={BurgerIngredientsStyle.mainContainer}>
      <h1 
        className={`${BurgerIngredientsStyle.mainTitle} text text_type_main-large`}
      >Соберите бургер</h1>
      <SelectTab />
      <div className={BurgerIngredientsStyle.ingredientsContainer}>
        <h2
          className={`${BurgerIngredientsStyle.ingredientSection} text text_type_main-medium`}
          id="buns"
        >Булки</h2>
        <ul className={BurgerIngredientsStyle.cardsContainer}>
          {buns.map((ingredient) => {
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
          })}
        </ul>

        <h2
          className={`${BurgerIngredientsStyle.ingredientSectionName} text text_type_main-medium`}
          id="sauces"
        >Соусы</h2>
        <ul className={BurgerIngredientsStyle.cardsContainer}>
          {sauces.map((ingredient) => {
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
          })}
        </ul>

        <h2
          className={`${BurgerIngredientsStyle.ingredientSectionName} text text_type_main-medium`}
          id="main"
        >Начинки</h2>
        <ul className={BurgerIngredientsStyle.cardsContainer}>
          {main.map((ingredient) => {
            return <IngredientCard ingredients={ingredient} key={ingredient._id} />;
          })}
        </ul>
      </div>
    </section>
  );
}

//  Надо вынести в отдельный компонент  //
const SelectTab = () => {
  const [current, setCurrent] = useState("bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sause" active={current === "sause"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredients;