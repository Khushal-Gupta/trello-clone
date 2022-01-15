import { useState } from "react";
import CardModal from "../CardModal";
import classes from "./Card.module.css";

export default function Card({ cardId, cardTitle }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
    </>
  );
}
