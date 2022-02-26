import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Draggable, Droppable } from "react-beautiful-dnd";
import mergeRefs from "react-merge-refs";

import Card from "../Card";
import classes from "./CardList.module.css";
import { useCardListHook } from "../../hooks/cardlist-hook";
import AddCardForm from "../AddCardForm";
import AutoHeightTextarea from "../TextArea";

export default function CardList({
  title: passedTitle,
  passedClasses,
  id: cardlistId,
  index,
}) {
  const [showNewCardEditor, setShowNewCardEditor] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const taskListRef = useRef(null);

  const { title, isLoading, error, listOfCard, setTitle, addCard } =
    useCardListHook(cardlistId, passedTitle);

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (taskListRef.current && !taskListRef.current.contains(event.target)) {
        setShowNewCardEditor(false);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  if (isLoading)
    return (
      <div className={clsx(classes.wrapper, passedClasses)}>Loading...</div>
    );

  if (error)
    return (
      <div className={clsx(classes.wrapper, passedClasses)}>
        Error Occured...
      </div>
    );

  return (
    <Draggable draggableId={`draglist#${cardlistId}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable
            droppableId={`droplist#${cardlistId}`}
            direction="vertical"
            type="card"
          >
            {(provided) => (
              <div
                className={clsx(classes.wrapper, passedClasses)}
                ref={mergeRefs([taskListRef, provided.innerRef])}
                {...provided.droppableProps}
              >
                <div
                  className={clsx(
                    classes.header,
                    classes.headerNotEditable,
                    isTitleEditable && classes.hidden
                  )}
                  onClick={() => setIsTitleEditable(true)}
                >
                  {title}
                </div>

                {isTitleEditable ? (
                  <AutoHeightTextarea
                    className={clsx(classes.header, classes.headerEditable)}
                    defaultValue={title}
                    autoFocus
                    rows={1}
                    onBlur={(value) => {
                      setTitle(value);
                      setIsTitleEditable(false);
                    }}
                  />
                ) : null}

                <div className={classes.listOfCardWrapper}>
                  {listOfCard.map((elem, index) => (
                    <Card
                      cardId={elem.id}
                      cardlistId={cardlistId}
                      key={elem.id.toString()}
                      index={index}
                    />
                  ))}
                </div>
                {provided.placeholder}
                <AddCardForm
                  showNewCardEditor={showNewCardEditor}
                  setShowNewCardEditor={setShowNewCardEditor}
                  addCard={addCard}
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
