//  Блок (левый) с выбором ингридиентов по типам  //
//  Из UI-библиотеки: счётчики, иконки, переключатели, типо, отступы  //
//  Для табов (типы ингридиентов) делаем состояние выбора таба  //
//  https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/tab  //
//  У компонента свой кастомизированный скроллбар (берем из webkit)  // 
//  Подумать над ограничением высоты блока на разных разрешениях   //
//  Фильтруем ингридиенты по типам и кладем в массивы  //
//  Затем в разметку вставляем карточки ингридиентов по типам  //
//  Убрать все инлайн стили,добавить отступы, убрать SelectTab в отд.компонент  //

import React, {useState} from "react";
import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import IngredientItem from "../ingredient-card/ingredient-item";  вынести в отдельный компонент //
//  import IngredientItemStyle from "../ingredient-item/ingredient-item.module.css";  //
//  import Tabs from "../tabs/tabs";  вынести в отдельный компонент  //
//  import TabsStyle from "../tabs/tabs.module.css";  //

import PropTypes from 'prop-types';
import BurgerIngredientsStyle from "./burger-ingredients.module.css";


const Tabs = () => {
  const [current, setCurrentTab] = useState('bun');

  return (
    <div className={`${BurgerIngredientsStyle.mainTabsContainer}`}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrentTab}>
      Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrentTab}>
      Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrentTab}>
      Начинки
      </Tab>
    </div>
  )
}

const BurgerIngredients = ({ ingredients, openIngredientDetails }) => {
  return (
    <>
      <h1 className={'text text_type_main-large mt-10 mb-5'}>Соберите бургер</h1>
      <Tabs />
      <div className={BurgerIngredientsStyle.ingredientsContainer}>
        <h2 className={'text text_type_main-medium mt-10 mb-6'}>Булки</h2>
        <ul className={`ml-4 ${BurgerIngredientsStyle.cardsContainer}`}>
          {ingredients.filter((i) => i.type === "bun")
            .map((i) => (
              <li key={i._id} onClick={() => openIngredientDetails(i)}>
                <article className={BurgerIngredientsStyle.ingredientCard}>
                  <img src={i.image} alt={`Изображение ${i.name}`}  ></img>
                  <p className={'text text_type_digits-default mt-1 mb-1 '}>
                    {i.price}  &nbsp;
                    <CurrencyIcon type="primary" />
                  </p>
                  <h3 className={`text text_type_main-small ${BurgerIngredientsStyle.ingredientName}`} >{i.name}</h3>
                </article>
              </li>
            ))}
        </ul>
        <h2 className={'text text_type_main-medium mt-10 mb-6'}>Соусы</h2>
        <ul className={`ml-4 ${BurgerIngredientsStyle.cardsContainer}`}>
          {ingredients
            .filter((i) => i.type === "sauce")
            .map((i) => (
              <li key={i._id}>
                <article className={BurgerIngredientsStyle.ingredientCard} onClick={() => openIngredientDetails(i)}>
                  <img src={i.image} alt={`Изображение ${i.name}`}  ></img>
                  <p className={'text text_type_digits-default mt-1 mb-1 '}>
                    {i.price} &nbsp;
                    <CurrencyIcon type="primary" />
                  </p>
                  <h3 className={`text text_type_main-small ${BurgerIngredientsStyle.ingredientName}`} >{i.name}</h3>
                </article>
              </li>
            ))}
        </ul>
        <h2 className={'text text_type_main-medium mt-10 mb-6'}>Начинки</h2>
        <ul className={`ml-4 ${BurgerIngredientsStyle.cardsContainer}`}>
          {ingredients
            .filter((i) => i.type === "main")
            .map((i) => (
              <li key={i._id}>
                <article className={BurgerIngredientsStyle.ingredientCard} onClick={() => openIngredientDetails(i)}>
                  <img src={i.image} alt={`Изображение ${i.name}`}  ></img>
                  <p className={'text text_type_digits-default mt-1 mb-1 '}>
                    {i.price} &nbsp;
                    <CurrencyIcon type="primary" />
                  </p>
                  <h3 className={`text text_type_main-small ${BurgerIngredientsStyle.ingredientName}`} >{i.name}</h3>
                </article>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

/*
const BurgerIngredients = ({ ingredients, openIngredientDetails }) => {
  
  return (
    <div>
      <section className={BurgerIngredientsStyle.mainContainer}>
        <h1 className={`text text_type_main-large mt-10 mb-5 ${BurgerIngredientsStyle.mainTitle}`}>
          Соберите бургер</h1>
        <Tabs />
        <div className={BurgerIngredientsStyle.ingredientsContainer}>
          <h2 className={`text text_type_main-medium ${BurgerIngredientsStyle.ingredientSection}`} id="buns">
            Булки
          </h2>
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
              return <IngredientCard 
                  ingredients={ingredient}
                  onClick={() => openIngredientDetails(ingredient)}
                  key={ingredient._id} 
              />;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
*/


/*
//  Упростим пока выбор табов  //
const Tabs = () => {
  const [current, setCurrent] = useState("bun");

  const buns = ingredients.filter((bun) => bun.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const main = ingredients.filter((main) => main.type === "main");

  return (
    <div style={`${BurgerIngredientsStyle.mainTabsContainer}`}>
      <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === "main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
*/


//  Валдидируем пропсы  //
BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredients;