//  Оверлей при открытии модального окна, затемняет фон  //

import modalOverlayStyles from './modal-overlay.module.css';

//  При клике на оверлей закрываем открытое модальное окно  //
const ModalOverlay = ({children, handleClose}) => {
  return(
    <div className={modalOverlayStyles.container} onClick={handleClose}>
        {children}
    </div>  
  )    
}

export default ModalOverlay;