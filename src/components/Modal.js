import React from "react";

import "./Modal.css";

function Modal(props) {
  if (!props.modal) return null;
  else
    return (
      <div className="modal">
        <div className="modal-content">
          <h3>{props.content}</h3>
          <button className="ok-btn" onClick={props.onClose}>
            {props.btnContent}
          </button>
        </div>
      </div>
    );
}

export default Modal;
