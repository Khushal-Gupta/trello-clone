import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Card from "../Card";
import classes from "./CardList.module.css";
import { useCardListHook } from "../../hooks/cardlist-hook";
import { CardListContext } from "../../context/cardlist-context";
import AddCardForm from "../AddCardForm";
import AutoHeightTextarea from "../TextArea";

export default function CardList({
  title: passedTitle,
  passedClasses,
  id: cardlistId,
}) {
  const [showNewCardEditor, setShowNewCardEditor] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const taskListRef = useRef(null);
  const titleRef = useRef(null);
  const {
    title,
    isLoading,
    error,
    listOfCard,
    setTitle,
    addCard,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
  } = useCardListHook(cardlistId, passedTitle);

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
    <CardListContext.Provider
      value={{
        title,
        listOfCard,
        addCard,
        setCardTitle,
        setCardDescription,
        addCommentToCard,
        editComment,
      }}
    >
      <div className={clsx(classes.wrapper, passedClasses)} ref={taskListRef}>
        <div
          className={clsx(
            classes.header,
            classes.headerNotEditable,
            isTitleEditable && classes.hidden
          )}
          onClick={() => {
            setIsTitleEditable(true);
          }}
        >
          {title}
        </div>

        {isTitleEditable ? (
          <AutoHeightTextarea
            ref={titleRef}
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
          {listOfCard.map((elem) => (
            <Card cardId={elem.id} key={elem.id} cardTitle={elem.title} />
          ))}
        </div>

        <AddCardForm
          showNewCardEditor={showNewCardEditor}
          setShowNewCardEditor={setShowNewCardEditor}
        />
      </div>
    </CardListContext.Provider>
  );
}
