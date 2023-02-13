//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //
import React from 'react';
import { CurrencyIcon, Button } 
  from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

import ConstructorElements from '../constructor-elements/constructor-elements';
import ConstructorElementsFill from '../constructor-elements-fill/constructor-elements-fill';

import BurgerConstructorStyle from './burger-constructor.module.css';


//  Сначала форматирование шапки конструктора  //
//  Потом верхняя булка (без скроллера и drag&drop)  //
//  Внизу нижняя булка (тоже без скроллера и drag&drop)  //
//  см. https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/constructor-element  //

//  Вынес ConstructorElements в отдельный компонент  //

//  Вынес ConstructorElementsFill в отдельный компонент  //

const BurgerConstructor = ({ ingredients }) => {
  const filling = ingredients.filter((ingredient) => ingredient.type !== "bun");
  return (
    <section className={BurgerConstructorStyle.mainContainer}>
      <ConstructorElements ingredients={ingredients[0]}>
        <div className={BurgerConstructorStyle.fill}>
          {filling.map((fill) => {
            return (
              <ConstructorElementsFill
                ingredients={fill}
                key={fill._id}
              />
            );
          })}
        </div>
      </ConstructorElements>
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

//  Валдидируем пропсы  //
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;