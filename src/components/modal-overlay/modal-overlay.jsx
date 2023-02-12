//  Делаем порталом https://reactjs.org/docs/portals.html  //
import ReactDOM from 'react-dom';
import { modalsRoot } from "../../utils/data";
import PropTypes from 'prop-types';
import ModalOverlayStyle from "./modal-overlay.module.css";

export const ModalOverlay = ({onClose, children}) => {

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className={`${ModalOverlayStyle.mainContainer} ${ModalOverlayStyle.mainContainerOpened}`}
      >
        {children}
      </div>
    </>,
    modalsRoot
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
