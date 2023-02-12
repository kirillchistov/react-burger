//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //
import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } 
  from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from './burger-constructor.module.css';


//  Сначала форматирование шапки конструктора  //
//  Потом верхняя булка (без скроллера и drag&drop)  //
//  Внизу нижняя булка (тоже без скроллера и drag&drop)  //
//  см. https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/constructor-element  //

//  Надо вынести в отдельный компонент на рефакторе  //
const SetConstructorElements = (props) => {
  return (
    <div className={BurgerConstructorStyle.topOrderElement}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${props.ingredients.name} (верх)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
      {props.children}
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${props.ingredients.name} (низ)`}
        price={props.ingredients.price}
        thumbnail={props.ingredients.image}
      />
    </div>
  );
}

SetConstructorElements.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

//  Надо вынести в отдельный компонент на рефакторе  //
const SetConstructorElementsStuff = ({ ingredients }) => {
  return (
    <div className={BurgerConstructorStyle.middleOrderElement}>
      <DragIcon />
      <ConstructorElement
        text={ingredients.name}
        price={ingredients.price}
        thumbnail={ingredients.image}
      />
    </div>
  );
}

SetConstructorElementsStuff.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}; 

const BurgerConstructor = ({ ingredients }) => {
  const stuffing = ingredients.filter((ingredient) => ingredient.type !== "bun");
  return (
    <section className={BurgerConstructorStyle.mainContainer}>
      <SetConstructorElements ingredients={ingredients[0]}>
        <div className={BurgerConstructorStyle.stuff}>
          {stuffing.map((stuff) => {
            return (
              <SetConstructorElementsStuff
                ingredients={stuff}
                key={stuff._id}
              />
            );
          })}
        </div>
      </SetConstructorElements>
      <div className={BurgerConstructorStyle.orderContainer}>
        <div className={BurgerConstructorStyle.priceContainer}>
          <p className="text text_type_digits-medium">620</p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;