//  Компонент модального окна: шапка с заголовком и иконка закрытия  //
//  Открывается по клику на соответствующий элемент страницы  //
//  Клик по ингредиенту - модальное окно с его описанием  //
//  Клик по кнопке «Оформить заказ» - окно с описанием заказа //
//  Закрытие:  клик по иконке "X", ModalOverlay или “Esc”  //
//  Из UI-библиотеки используйте типографику и иконки  //

import React from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { modalsRoot } from '../../utils/constants';
import ModalStyle from "./modal.module.css";

const Modal = ({ onClose, children, modalTitle}) => {



  React.useEffect((onClose) => {

    const handleCloseByEsc = (e) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleCloseByEsc);

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
    <div className={ModalStyle.box}>
      <h2 className="mt-10 ml-10 text text_type_main-large">{modalTitle}</h2>
      <button type="button" className={ModalStyle.button}>
        <CloseIcon type="primary" onClick={onClose} />
      </button>
      {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsRoot
  );
};

//  Валдидируем пропсы  //
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;