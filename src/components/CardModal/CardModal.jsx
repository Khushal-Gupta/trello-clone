import classes from "./CardModal.module.css";
import Modal from "../Modal";
import TitleComponent from "./TitleComponent";
import DescriptionComponent from "./DescriptionComponent";
import ActivityComponent from "./ActivityComponent";
import SideActionsComponent from "./SideActionsComponent";

export default function CardModal({
  show,
  onClose,
  cardTitle,
  listTitle,
  cardTitleChangeHandler,
}) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      showCloseButton={true}
      passedModalClasses={classes.modalWrapperClasses}
    >
      <TitleComponent
        cardTitle={cardTitle}
        listTitle={listTitle}
        cardTitleChangeHandler={cardTitleChangeHandler}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "3",
          }}
        >
          <DescriptionComponent />
          <ActivityComponent />
        </div>
        <SideActionsComponent />
      </div>
    </Modal>
  );
}
