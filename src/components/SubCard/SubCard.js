import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Modal from "../Modal/Modal";
import classes from "./SubCard.module.css";

const SubCard = ({ title }) => {
  const [showModal, setShowModal] = useState(false);
  const placeholderContent = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  );
  console.log("showModal", showModal);
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
      <Modal
        show={showModal}
        showCloseButton={true}
        onClose={() => {
          setShowModal(false);
        }}
      >
        {placeholderContent}
        {placeholderContent}
        {placeholderContent}
        {placeholderContent}
        {placeholderContent}
        {placeholderContent}
      </Modal>
    </Fragment>
  );
};

export default SubCard;
