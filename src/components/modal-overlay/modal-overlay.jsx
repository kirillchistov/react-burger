//  Оверлей при открытии модального окна, затемняет фон  //
import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

//  При клике на оверлей закрываем открытое модальное окно  //
export const ModalOverlay = ({children, handleClose}) => {
  return(
    <div className={modalOverlayStyles.container} onClick={handleClose}>
        {children}
    </div>  
  )
}

//  Здесь есть пропсы, проверяю типизацию  //
ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default React.memo(ModalOverlay);