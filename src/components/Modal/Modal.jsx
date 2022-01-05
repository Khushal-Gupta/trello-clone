import { useRef } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";
import OutlineX from "../../assets/outline-close.svg";

const container = document.createElement("div");
container.id = "modal-hook";
document.body.appendChild(container);

export default function Modal({ show, children, onClose, showCloseButton }) {
  const backdropRef = useRef();
  if (!show) return null;

  const backdropClickHandler = (event) => {
    if (backdropRef.current && event.target === backdropRef.current) {
      onClose();
    }
  };

  const content = (
    <div
      className={classes.backdrop}
      onClick={backdropClickHandler}
      ref={backdropRef}
    >
      <div className={classes.modal}>
        {showCloseButton && (
          <button className={classes.closeButton} onClick={onClose}>
            <img src={OutlineX} alt="close" />
          </button>
        )}
        {children}
      </div>
    </div>
  );

  return reactDom.createPortal(content, container);
}
