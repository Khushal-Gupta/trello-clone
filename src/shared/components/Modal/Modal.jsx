import { Fragment } from "react";
import reactDom from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../ErrorModal/Backdrop";

import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  const text = (
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum iusto
      voluptatum odit asperiores quidem similique soluta in obcaecati modi
      voluptas aliquid, a sint veritatis quo aliquam, nulla, quasi harum illum?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione
      autem repellat eum, sequi dolore praesentium officiis accusantium
      molestias vitae veritatis architecto aut velit nam placeat aliquam hic
      harum provident. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Rerum iusto voluptatum odit asperiores quidem similique soluta in
      obcaecati modi voluptas aliquid, a sint veritatis quo aliquam, nulla,
      quasi harum illum? Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Eius ratione autem repellat eum, sequi dolore praesentium officiis
      accusantium molestias vitae veritatis architecto aut velit nam placeat
      aliquam hic harum provident. Lorem ipsum dolor, sit amet consectetur
      adipisicing elit. Rerum iusto voluptatum odit asperiores quidem similique
      soluta in obcaecati modi voluptas aliquid, a sint veritatis quo aliquam,
      nulla, quasi harum illum? Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Eius ratione autem repellat eum, sequi dolore
      praesentium officiis accusantium molestias vitae veritatis architecto aut
      velit nam placeat aliquam hic harum provident.
    </p>
  );
  const content = (
    <div className={classes.wrapperScrollContainer} onClick={props.onCancel}>
      <div className={classes.mainContentWrapper}>
        {text}
        {text}
        {text}
        {text}
      </div>
    </div>
  );
  return reactDom.createPortal(
     content ,
    document.getElementById("modal-hook")
  );
};

export default function Modal(props) {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={75}
        classNames={{
          enter: classes["modal-enter"],
          enterActive: classes["modal-enter-active"],
          exit: classes["modal-exit"],
          exitActive: classes["modal-exit-active"],
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
}
