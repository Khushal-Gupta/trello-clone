import { useState, Fragment } from "react";
import CardModal from "../CardModal";
import classes from "./Card.module.css";

export default function Card({ cardTitle:initialCardTitle, listTitle }) {
  const [showModal, setShowModal] = useState(false);
  const [cardTitle, setCardTitle] = useState(initialCardTitle);
  
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
        cardTitle={cardTitle}
        listTitle ={listTitle}
        cardTitleChangeHandler ={setCardTitle}
      />
    </Fragment>
  );
}
