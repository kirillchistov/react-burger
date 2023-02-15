//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //
import React, {useMemo} from 'react';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } 

  from "@ya.praktikum/react-developer-burger-ui-components";
//  Вынесем в отдельные компоненты чуть позже  //
//  import ConstructorElements from '../constructor-elements/constructor-elements';  //
//  import ConstructorElementsFill from '../constructor-elements-fill/constructor-elements-fill';  //

import PropTypes from 'prop-types';

import BurgerConstructorStyle from './burger-constructor.module.css';


//  Сначала форматирование шапки конструктора  //
//  Потом верхняя булка (без скроллера и drag&drop)  //
//  Внизу нижняя булка (тоже без скроллера и drag&drop)  //
//  см. https://yandex-practicum.github.io/react-developer-burger-ui-components/docs/constructor-element  //

//  Вынести ConstructorElements и ConstructorElementsFill в отдельные компоненты  //

const BurgerConstructor = ({ ingredients, handleClickOrder }) => {

  return (
    <>
    { ingredients[0] && (
    <div className={`mr-4 ${BurgerConstructorStyle.topOrderElement}`} key={ingredients[0]._id}>
      <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ingredients[0].name} (верх)`}
      price={ingredients[0].price}
      thumbnail={ingredients[0].image_mobile}
      />
    </div> )}
      <div className={`pr-2 ${BurgerConstructorStyle.mainContainer}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ingredients
            .filter((ingredient) => ingredient.type !== "bun")
            .map((ingredient) => (
              <>
                <div  key={ingredient._id} className={BurgerConstructorStyle.middleOrderElement}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                  />
                </div>
              </>
          ))}
        </div>
      </div>
      { ingredients[0] && (<div  key={ingredients[0]._id} className={`mr-4 ${BurgerConstructorStyle.orderButton}`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${ingredients[0].name} (низ)`}
          price={ingredients[0].price}
          thumbnail={ingredients[0].image_mobile}
        />
      </div>)}
      <Order data={ingredients} handleOrder={handleClickOrder}/>
    </>
  )
}

//  Вынести в отдельный компонент на следующем рефакторе   //
const Order = ({data, handleOrder}) => {
  const endPrice  = useMemo(() => data.reduce(
    (total, data) => total + data.price, 0), [data]
  )


  return (
    <div className={" mt-10 " + BurgerConstructorStyle.priceContainer}>
    <p className="mr-10 text text_type_digits-medium">
      {endPrice}
      <CurrencyIcon type="primary" />
    </p>
    <Button type="primary" size="large" onClick={handleOrder}>
      Оформить заказ
    </Button>
  </div>
  )
}

//  Валдидируем пропсы  //
BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;