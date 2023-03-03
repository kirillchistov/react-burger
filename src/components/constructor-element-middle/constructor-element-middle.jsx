//  Этот элемент скорей всего не нужен, модифицирую constructor-elements  //
//  
import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

//  import ConstructorElements from '../constructor-elements/constructor-elements';
import ConstructorElementsMiddleStyle from './constructor-elements-middle.module.css';

const ConstructorElementsMiddle = ({ ingredients }) => {
  return (
    <div className={ConstructorElementsMiddleStyle.middleOrderElement}>
      <DragIcon />
      <ConstructorElement
        text={ingredients.name}
        price={ingredients.price}
        thumbnail={ingredients.image}
      />
    </div>
  );
}

//  Валдидируем пропсы  //
ConstructorElementsMiddle.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}; 

export default ConstructorElementsMiddle;