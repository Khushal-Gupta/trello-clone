import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Card from "../Card";
import classes from "./CardList.module.css";
import { useCardListHook } from "../../hooks/cardlist-hook";
import { CardListContext } from "../../context/cardlist-context";
import AddCardForm from "../AddCardForm";

export default function CardList({ title: passedTitle, id, passedClasses }) {
  const [showNewCardEditor, setShowNewCardEditor] = useState(false);

  const [isTitleEditable, setIsTitleEditable] = useState(false);

  const taskListRef = useRef(null);
  const titleTextareRef = useRef(null);
  const {
    title,
    listOfCard,
    setTitle,
    addCard,
    setCardTitle,
    setCardDescription,
    addCommentToCard,
    editComment,
  } = useCardListHook(id, passedTitle);

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (taskListRef.current && !taskListRef.current.contains(event.target)) {
        setShowNewCardEditor(false);
        // setNewCardTitle("");
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  const handleAutoHeight = useCallback(() => {
    if (titleTextareRef.current) {
      titleTextareRef.current.style.height = "auto";
      titleTextareRef.current.style.height =
        titleTextareRef.current.scrollHeight + "px";
    }
  }, [titleTextareRef]);

  useEffect(() => {
    if (isTitleEditable) handleAutoHeight();
  }, [isTitleEditable, handleAutoHeight]);

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

        {isTitleEditable && (
          <textarea
            ref={titleTextareRef}
            className={clsx(classes.header, classes.headerEditable)}
            rows={1}
            defaultValue={title}
            onChange={handleAutoHeight}
            autoFocus
            spellCheck={false}
            onBlur={(event) => {
              if (event.target.value) {
                setTitle(event.target.value);
              }
              setIsTitleEditable(false);
            }}
          />
        )}

        <ul className={classes.listOfCardWrapper}>
          {listOfCard.map((elem) => (
            <Card cardId={elem.id} key={elem.id} cardTitle={elem.title} />
          ))}
        </ul>

        <AddCardForm
          showNewCardEditor={showNewCardEditor}
          setShowNewCardEditor={setShowNewCardEditor}
        />
      </div>
    </CardListContext.Provider>
  );
}
