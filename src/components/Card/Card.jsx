import { useState, Fragment } from "react";
import classes from "./Card.module.css";

export default function Card({ title }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div
        className={classes.wrapper}
        onClick={() => {
          console.log("modal should be opened");
          setShowModal(true);
        }}
      >
        {title}
      </div>
      {/* <CardModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      ></CardModal> */}
    </Fragment>
  );
}
