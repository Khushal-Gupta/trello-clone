import reactDom from "react-dom";

import classes from "./Backdrop.module.css";

export default function Backdrop({ onClick, children }) {
  return reactDom.createPortal(
    <div className={classes.backdrop} onClick={onClick}>
      {children}
    </div>,
    document.getElementById("backdrop-hook")
  );
}
