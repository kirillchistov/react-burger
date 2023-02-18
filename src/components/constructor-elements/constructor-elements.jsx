import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
//  import {ingredientType} from '../../utils/types';  //

import ConstructorElementsStyle from './constructor-elements.module.css';


const ConstructorElements = ({ elementData, bunType, isLocked, bunTypeName}) => {
  const isDraggable = () => {
    if (bunType === '') {
      return <DragIcon type='primary' />              
    }
  }
  
  return (
    <div className={ConstructorElementsStyle.element}>
      {isDraggable()}
      <div className={ConstructorElementsStyle.elementWidth}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={elementData.name + bunTypeName} 
          price={elementData.price}
          thumbnail={elementData.image}
        />
      </div>      
    </div>
  );
}; 

ConstructorElements.propTypes = {
  elementData: PropTypes.object.isRequired,
  bunType: PropTypes.string.isRequired,
  bunTypeName: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
};

export default ConstructorElements;