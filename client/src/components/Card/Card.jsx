// import CardModal from "../CardModal";
import { useCardHook } from "../../hooks/card-hook";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import classes from "./Card.module.css";
import { CardContext } from "../../context/card-context";
import CardModal from "../CardModal/CardModal";

export default function Card({ cardId, index, cardlistId }) {
  const { cardTitle, cardDescription, setCardTitle, setCardDescription } =
    useCardHook(cardId);

  const [showModal, setShowModal] = useState(false);

  return (
    <CardContext.Provider
      value={{
        cardId,
        cardTitle,
        cardDescription,
        setCardTitle,
        setCardDescription,
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
