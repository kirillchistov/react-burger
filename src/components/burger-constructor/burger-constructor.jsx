/* eslint-disable array-callback-return */
//  Блок (правый) с конструктором заказа бургера из выбранных ингридиентов  //

import React, {useState, useContext} from 'react';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ConstructorTotal from '../constructor-total/constructor-total';
import ConstructorElements from '../constructor-elements/constructor-elements';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
//  Использую общий контекст  //
import { AppContext } from '../../services/app-context';

import burgerConstructorStyle from './burger-constructor.module.css';


const BurgerConstructor = (props) => {
  //  Создаем состояние для модальных окон  //
  const [isOpen, setIsOpen] = useState(false);
  //  Теперь берем данные не из props, а из контекста  //
  const ingredientsData = useContext(AppContext);
  //  Находим в ингридиентах первую встречную булку  //
  const bun = ingredientsData.find((element) => element.type === 'bun');

  let totalSum = 0;

  //  Функция ищет ингридиенты по id в заказе и возвращаем данные для начинки бурера в конструкторе  //
  const findElementByID = (elementID) => {
    const burgerElementData = ingredientsData.find((element) => element._id === elementID);
    return burgerElementData;        
  }

  // Отображаем часть компонентов, а не выбранные. Стоимость пока суммируем  //

  return (
    <div>
      <section className={`mt-25 ml-4 ${burgerConstructorStyle.elements}`}>
        <ConstructorElements elementData={bun} bunType={'top'} isLocked={true} bunTypeName={' (верх)'} />
        <div className={`pr-2 ${burgerConstructorStyle.elements_midstuff}`}> 
          {ingredientsData.map((element) => { 
            if (element.type !== 'bun') {
              totalSum += element.price;
              return (<ConstructorElements elementData={findElementByID(element._id)} bunType={''} isLocked={false} bunTypeName={''} key={element._id} />);
            }
          })}
        </div>
        <ConstructorElements elementData={bun} bunType={'bottom'} isLocked={true} bunTypeName={' (низ)'} />
        <div className={`mt-10 ${burgerConstructorStyle.constructor_total}`}>
          <ConstructorTotal total={totalSum + bun.price * 2} />
          <Button type='primary' size='large' htmlType='button' onClick={() => setIsOpen(true)}>Оформить заказ</Button>
        </div>
      </section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen} title={'Детали заказа'}>
        <OrderDetails />
      </Modal>
   </div>
  )
}

BurgerConstructor.propTypes = { 
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerConstructor;