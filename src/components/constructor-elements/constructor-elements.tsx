//  Компонент элемента/компонента бургера для конструктора заказа  //
//  Может быть булка bun (верх / низ) или начинка main или соус sauce //
import React, { FC } from 'react';
//  Добавил хуки для работы с Redux  //
import { useDispatch } from '../../hooks/useDispatch';
//  Добавил хуки для работы с ReactDND  //
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//  import PropTypes from 'prop-types';
import { TIngredient } from '../../utils/types';
//  {ingredientType} from '../../utils/types' пока не нужен  //
import { MOVE_INGREDIENT } from '../../services/actions/order-actions';
import ConstructorElementsStyle from './constructor-elements.module.css';

interface IConstructorElementProps {
  elementData: TIngredient;
  index: number;
  bunType?: 'top'|'bottom';
  isLocked: boolean;
  bunTypeName: string;
}

export const ConstructorElements: FC<IConstructorElementProps> = ({ elementData, bunType, isLocked, bunTypeName, index }) => {

  //  Убрал контекст функцию-диспетчер заменил на dispatch  //
  //  Активирую dispatch и ref  //
  const dispatch = useDispatch();
  const ref = React.useRef<HTMLDivElement>(null);
  
  //  Все элементы, кроме булки, можно перетаскивать  //
  //  Refactor: переименовать функцию, она возвращает компонент, а не буль  //
  //  Убрал функцию isDraggable за ненадобностью  //
  
  //  Буду вычитать стоимость элемента при его удалении из заказа  //
  //  Заменил deductPrice на обработчик удаления ингредиента на dispatch - перенес  //

  const onDeductIngredient = (elementDataUid: string) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: elementDataUid });
  };

  //  Взял из тренажера  //
  const [, dropRef] = useDrop({
    accept: 'ingredientInConstructor',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      //  проверяем тип элемента, нужны объекты c полным набором свойств  //
      //  если элемент не такой, делаю быстрый return  //
      let typedItem;
      if (typeof item === 'object') {
        typedItem = item as { index: number, elementData: (TIngredient & { _uid: string }) };
      } else { 
        return;
      }

      if (typedItem.elementData._uid === elementData._uid) {
        return;
      }

      const dragIndex = typedItem.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? ref.current.getBoundingClientRect()
        : undefined;
      
      const hoverMiddleY = hoverBoundingRect ?
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y && hoverBoundingRect 
        ? clientOffset?.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          whichIngredientDroppedUid: typedItem.elementData._uid,
          onWhichIngredientDroppedUid: elementData._uid,
        },
      });
    },
  });

  const [, dragRef] = useDrag({
    type: 'ingredientInConstructor',
    item: () => ({ elementData, index }),
  });

  dragRef(dropRef(ref));
  
  //  Возвращаю конструкцию в зависимости от типа ингредиента  //
  //  Если iDraggable, то слева от элемента рисую иконку
  return (
    <div className={ConstructorElementsStyle.element} ref={ref}>
      <DragIcon type='primary' />
      <div className={ConstructorElementsStyle.elementShrink}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={elementData.name + bunTypeName} 
          price={elementData.price}
          thumbnail={elementData.image}
          handleClose={ () => onDeductIngredient(elementData._uid)}
        />
      </div>      
    </div>
  );
}; 

//  пропсы заменил на TS-типизацию  //

export default React.memo(ConstructorElements);