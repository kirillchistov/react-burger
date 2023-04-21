//  Оверлей при открытии модального окна, затемняет фон  //
import React, { FC, ReactNode } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

//  Интерфейс для типизации свойств модального окна  //
//  Refactor: Рекомендовано переделать на PropsWithChildren, но пока не понял как  //
interface IModalOverlayProps {
  children: ReactNode,
  handleClose: () => void
}

//  При клике на оверлей закрываем открытое модальное окно  //
export const ModalOverlay: FC<IModalOverlayProps> = ({children, handleClose}) => {
  return(
    <div className={modalOverlayStyles.container} onClick={handleClose}>
        {children}
    </div>  
  )
}

//  Заменил propTypes на TS-типизацию  //

export default React.memo(ModalOverlay);