import React from 'react';
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

//  import ConstructorElements from '../constructor-elements/constructor-elements';
import ConstructorElementsStyle from './constructor-elements.module.css';


const ConstructorElements = (props) => {
  return (
    <div className={ConstructorElementsStyle.topOrderElement}>
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

//  Валдидируем пропсы  //
ConstructorElements.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

export default ConstructorElements;