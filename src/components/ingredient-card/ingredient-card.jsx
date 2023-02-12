//  Карточка ингридиента, используемая в BurgerIngredients  //
//  Из UI-библиотеки: счётчики, иконку валюты, типо, отступы  //

import IngredientCardStyle from "./ingredient-card.module.css";
import { Counter, CurrencyIcon } 
  from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientCards = ({ingredients}) => {
  return (
    <li className={IngredientCardStyle.card}>
      <img
        className={IngredientCardStyle.image}
        src={ingredients.image}
        alt={ingredients.name}
      />
      <div className={IngredientCardStyle.costContainer}>
        <p className={`${IngredientCardStyle.cost} text text_type_digits-default`}>
          {ingredients.price}
        </p>
        <CurrencyIcon
          className={IngredientCardStyle.currency}
          type="primary"
        />
      </div>
      <h2 className={`${IngredientCardStyle.name} text text_type_main-small`}>
        {ingredients.name}
      </h2>
      <Counter
        className={IngredientCardStyle.counter}
        count={1}
        size="default"
      />
    </li>
  );
}

export default IngredientCards;
