//  Компонент модального окна: шапка с заголовком и иконка закрытия  //
//  Открывается по клику на соответствующий элемент страницы  //
//  Клик по ингредиенту - модальное окно с его описанием  //
//  Клик по кнопке «Оформить заказ» - окно с описанием заказа //
//  Закрытие:  клик по иконке "X", ModalOverlay или “Esc”  //
//  Из UI-библиотеки используйте типографику и иконки  //

import React from 'React';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ModalStyle from "./modal.module.css";

export const Modal = ({ children, onClose }) => {

  return (
      <div className={ModalStyle.mainContainer}>
        <button className={ModalStyle.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
  );
}

//  Валдидируем пропсы  //
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
