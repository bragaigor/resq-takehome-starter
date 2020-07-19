import React from 'react';
import './Modal.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {children}
          <div className="closeButtonHover"><input className="closeButton" type="button" onClick={handleClose} value="Close"/></div>
        </section>
      </div>
    );
  };

export default Modal;