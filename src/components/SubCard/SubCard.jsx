import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import SubCardModal from "../SubCardModal/SubCardModal";
import classes from "./SubCard.module.css";

const SubCard = ({ title }) => {
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
      <SubCardModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      ></SubCardModal>
    </Fragment>
  );
};

export default SubCard;
