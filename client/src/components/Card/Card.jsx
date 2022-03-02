// import CardModal from "../CardModal";
import { useCardHook } from "../../hooks/card-hook";
import { Draggable } from "react-beautiful-dnd";

import classes from "./Card.module.css";

export default function Card({ cardId, index, cardlistId }) {
  const { title: cardTitle } = useCardHook(cardId);

  // const [showModal, setShowModal] = useState(false);

  return (
    <Draggable draggableId={`${cardlistId}#${cardId}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={classes.wrapper}
            onClick={() => {
              // setShowModal(true);
            }}
          >
            {cardTitle}
          </div>

          {/* <CardModal
            show={showModal}
            onClose={() => {
              setShowModal(false);
            }}
            showCloseButton
            cardId={cardId}
          /> */}
        </div>
      )}
    </Draggable>
  );
}
