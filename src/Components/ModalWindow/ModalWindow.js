import React from "react";
import "./ModalWindow.css";

const ModalWindow = ({ show, onClose, title, children, isNext }) => {
  if (!show) return null;
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          {/* <button className="button" onClick={onClose}>
            Close
          </button> */}
          {isNext && (
            <button className="nxt-button" onClick={onClose}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
