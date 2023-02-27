//  Компонент элемента/компонента бургера для конструктора заказа  //
//  Состоит из булки (верх+низ) и ингридиентов (начинка, соус)  //
import React, { useContext } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
//  import {ingredientType} from '../../utils/types';  //
import { PriceContext } from '../../services/app-context';

import ConstructorElementsStyle from './constructor-elements.module.css';


const ConstructorElements = ({ elementData, bunType, isLocked, bunTypeName}) => {

  //  Создаю функцию-диспетчер для редюсера  //
  const priceDispatcher = useContext(PriceContext);
  
  //  Все элементы, кроме булки, можно перетаскивать  //
  //  Refactor: переименовать функцию, она возвращает компонент, а не буль  //
  const isDraggable = () => {
    if (bunType === '') {
      return <DragIcon type='primary' />              
    }
  }

  //  Будем вычитать стоимость элемента при его удалении из заказа  //
  const deductPrice = () => {
    priceDispatcher({type: 'delete', payload: elementData.price});
  };
  
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
          onDelete={deductPrice}
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
  onDelete: PropTypes.func.isRequired
};

export default ConstructorElements;