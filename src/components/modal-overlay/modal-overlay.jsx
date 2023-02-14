//  Делаем порталом https://reactjs.org/docs/portals.html  //
import React from 'react';
import ReactDOM from 'react-dom';
import { modalsRoot } from "../../utils/constants";
import PropTypes from 'prop-types';
import ModalOverlayStyle from "./modal-overlay.module.css";

const ModalOverlay = ({onClose, children}) => {

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

export default ModalOverlay;