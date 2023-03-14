//  Общее модальное окно для просмотра ингредиента и кнопки заказа  //
//  Должно открывать кликнутую карточку ингредиента  //
//  При клике на кнопку открывает пока статичное окно заказа  //
//  Окно должно закрываться при клике на x или Esc  //

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { modalsRoot } from '../../utils/constants';
import PropTypes from 'prop-types';
import modalStyle from './modal.module.css';

//  Если уже открыто, ничего не делаю  //
//  При монтировании вешаю слушатель на Esc  //
//  При размонтировании убираю слушатель //
//  Удалил isOpen больше не нужен  //
export const Modal = ( {children, handleClose, title} ) => {
  useEffect(() => {
    const closeByEscape = (e) =>(e.key === 'Escape' ? handleClose() : null)
    document.body.addEventListener('keydown', closeByEscape);
    return () => {
      document.body.removeEventListener('keydown', closeByEscape);  
    };
  }, [handleClose]);
  
//  Вначале рисую оверлей, поверх него размещаю окно  //
//  Чтобы вставить модалку мимо основного корня, сделал в index #modals  //
  return ReactDOM.createPortal (
    (
      <ModalOverlay handleClose={handleClose}>
        <div className={`pt-10 pr-10 pb-15 pl-10 ${modalStyle.container}`} onClick={(e) => e.stopPropagation()}>
          <div className={`pt-3 pb-3 ${modalStyle.header}`}>  
            <p className='text text_type_main-large'>{title}</p> 
            <button className={modalStyle.button_close} onClick={handleClose}>
              <CloseIcon type='primary'/> 
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ),
    modalsRoot
  )    
}

//  Проверяем пропсы без isOpen  //
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default React.memo(Modal);