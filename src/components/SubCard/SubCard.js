import { useState } from "react";
import Modal from "../../shared/components/Modal/Modal";
import classes from "./SubCard.module.css";

const SubCard = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  console.log('showModal', showModal);
  return (
    <div
      className={classes.wrapper}
      onClick={() => {
        console.log("modal should be opened");
        setShowModal(true);
      }}
    >
      <Modal
        show={showModal}
        onCancel={(event) => {
          console.log("modal should be closed");
          setShowModal(false);
          event.stopPropagation();
        }}
      />
      {title}
    </div>
  );
};

export default SubCard;
