import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Card from "../Card";
import classes from "./CardList.module.css";
import { useCardListHook } from "../../hooks/cardlist-hook";
import { CardListContext } from "../../context/cardlist-context";
import AddCardForm from "../AddCardForm";
import AutoHeightTextarea from "../autoHeightTextarea/AutoHeightTextarea";

export default function CardList({ title: passedTitle, passedClasses }) {
  const [showNewCardEditor, setShowNewCardEditor] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const taskListRef = useRef(null);
  const titleRef = useRef(null);
  const {
    title,
    listOfCard,
    setTitle,
    addCard,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
  } = useCardListHook(passedTitle);

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
