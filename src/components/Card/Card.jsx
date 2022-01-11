import { useState, Fragment } from "react";
import CardModal from "../CardModal";
import classes from "./Card.module.css";

export default function Card({ cardId, cardTitle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div
        className={classes.wrapper}
        onClick={() => {
          setShowModal(true);
        }}
      >
        {cardTitle}
      </div>

      <CardModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        showCloseButton
        cardId={cardId}
      />
    </Fragment>
  );
}
