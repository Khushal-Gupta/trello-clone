// import CardModal from "../CardModal";
import { useCardHook } from "../../hooks/card-hook";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import classes from "./Card.module.css";
import { CardContext } from "../../context/card-context";
import CardModal from "../CardModal/CardModal";

export default function Card({ cardId, index, cardlistId, cardlistTitle }) {
  const {
    cardTitle,
    cardDescription,
    listOfComments,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
    deleteComment,
  } = useCardHook(cardId);

  const [showModal, setShowModal] = useState(false);

  return (
    <CardContext.Provider
      value={{
        cardId,
        cardTitle,
        cardlistTitle,
        cardDescription,
        listOfComments,
        setCardTitle,
        setCardDescription,
        addCommentToCard,
        editComment,
        deleteComment,
      }}
    >
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
          </div>
        )}
      </Draggable>
    </CardContext.Provider>
  );
}
