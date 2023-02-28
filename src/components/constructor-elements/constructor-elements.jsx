//  Компонент элемента/компонента бургера для конструктора заказа  //
//  Может быть булка bun (верх / низ) или начинка main или соус sauce //
import React, { useContext } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
//  {ingredientType} from '../../utils/types' пока не нужен//
import { PriceContext } from '../../services/app-context';

import ConstructorElementsStyle from './constructor-elements.module.css';

const ConstructorElements = ({ elementData, bunType, isLocked, bunTypeName}) => {

  //  Создаю функцию-диспетчер для редюсера  //
  const priceDispatcher = useContext(PriceContext);
  
  //  Все элементы, кроме булки, можно перетаскивать  //
  //  Refactor: переименовать функцию, она возвращает компонент, а не буль  //
  //  Если булка, то рисую иконку перетаскивания слева от элемента  //
  const isDraggable = () => {
    if (bunType === '') {
      return <DragIcon type='primary' />              
    }
  }

  //  Буду вычитать стоимость элемента при его удалении из заказа  //
  const deductPrice = () => {
    priceDispatcher({type: 'delete', payload: elementData.price});
  };
  
  //  Возвращаю конструкцию в зависимости от типа ингридиента  //
  //  Если iDraggable, то слева от элемента рисую иконку
  return (
    <div className={ConstructorElementsStyle.element}>
      {isDraggable()}
      <div className={ConstructorElementsStyle.elementShrink}>
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

//  Здесь есть пропсы, проверяю типизацию  //
ConstructorElements.propTypes = {
  elementData: PropTypes.object.isRequired,
  bunType: PropTypes.string.isRequired,
  bunTypeName: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  onDelete: PropTypes.func
};

export default ConstructorElements;