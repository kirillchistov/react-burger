//  Карточка ингридиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //

import IngredientItemStyle from "./ingredient-item.module.css";
import { Counter, CurrencyIcon } 
  from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCards = ({ingredients}) => {
  return (
    <li className={IngredientItemStyle.card}>
      <img
        className={IngredientItemStyle.image}
        src={ingredients.image}
        alt={ingredients.name}
      />
      <div className={IngredientItemStyle.costContainer}>
        <p className={`${IngredientItemStyle.cost} text text_type_digits-default`}>
          {ingredients.price}
        </p>
        <CurrencyIcon
          className={IngredientItemStyle.currency}
          type="primary"
        />
      </div>
      <h2 className={`${IngredientItemStyle.name} text text_type_main-small`}>
        {ingredients.name}
      </h2>
      <Counter
        className={IngredientItemStyle.counter}
        count={1}
        size="default"
      />
    </li>
  );
}

export default IngredientCards;
