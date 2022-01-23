import { useRef, useEffect } from "react";
import reactDom from "react-dom";
import classes from "./Modal.module.css";
import clsx from "clsx";
import {GrClose} from 'react-icons/gr';

const container = document.createElement("div");
container.id = "modal-hook";
document.body.appendChild(container);

export default function Modal({
  show,
  children,
  onClose,
  showCloseButton,
  passedModalClasses,
}) {
  const backdropRef = useRef();

  useEffect(() => {
    const escKeyPressHandler = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", escKeyPressHandler);
    return () => {
      document.removeEventListener("keydown", escKeyPressHandler);
    };
  }, [onClose]);

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
      <div className={clsx(classes.modal, passedModalClasses)}>
        {showCloseButton && (
          <button className={classes.closeButton} onClick={onClose}>
            <GrClose/>
          </button>
        )}
      
        {children}
      </div>
    </div>
  );

  return reactDom.createPortal(content, container);
}
