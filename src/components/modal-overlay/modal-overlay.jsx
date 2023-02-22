//  Оверлей при открытии модального окна, затемняет фон  //

import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

//  При клике на оверлей закрываем открытое модальное окно  //
const ModalOverlay = ({children, handleClose}) => {
  return(
    <div className={modalOverlayStyles.container} onClick={handleClose}>
        {children}
    </div>  
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ModalOverlay;