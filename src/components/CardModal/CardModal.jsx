import classes from "./CardModal.module.css";
import Modal from "../Modal";
import TitleComponent from "./TitleComponent";
import DescriptionComponent from "./DescriptionComponent";
import ActivityComponent from "./ActivityComponent";
import SideActionsComponent from "./SideActionsComponent";

export default function CardModal({ show, onClose, cardId }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      showCloseButton={true}
      passedModalClasses={classes.modalWrapperClasses}
    >
      <TitleComponent cardId={cardId} />
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "67%",
            flex: "none",
          }}
        >
          <DescriptionComponent cardId={cardId} />
          <ActivityComponent cardId={cardId} />
        </div>
        <SideActionsComponent />
      </div>
    </Modal>
  );
}
