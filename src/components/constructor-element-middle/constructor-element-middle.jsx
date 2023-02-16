

import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

//  import ConstructorElements from '../constructor-elements/constructor-elements';
import ConstructorElementsFillStyle from './constructor-elements-fill.module.css';

const ConstructorElementsFill = ({ ingredients }) => {
  return (
    <div className={ConstructorElementsFillStyle.middleOrderElement}>
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
ConstructorElementsFill.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
}; 

export default ConstructorElementsFill;